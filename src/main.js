document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const productCards = document.querySelectorAll('.product-card');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  // Реактивность: Поиск по названию
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    productCards.forEach(card => {
      const name = card.querySelector('h2').textContent.toLowerCase();
      if (name.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // Реактивность: Кнопка "В корзину" -> "В корзине"
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.textContent === 'В корзину') {
        button.textContent = 'В корзине';
      } else {
        button.textContent = 'В корзину';
      }
    });
  });
});