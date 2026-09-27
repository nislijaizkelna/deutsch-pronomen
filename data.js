// German personal pronouns (Personalpronomen) practice — all cases + Futur I.
// Questions are generated from grammar rules/tables rather than hand-written,
// so the pool can be large (10,000+) while staying grammatically correct.

// index-aligned: ich, du, er, sie, es, wir, ihr, sie/Sie
const PERSONS = [
  { nom: "ich", akk: "mich", dat: "mir", gen: "meiner", en: "I", objEn: "me" },
  { nom: "du", akk: "dich", dat: "dir", gen: "deiner", en: "you (sg.)", objEn: "you (sg.)" },
  { nom: "er", akk: "ihn", dat: "ihm", gen: "seiner", en: "he", objEn: "him" },
  { nom: "sie", akk: "sie", dat: "ihr", gen: "ihrer", en: "she", objEn: "her" },
  { nom: "es", akk: "es", dat: "ihm", gen: "seiner", en: "it", objEn: "it" },
  { nom: "wir", akk: "uns", dat: "uns", gen: "unser", en: "we", objEn: "us" },
  { nom: "ihr", akk: "euch", dat: "euch", gen: "euer", en: "you all", objEn: "you all" },
  { nom: "sie", akk: "sie", dat: "ihnen", gen: "ihrer", en: "they", objEn: "them" },
];

const WERDEN = ["werde", "wirst", "wird", "wird", "wird", "werden", "werdet", "werden"];
const CASE_NAMES = { akk: "Akkusativ", dat: "Dativ", gen: "Genitiv" };

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Regular ("weak") present-tense conjugation for a verb stem, by person index 0-7.
function conjugate(stem, idx) {
  const endsDT = /[dt]$/.test(stem) || /(chn|ffn|gn|dm|tm)$/.test(stem);
  const endsSib = /[sßzx]$/.test(stem);
  if (idx === 0) return stem + "e";
  if (idx === 1) return endsDT ? stem + "est" : endsSib ? stem + "t" : stem + "st";
  if (idx === 2 || idx === 3 || idx === 4) return endsDT ? stem + "et" : stem + "t";
  if (idx === 5) return stem + "en";
  if (idx === 6) return endsDT ? stem + "et" : stem + "t";
  return stem + "en"; // idx 7
}

// English 3rd-person-singular present conjugation (only used for he/she/it).
function conjEn(verbEn, idx) {
  if (idx !== 2 && idx !== 3 && idx !== 4) return verbEn;
  const parts = verbEn.split(" ");
  let base = parts[0];
  if (/[^aeiou]y$/.test(base)) base = base.slice(0, -1) + "ies";
  else if (/(s|sh|ch|x|z|o)$/.test(base)) base += "es";
  else base += "s";
  parts[0] = base;
  return parts.join(" ");
}

// Persons whose form in case `c` is identical to person `idx` (e.g. sie/sie, ihm/ihm).
function sameFormIdxs(c, idx) {
  return PERSONS.map((p, i) => (p[c] === PERSONS[idx][c] ? i : -1)).filter((i) => i >= 0);
}

function stemOf(inf) {
  return inf.replace(/en$/, "");
}

function pickDistractors(forms, targetIdx, excludeIdxs, count) {
  const correct = forms[targetIdx];
  const seen = new Set([correct]);
  const result = [];
  for (let i = 1; result.length < count && i < forms.length * 2; i++) {
    const idx = (targetIdx + i) % forms.length;
    if (excludeIdxs.includes(idx)) continue;
    const f = forms[idx];
    if (seen.has(f)) continue;
    seen.add(f);
    result.push(f);
  }
  return result;
}

// --- Verb banks -----------------------------------------------------------
// Regular (weak, no vowel-change) verbs only, so `conjugate()` stays correct.

const ACC_VERBS = [
  ["lieben", "love"], ["hören", "hear"], ["kennen", "know"], ["besuchen", "visit"],
  ["fragen", "ask"], ["rufen", "call"], ["grüßen", "greet"], ["loben", "praise"],
  ["kritisieren", "criticize"], ["beobachten", "observe"], ["fotografieren", "photograph"],
  ["filmen", "film"], ["unterstützen", "support"], ["informieren", "inform"],
  ["warnen", "warn"], ["begleiten", "accompany"], ["trösten", "console"],
  ["überraschen", "surprise"], ["brauchen", "need"], ["suchen", "look for"],
  ["verstehen", "understand"], ["akzeptieren", "accept"], ["respektieren", "respect"],
  ["provozieren", "provoke"], ["nerven", "annoy"], ["ignorieren", "ignore"],
  ["überzeugen", "convince"],
];

