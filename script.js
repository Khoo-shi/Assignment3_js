async function loadPokemon() {
    const name = document.getElementById("pokeName").value.toLowerCase();

    document.getElementById("loading").classList.remove("hidden");

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();

    const img = data.sprites.front_default;
    document.getElementById("pokeImage").src = img;

    let types = data.types.map(t => t.type.name).join(", ");

    document.getElementById("pokeInfo").innerHTML = `
        <strong>${data.name.toUpperCase()}</strong><br>
        Type: ${types}<br>
        Height: ${data.height}<br>
        Weight: ${data.weight}
    `;

    document.getElementById("loading").classList.add("hidden");
}

document.getElementById("searchBtn")
    .addEventListener("click", loadPokemon);
