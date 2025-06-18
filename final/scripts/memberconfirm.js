document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  const fields = [
    "firstName", "lastName", "email", "username", "tier", "reason"
  ];

  fields.forEach(field => {
    const value = params.get(field);
    const element = document.getElementById(`confirm-${field}`);
    if (element) {
      element.textContent = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : 'N/A';
    }
  });

  const rating = parseInt(params.get("rating") || "0", 10);
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  const ratingElement = document.getElementById('confirm-rating');
  if (ratingElement) {
    ratingElement.textContent = stars;
  }

  document.getElementById('currentyear').textContent = new Date().getFullYear();

  // ✅ Save username and membership tier to localStorage
  const username = params.get("username");
  const tier = params.get("tier");

  if (username && tier) {
    localStorage.setItem("member", JSON.stringify({ username, tier }));
  }
});
