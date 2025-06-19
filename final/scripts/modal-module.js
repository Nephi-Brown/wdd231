import { generateStars } from './render-module.js';

const modal = document.getElementById("modal");
const image = document.getElementById("modal-image");
const title = document.getElementById("modal-title");
const category = document.getElementById("modal-category");
const review = document.getElementById("modal-review");
const rating = document.getElementById("modal-rating");
const closeBtn = document.getElementById("close-modal");

export function attachToCard(card, item, imgSrc) {
  card.addEventListener("click", () => {
    image.src = imgSrc;
    title.textContent = item.title;
    category.textContent = `Category: ${item.category}`;
    review.textContent = item.review;
    rating.innerHTML = `<strong>Rating:</strong> ${generateStars(item.rating)}`;
    modal.classList.remove("hidden");
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
}

window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});
