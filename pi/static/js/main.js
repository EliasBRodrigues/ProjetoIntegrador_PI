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

    // Efeito dropdown na lista
    const items = document.querySelectorAll('.medicine-atributes__title-item img');
    items.forEach(item => {
        const dropdown = item.parentElement.nextElementSibling;

        item.addEventListener('click', function(){
            item.addEventListener('click', () => {
                const isHidden = dropdown.style.display === 'none' || !dropdown.style.display;
                
                dropdown.style.display = isHidden ? 'flex' : 'none';
                item.classList.toggle('rotate-icon-hide', !isHidden);
                item.classList.toggle('rotate-icon-show', isHidden);
            });
        });
    });

    // Efeito dropdown na sublista
    const dropItems = document.querySelectorAll('.medicine-atributes__drop-header img');
    dropItems.forEach(item => {
        const dropdownContent = item.parentElement.nextElementSibling;
        const container = item.closest('.medicine-atributes__drop-item');

        item.addEventListener('click', () => {
            const isHidden = dropdownContent.style.display === 'none' || !dropdownContent.style.display;
            
            dropdownContent.style.display = isHidden ? 'flex' : 'none';
            item.classList.toggle('rotate-icon-hide', !isHidden);
            item.classList.toggle('rotate-icon-show', isHidden);
            container.style.backgroundColor = isHidden ? '#EAEAEA' : '#FFFFFF';
        });
    });


    //HOME MODAL
    const modalElement = document.getElementById('modal-container');
    const profileImageElement = document.querySelector('.home-header__profile-image');
    const closeIcon = document.querySelector('.home-modal__header img');

    profileImageElement.addEventListener('click', function() {
        modalElement.style.display = 'grid';
    })
    closeIcon.addEventListener('click', function() {
        modalElement.style.display = 'none';
    })

});