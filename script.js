document.getElementById('fetchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const urlInput = document.getElementById('urlInput');
    const contentIframe = document.getElementById('contentIframe');
    const errorDiv = document.getElementById('error');
    const editor = document.getElementById('editor');

    // Resetando mensagens de erro e escondendo o editor inicialmente
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
    editor.classList.add('hidden');

    try {
        // Envia uma requisição para buscar o conteúdo do site
        const response = await fetch('api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'fetch', url: urlInput.value })
        });

        if (!response.ok) throw new Error('Erro ao buscar o conteúdo do site.');

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        // Insere o conteúdo no iframe
        const iframeDocument = contentIframe.contentDocument || contentIframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(data.html);
        iframeDocument.close();

        // Mostra o editor
        editor.classList.remove('hidden');

    } catch (error) {
        // Exibe mensagens de erro
        errorDiv.textContent = error.message;
        errorDiv.classList.remove('hidden');
    }
});

document.getElementById('saveButton').addEventListener('click', async () => {
    const contentIframe = document.getElementById('contentIframe');
    const iframeDocument = contentIframe.contentDocument || contentIframe.contentWindow.document;

    // Obtém o conteúdo HTML do iframe
    const htmlContent = iframeDocument.documentElement.outerHTML;

    try {
        // Envia o HTML modificado para salvar no servidor
        const response = await fetch('api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'save',
                htmlContent: htmlContent // Envia o conteúdo completo do iframe
            })
        });

        if (!response.ok) throw new Error('Erro ao salvar as alterações.');

        const data = await response.json();
        if (data.success) {
            // Redireciona para a página salva
            window.location.href = data.path;
        } else {
            alert('Erro ao salvar a página.');
        }
    } catch (error) {
        alert(error.message);
    }
});
