const modeButton = document.querySelector("#mode");
const modeIcon = document.querySelector("#modeIcon");
const main = document.querySelector("main");
const h1 = document.querySelector("h1");

modeButton.addEventListener("click", () => {
main.classList.toggle("dark");


const isDarkMode = main.classList.contains("dark");

  main.style.background = isDarkMode ? "#4169E1" : "#FFFFFF";
  h1.style.color = isDarkMode ? "#FFFFFF" : "#222222";
  modeIcon.textContent = isDarkMode ? "🔆" : "◐";
});

const modebutton = document.querySelector("#mode");
const modeicon = document.querySelector("#modeIcon");
const main = document.querySelector("main");
const h1 = document.querySelector("h1");

modeButton.addEventListener("click", () => {
main.classList.toggle("dark");


const isDarkMode = main.classList.contains("dark");

  main.style.background = isDarkMode ? "#4169E1" : "#FFFFFF";
  h1.style.color = isDarkMode ? "#FFFFFF" : "#222222";
  modeIcon.textContent = isDarkMode ? "🔆" : "◐";
});
