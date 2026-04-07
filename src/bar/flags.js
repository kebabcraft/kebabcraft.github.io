(function () {
  const LANGS = {
    en: {
      label: "English",
      short: "EN",
      flag: "https://flagcdn.com/w40/gb.png"
    },
    de: {
      label: "Deutsch",
      short: "DE",
      flag: "https://flagcdn.com/w40/de.png"
    }
  };

  const container = document.getElementById("lang-chose");
  if (!container) return;

  container.setAttribute("role", "group");
  container.setAttribute("aria-label", "Language selector");

  // Sprache nur anhand der URL erkennen
  const path = window.location.pathname;
  let currentLang = path.startsWith("/de") ? "de" : "en";

  const current = document.createElement("button");
  current.type = "button";
  current.className = "lang-current";
  current.setAttribute("aria-haspopup", "listbox");
  current.setAttribute("aria-expanded", "false");

  const menu = document.createElement("div");
  menu.className = "lang-menu";
  menu.setAttribute("role", "listbox");

  const setOpen = (open) => {
    const isOpen = typeof open === "boolean" ? open : !container.classList.contains("lang-open");
    container.classList.toggle("lang-open", isOpen);
    current.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  function render() {
    const langInfo = LANGS[currentLang] || LANGS.en;
    current.innerHTML = `
      <span class="lang-label">${langInfo.short}</span>
      <img src="${langInfo.flag}" alt="${langInfo.label}">
      <span class="lang-caret" aria-hidden="true"></span>
    `;

    menu.innerHTML = "";

    Object.keys(LANGS).forEach((lang) => {
      if (lang === currentLang) return;

      const option = document.createElement("button");
      option.type = "button";
      option.className = "lang-option";
      option.setAttribute("role", "option");
      option.setAttribute("aria-label", LANGS[lang].label);
      option.innerHTML = `
        <img src="${LANGS[lang].flag}" alt="${LANGS[lang].label}">
        <span class="lang-option-label">${LANGS[lang].label}</span>
      `;

      option.addEventListener("click", (e) => {
        e.stopPropagation();

        let newPath = window.location.pathname;
        const search = window.location.search;
        const hash = window.location.hash;

        if (lang === "de") {
          if (!newPath.startsWith("/de")) {
            newPath = "/de" + (newPath === "/" ? "" : newPath);
          }
        } else {
          newPath = newPath.replace(/^\/de/, "");
          if (newPath === "") newPath = "/";
        }

        window.location.href = newPath + search + hash;
      });

      menu.appendChild(option);
    });
  }

  current.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen();
  });

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  });

  container.appendChild(current);
  container.appendChild(menu);

  render();
})();
