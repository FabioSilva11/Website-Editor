<?php
header('Content-Type: application/json');

// Função para carregar o HTML de um site e adicionar marcações para edição
function fetchWebsite($url) {
    $html = @file_get_contents($url);
    if ($html === FALSE) {
        return ['error' => 'Failed to fetch the website.'];
    }

    $dom = new DOMDocument();
    @$dom->loadHTML($html);

    $xpath = new DOMXPath($dom);
    $id = 0;

    // Marca elementos editáveis no HTML e aplica os estilos de edição
    foreach ($xpath->query('//text()[normalize-space()]') as $textNode) {
        $parent = $textNode->parentNode;
        $editableId = 'editable_' . (++$id);
        $parent->setAttribute('data-editable', 'true');
        $parent->setAttribute('data-id', $editableId);

        // Aplica o atributo contenteditable
        $parent->setAttribute('contenteditable', 'true');

        // Verifica se o elemento já possui a propriedade border definida no estilo


        $textNode->nodeValue = htmlspecialchars($textNode->nodeValue);
    }

    return ['html' => $dom->saveHTML()];
}

// Função para reverter as marcações de edição no HTML
function revertEditingMarkers($htmlContent) {
    $dom = new DOMDocument();
    @$dom->loadHTML($htmlContent);

    // Remove as marcações de edição
    foreach ($dom->getElementsByTagName('*') as $element) {
        $element->removeAttribute('data-editable');
        $element->removeAttribute('data-id');
        $element->removeAttribute('contenteditable');
        $element->removeAttribute('style');
    }

    return $dom->saveHTML();
}

// Função para aplicar edições ao HTML original
function applyEdits($htmlContent, $edits) {
    $dom = new DOMDocument();
    @$dom->loadHTML($htmlContent);

    foreach ($edits as $edit) {
        $id = $edit['id'];
        $content = htmlspecialchars($edit['content']);

        $xpath = new DOMXPath($dom);
        $elements = $xpath->query("//*[@data-id='$id']");

        if ($elements->length > 0) {
            $elements[0]->nodeValue = $content;
        }
    }

    return $dom->saveHTML();
}

// Processar a requisição
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['action'])) {
    echo json_encode(['error' => 'Invalid request.']);
    exit;
}

if ($input['action'] === 'fetch') {
    $url = $input['url'] ?? null;
    if (!$url) {
        echo json_encode(['error' => 'URL is required.']);
        exit;
    }

    echo json_encode(fetchWebsite($url));
} elseif ($input['action'] === 'save') {
    // Rota save: reverte as mudanças feitas no fetch e salva o HTML editado
    $edits = $input['edits'] ?? [];
    $htmlContent = $input['htmlContent'] ?? '';  // Conteúdo HTML modificado enviado do frontend

    if (empty($htmlContent)) {
        echo json_encode(['error' => 'No HTML content provided for saving.']);
        exit;
    }

    // Aplicar as edições ao conteúdo HTML
    $updatedHtml = applyEdits($htmlContent, $edits);

    // Reverter as marcações de edição (atributos e estilos)
    $finalHtml = revertEditingMarkers($updatedHtml);

    // Salvar a página modificada
    $savePath = 'saved_pages/edited_' . time() . '.html';
    if (!is_dir('saved_pages')) {
        mkdir('saved_pages', 0777, true);
    }
    if (file_put_contents($savePath, $finalHtml) === FALSE) {
        echo json_encode(['error' => 'Failed to save the file.']);
        exit;
    }

    // Retorna o caminho para o frontend para redirecionamento
    $viewPath = '/saved_pages/' . basename($savePath);
    echo json_encode(['success' => true, 'path' => $viewPath]);
}
?>