const DAT_VERBS = [
  ["danken", "thank"], ["vertrauen", "trust"], ["gratulieren", "congratulate"],
  ["imponieren", "impress"], ["gehorchen", "obey"], ["dienen", "serve"],
  ["schaden", "harm"], ["nützen", "benefit"], ["begegnen", "encounter"],
  ["antworten", "answer"], ["folgen", "follow"], ["glauben", "believe"],
  ["drohen", "threaten"], ["applaudieren", "applaud"], ["widerstehen", "resist"],
];

const INTRANS_VERBS = [
  ["gehen", "go"], ["kommen", "come"], ["arbeiten", "work"], ["lachen", "laugh"],
  ["weinen", "cry"], ["tanzen", "dance"], ["singen", "sing"], ["spielen", "play"],
  ["lernen", "learn"], ["leben", "live"], ["wohnen", "reside"], ["reisen", "travel"],
  ["husten", "cough"], ["warten", "wait"], ["kochen", "cook"], ["träumen", "dream"],
  ["planen", "plan"], ["starten", "start"], ["landen", "land"], ["diskutieren", "discuss"],
];

const FUTURE_VERBS = [
  ["gehen", "go"], ["kommen", "come"], ["sehen", "see"], ["essen", "eat"], ["trinken", "drink"],
  ["schlafen", "sleep"], ["arbeiten", "work"], ["spielen", "play"], ["lernen", "learn"],
  ["lesen", "read"], ["schreiben", "write"], ["sprechen", "speak"], ["hören", "listen"],
  ["kaufen", "buy"], ["verkaufen", "sell"], ["kochen", "cook"], ["backen", "bake"],
  ["reisen", "travel"], ["fahren", "drive"], ["fliegen", "fly"], ["laufen", "run"],
  ["schwimmen", "swim"], ["tanzen", "dance"], ["singen", "sing"], ["malen", "paint"],
  ["zeichnen", "draw"], ["bauen", "build"], ["reparieren", "repair"], ["putzen", "clean"],
  ["waschen", "wash"], ["helfen", "help"], ["suchen", "search for"], ["finden", "find"],
  ["verlieren", "lose"], ["gewinnen", "win"], ["öffnen", "open"], ["schließen", "close"],
  ["beginnen", "begin"], ["warten", "wait"], ["bleiben", "stay"], ["denken", "think"],
  ["glauben", "believe"], ["wissen", "know"], ["verstehen", "understand"],
  ["vergessen", "forget"], ["schweigen", "stay silent"], ["entscheiden", "decide"],
  ["versuchen", "try"], ["planen", "plan"], ["hoffen", "hope"], ["wünschen", "wish"],
  ["träumen", "dream"], ["lachen", "laugh"], ["weinen", "cry"], ["lächeln", "smile"],
  ["schreien", "shout"], ["flüstern", "whisper"], ["fragen", "ask"], ["antworten", "answer"],
  ["erklären", "explain"], ["diskutieren", "discuss"], ["streiten", "argue"],
  ["feiern", "celebrate"], ["heiraten", "marry"], ["kämpfen", "fight"], ["studieren", "study"],
  ["unterrichten", "teach"], ["besuchen", "visit"], ["treffen", "meet"], ["einladen", "invite"],
  ["begrüßen", "greet"], ["mieten", "rent"], ["segeln", "sail"], ["wandern", "hike"],
  ["klettern", "climb"], ["joggen", "jog"], ["trainieren", "train"], ["üben", "practice"],
  ["braten", "fry"], ["grillen", "grill"], ["komponieren", "compose"], ["verdienen", "earn"],
  ["bezahlen", "pay"], ["sparen", "save money"], ["ausgeben", "spend"], ["aufstehen", "get up"],
  ["einkaufen", "shop"], ["anrufen", "call"], ["aufräumen", "tidy up"],
  ["mitkommen", "come along"], ["ankommen", "arrive"], ["abfahren", "depart"],
  ["aufmachen", "open up"], ["vorbereiten", "prepare"], ["mitbringen", "bring along"],
  ["fernsehen", "watch TV"], ["aufwachen", "wake up"], ["einschlafen", "fall asleep"],
  ["umziehen", "move house"], ["anfangen", "start"], ["aufhören", "stop"],
  ["zurückkommen", "come back"], ["weggehen", "leave"], ["ausgehen", "go out"],
  ["lieben", "love"], ["hassen", "hate"], ["brauchen", "need"], ["zeigen", "show"],
  ["bringen", "bring"], ["nehmen", "take"], ["geben", "give"], ["holen", "fetch"],
  ["tragen", "carry"], ["ziehen", "pull"], ["schieben", "push"], ["springen", "jump"],
  ["fallen", "fall"], ["stehen", "stand"], ["sitzen", "sit"], ["liegen", "lie"],
  ["reden", "talk"], ["telefonieren", "phone"], ["chatten", "chat"], ["posten", "post"],
  ["drucken", "print"], ["kopieren", "copy"], ["speichern", "save a file"], ["löschen", "delete"],
  ["installieren", "install"], ["messen", "measure"], ["wiegen", "weigh"],
  ["zählen", "count"], ["rechnen", "calculate"],
];

