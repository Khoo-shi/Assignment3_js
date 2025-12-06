let currentImage = "";
git 
async function loadPokemon() {
    const name = document.getElementById("pokeName").value.toLowerCase();

    document.getElementById("loading").classList.remove("hidden");

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();

    const img = data.sprites.front_default;
    currentImage = img;

    document.getElementById("pokeImage").src = img;

    document.getElementById("pokeInfo").innerHTML = `
        <strong>${data.name.toUpperCase()}</strong>
    `;

    document.getElementById("loading").classList.add("hidden");
}

// CLICK FAVOURITE
document.getElementById("favBtn").addEventListener("click", () => {
    let favs = JSON.parse(localStorage.getItem("favs")) || [];
    favs.push(currentImage);
    localStorage.setItem("favs", JSON.stringify(favs));
    renderFavorites();
});

function renderFavorites() {
    let favs = JSON.parse(localStorage.getItem("favs")) || [];
    let html = "";

    favs.forEach(img => {
        html += `<img src="${img}">`;
    });

    document.getElementById("favorites").innerHTML = html;
}

renderFavorites();
