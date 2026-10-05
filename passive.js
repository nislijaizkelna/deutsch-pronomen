// Passive voice (Vorgangspassiv with werden) in all six tenses.
// Every question starts from an impersonal active sentence with "man"; its tense tells
// the learner which passive tense to use. Questions are generated from the tables below:
// (verbs × objects + verbs × people) × 3 question types, per tense.

const PASSIVE_TENSES = [
  { id: "praesens", name: "Präsens" },
  { id: "praeteritum", name: "Präteritum" },
  { id: "perfekt", name: "Perfekt" },
  { id: "plusquamperfekt", name: "Plusquamperfekt" },
  { id: "futur1", name: "Futur I" },
  { id: "futur2", name: "Futur II" },
];

const PASSIVE_AUX = {
  werden: { "1sg": "werde", "2sg": "wirst", "3sg": "wird", "1pl": "werden", "2pl": "werdet", "3pl": "werden" },
  wurde: { "1sg": "wurde", "2sg": "wurdest", "3sg": "wurde", "1pl": "wurden", "2pl": "wurdet", "3pl": "wurden" },
  sein: { "1sg": "bin", "2sg": "bist", "3sg": "ist", "1pl": "sind", "2pl": "seid", "3pl": "sind" },
  war: { "1sg": "war", "2sg": "warst", "3sg": "war", "1pl": "waren", "2pl": "wart", "3pl": "waren" },
};

const PASSIVE_RULES = {
  praesens: "Präsens passive: werden + Partizip II.",
  praeteritum: "Präteritum passive: wurde + Partizip II.",
  perfekt: "Perfekt passive: sein + Partizip II + worden (not geworden).",
  plusquamperfekt: "Plusquamperfekt passive: war + Partizip II + worden.",
  futur1: "Futur I passive: werden + Partizip II + werden.",
  futur2: "Futur II passive: werden + Partizip II + worden sein.",
};

// --- Verb banks -------------------------------------------------------------
// [infinitive, 3rd-person present, 3rd-person Präteritum, Partizip II, separable prefix, objects]
// Present/Präteritum forms are written without the separable prefix ("lädt" + "ein").
// Objects are "gender:Noun" with gender m, f, n or pl.

