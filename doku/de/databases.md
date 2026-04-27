//standard von "https://github.com/aiincer/AIincer.github.io/blob/main/doku/standards/json.md"
# rezepte
- /src/db/recipes.json
-                 - jso  - das json enthält mehrere der folgenden objekte
  - <kategorie>  - lst  - der name der kategorie:
    - ?          - jso  - ein rezept
      - "name"    - str  - der name des rezeptes
      - "top-txt" - str  - der text über dem rezept
      - "sub-txt" - str  - der text unter dem rezept
      - "pic"     - str+ - (+:url->png) das bild für das rezept

# alkoholische getränke
- /src/db/drinks.json
-                 - jso  - das json enthält mehrere der folgenden objekte
  - "drinks"      - lst  - eine liste der getränke
    - ?           - jso  - ein rezept
      - "name"    - str  - der name des rezeptes
      - "time"    - str  - die zeit, die zum brauen benötigt wird
      - "distill" - str+ - (+:bol(design)) muss es destilliert werden
      - "ageing"  - str+ - (+:int+zeit-wort) die dauer der reifung
      - "wood"    - str  - welches holz
      - "pic"     - str+ - (+:url->png) bild des getränks

# team
- about.html\script
- <k>          - lst   - <k> name der kategorie
  - ?          - jso   - eine karte
    - "name"   - str   - der name des spielers
    - "rank"   - str   - der rang des spielers
    - "skin"   - str+) - (+:url->png+)(->?skin) der link zum spielermodell des spielers
    - "card"   - jso   - die große karte des spielers
      - "ldis" - str   - deren beschreibung
      - "sm"   - lst   - deren social-media verbindungen
        - ?    - lst:2 - eine social-media verbindung
          - 0  - str   - der anzuzeigende text
          - 1  - str+  - (+:url) der link zum account
