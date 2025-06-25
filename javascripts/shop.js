document.addEventListener('DOMContentLoaded', function() {
  // Секция популярных товаров в магазине
  const popularBlock = document.querySelector('.popular-block');
  if (popularBlock) {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    // скролл для мобильных
    if (window.innerWidth <= 768) {
      popularBlock.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - popularBlock.offsetLeft;
        scrollLeft = popularBlock.scrollLeft;
      });
      popularBlock.addEventListener('mouseleave', () => {
        isDragging = false;
      });

      popularBlock.addEventListener('mouseup', () => {
        isDragging = false;
      });
      popularBlock.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - popularBlock.offsetLeft;
        const walk = (x - startX) * 1.2; 
        popularBlock.scrollLeft = scrollLeft - walk;
      });
    }
    // Обновляем при ресайзе (если переключились между мобильным,десктопном разрешением)
    window.addEventListener('resize', function() {
      if (window.innerWidth <= 768 && !popularBlock.classList.contains('drag-enabled')) {
        window.location.reload();
      }
    });
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