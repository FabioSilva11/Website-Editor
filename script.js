document.getElementById('fetchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const urlInput = document.getElementById('urlInput');
    const editor = document.getElementById('editor');
    const editableContent = document.getElementById('editableContent');
    const errorDiv = document.getElementById('error');

    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
    editor.classList.add('hidden');

    try {
        const response = await fetch('api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'fetch', url: urlInput.value })
        });

        if (!response.ok) throw new Error('Failed to fetch website content.');

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        editableContent.innerHTML = data.html;
        editor.classList.remove('hidden');

        // Torne os textos editáveis
        editableContent.querySelectorAll('[data-editable]').forEach(el => {
            el.setAttribute('contenteditable', 'true');
            el.style.border = '1px dashed #4CAF50'; // Adiciona uma borda verde pontilhada
            el.style.padding = '5px'; // Adiciona um pequeno espaço interno
            el.style.margin = '2px'; // Adiciona um pequeno espaço externo
        });
    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.classList.remove('hidden');
    }
});

document.getElementById('saveButton').addEventListener('click', async () => {
    const editableContent = document.getElementById('editableContent');
    const elements = Array.from(editableContent.querySelectorAll('[data-editable]')).map(el => ({
        id: el.dataset.id,
        content: el.textContent
    }));

    // Obter o conteúdo HTML modificado
    const htmlContent = editableContent.innerHTML;

    try {
        const response = await fetch('api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'save',
                edits: elements,
                htmlContent: htmlContent  // Enviar o HTML modificado
            })
        });

        if (!response.ok) throw new Error('Failed to save changes.');

        const data = await response.json();
        if (data.success) {
            // Redireciona para a página salva
            window.location.href = data.path;
        } else {
            alert('Error saving the page.');
        }
    } catch (error) {
        alert(error.message);
    }
});
