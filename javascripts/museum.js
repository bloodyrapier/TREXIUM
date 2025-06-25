// Переключение разделов контакты и музей
document.addEventListener('DOMContentLoaded', function() {
    const museumButton = document.querySelector('.museum-button');
    const contactButton = document.querySelector('.contact-button');
    const contactsContainers = document.querySelectorAll('.contacts-container');
    const museumContainer = document.querySelector('.museum-container');
    const pageTitle = document.querySelector('.museum-title h3');
    museumContainer.style.display = 'none';
    museumButton.addEventListener('click', function(e) {
        e.preventDefault();
        // Скрытие блока контактов
        contactsContainers.forEach(container => {
            container.style.display = 'none';
        });
        museumContainer.style.display = 'block';
        // смена заголовка страницы
        pageTitle.textContent = 'Музей';
    });
    contactButton.addEventListener('click', function(e) {
        e.preventDefault();
        // открываются контакты и скрывается музей
        contactsContainers.forEach(container => {
            container.style.display = 'block';
        });
        museumContainer.style.display = 'none';
        // Возвращаем заголовок
        pageTitle.textContent = 'Контакты';
    });
});