const PASSIVE_THING_VERBS = [
  ["bauen", "baut", "baute", "gebaut", "", ["n:Haus", "f:Brücke", "f:Schule"]],
  ["reparieren", "repariert", "reparierte", "repariert", "", ["n:Auto", "m:Computer", "f:Heizung"]],
  ["schreiben", "schreibt", "schrieb", "geschrieben", "", ["m:Brief", "f:E-Mail", "pl:Berichte"]],
  ["lesen", "liest", "las", "gelesen", "", ["n:Buch", "f:Zeitung", "pl:Nachrichten"]],
  ["kochen", "kocht", "kochte", "gekocht", "", ["f:Suppe", "n:Essen", "pl:Kartoffeln"]],
  ["waschen", "wäscht", "wusch", "gewaschen", "", ["f:Wäsche", "m:Pullover", "pl:Hemden"]],
  ["putzen", "putzt", "putzte", "geputzt", "", ["n:Bad", "f:Küche", "pl:Fenster"]],
  ["öffnen", "öffnet", "öffnete", "geöffnet", "", ["f:Tür", "n:Fenster", "pl:Geschäfte"]],
  ["schließen", "schließt", "schloss", "geschlossen", "", ["n:Museum", "f:Bibliothek", "pl:Grenzen"]],
  ["verkaufen", "verkauft", "verkaufte", "verkauft", "", ["n:Haus", "m:Wagen", "pl:Tickets"]],
  ["kaufen", "kauft", "kaufte", "gekauft", "", ["n:Brot", "m:Wein", "pl:Blumen"]],
  ["bezahlen", "bezahlt", "bezahlte", "bezahlt", "", ["f:Rechnung", "f:Miete", "pl:Getränke"]],
  ["trinken", "trinkt", "trank", "getrunken", "", ["m:Wein", "n:Bier", "m:Saft"]],
  ["essen", "isst", "aß", "gegessen", "", ["m:Kuchen", "f:Pizza", "pl:Äpfel"]],
  ["backen", "backt", "backte", "gebacken", "", ["m:Kuchen", "n:Brot", "pl:Brötchen"]],
  ["singen", "singt", "sang", "gesungen", "", ["n:Lied", "f:Hymne", "pl:Lieder"]],
  ["übersetzen", "übersetzt", "übersetzte", "übersetzt", "", ["m:Text", "n:Buch", "pl:Briefe"]],
  ["erklären", "erklärt", "erklärte", "erklärt", "", ["f:Regel", "n:Problem", "pl:Aufgaben"]],
  ["lösen", "löst", "löste", "gelöst", "", ["n:Problem", "f:Aufgabe", "pl:Rätsel"]],
  ["finden", "findet", "fand", "gefunden", "", ["m:Schlüssel", "f:Tasche", "n:Handy"]],
  ["verlieren", "verliert", "verlor", "verloren", "", ["n:Spiel", "m:Schlüssel", "pl:Dokumente"]],
  ["gewinnen", "gewinnt", "gewann", "gewonnen", "", ["n:Spiel", "m:Preis", "f:Wahl"]],
  ["schicken", "schickt", "schickte", "geschickt", "", ["n:Paket", "m:Brief", "pl:Einladungen"]],
  ["bringen", "bringt", "brachte", "gebracht", "", ["n:Essen", "f:Post", "pl:Getränke"]],
  ["malen", "malt", "malte", "gemalt", "", ["n:Bild", "n:Porträt", "pl:Bilder"]],
  ["organisieren", "organisiert", "organisierte", "organisiert", "", ["n:Fest", "f:Reise", "m:Ausflug"]],
  ["planen", "plant", "plante", "geplant", "", ["f:Reise", "n:Projekt", "m:Urlaub"]],
  ["beantworten", "beantwortet", "beantwortete", "beantwortet", "", ["f:Frage", "m:Brief", "pl:E-Mails"]],
  ["unterschreiben", "unterschreibt", "unterschrieb", "unterschrieben", "", ["m:Vertrag", "n:Formular", "pl:Dokumente"]],
  ["drucken", "druckt", "druckte", "gedruckt", "", ["n:Dokument", "m:Bericht", "pl:Fotos"]],
  ["löschen", "löscht", "löschte", "gelöscht", "", ["f:Datei", "n:Foto", "pl:Nachrichten"]],
  ["installieren", "installiert", "installierte", "installiert", "", ["n:Programm", "f:App", "pl:Updates"]],
  ["renovieren", "renoviert", "renovierte", "renoviert", "", ["n:Haus", "f:Wohnung", "f:Küche"]],
  ["zeigen", "zeigt", "zeigte", "gezeigt", "", ["m:Film", "n:Foto", "pl:Bilder"]],
  ["produzieren", "produziert", "produzierte", "produziert", "", ["m:Film", "n:Auto", "pl:Waren"]],
  ["liefern", "liefert", "lieferte", "geliefert", "", ["n:Paket", "m:Kühlschrank", "pl:Möbel"]],
  ["abholen", "holt", "holte", "abgeholt", "ab", ["n:Paket", "m:Schlüssel", "pl:Koffer"]],
  ["einladen", "lädt", "lud", "eingeladen", "ein", ["m:Chef", "pl:Gäste", "pl:Nachbarn"]],
  ["streichen", "streicht", "strich", "gestrichen", "", ["f:Wand", "n:Zimmer", "pl:Türen"]],
  ["abschließen", "schließt", "schloss", "abgeschlossen", "ab", ["f:Tür", "n:Auto", "n:Büro"]],
  ["aufräumen", "räumt", "räumte", "aufgeräumt", "auf", ["n:Zimmer", "f:Küche", "m:Keller"]],
  ["ausschalten", "schaltet", "schaltete", "ausgeschaltet", "aus", ["m:Computer", "n:Licht", "pl:Maschinen"]],
  ["verschieben", "verschiebt", "verschob", "verschoben", "", ["m:Termin", "f:Prüfung", "n:Treffen"]],
  ["absagen", "sagt", "sagte", "abgesagt", "ab", ["n:Konzert", "f:Party", "m:Termin"]],
  ["feiern", "feiert", "feierte", "gefeiert", "", ["m:Geburtstag", "n:Fest", "f:Hochzeit"]],
  ["gießen", "gießt", "goss", "gegossen", "", ["m:Garten", "pl:Blumen", "pl:Pflanzen"]],
  ["füttern", "füttert", "fütterte", "gefüttert", "", ["m:Hund", "f:Katze", "pl:Tiere"]],
  ["erfinden", "erfindet", "erfand", "erfunden", "", ["n:Telefon", "m:Motor", "f:Glühbirne"]],
  ["entdecken", "entdeckt", "entdeckte", "entdeckt", "", ["f:Insel", "m:Fehler", "f:Höhle"]],
  ["zerstören", "zerstört", "zerstörte", "zerstört", "", ["f:Stadt", "n:Gebäude", "f:Brücke"]],
];

