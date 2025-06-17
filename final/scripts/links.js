const baseURL = "https://yourgithubusername.github.io/wdd230/";
const linksURL = `${baseURL}data/links.json`;

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks(data.weeks);
}

function displayLinks(weeks) {
    const linksSection = document.querySelector('.learning-activities');
    linksSection.innerHTML = "";
    
    weeks.forEach(week => {
        const weekHeading = document.createElement('h4');
        weekHeading.textContent = week.week;
        linksSection.appendChild(weekHeading);

        const list = document.createElement('ul');

        week.links.forEach(link => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.textContent = link.title;
            listItem.appendChild(anchor);
            list.appendChild(listItem);
        });

        linksSection.appendChild(list);
    });
}

getLinks();
