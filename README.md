# Personalpronomen Quiz

A small web app for practising German personal pronouns in every case, plus the future tense (Futur I).

- **Nominativ, Akkusativ, Dativ, Genitiv**: fill-in-the-blank sentences, form drills, and genitive prepositions
- **Futur I**: translate sentences in both directions (`Ich werde morgen gehen.`)
- **Passive voice (Passiv)** in all six tenses (Präsens, Präteritum, Perfekt, Plusquamperfekt, Futur I, Futur II): over 1,000 questions per tense, generated in `passive.js`. Each starts from an active sentence with *man* (`Man hat den Computer repariert.`) and asks you to rewrite it in the passive, fill in the verb forms, or pick the matching passive sentence (`Der Computer ist repariert worden.`). Quiz one tense or all of them mixed
- **13,000+ questions**, generated from grammar rules in `data.js`
- **10 random questions per test**, mixing multiple choice and typed answers
- **Every test ends with a review of your mistakes**: your answer, the correct answer, and the correct sentence with the answer highlighted
- **Lessons**: 21 hand-written practice rounds (personal pronouns, formal *Sie*, possessives in all three cases, reflexive pronouns, mixed review), each with a rules card, the correct sentence with the answer highlighted after every question, and a review of your mistakes at the end. Lesson data lives in `lessons.js`
- **Cheat sheet** on every screen: opens in its own window at the section that fits what you're practising (personal pronouns, formal *Sie*, possessives, reflexives, Futur I, passive voice), with tabs for the rest
- **No case labels during tests**: you decide whether it's accusative, dative, … yourself. Multiple-choice options include the same person in another case (`dich` / `dir`), so they don't give it away either
- Typed answers ignore punctuation. In the random quiz they also ignore capitalisation; in lessons, capitals matter where they change the meaning (`sie` vs. `Sie`). Umlauts are optional (`uben` counts for `üben`) and `ss` counts for `ß`

## Run it

Open `index.html` in a browser. There is no build step and nothing to install.

To host it for free, enable **GitHub Pages** in the repo settings (Settings → Pages → Deploy from branch → `main` / root).
