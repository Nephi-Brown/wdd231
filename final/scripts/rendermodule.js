const RenderModule = (function () {
  function renderCards(items, viewType = 'grid') {
    const container = document.getElementById('display-area');
    container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = `card-container ${viewType}`;

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      const imgSrc = item.image ? `images/${item.image}` : 'images/tempimage.webp';

      card.innerHTML = `
        <img src="${imgSrc}" alt="${item.title}" class="card-image">
        <div class="card-content">
          <h3>${item.title}</h3>
          <p><strong>Category:</strong> ${item.category}</p>
          <p>${item.review}</p>
        </div>
      `;

      ModalModule.attachToCard(card, item, imgSrc); // Hand off to modal logic
      wrapper.appendChild(card);
    });

    container.appendChild(wrapper);
  }

  return {
    renderCards,
  };
})();