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
