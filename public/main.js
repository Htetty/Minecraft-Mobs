async function loadMobs() {
  try {
    const res = await fetch("/mobs");
    const data = await res.json();
    const grid = document.getElementById("mob-grid");

    if (!Array.isArray(data) || data.length === 0) {
      grid.innerHTML = "<p>No mobs available 😞</p>";
      return;
    }

    grid.innerHTML = data
      .map(
        (m) => `
        <article class="card mob-card ${m.type}" 
           onclick="location.href='/mobs/${m.slug}'" 
           style="background: url('${m.background}') center/cover no-repeat;" 
           tabindex="0" role="button">
          <img src="${m.image}" alt="${m.name}" />
          <h3>${m.name}</h3>
          <small>Type: ${m.type}</small><br/>
          <small>Biome: ${m.biome}</small><br/>
          <small>Drops: ${m.drops.join(", ")}</small>
        </article>
      `
      )
      .join("");
  } catch (e) {
    console.error(e);
    document.getElementById("mob-grid").innerHTML =
      "<p>Failed to load mobs.</p>";
  }
}

loadMobs();