// Verbs that take a person as their object.
const PASSIVE_PERSON_VERBS = [
  ["fragen", "fragt", "fragte", "gefragt", ""],
  ["einladen", "lädt", "lud", "eingeladen", "ein"],
  ["anrufen", "ruft", "rief", "angerufen", "an"],
  ["abholen", "holt", "holte", "abgeholt", "ab"],
  ["besuchen", "besucht", "besuchte", "besucht", ""],
  ["informieren", "informiert", "informierte", "informiert", ""],
  ["loben", "lobt", "lobte", "gelobt", ""],
  ["kritisieren", "kritisiert", "kritisierte", "kritisiert", ""],
  ["sehen", "sieht", "sah", "gesehen", ""],
  ["rufen", "ruft", "rief", "gerufen", ""],
  ["begrüßen", "begrüßt", "begrüßte", "begrüßt", ""],
  ["unterstützen", "unterstützt", "unterstützte", "unterstützt", ""],
  ["warnen", "warnt", "warnte", "gewarnt", ""],
  ["untersuchen", "untersucht", "untersuchte", "untersucht", ""],
  ["fotografieren", "fotografiert", "fotografierte", "fotografiert", ""],
  ["beobachten", "beobachtet", "beobachtete", "beobachtet", ""],
  ["erkennen", "erkennt", "erkannte", "erkannt", ""],
  ["verstehen", "versteht", "verstand", "verstanden", ""],
  ["bezahlen", "bezahlt", "bezahlte", "bezahlt", ""],
  ["vergessen", "vergisst", "vergaß", "vergessen", ""],
  ["wecken", "weckt", "weckte", "geweckt", ""],
  ["suchen", "sucht", "suchte", "gesucht", ""],
  ["überraschen", "überrascht", "überraschte", "überrascht", ""],
  ["trösten", "tröstet", "tröstete", "getröstet", ""],
  ["bedienen", "bedient", "bediente", "bedient", ""],
  ["beraten", "berät", "beriet", "beraten", ""],
  ["operieren", "operiert", "operierte", "operiert", ""],
];

const PASSIVE_PEOPLE = [
  { nom: "ich", akk: "mich", p: "1sg" },
  { nom: "du", akk: "dich", p: "2sg" },
  { nom: "der Lehrer", akk: "den Lehrer", p: "3sg" },
  { nom: "die Ärztin", akk: "die Ärztin", p: "3sg" },
  { nom: "das Kind", akk: "das Kind", p: "3sg" },
  { nom: "wir", akk: "uns", p: "1pl" },
  { nom: "ihr", akk: "euch", p: "2pl" },
  { nom: "die Kinder", akk: "die Kinder", p: "3pl" },
];

// --- Sentence builders --------------------------------------------------------

function passiveCap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function passiveNoun(spec) {
  const [g, noun] = spec.split(":");
  const nom = { m: "der", f: "die", n: "das", pl: "die" }[g];
  const akk = { m: "den", f: "die", n: "das", pl: "die" }[g];
  return { nom: `${nom} ${noun}`, akk: `${akk} ${noun}`, p: g === "pl" ? "3pl" : "3sg" };
}

