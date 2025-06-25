document.addEventListener('DOMContentLoaded', function() {
  // Скролл популярных товаров
const popularBlock = document.querySelector('.popular-block');
if (popularBlock) {
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  function handleDragStart(e) {
    isDragging = true;
    startX = ('pageX' in e) ? e.pageX : e.touches[0].pageX;
    startX -= popularBlock.offsetLeft;
    scrollLeft = popularBlock.scrollLeft;
  }
  function handleDragMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = ('pageX' in e) ? e.pageX : e.touches[0].pageX;
    const walk = (x - popularBlock.offsetLeft - startX) * 1.5;
    popularBlock.scrollLeft = scrollLeft - walk;
  }
  function handleDragEnd() {
    isDragging = false;
  }
  function setupDragScroll() {
    if (window.innerWidth <= 768) {
      // обработчики для мыши и тач устройств
      popularBlock.addEventListener('mousedown', handleDragStart);
      popularBlock.addEventListener('touchstart', handleDragStart, { passive: false });
      popularBlock.addEventListener('mousemove', handleDragMove);
      popularBlock.addEventListener('touchmove', handleDragMove, { passive: false });
      popularBlock.addEventListener('mouseup', handleDragEnd);
      popularBlock.addEventListener('touchend', handleDragEnd);
      popularBlock.addEventListener('mouseleave', handleDragEnd);
    }
  }
  setupDragScroll();
  // Обновление при изменении размера
  window.addEventListener('resize', setupDragScroll);
}
  // Страница товара
  const sizeOptions = document.querySelectorAll('.size-options');
  const finalPriceElement = document.querySelector('.final-price');
  if (sizeOptions.length > 0) {
    sizeOptions.forEach(option => {
      option.addEventListener('click', function() {
        sizeOptions.forEach(opt => {
          opt.classList.remove('active');
        });
        // Обводка выбранного варианта
        this.classList.add('active');
        // Нахождение цены в выбранном варианте
        const priceElement = this.querySelector('.size-price');
        if (priceElement) {
          const price = priceElement.textContent.trim();
          // Обновление цены
          if (finalPriceElement) {
            finalPriceElement.textContent = price;
          }
        }
      });
    });
  }
  // Выбор картинки товара с миниатюр 
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImageContainer = document.querySelector('.main-image');
  if (thumbnails.length > 0 && mainImageContainer) {
    const mainImage = mainImageContainer.querySelector('img');
    if (mainImage) {
      mainImage.style.transition = 'opacity 0.3s ease-out';
    }
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        if (this.classList.contains('active')) return;
        if (mainImage) {
          mainImage.style.opacity = '0';
        }
        setTimeout(() => {
          if (mainImage) {
            mainImage.src = this.src;
            mainImage.style.opacity = '1';
          }
          thumbnails.forEach(thumb => thumb.classList.remove('active'));
          this.classList.add('active');
        }, 300);
      });
    });
    thumbnails[0].classList.add('active');
  }
});
