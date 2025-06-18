document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
  
    const title = params.get('title') || 'N/A';
    const category = params.get('category') || 'N/A';
    const review = params.get('review') || 'N/A';
  
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-category').textContent = category;
    document.getElementById('confirm-review').textContent = review;
    document.getElementById('currentyear').textContent = new Date().getFullYear();
  });
  