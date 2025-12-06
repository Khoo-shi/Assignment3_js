let currentImage = "";

async function loadPokemon(name = null) {
    const pokeNameInput = document.getElementById("pokeName");
    const nameToFetch = name || pokeNameInput.value.toLowerCase();

    document.getElementById("loading").classList.remove("hidden");

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameToFetch}`);
        if (!res.ok) {
            throw new Error("Pokémon not found");
        }
        const data = await res.json();

        const img = data.sprites.front_default;
        currentImage = img;

        document.getElementById("pokeImage").src = img;

        document.getElementById("pokeInfo").innerHTML = `
            <strong>${data.name.toUpperCase()}</strong><br>
            Type: ${data.types.map(t => t.type.name).join(", ")}<br>
            Height: ${data.height / 10} m<br>
            Weight: ${data.weight / 10} kg
        `;
    } catch (error) {
        alert(error.message);
        currentImage = ""; // Reset currentImage if the fetch fails
    } finally {
        document.getElementById("loading").classList.add("hidden");
    }
}

// Random Pokémon Button
async function loadRandomPokemon() {
    const randomId = Math.floor(Math.random() * 1010) + 1;
    await loadPokemon(randomId);
}

document.getElementById("searchBtn").addEventListener("click", () => loadPokemon());
document.getElementById("randomBtn").addEventListener("click", loadRandomPokemon);

document.getElementById("favBtn").addEventListener("click", () => {
    if (!currentImage) {
        alert("Please search for a Pokémon first!");
        return;
    }
    let favs = JSON.parse(localStorage.getItem("favs")) || [];
    if (!favs.includes(currentImage)) {
        favs.push(currentImage);
        localStorage.setItem("favs", JSON.stringify(favs));
        renderFavorites();
    } else {
        alert("This Pokémon is already in your favorites!");
    }
});

function renderFavorites() {
    let favs = JSON.parse(localStorage.getItem("favs")) || [];
    let html = "";

    favs.forEach(img => {
        html += `<img src="${img}" onclick="loadPokemonFromFavorite('${img}')">`;
    });

    document.getElementById("favorites").innerHTML = html;
}

function loadPokemonFromFavorite(img) {
    const favs = JSON.parse(localStorage.getItem("favs")) || [];
    const index = favs.indexOf(img);
    if (index !== -1) {
        loadPokemon(index + 1); // Assuming the index matches Pokémon ID
    }
}

renderFavorites();
