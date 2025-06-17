document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf("/") + 1);

  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href").includes(page)) {
      link.classList.add("active");
    }
  });
});