const GEN_PREPS = [
  ["wegen", "because of"], ["trotz", "despite"], ["während", "during"], ["statt", "instead of"],
  ["innerhalb", "within"], ["außerhalb", "outside of"], ["aufgrund", "due to"],
  ["angesichts", "in view of"],
];

const ADVERBS = [
  { de: "", en: "" },
  { de: "morgen", en: "tomorrow" },
  { de: "bald", en: "soon" },
  { de: "nächste Woche", en: "next week" },
];

// --- Question builders ------------------------------------------------

function buildDirectFormQuestions() {
  const out = [];
  const labels = PERSONS.map((p) => `${p.nom} – ${p.en}`);
  ["akk", "dat", "gen"].forEach((c) => {
    PERSONS.forEach((p, idx) => {
      out.push({
        category: "Pronoun forms",
        type: "type",
        direction: "en-de",
        hint: "Type the correct case form",
        prompt: `${CASE_NAMES[c]} of "${p.nom}" — ${p.en}`,
        answer: p[c],
      });

      const twins = sameFormIdxs(c, idx);
      if (twins[0] !== idx) return;
      const noms = [...new Set(twins.map((i) => PERSONS[i].nom))].join(" / ");
      const correctLabel = `${noms} – ${twins.map((i) => PERSONS[i].en).join(" / ")}`;
      const distractors = pickDistractors(labels, idx, twins, 3);
      out.push({
        category: "Pronoun forms",
        type: "mc",
        direction: "de-en",
        hint: "Choose the matching pronoun",
        prompt: `Which pronoun does "${p[c]}" (${CASE_NAMES[c]}) represent?`,
        answer: correctLabel,
        options: [correctLabel, ...distractors],
      });
    });
  });
  return out;
}

function buildAccQuestions() {
  const out = [];
  const akkForms = PERSONS.map((p) => p.akk);
  ACC_VERBS.forEach(([inf, en]) => {
    const stem = stemOf(inf);
    for (let p = 0; p < 8; p++) {
      const subjForm = capitalize(PERSONS[p].nom);
      const verbForm = conjugate(stem, p);
      for (let o = 0; o < 8; o++) {
        if (o === p) continue;
        const german = `${subjForm} ${verbForm} ___.`;
        const english = `${capitalize(PERSONS[p].en)} ${conjEn(en, p)} ${PERSONS[o].objEn}.`;
        const correctForm = PERSONS[o].akk;

        out.push({
          category: "Akkusativ",
          type: "type",
          direction: "en-de",
          hint: "Fill in the missing pronoun (Akkusativ)",
          prompt: `${german} (${english})`,
          answer: correctForm,
        });

        const distractors = pickDistractors(akkForms, o, [p, o], 3);
        out.push({
          category: "Akkusativ",
          type: "mc",
          direction: "en-de",
          hint: "Choose the missing pronoun (Akkusativ)",
          prompt: `${german} (${english})`,
          answer: correctForm,
          options: [correctForm, ...distractors],
        });
      }
    }
  });
  return out;
}

function buildDatQuestions() {
  const out = [];
  const datForms = PERSONS.map((p) => p.dat);
  DAT_VERBS.forEach(([inf, en]) => {
    const stem = stemOf(inf);
    for (let p = 0; p < 8; p++) {
      const subjForm = capitalize(PERSONS[p].nom);
      const verbForm = conjugate(stem, p);
      for (let o = 0; o < 8; o++) {
        if (o === p) continue;
        const german = `${subjForm} ${verbForm} ___.`;
        const english = `${capitalize(PERSONS[p].en)} ${conjEn(en, p)} ${PERSONS[o].objEn}.`;
        const correctForm = PERSONS[o].dat;

        out.push({
          category: "Dativ",
          type: "type",
          direction: "en-de",
          hint: "Fill in the missing pronoun (Dativ)",
          prompt: `${german} (${english})`,
          answer: correctForm,
        });

        const distractors = pickDistractors(datForms, o, [p, o], 3);
        out.push({
          category: "Dativ",
          type: "mc",
          direction: "en-de",
          hint: "Choose the missing pronoun (Dativ)",
          prompt: `${german} (${english})`,
          answer: correctForm,
          options: [correctForm, ...distractors],
        });
      }
    }
  });
  return out;
}

