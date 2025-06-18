// media.js

function generateStars(rating) {
  const fullStar = '★';
  const emptyStar = '☆';
  const filled = fullStar.repeat(rating || 0);
  const empty = emptyStar.repeat(5 - (rating || 0));
  return `<span class="stars">${filled}${empty}</span>`;
}

const DataModule = (() => {
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

const RenderModule = (() => {
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

      ModalModule.attachToCard(card, item, imgSrc);
      wrapper.appendChild(card);
    });

    container.appendChild(wrapper);
  }

  return {
    renderCards,
  };
})();

const ModalModule = (() => {
  const modal = document.getElementById("modal");
  const image = document.getElementById("modal-image");
  const title = document.getElementById("modal-title");
  const category = document.getElementById("modal-category");
  const review = document.getElementById("modal-review");
  const rating = document.getElementById("modal-rating"); // NEW
  const closeBtn = document.getElementById("close-modal");

  function attachToCard(card, item, imgSrc) {
    card.addEventListener("click", () => {
      image.src = imgSrc;
      title.textContent = item.title;
      category.textContent = `Category: ${item.category}`;
      review.textContent = item.review;
      rating.innerHTML = generateStars(item.rating); // NEW
      modal.classList.remove("hidden");
    });
  }

  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  window.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  return {
    attachToCard,
  };
})();

const StorageModule = (() => {
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('review-form');
  const gridBtn = document.getElementById('grid');
  const listBtn = document.getElementById('list');

  const remoteData = await DataModule.fetchRemoteData();
  const localReviews = DataModule.loadLocalReviews();
  let combined = [...remoteData, ...localReviews];

  const render = () => {
    const view = StorageModule.getViewMode();
    const shuffled = shuffleArray([...combined]).slice(0, 15);
    RenderModule.renderCards(shuffled, view);
  };

  if (gridBtn) {
    gridBtn.addEventListener('click', () => {
      StorageModule.setViewMode('grid');
      render();
    });
  }

  if (listBtn) {
    listBtn.addEventListener('click', () => {
      StorageModule.setViewMode('list');
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

      const saved = JSON.parse(localStorage.getItem('userReviews')) || [];
      saved.push(review);
      localStorage.setItem('userReviews', JSON.stringify(saved));

      const query = new URLSearchParams(review).toString();
      window.location.href = `review-confirmation.html?${query}`;
    });
  }

  render();
});
