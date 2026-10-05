// Cheat sheet window: shows the section named in the URL hash (#possessive), or all of them (#all).
const appEl = document.getElementById("app");

function render() {
  const id = location.hash.slice(1);
  const one = CHEAT_SECTIONS.find((s) => s.id === id);
  const sections = one ? [one] : CHEAT_SECTIONS;
  const active = one ? one.id : "all";
  const tab = (tabId, title) =>
    `<a href="#${tabId}" class="cheat-tab${tabId === active ? " active" : ""}">${title}</a>`;

  appEl.innerHTML = `
    <header>
      <h1>Cheat sheet 📋</h1>
      <p>Personalpronomen 🇩🇪</p>
    </header>
    <nav class="cheat-tabs">
      ${tab("all", "All")}
      ${CHEAT_SECTIONS.map((s) => tab(s.id, s.title)).join("")}
    </nav>
    ${sections
      .map(
        (s) => `
      <div class="card menu-card">
        <h2>${s.title}</h2>
        <div class="tip">${s.html}</div>
      </div>`
      )
      .join("")}
  `;
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
