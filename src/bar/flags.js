(function () {
  const LANGS = {
    en: "https://flagcdn.com/w40/gb.png",
    de: "https://flagcdn.com/w40/de.png"
  };

  const container = document.getElementById("lang-chose");
  let currentLang = sessionStorage.getItem("lang") || Object.keys(LANGS)[0];

  const current = document.createElement("div");
  current.className = "lang-current";

  const menu = document.createElement("div");
  menu.className = "lang-menu";

  function render() {
    current.innerHTML = `<img src="${LANGS[currentLang]}" alt="${currentLang}">`;
    menu.innerHTML = "";

    Object.keys(LANGS).forEach(lang => {
      if (lang === currentLang) return;

      const img = document.createElement("img");
      img.src = LANGS[lang];
      img.alt = lang;

      img.onclick = (e) => {
        e.stopPropagation();

        currentLang = lang;
        sessionStorage.setItem("lang", lang);

        let path = window.location.pathname;
        const search = window.location.search;
        const hash = window.location.hash;

        if (lang === "de") {
          // /de hinzufügen, falls nicht vorhanden
          if (!path.startsWith("/de")) {
            path = "/de" + path;
          }
        } else {
          // /de entfernen
          path = path.replace(/^\/de/, "");
        }

        window.location.href = path + search + hash;
      };

      menu.appendChild(img);
    });
  }

  container.addEventListener("click", () => {
    container.classList.toggle("lang-open");
  });

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      container.classList.remove("lang-open");
    }
  });

  container.appendChild(current);
  container.appendChild(menu);

  render();
})();
