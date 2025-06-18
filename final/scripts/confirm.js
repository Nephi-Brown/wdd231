document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  document.getElementById('confirm-title').textContent = params.get('title') || 'N/A';
  document.getElementById('confirm-category').textContent = params.get('category') || 'N/A';
  document.getElementById('confirm-review').textContent = params.get('review') || 'N/A';

  const rating = params.get('rating') || 'N/A';
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  document.getElementById('confirm-rating').textContent = stars;

  document.getElementById('currentyear').textContent = new Date().getFullYear();
});