async function loadRecipes() {
    const container = document.getElementById("recipes-container");

    try {
        const res = await fetch("./src/db/recipes.json");
        const data = await res.json();

        for (const category in data) {

            // Kategorie Titel
            const title = document.createElement("h2");
            title.textContent = category;
            container.appendChild(title);

            const grid = document.createElement("ul");
            grid.classList.add("update-grid");

            data[category].forEach(recipe => {
                const card = document.createElement("li");
                card.classList.add("update-card");

                card.innerHTML = `
                    <h3>${recipe.name}</h3>
                    <p>${recipe["top-txt"]}</p>
                    <img src="${recipe.pic}" alt="${recipe.name}">
                    <p>${recipe["sub-txt"]}</p>
                `;

                grid.appendChild(card);
            });

            container.appendChild(grid);
        }

    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Failed to load recipes.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadRecipes);
