export async function fetchRemoteData() {
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
  
  export function loadLocalReviews() {
    const raw = localStorage.getItem('userReviews');
    return raw ? JSON.parse(raw) : [];
  }
  
  export function saveLocalReview(review) {
    const reviews = loadLocalReviews();
    reviews.push(review);
    localStorage.setItem('userReviews', JSON.stringify(reviews));
  }
  