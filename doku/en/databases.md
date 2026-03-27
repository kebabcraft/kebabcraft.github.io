//standard from "https://github.com/aiincer/AIincer.github.io/blob/main/doku/standards/json.md"

# recipes
- /src/db/recipes.json
```
-                 - jso  - the json has multiple of the following object
  - <kategory>    - lst  - the name of the category:
    - ?           - jso  - one recepie
      - "name"    - str  - the name of the recepie
      - "top-txt" - str  - the text over the recepie
      - "sub-txt" - str  - the text under the recepie
      - "pic"     - str+ - (+:url->png) the image for the recepi
```

# alcaholic drinks
- /src/db/drinks.json
```
-                 - jso  - the json has multiple of the following object
  - "drinks"      - lst  - a list of the drincs
    - ?           - jso  - one recepie
      - "name"    - str  - the name of the recepie
      - "time"    - str  - the time it takes to brew
      - "distill" - str+ - (+:bol(desing)) does it have to be distilled
      - "ageing"  - str+ - (+:int+time-word) the age of the ageing
      - "wood"    - str  - wich wood
      - "pic"     - str+ - (+:url->png) image of the drink
```

# staff
- about.html\script
ˋˋˋ
- <k>        - lst   - <k> name of the category
  - ?        - jso   - a card
    - "name" - str   - the name of the player
    - "rank" - str   - the rank of the player
    - "skin" - str+) - (+:url)(->?skin) the link to the player model of the player
ˋˋˋ
