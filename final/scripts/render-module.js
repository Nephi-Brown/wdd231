import { attachToCard } from './modal-module.js';

export function generateStars(rating) {
  const fullStar = '★';
  const emptyStar = '☆';
  const filled = fullStar.repeat(rating || 0);
  const empty = emptyStar.repeat(5 - (rating || 0));
  return `<span class="stars">${filled}${empty}</span>`;
}

export function renderCards(items, viewType = 'grid') {
  const container = document.getElementById('display-area');
  if (!container) return;

  container.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = `card-container ${viewType}`;

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    const imgSrc = item.image ? `images/${item.image}` : 'images/tempimage.webp';

    card.innerHTML = `
      <img src="${imgSrc}" alt="${item.title}" class="card-image" loading="lazy">
      <div class="card-content">
        <h3>${item.title}</h3>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Rating:</strong> ${generateStars(item.rating)}</p>
        <p>${item.review}</p>
      </div>
    `;

    attachToCard(card, item, imgSrc);
    wrapper.appendChild(card);
  });

  container.appendChild(wrapper);
}
