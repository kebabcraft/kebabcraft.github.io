async function loadRecipes() {
    const container = document.getElementById("recipes-container");

    try {
        const pathParts = window.location.pathname.split("/").filter(Boolean);
        const langPrefix = (pathParts[0] === "de" || pathParts[0] === "hu") ? `/${pathParts[0]}` : "";
        const res = await fetch(`${langPrefix}/src/db/recipes.json`);
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
                const pic = (recipe.pic || "").startsWith("./src/")
                    ? recipe.pic.replace("./", "/")
                    : recipe.pic;

                card.innerHTML = `
                    <h3>${recipe.name}</h3>
                    <p>${recipe["top-txt"]}</p>
                    <img src="${pic}" alt="${recipe.name}">
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
