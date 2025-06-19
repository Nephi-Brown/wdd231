import { fetchRemoteData, loadLocalReviews, saveLocalReview } from './data-module.js';
import { renderCards } from './render-module.js';
import { getViewMode, setViewMode } from './storage-module.js';
import { shuffleArray } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('review-form');
  const gridBtn = document.getElementById('grid');
  const listBtn = document.getElementById('list');

  const remoteData = await fetchRemoteData();
  const localReviews = loadLocalReviews();
  let combined = [...remoteData, ...localReviews];

  const render = () => {
    const view = getViewMode();
    const shuffled = shuffleArray([...combined]).slice(0, 15);
    renderCards(shuffled, view);
  };

  if (gridBtn) {
    gridBtn.addEventListener('click', () => {
      setViewMode('grid');
      render();
    });
  }

  if (listBtn) {
    listBtn.addEventListener('click', () => {
      setViewMode('list');
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

      saveLocalReview(review);
      combined.push(review);

      const query = new URLSearchParams(review).toString();
      window.location.href = `review-confirmation.html?${query}`;
    });
  }

  render();
});
