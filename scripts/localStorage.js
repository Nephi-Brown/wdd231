// Page Visit Counter using localStorage
document.addEventListener("DOMContentLoaded", () => {
    // Select the visits span element
    const visitsDisplay = document.querySelector(".visits");

    // Get the current count from localStorage or initialize to 0 if it doesn't exist
    let numVisits = Number(localStorage.getItem("numVisits")) || 0;

    // 3️⃣ Determine if this is the first visit or display the number of visits
    if (numVisits !== 0) {
        visitsDisplay.textContent = `Visit count: ${numVisits}`;
    } else {
        visitsDisplay.textContent = `This is your first visit. 🥳 Welcome!`;
    }

    // Increment the count for this visit
    numVisits++;

    // Store the new count back in localStorage
    localStorage.setItem("numVisits", numVisits);
});