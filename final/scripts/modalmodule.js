const ModalModule = (function () {
  const modal = document.getElementById('modal');
  const image = document.getElementById('modal-image');
  const title = document.getElementById('modal-title');
  const category = document.getElementById('modal-category');
  const review = document.getElementById('modal-review');
  const closeBtn = document.getElementById('close-modal');

  function attachToCard(card, item, imgSrc) {
    card.addEventListener('click', () => {
      image.src = imgSrc;
      title.textContent = item.title;
      category.textContent = `Category: ${item.category}`;
      review.textContent = item.review;
      modal.classList.remove('hidden');
    });
  }

  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  window.addEventListener('click', e => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  return {
    attachToCard,
  };
})();