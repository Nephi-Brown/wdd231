const baseURL = "https://mclellaninternational.github.io/wdd230/";
const linksURL = `${baseURL}data/links.json`;

async function getLinks() {
  try {
    const response = await fetch(linksURL);
    if (!response.ok) throw new Error("Failed to fetch links.json");
    const data = await response.json();
    displayLinks(data.weeks);
  } catch (error) {
    console.error("Error loading links:", error);
  }
}

function displayLinks(weeks) {
  const container = document.querySelector("#activities");

  weeks.forEach(week => {
    const weekSection = document.createElement("div");
    weekSection.classList.add("week-block");

    const weekLabel = document.createElement("span");
    weekLabel.classList.add("week-label");
    weekLabel.textContent = `${week.week}: `;

    weekSection.appendChild(weekLabel);

    week.links.forEach((link, index) => {
      const anchor = document.createElement("a");
      anchor.href = link.url.includes("http") ? link.url : baseURL + link.url;
      anchor.textContent = link.title;
      anchor.target = link.url.endsWith(".json") ? "_blank" : "_self";

      weekSection.appendChild(anchor);

      // Add separator unless it's the last link
      if (index < week.links.length - 1) {
        weekSection.appendChild(document.createTextNode(" | "));
      }
    });

    container.appendChild(weekSection);
  });
}

getLinks();