function buildNomQuestions() {
  const out = [];
  const nomForms = PERSONS.map((p) => p.nom);
  INTRANS_VERBS.forEach(([inf, en]) => {
    const stem = stemOf(inf);
    for (let p = 0; p < 8; p++) {
      const verbForm = conjugate(stem, p);
      const german = `___ ${verbForm}.`;
      const english = `${capitalize(PERSONS[p].en)} ${conjEn(en, p)}.`;
      const correctForm = PERSONS[p].nom;

      out.push({
        category: "Nominativ",
        type: "type",
        direction: "en-de",
        hint: "Fill in the missing pronoun (Nominativ)",
        prompt: `${german} (${english})`,
        answer: correctForm,
      });

      const distractors = pickDistractors(nomForms, p, [p], 3);
      out.push({
        category: "Nominativ",
        type: "mc",
        direction: "en-de",
        hint: "Choose the missing pronoun (Nominativ)",
        prompt: `${german} (${english})`,
        answer: correctForm,
        options: [correctForm, ...distractors],
      });
    }
  });
  return out;
}

function buildGenQuestions() {
  const out = [];
  GEN_PREPS.forEach(([prepDe, prepEn]) => {
    for (let p = 0; p < 8; p++) {
      const germanAnswer = `${prepDe} ${PERSONS[p].gen}`;
      const englishAnswer = `${prepEn} ${PERSONS[p].objEn}`;

      out.push({
        category: "Genitiv",
        type: "type",
        direction: "en-de",
        hint: "Translate to German",
        prompt: capitalize(englishAnswer),
        answer: germanAnswer,
      });

      const twins = sameFormIdxs("gen", p);
      if (twins[0] !== p) continue;
      const enOptions = PERSONS.map((per) => `${prepEn} ${per.objEn}`);
      const distractors = pickDistractors(enOptions, p, twins, 3);
      const correct = capitalize(`${prepEn} ${twins.map((i) => PERSONS[i].objEn).join(" / ")}`);
      out.push({
        category: "Genitiv",
        type: "mc",
        direction: "de-en",
        hint: "Choose the correct translation",
        prompt: capitalize(germanAnswer),
        answer: correct,
        options: [correct, ...distractors.map(capitalize)],
      });
    }
  });
  return out;
}

function buildFutureQuestions() {
  const out = [];
  const enSubjects = PERSONS.map((p) => capitalize(p.en));
  FUTURE_VERBS.forEach(([inf, en]) => {
    ADVERBS.forEach((adv) => {
      for (let p = 0; p < 8; p++) {
        const german = `${capitalize(PERSONS[p].nom)} ${WERDEN[p]}${adv.de ? " " + adv.de : ""} ${inf}.`;
        const english = `${enSubjects[p]} will ${en}${adv.en ? " " + adv.en : ""}.`;
        const inverted = adv.de ? [`${capitalize(adv.de)} ${WERDEN[p]} ${PERSONS[p].nom} ${inf}.`] : [];

        out.push({
          category: "Future (Futur I)",
          type: "type",
          direction: "en-de",
          hint: "Translate to German (Futur I)",
          prompt: english,
          answer: german,
          altAnswers: inverted,
        });

        // "Sie werden …" can also be formal "you", so never offer a "you" option as wrong there.
        const skip = p === 7 ? [1, 6] : [];
        const distractors = [];
        for (let step = 1; distractors.length < 3; step++) {
          const idx = (p + step) % 8;
          if (idx === p || skip.includes(idx)) continue;
          const candidate = `${enSubjects[idx]} will ${en}${adv.en ? " " + adv.en : ""}.`;
          if (candidate !== english && !distractors.includes(candidate)) distractors.push(candidate);
        }
        out.push({
          category: "Future (Futur I)",
          type: "mc",
          direction: "de-en",
          hint: "Choose the correct English translation",
          prompt: german,
          answer: english,
          options: [english, ...distractors],
        });
      }
    });
  });
  return out;
}

const QUESTIONS = [
  ...buildDirectFormQuestions(),
  ...buildAccQuestions(),
  ...buildDatQuestions(),
  ...buildNomQuestions(),
  ...buildGenQuestions(),
  ...buildFutureQuestions(),
];
