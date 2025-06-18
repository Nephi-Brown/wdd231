document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("welcome-banner");
    const message = document.getElementById("welcome-message");
    const closeBtn = document.getElementById("close-banner");
  
    const member = JSON.parse(localStorage.getItem("member"));
    const lastVisit = localStorage.getItem("lastVisit");
  
    const now = new Date().toLocaleString();
  
    if (member && member.username && member.tier) {
        message.textContent = `Welcome back, ${member.tier} member ${member.username}! Last visited: ${lastVisit || "First time"}`;
      } else {
        message.textContent = `Welcome to MediaMosaic!`;
      }
  
    banner.classList.remove("hidden");
  
    // Save new visit time
    localStorage.setItem("lastVisit", now);
  
    closeBtn.addEventListener("click", () => {
      banner.classList.add("hidden");
    });
  });
  