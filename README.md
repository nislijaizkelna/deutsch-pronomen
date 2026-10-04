# Personalpronomen Quiz

A small web app for practising German personal pronouns in every case, plus the future tense (Futur I).

- **Nominativ, Akkusativ, Dativ, Genitiv**: fill-in-the-blank sentences, form drills, and genitive prepositions
- **Futur I**: translate sentences in both directions (`Ich werde morgen gehen.`)
- **13,000+ questions**, generated from grammar rules in `data.js`
- **10 random questions per test**, mixing multiple choice and typed answers
- **Lessons**: 19 hand-written practice rounds (personal pronouns, formal *Sie*, possessives in all three cases, mixed review), each with a rules card, the correct sentence with the answer highlighted after every question, and a review of your mistakes at the end. Lesson data lives in `lessons.js`
- **Cheat sheet** with the pronoun tables, dative verbs and the key rules
- Typed answers ignore punctuation. In the random quiz they also ignore capitalisation; in lessons, capitals matter where they change the meaning (`sie` vs. `Sie`). Umlauts are optional (`uben` counts for `üben`) and `ss` counts for `ß`

## Run it

Open `index.html` in a browser. There is no build step and nothing to install.

To host it for free, enable **GitHub Pages** in the repo settings (Settings → Pages → Deploy from branch → `main` / root).
