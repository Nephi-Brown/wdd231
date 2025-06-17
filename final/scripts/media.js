const displayArea = document.getElementById('display-area');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const form = document.getElementById('review-form');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

function renderCards(items) {
  displayArea.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>Category:</strong> ${item.category}</p>
      <p>${item.review}</p>
    `;
    card.style.border = '1px solid var(--primary)';
    card.style.marginBottom = '1rem';
    card.style.padding = '1rem';
    displayArea.appendChild(card);
  });
}

async function getData() {
  try {
    const response = await fetch('data/media.json');
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    renderCards(data.items);

    // Handle form submission after initial data is ready
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const newReview = {
        title: formData.get('title'),
        category: formData.get('category'),
        review: formData.get('review')
      };
      data.items.push(newReview);
      renderCards(data.items);
      form.reset();
    });

  } catch (error) {
    console.error('Error loading JSON:', error);
    displayArea.innerHTML = '<p>Could not load content. Please try again later.</p>';
  }
}

getData();

export function navigate(section) {
  alert(`Navigate to ${section}`);
}