document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.footer__nav-item');

    function applyStylesToSelectedItem(selectedItem) {
        selectedItem.style.backgroundColor = '#DDF0EE';
        const svgPaths = selectedItem.querySelectorAll('svg > path');
        svgPaths.forEach(path => {
            path.style.fill = '#1A998E';
        });
        const paragraph = selectedItem.querySelector('p');
        paragraph.style.display = 'flex';
        paragraph.style.color = "#1A998E";
    }

    function removeStylesFromAllItems() {
        navItems.forEach(item => {
            item.style.backgroundColor = '';
            const svgPaths = item.querySelectorAll('svg > path');
            svgPaths.forEach(path => {
                path.style.fill = '';
            });
            const paragraph = item.querySelector('p');
            paragraph.style.display = 'none';
        });
    }

    function handleNavItemClick() {
        removeStylesFromAllItems();
        applyStylesToSelectedItem(this);
        localStorage.setItem('selectedLink', this.id);
    }

    // Recuperar o item selecionado armazenado no armazenamento local
    const selectedLinkId = localStorage.getItem('selectedLink');

    // Se houver um item selecionado no armazenamento local, aplicar estilos
    if (selectedLinkId) {
        const selectedItem = document.getElementById(selectedLinkId);
        if (selectedItem) {
            applyStylesToSelectedItem(selectedItem);
        }
    }

    // Adicionar os estilos apenas ao item clicado
    navItems.forEach(item => {
        item.addEventListener('click', handleNavItemClick);
    });
});