function passiveActive(tense, verb, obj) {
  const [inf, pres, praet, pii, sep] = verb;
  const prefix = sep ? ` ${sep}` : "";
  switch (tense) {
    case "praesens": return `Man ${pres} ${obj.akk}${prefix}.`;
    case "praeteritum": return `Man ${praet} ${obj.akk}${prefix}.`;
    case "perfekt": return `Man hat ${obj.akk} ${pii}.`;
    case "plusquamperfekt": return `Man hatte ${obj.akk} ${pii}.`;
    case "futur1": return `Man wird ${obj.akk} ${inf}.`;
    case "futur2": return `Man wird ${obj.akk} ${pii} haben.`;
  }
}

// The tense-carrying parts of the passive: the conjugated auxiliary and what follows the participle.
function passiveAux(tense, person) {
  switch (tense) {
    case "praesens": return { aux: PASSIVE_AUX.werden[person], end: "" };
    case "praeteritum": return { aux: PASSIVE_AUX.wurde[person], end: "" };
    case "perfekt": return { aux: PASSIVE_AUX.sein[person], end: "worden" };
    case "plusquamperfekt": return { aux: PASSIVE_AUX.war[person], end: "worden" };
    case "futur1": return { aux: PASSIVE_AUX.werden[person], end: "werden" };
    case "futur2": return { aux: PASSIVE_AUX.werden[person], end: "worden sein" };
  }
}

// mode: "plain", "marked" (**aux**) or "blank" (___)
function passiveSentence(tense, verb, obj, mode = "plain") {
  const { aux, end } = passiveAux(tense, obj.p);
  const show = (s) =>
    mode === "marked" ? `**${s}**` : mode === "blank" ? s.split(" ").map(() => "___").join(" ") : s;
  return `${passiveCap(obj.nom)} ${show(aux)} ${verb[3]}${end ? " " + show(end) : ""}.`;
}

function buildPassiveQuestions(tense) {
  const bases = [];
  PASSIVE_THING_VERBS.forEach((verb) => verb[5].forEach((spec) => bases.push([verb, passiveNoun(spec)])));
  PASSIVE_PERSON_VERBS.forEach((verb) => PASSIVE_PEOPLE.forEach((person) => bases.push([verb, person])));

  const others = PASSIVE_TENSES.filter((t) => t.id !== tense);
  const out = [];
  bases.forEach(([verb, obj], i) => {
    const active = passiveActive(tense, verb, obj);
    const passive = passiveSentence(tense, verb, obj);
    const { aux, end } = passiveAux(tense, obj.p);
    const common = {
      category: "Passive",
      tense,
      sentence: passiveSentence(tense, verb, obj, "marked"),
      why: PASSIVE_RULES[tense] + (obj.akk !== obj.nom ? ` The object "${obj.akk}" becomes the subject "${obj.nom}".` : ""),
    };

    out.push({
      ...common,
      type: "type",
      hint: "Rewrite in the passive (keep the tense)",
      prompt: active,
      answer: passive,
    });

    out.push({
      ...common,
      type: "type",
      hint: "Fill in the missing verb forms, in order",
      prompt: `${active} → ${passiveSentence(tense, verb, obj, "blank")}`,
      answer: end ? `${aux} ${end}` : aux,
    });

    // Three other tenses of the same passive sentence, rotating so every pairing comes up.
    const distractors = [0, 1, 2].map((k) => passiveSentence(others[(i + k) % others.length].id, verb, obj));
    out.push({
      ...common,
      type: "mc",
      hint: "Choose the matching passive sentence",
      prompt: active,
      answer: passive,
      options: [passive, ...distractors],
    });
  });
  return out;
}

const PASSIVE_QUESTIONS = {};
PASSIVE_TENSES.forEach((t) => {
  PASSIVE_QUESTIONS[t.id] = buildPassiveQuestions(t.id);
});
const PASSIVE_ALL = PASSIVE_TENSES.flatMap((t) => PASSIVE_QUESTIONS[t.id]);
