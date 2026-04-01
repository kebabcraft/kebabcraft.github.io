async function loadData(url, isJson) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("(langController) fetching-error");
  }
  return isJson ? await response.json() : await response.text();
}

const langFile = "/src/lang/en/dir.json";

async function main() {
  console.log("Sprache: en");

  const data = await loadData(langFile, true);
  const site = "main"; // <-- IMMER main

  if (data.supported.includes(site)) {
    const elements = data[site];

    for (let i = 0; i < elements.length; i++) {
      const entry = elements[i];
      let translation;

      if (entry[1]) {
        translation = await loadData(entry[2][0], true);
        document.getElementById(entry[0]).innerHTML = translation[entry[2][1]];
      } else {
        translation = await loadData(entry[2], false);
        document.getElementById(entry[0]).innerHTML = translation;
      }
    }
  } else {
    console.log("(langController) Site wird nicht unterstützt.");
  }
}

main();
