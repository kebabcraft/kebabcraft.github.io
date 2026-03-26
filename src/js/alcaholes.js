async function loadRecipes() {
    const container = document.getElementById("recipes-container");
    container.innerHTML = ""; 
    try {
        const res = await fetch("./src/db/alcaholes.json");
        const data = await res.json();

        if (!data.drinks || data.drinks.length === 0) {
            container.innerHTML = "<p>No drinks found.</p>";
            return;
        }

        const table = document.createElement("table");

        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Time</th>
                <th>Distill</th>
                <th>Ageing</th>
                <th>Wood</th>
                <th>Image</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        data.drinks.forEach(drink => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td data-label="Name">${drink.name}</td>
                <td data-label="Time">${drink.time}</td>
                <td data-label="Distill">${drink.distill || '-'}</td>
                <td data-label="Ageing">${drink.ageing || '-'}</td>
                <td data-label="Wood">${drink.wood || '-'}</td>
                <td data-label="Image">
                    <img src="${drink.pic}" alt="${drink.name}">
                </td>
            `;

            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        container.appendChild(table);

    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Failed to load recipes.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadRecipes);
