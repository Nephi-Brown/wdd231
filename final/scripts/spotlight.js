const requestURL = "data/members.json";

async function loadSpotlights() {
  try {
    const response = await fetch(requestURL);
    const data = await response.json();

    const container = document.querySelector("#dynamic-spotlights");
    if (container) {
      displaySpotlights(data, container);
    }
  } catch (error) {
    console.error("Error loading spotlight members:", error);
  }
}

function displaySpotlights(members, container) {
  container.innerHTML = "";

  const qualified = members.filter(member =>
    member.membership === "Gold" || member.membership === "Silver"
  );

  const shuffled = qualified.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  selected.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("spotlight-card");

    // Logo
    const logo = document.createElement("img");
    logo.setAttribute("src", member.image);
    logo.setAttribute("alt", `${member.name} logo`);
    logo.setAttribute("loading", "lazy");
    logo.classList.add("spotlight-img");
   
    switch (member.name) {
      case "RBS":
        logo.style.width = "250px";
        logo.style.height = "70px";
        break;
      case "Standard Life":
        logo.style.width = "150px";
        logo.style.height = "100px";
        break;
      case "University of Edinburgh":
        logo.style.width = "350px";
        logo.style.height = "100px";
        break;
      case "Apple":
        logo.style.width = "200px";
        logo.style.height = "100px";
        break;
      case "Microsoft":
        logo.style.width = "220px";
        logo.style.height = "80px";
        break;
      case "Foundever":
        logo.style.width = "280px";
        logo.style.height = "80px";
        break;
      case "Leonardo":
        logo.style.width = "250px";
        logo.style.height = "95px";
        break;
      case "Baillie Gifford":
        logo.style.width = "200px";
        logo.style.height = "80px";
        break;
      default:
        logo.style.width = "100%";
        logo.style.height = "auto";
        break;
    }

    const name = document.createElement("h3");
    name.textContent = member.name;

    const description = document.createElement("p");
    description.textContent = member.description;

    const industry = document.createElement("p");
    industry.textContent = `Industry: ${member.industry}`;

    const address = document.createElement("p");
    address.textContent = `Address: ${member.address}`;

    const phone = document.createElement("p");
    phone.textContent = `Phone: ${member.phone}`;

    const email = document.createElement("p");
    email.textContent = `Email: ${member.email}`;

    const hours = document.createElement("p");
    hours.textContent = `Business Hours: ${member.hours}`;

    const website = document.createElement("a");
    website.setAttribute("href", member.website);
    website.setAttribute("target", "_blank");
    website.textContent = "Visit Website";

    card.appendChild(logo);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(industry);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(email);
    card.appendChild(hours);
    card.appendChild(website);

    container.appendChild(card);
  });
}

loadSpotlights();
