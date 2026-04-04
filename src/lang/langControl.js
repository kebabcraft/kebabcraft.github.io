async function loadData(url, transform) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("(langControler) fetching-error");
  }
  return transform ? await response.json() : await response.text();
}
const languages = {
  en: "/src/lang/en/dir.json",
  de: "/src/lang/de/dir.json"
};
let lang;
const pathParts = window.location.pathname.split("/").filter(Boolean);

if (pathParts.length > 0 && languages[pathParts[0]]) {
  lang = pathParts[0];
} else {
  lang = "en";
}
async function main() {
  console.log("Sprache:", lang);
  const data = await loadData(languages[lang], true);
  const site = "main";
  if (data.supported.includes(site)) {
    const entries = data[site];
    for (let i = 0; i < entries.length; i++) {
      const a = entries[i];
      let translation;
      const el = document.getElementById(a[0]);
      if (!el) continue;
      if (a[1]) {
        translation = await loadData(a[2][0], true);
        el.innerHTML = translation[a[2][1]];
      } else {
        translation = await loadData(a[2], false);
        el.innerHTML = translation;
      }
    }
  } else {
    console.log("(lang controller) 'main' wird in der gewählten Sprache nicht unterstützt.");
  }
}
main();
