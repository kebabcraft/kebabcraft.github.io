async function loadData (url, transform) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("(langControler) fetching-error");
  }
  if (transform) {
    var data = await response.json();
    return data
  } else {
    var data = await response.text();
    return data
  }
  //console.log(data);
}

const langs = ["de"]
const params = new URLSearchParams(window.location.search);
const lang = params.get("lang") ?? "en";
async function main () {
    if ((lang != "en") && (langs.includes(lang))) {
        console.log(lang);
        var data = await loadData("/src/lang/de/dir.json", true);
        const site = window.location.pathname.split("/").pop();
        if (data.supported.includes(site)) {
            let laeng = data[site].length;
            for (let i = 0; i < laeng; i++) {
                var a = data[site][i];
                //console.log(data[site])
                //console.log(i)
                //console.log(a)
                if (a[1]) {
                    var translation = await loadData(a[2][0], true);
                    var ort = document.getElementById(a[0]);
                     ort.innerHTML = translation[a[2][1]];
                } else {
                    var translation = await loadData(a[2], false);
                    var ort = document.getElementById(a[0]);
                    ort.innerHTML = translation;
                }
            }
            const links = document.querySelectorAll("a");
            links.forEach(link => {
                if (link.href) {
                    link.href += "?lang="
                    link.href += lang
                }
            })
        } else {
            console.log("(lang controler) diese Site wird in der gewünschten Sprache nicht unterstützt.")
        }
    }
}


main()
