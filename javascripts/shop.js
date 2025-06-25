document.addEventListener('DOMContentLoaded', function() {
// Скролл популярных товаров
const popularBlock = document.querySelector('.popular-block');

if (popularBlock) {
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  const handleEvent = {
    start: (e) => {
      isDragging = true;
      const pageX = e.pageX || e.touches[0].pageX;
      startX = pageX - popularBlock.offsetLeft;
      scrollLeft = popularBlock.scrollLeft;
    },
    move: (e) => {
      if (!isDragging) return;
      const pageX = e.pageX || e.touches[0].pageX;
      const x = pageX - popularBlock.offsetLeft;
      popularBlock.scrollLeft = scrollLeft - (x - startX) * 1.3;
      e.preventDefault();
    },
    end: () => isDragging = false
  };
  const setupDragScroll = () => {
    const isMobile = window.innerWidth <= 768;
    const method = isMobile ? 'addEventListener' : 'removeEventListener';

    ['mousedown', 'touchstart'].forEach(ev => popularBlock[method](ev, handleEvent.start));
    ['mousemove', 'touchmove'].forEach(ev => popularBlock[method](ev, handleEvent.move, { passive: false }));
    ['mouseup', 'touchend', 'mouseleave'].forEach(ev => popularBlock[method](ev, handleEvent.end));
  };
  setupDragScroll();
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
