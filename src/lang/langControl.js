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

const params = new URLSearchParams(window.location.search);
let lang = params.get("lang");
if (!lang) {
  lang = sessionStorage.getItem("lang");
}
if (!lang || !languages[lang]) {
  lang = "en";
}
sessionStorage.setItem("lang", lang);
async function main() {
  console.log("Sprache:", lang);
  const data = await loadData(languages[lang], true);
  const site = window.location.pathname.split("/").pop();
  if (data.supported.includes(site)) {
    let laeng = data[site].length;
    for (let i = 0; i < laeng; i++) {
      const a = data[site][i];
      let translation;
      if (a[1]) {
        translation = await loadData(a[2][0], true);
        document.getElementById(a[0]).innerHTML = translation[a[2][1]];
      } else {
        translation = await loadData(a[2], false);
        document.getElementById(a[0]).innerHTML = translation;
      }
    }
    });
  } else {
    console.log("(lang controler) diese Site wird in der gewünschten Sprache nicht unterstützt.");
  }
}

main();
