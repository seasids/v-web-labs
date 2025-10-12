document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const productCards = document.querySelectorAll('.product-card');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartIcon = document.querySelector('.cart-icon'); // Только для хедера
  const cartNotificationMobileContainer = document.querySelector('.cart-item .nav-icon'); // Контейнер для мобильного уведомления
  let cartCount = 0;

  function filterCards() {
    console.log('Filter triggered, searchInput.value:', searchInput ? searchInput.value : 'Not found');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    console.log('Query:', query);
    console.log('Product cards found:', productCards.length);

    // Находим все заголовки и секции
    const headings = document.querySelectorAll('main > h1');
    const sections = document.querySelectorAll('main > .products');

    productCards.forEach(card => {
      const nameElement = card.querySelector('h2');
      const name = nameElement ? nameElement.textContent.toLowerCase() : 'No name';
      console.log('Checking card:', name);
      if (query === '' || name.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Управление видимостью заголовков для каждой секции
    headings.forEach((heading, index) => {
      const section = sections[index];
      if (section) {
        const visibleCardsInSection = section.querySelectorAll('.product-card:not([style*="display: none"])').length;
        heading.style.display = visibleCardsInSection > 0 ? 'block' : 'none';
      }
    });
  }

  function updateCartNotification() {
    // Уведомление в хедере
    let headerNotification = cartIcon.querySelector('.cart-notification');
    if (cartCount === 0) {
      if (headerNotification) headerNotification.remove();
    } else {
      if (!headerNotification) {
        headerNotification = document.createElement('span');
        headerNotification.className = 'cart-notification';
        cartIcon.appendChild(headerNotification);
      }
      headerNotification.textContent = cartCount;
      headerNotification.style.opacity = '1';
      headerNotification.style.transition = 'opacity 0.3s';
    }

    // Уведомление в мобильном навбаре
    let mobileNotification = cartNotificationMobileContainer.querySelector('.cart-notification-mobile');
    if (cartCount === 0) {
      if (mobileNotification) {
        mobileNotification.style.opacity = '0';
        setTimeout(() => {
          if (mobileNotification && mobileNotification.parentNode) {
            mobileNotification.parentNode.removeChild(mobileNotification);
          }
        }, 300); // Задержка для анимации исчезновения
      }
    } else {
      if (!mobileNotification) {
        mobileNotification = document.createElement('span');
        mobileNotification.className = 'cart-notification-mobile';
        cartNotificationMobileContainer.appendChild(mobileNotification);
      }
      mobileNotification.textContent = cartCount;
      mobileNotification.style.opacity = '1';
      mobileNotification.style.transition = 'opacity 0.3s';
    }
  }

  // Реактивность: Кнопка "В корзину" -> "В корзине" с анимацией
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const originalText = button.textContent;
      if (originalText === 'В корзину') {
        button.style.transition = 'opacity 0.3s';
        button.style.opacity = '0';
        setTimeout(() => {
          button.style.fontWeight = 'bold';
          button.style.backgroundColor = 'black'; // Чёрный фон
          button.style.color = '#fff'; // Белый текст
          button.textContent = 'В корзине';
          button.style.opacity = '1';
          cartCount++;
          updateCartNotification();
        }, 300);
      } else {
        button.style.transition = 'opacity 0.3s';
        button.style.opacity = '0';
        setTimeout(() => {
          button.style.fontWeight = 'normal';
          button.style.backgroundColor = '#ccc'; // Возврат к серому
          button.style.color = '#000'; // Возврат к чёрному тексту
          button.textContent = 'В корзину';
          button.style.opacity = '1';
          cartCount--;
          updateCartNotification();
        }, 300);
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
    console.log('Search input listener added');
  } else {
    console.error('Search input not found');
  }

  updateCartNotification();
});