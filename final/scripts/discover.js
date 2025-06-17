document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".json-cards");

    fetch("data/discover.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load JSON data.");
            return response.json();
        })
        .then(data => {
            data.members.forEach(member => {
                const card = document.createElement("div");
                card.classList.add("member-card");

                card.innerHTML = `
                    <img src="${member.image}" alt="${member.name}" loading="lazy" width="300" height="200">
                    <h3>${member.name}</h3>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p>${member.description}</p>
                    <a href="${member.url}" target="_blank" rel="noopener noreferrer" class="learn-more">Learn More</a>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => {
            container.innerHTML = `<p>Error loading member data: ${error.message}</p>`;
        });
});