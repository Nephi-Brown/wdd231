// Define a global app namespace
window.MediaMosaic = window.MediaMosaic || {};

// Data handling module
MediaMosaic.DataModule = (() => {
  async function fetchRemoteData() {
    try {
      const response = await fetch('data/media.json');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error loading JSON:', error);
      const displayArea = document.getElementById('display-area');
      if (displayArea) {
        displayArea.innerHTML = '<p style="color:red; text-align:center;">Could not load content.</p>';
      }
      return [];
    }
  }

  function loadLocalReviews() {
    const raw = localStorage.getItem('userReviews');
    return raw ? JSON.parse(raw) : [];
  }

  function saveLocalReview(review) {
    const reviews = loadLocalReviews();
    reviews.push(review);
    localStorage.setItem('userReviews', JSON.stringify(reviews));
  }

  return {
    fetchRemoteData,
    loadLocalReviews,
    saveLocalReview,
  };
})();

// Rendering module
MediaMosaic.RenderModule = (() => {
  function generateStars(rating) {
    const fullStar = '★';
    const emptyStar = '☆';
    const filled = fullStar.repeat(rating || 0);
    const empty = emptyStar.repeat(5 - (rating || 0));
    return `<span class="stars">${filled}${empty}</span>`;
  }

  function renderCards(items, viewType = 'grid') {
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

      MediaMosaic.ModalModule.attachToCard(card, item, imgSrc);
      wrapper.appendChild(card);
    });

    container.appendChild(wrapper);
  }

  return {
    renderCards,
    generateStars, // Needed for modal
  };
})();

// Modal handling module
MediaMosaic.ModalModule = (() => {
  const modal = document.getElementById("modal");
  const image = document.getElementById("modal-image");
  const title = document.getElementById("modal-title");
  const category = document.getElementById("modal-category");
  const review = document.getElementById("modal-review");
  const rating = document.getElementById("modal-rating");
  const closeBtn = document.getElementById("close-modal");

  function attachToCard(card, item, imgSrc) {
    card.addEventListener("click", () => {
      image.src = imgSrc;
      title.textContent = item.title;
      category.textContent = `Category: ${item.category}`;
      review.textContent = item.review;
      rating.innerHTML = `<strong>Rating:</strong> ${MediaMosaic.RenderModule.generateStars(item.rating)}`;
      modal.classList.remove("hidden");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  }

  window.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  return {
    attachToCard,
  };
})();

// Local storage for view preference
MediaMosaic.StorageModule = (() => {
  function getViewMode() {
    return localStorage.getItem('view') || 'grid';
  }

  function setViewMode(mode) {
    localStorage.setItem('view', mode);
  }

  return {
    getViewMode,
    setViewMode,
  };
})();

// Utility: shuffle array
MediaMosaic.shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// DOMContentLoaded logic
document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('review-form');
  const gridBtn = document.getElementById('grid');
  const listBtn = document.getElementById('list');

  const remoteData = await MediaMosaic.DataModule.fetchRemoteData();
  const localReviews = MediaMosaic.DataModule.loadLocalReviews();
  let combined = [...remoteData, ...localReviews];

  const render = () => {
    const view = MediaMosaic.StorageModule.getViewMode();
    const shuffled = MediaMosaic.shuffleArray([...combined]).slice(0, 15);
    MediaMosaic.RenderModule.renderCards(shuffled, view);
  };

  if (gridBtn) {
    gridBtn.addEventListener('click', () => {
      MediaMosaic.StorageModule.setViewMode('grid');
      render();
    });
  }

  if (listBtn) {
    listBtn.addEventListener('click', () => {
      MediaMosaic.StorageModule.setViewMode('list');
      render();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const review = {
        title: formData.get('title'),
        category: formData.get('category'),
        review: formData.get('review'),
        rating: formData.get('rating')
      };

      MediaMosaic.DataModule.saveLocalReview(review);
      combined.push(review);

      const query = new URLSearchParams(review).toString();
      window.location.href = `review-confirmation.html?${query}`;
    });
  }

  render();
});
