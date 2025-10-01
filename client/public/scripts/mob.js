async function loadMob() {
  const slug = window.location.pathname.split("/").pop();

  try {
    const res = await fetch("/mobs");
    const data = await res.json();
    const mob = data.find((m) => m.slug === slug);

    if (!mob) {
      document.getElementById("mob-name").textContent = "Mob not found 😞";
      return;
    }

    document.title = `${mob.name} | Minecraft Mobs`;
    document.getElementById("mob-image").src = mob.image;
    document.getElementById("mob-image").alt = mob.name;
    document.getElementById("mob-name").textContent = mob.name;
    document.getElementById("mob-desc").textContent = mob.description;
    document.getElementById("mob-type").textContent = mob.type;
    document.getElementById("mob-biome").textContent = mob.biome;
    document.getElementById("mob-drops").textContent = mob.drops.join(", ");

    const article = document.getElementById("mob-article");

    article.style.background = `url('${mob.background}') center/cover no-repeat`;
  } catch (err) {
    console.error("Error loading mob:", err);
    document.getElementById("mob-name").textContent =
      "Error loading mob data 😢";
  }
}

loadMob();
