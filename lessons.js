// Hand-written lessons: the practice rounds from the chat sessions, in order.
// Each item: q = prompt (___ marks the blank, **x** is bold), cue = what to fill in,
// a = answer, alt = other accepted answers, s = model sentence (**x** is highlighted),
// why = short explanation, options = multiple choice instead of typing.
// Blanks in the middle of a sentence are checked case-sensitively (sie ≠ Sie).

const PRONOUN_TABLE = `
  <table class="ref">
    <tr><th></th><th>Nom.</th><th>Akk.</th><th>Dat.</th></tr>
    <tr><td>I</td><td>ich</td><td>mich</td><td>mir</td></tr>
    <tr><td>you (informal)</td><td>du</td><td>dich</td><td>dir</td></tr>
    <tr><td>he</td><td>er</td><td>ihn</td><td>ihm</td></tr>
    <tr><td>she</td><td>sie</td><td>sie</td><td>ihr</td></tr>
    <tr><td>it</td><td>es</td><td>es</td><td>ihm</td></tr>
    <tr><td>we</td><td>wir</td><td>uns</td><td>uns</td></tr>
    <tr><td>you all</td><td>ihr</td><td>euch</td><td>euch</td></tr>
    <tr><td>they</td><td>sie</td><td>sie</td><td>ihnen</td></tr>
    <tr><td>you (formal)</td><td>Sie</td><td>Sie</td><td>Ihnen</td></tr>
  </table>`;

const DATIVE_VERBS = `<p><strong>Dative verbs:</strong> helfen, danken, antworten, gehören, gefallen, glauben, gratulieren, folgen, schmecken, passen, fehlen.</p>
  <p><strong>They feel dative but take the accusative:</strong> fragen, anrufen, bitten.</p>`;

const POSSESSIVE_TABLE = `
  <table class="ref">
    <tr><th>Owner</th><th>Possessive</th></tr>
    <tr><td>I</td><td>mein</td></tr>
    <tr><td>you (informal)</td><td>dein</td></tr>
    <tr><td>he / it</td><td>sein</td></tr>
    <tr><td>she</td><td>ihr</td></tr>
    <tr><td>we</td><td>unser</td></tr>
    <tr><td>you all</td><td>euer</td></tr>
    <tr><td>they</td><td>ihr</td></tr>
    <tr><td>you (formal)</td><td>Ihr</td></tr>
  </table>
  <table class="ref">
    <tr><th>Thing owned</th><th>Ending</th><th>Example</th></tr>
    <tr><td>der</td><td>none</td><td>mein Vater</td></tr>
    <tr><td>die</td><td>-e</td><td>meine Mutter</td></tr>
    <tr><td>das</td><td>none</td><td>mein Kind</td></tr>
    <tr><td>plural</td><td>-e</td><td>meine Eltern</td></tr>
  </table>`;

const POSSESSIVE_CASES = `
  <table class="ref">
    <tr><th></th><th>Nom.</th><th>Akk.</th><th>Dat.</th></tr>
    <tr><td>der</td><td>mein</td><td>mein<strong>en</strong></td><td>mein<strong>em</strong></td></tr>
    <tr><td>die</td><td>mein<strong>e</strong></td><td>mein<strong>e</strong></td><td>mein<strong>er</strong></td></tr>
    <tr><td>das</td><td>mein</td><td>mein</td><td>mein<strong>em</strong></td></tr>
    <tr><td>plural</td><td>mein<strong>e</strong></td><td>mein<strong>e</strong></td><td>mein<strong>en</strong></td></tr>
  </table>`;

const LESSONS = [
  // --- Personal pronouns --------------------------------------------------
  {
    id: "r1",
    group: "Personal pronouns",
    title: "Round 1 · Fill in the pronoun",
    tip: `${PRONOUN_TABLE}
      <ul>
        <li><strong>Nominative</strong> is the subject, <strong>accusative</strong> the direct object, <strong>dative</strong> the indirect object.</li>
        <li>Some verbs always take the dative: <em>helfen, danken, gehören, gefallen, antworten</em>.</li>
        <li>A pronoun follows the noun's gender: <em>der Tisch</em> → <strong>er</strong>.</li>
      </ul>`,
    items: [
      { q: "___ wohnen in Berlin.", cue: "we", a: "Wir", s: "**Wir** wohnen in Berlin.", why: "Subject → nominative. Capitalized at the start of a sentence." },
      { q: "Ich sehe ___ morgen.", cue: "him", a: "ihn", s: "Ich sehe **ihn** morgen.", why: "sehen takes the accusative: him → ihn." },
      { q: "Kannst du ___ helfen?", cue: "me", a: "mir", s: "Kannst du **mir** helfen?", why: "helfen always takes the dative." },
      { q: "Das Buch gehört ___.", cue: "her", a: "ihr", s: "Das Buch gehört **ihr**.", why: "gehören is a dative verb: her → ihr." },
      { q: "Ich rufe ___ später an.", cue: "you, informal", a: "dich", s: "Ich rufe **dich** später an.", why: "anrufen takes the accusative, informal: dich." },
      { q: "Wie geht es ___?", cue: "you, formal", a: "Ihnen", s: "Wie geht es **Ihnen**?", why: "Formal 'you' is always capitalized. Lowercase ihnen means 'them'." },
      { q: "Der Lehrer gibt ___ die Hausaufgaben.", cue: "them", a: "ihnen", s: "Der Lehrer gibt **ihnen** die Hausaufgaben.", why: "The receiver is dative: them → ihnen." },
      { q: "Wo ist der Schlüssel? Ich finde ___ nicht.", cue: "it = der Schlüssel", a: "ihn", s: "Wo ist der Schlüssel? Ich finde **ihn** nicht.", why: "der Schlüssel is masculine, direct object → ihn." },
    ],
  },
  {
    id: "r2",
    group: "Personal pronouns",
    title: "Round 2 · Target your weak spots",
    tip: `<p>The pronoun ending matches the article:</p>
      <ul>
        <li><strong>den</strong> Mann → <strong>ihn</strong> (both -n, accusative)</li>
        <li><strong>dem</strong> Mann → <strong>ihm</strong> (both -m, dative)</li>
        <li><strong>ihr</strong> is <em>her</em> (dative) or <em>you all</em>, never <em>him</em>.</li>
      </ul>`,
    items: [
      { q: "Ich besuche ___ am Wochenende.", cue: "him", a: "ihn", s: "Ich besuche **ihn** am Wochenende.", why: "besuchen takes the accusative: ihn." },
      { q: "Ich gebe ___ das Geld.", cue: "him", a: "ihm", s: "Ich gebe **ihm** das Geld.", why: "He receives the money → dative: ihm." },
      { q: "Wo ist die Lampe? Ich sehe ___ nicht.", cue: "it = die Lampe", a: "sie", s: "Wo ist die Lampe? Ich sehe **sie** nicht.", why: "die Lampe is feminine → sie." },
      { q: "Der Film gefällt ___.", cue: "me", a: "mir", s: "Der Film gefällt **mir**.", why: "gefallen is a dative verb." },
      { q: "Ich liebe ___.", cue: "you, informal", a: "dich", s: "Ich liebe **dich**.", why: "lieben takes the accusative." },
      { q: "Ich danke ___.", cue: "you, informal", a: "dir", s: "Ich danke **dir**.", why: "danken is a dative verb." },
      { q: "Frau Müller, ich verstehe ___ nicht.", cue: "you, formal", a: "Sie", s: "Frau Müller, ich verstehe **Sie** nicht.", why: "verstehen takes the accusative. Formal accusative: Sie." },
      { q: "Das Auto gehört ___.", cue: "us", a: "uns", s: "Das Auto gehört **uns**.", why: "gehören takes the dative. uns is the same in Akk. and Dat." },
    ],
  },
  {
    id: "r3",
    group: "Personal pronouns",
    title: "Round 3 · Him + prepositions",
    tip: `<p>Some prepositions decide the case on their own:</p>
      <ul>
        <li><strong>mit</strong> → always dative</li>
        <li><strong>für</strong> → always accusative</li>
      </ul>`,
    items: [
      { q: "Ich kenne ___ seit Jahren.", cue: "him", a: "ihn", s: "Ich kenne **ihn** seit Jahren.", why: "kennen takes the accusative: ihn." },
      { q: "Ich gehe mit ___ ins Kino.", cue: "her", a: "ihr", s: "Ich gehe mit **ihr** ins Kino.", why: "mit + dative: her → ihr." },
      { q: "Das Geschenk ist für ___.", cue: "him", a: "ihn", s: "Das Geschenk ist für **ihn**.", why: "für + accusative: ihn." },
      { q: "Kannst du ___ das Salz geben?", cue: "him", a: "ihm", s: "Kannst du **ihm** das Salz geben?", why: "He receives the salt → dative: ihm." },
      { q: "Wo ist mein Handy? Hast du ___ gesehen?", cue: "it = das Handy", a: "es", s: "Wo ist mein Handy? Hast du **es** gesehen?", why: "das Handy is neuter. es stays es in the accusative." },
      { q: "Wir warten auf ___.", cue: "you all", a: "euch", s: "Wir warten auf **euch**.", why: "warten auf + accusative: euch." },
      { q: "Ich schreibe ___ eine E-Mail.", cue: "them", a: "ihnen", s: "Ich schreibe **ihnen** eine E-Mail.", why: "The receiver is dative: ihnen." },
      { q: "Hier ist der Kaffee. Magst du ___?", cue: "it = der Kaffee", a: "ihn", s: "Hier ist der Kaffee. Magst du **ihn**?", why: "der Kaffee is masculine, mögen takes the accusative: ihn." },
    ],
  },
  {
    id: "r4",
    group: "Personal pronouns",
    title: "Round 4 · Replace the noun",
    tip: `<p>In the accusative only the masculine changes, exactly like the article:</p>
      <table class="ref">
        <tr><th></th><th>Article</th><th>Pronoun</th></tr>
        <tr><td>masculine</td><td>der → den</td><td>er → ihn</td></tr>
        <tr><td>feminine</td><td>die → die</td><td>sie → sie</td></tr>
        <tr><td>neuter</td><td>das → das</td><td>es → es</td></tr>
      </table>
      <p>Match the ending: <strong>den → ihn</strong>, <strong>dem → ihm</strong>, dative <strong>der → ihr</strong>.</p>`,
    items: [
      { q: "Ich kaufe **den Tisch**. → Ich kaufe ___.", a: "ihn", s: "Ich kaufe **ihn**.", why: "den → ihn" },
      { q: "Ich kaufe **die Tasche**. → Ich kaufe ___.", a: "sie", s: "Ich kaufe **sie**.", why: "die → sie" },
      { q: "Ich kaufe **das Buch**. → Ich kaufe ___.", a: "es", s: "Ich kaufe **es**.", why: "das → es" },
      { q: "Ich kenne **den Lehrer**. → Ich kenne ___.", a: "ihn", s: "Ich kenne **ihn**.", why: "den → ihn" },
      { q: "Ich helfe **dem Mann**. → Ich helfe ___.", a: "ihm", s: "Ich helfe **ihm**.", why: "dem → ihm" },
      { q: "Ich trinke **das Wasser**. → Ich trinke ___.", a: "es", s: "Ich trinke **es**.", why: "das → es" },
      { q: "Ich gebe **der Frau** das Buch. → Ich gebe ___ das Buch.", a: "ihr", s: "Ich gebe **ihr** das Buch.", why: "dative der → ihr" },
      { q: "Ich sehe **den Film**. → Ich sehe ___.", a: "ihn", s: "Ich sehe **ihn**.", why: "den → ihn" },
    ],
  },
  {
    id: "r5",
    group: "Personal pronouns",
    title: "Round 5 · No article hints",
    tip: `<p>Picture the article before you choose: <em>der Kaffee → den Kaffee → <strong>ihn</strong></em>.</p>
      <p>When in doubt, use the accusative. Most verbs take it.</p>`,
    items: [
      { q: "Ich besuche ___ morgen.", cue: "him", a: "ihn", s: "Ich besuche **ihn** morgen.", why: "besuchen takes the accusative." },
      { q: "Ich antworte ___ sofort.", cue: "him", a: "ihm", s: "Ich antworte **ihm** sofort.", why: "antworten is a dative verb. You give someone an answer → receiver → dative." },
      { q: "Wo ist der Rucksack? Ich brauche ___.", cue: "it = der Rucksack", a: "ihn", s: "Wo ist der Rucksack? Ich brauche **ihn**.", why: "der Rucksack → den Rucksack → ihn." },
      { q: "Das Kleid gefällt ___.", cue: "her", a: "ihr", s: "Das Kleid gefällt **ihr**.", why: "gefallen is a dative verb." },
      { q: "Ich habe ein neues Auto. Ich fahre ___ jeden Tag.", cue: "it = das Auto", a: "es", s: "Ich habe ein neues Auto. Ich fahre **es** jeden Tag.", why: "das Auto is neuter → es." },
      { q: "Wir fragen ___.", cue: "him", a: "ihn", s: "Wir fragen **ihn**.", why: "fragen takes the accusative. A classic trap!" },
      { q: "Ich zeige ___ die Stadt.", cue: "them", a: "ihnen", s: "Ich zeige **ihnen** die Stadt.", why: "They are shown the city (receivers) → dative." },
      { q: "Die Suppe ist kalt. Ich esse ___ nicht.", cue: "it = die Suppe", a: "sie", s: "Die Suppe ist kalt. Ich esse **sie** nicht.", why: "die Suppe is feminine → sie." },
    ],
  },
  {
    id: "r6",
    group: "Personal pronouns",
    title: "Round 6 · ihn or ihm?",
    hint: "Every answer means 'him': accusative or dative?",
    tip: `<p>Every answer here means <em>him</em>. The only question is the verb's case.</p>${DATIVE_VERBS}
      <p>If the verb is on the dative list → <strong>ihm</strong>. Otherwise → <strong>ihn</strong>.</p>`,
    items: [
      { q: "Ich glaube ___.", a: "ihm", options: ["ihn", "ihm"], s: "Ich glaube **ihm**.", why: "glauben takes the dative." },
      { q: "Ich frage ___ nach dem Weg.", a: "ihn", options: ["ihn", "ihm"], s: "Ich frage **ihn** nach dem Weg.", why: "fragen takes the accusative." },
      { q: "Ich gratuliere ___ zum Geburtstag.", a: "ihm", options: ["ihn", "ihm"], s: "Ich gratuliere **ihm** zum Geburtstag.", why: "gratulieren takes the dative." },
      { q: "Ich rufe ___ heute Abend an.", a: "ihn", options: ["ihn", "ihm"], s: "Ich rufe **ihn** heute Abend an.", why: "anrufen takes the accusative." },
      { q: "Das Essen schmeckt ___.", a: "ihm", options: ["ihn", "ihm"], s: "Das Essen schmeckt **ihm**.", why: "schmecken takes the dative." },
      { q: "Ich vermisse ___.", a: "ihn", options: ["ihn", "ihm"], s: "Ich vermisse **ihn**.", why: "vermissen takes the accusative." },
      { q: "Die Jacke passt ___ nicht.", a: "ihm", options: ["ihn", "ihm"], s: "Die Jacke passt **ihm** nicht.", why: "passen takes the dative." },
      { q: "Ich bitte ___ um Hilfe.", a: "ihn", options: ["ihn", "ihm"], s: "Ich bitte **ihn** um Hilfe.", why: "bitten takes the accusative." },
    ],
  },
  {
    id: "r7",
    group: "Personal pronouns",
    title: "Round 7 · Sort the verbs",
    hint: "Does this verb take the accusative or the dative?",
    tip: `<p>You only need to memorize the short dative list. Every other verb takes the accusative.</p>${DATIVE_VERBS}
      <p>Two ways to say "I miss you":<br><em>Ich vermisse <strong>dich</strong>.</em> (Akk.) · <em>Du fehlst <strong>mir</strong>.</em> (Dat.)</p>`,
    items: [
      { q: "sehen", a: "Akkusativ", options: ["Akkusativ", "Dativ"], s: "Ich sehe **ihn**." },
      { q: "helfen", a: "Dativ", options: ["Akkusativ", "Dativ"], s: "Ich helfe **ihm**." },
      { q: "fragen", a: "Akkusativ", options: ["Akkusativ", "Dativ"], s: "Ich frage **ihn**." },
      { q: "kennen", a: "Akkusativ", options: ["Akkusativ", "Dativ"], s: "Ich kenne **ihn**.", why: "Not on the dative list → accusative." },
      { q: "danken", a: "Dativ", options: ["Akkusativ", "Dativ"], s: "Ich danke **ihm**." },
      { q: "anrufen", a: "Akkusativ", options: ["Akkusativ", "Dativ"], s: "Ich rufe **ihn** an.", why: "You call someone, not to someone." },
      { q: "antworten", a: "Dativ", options: ["Akkusativ", "Dativ"], s: "Ich antworte **ihm**.", why: "You give someone an answer → receiver → dative." },
      { q: "gefallen", a: "Dativ", options: ["Akkusativ", "Dativ"], s: "Das gefällt **ihm**." },
      { q: "vermissen", a: "Akkusativ", options: ["Akkusativ", "Dativ"], s: "Ich vermisse **ihn**.", why: "Compare: Du fehlst mir (fehlen is dative)." },
      { q: "gehören", a: "Dativ", options: ["Akkusativ", "Dativ"], s: "Das gehört **ihm**." },
    ],
  },
  {
    id: "r8",
    group: "Personal pronouns",
    title: "Round 8 · Verbs + pronouns",
    tip: `<p>All persons mixed again. Formal "you" uses the "they" forms with a capital letter:</p>
      <table class="ref">
        <tr><th></th><th>Nom.</th><th>Akk.</th><th>Dat.</th></tr>
        <tr><td>they</td><td>sie</td><td>sie</td><td>ihnen</td></tr>
        <tr><td>you (formal)</td><td>Sie</td><td>Sie</td><td>Ihnen</td></tr>
      </table>`,
    items: [
      { q: "Ich kenne ___ gut.", cue: "him", a: "ihn", s: "Ich kenne **ihn** gut.", why: "kennen takes the accusative." },
      { q: "Ich helfe ___ morgen.", cue: "her", a: "ihr", s: "Ich helfe **ihr** morgen.", why: "helfen takes the dative." },
      { q: "Wir vermissen ___.", cue: "you, informal", a: "dich", s: "Wir vermissen **dich**.", why: "vermissen takes the accusative." },
      { q: "Du fehlst ___.", cue: "me", a: "mir", s: "Du fehlst **mir**.", why: "fehlen takes the dative." },
      { q: "Ich frage ___.", cue: "them", a: "sie", s: "Ich frage **sie**.", why: "fragen takes the accusative: them → sie." },
      { q: "Das Haus gehört ___.", cue: "him", a: "ihm", s: "Das Haus gehört **ihm**.", why: "gehören takes the dative." },
      { q: "Ich rufe ___ morgen an.", cue: "you, formal", a: "Sie", s: "Ich rufe **Sie** morgen an.", why: "anrufen takes the accusative. Formal accusative: Sie." },
      { q: "Ich danke ___.", cue: "you all", a: "euch", s: "Ich danke **euch**.", why: "danken takes the dative." },
    ],
  },
  {
    id: "r9",
    group: "Personal pronouns",
    title: "Round 9 · Translate into German",
    hint: "Translate the whole sentence into German",
    translate: true,
    tip: `<p>Type the whole sentence. Punctuation and umlauts are optional, but capital letters matter for <strong>Sie / Ihnen</strong>.</p>
      <p><em>helfen</em> changes its vowel: ich helfe, du hilfst, er/sie/es <strong>hilft</strong>.</p>`,
    items: [
      { q: "I see her.", a: "Ich sehe sie.", s: "Ich sehe **sie**.", why: "sehen takes the accusative: her → sie." },
      { q: "She helps me.", a: "Sie hilft mir.", s: "Sie **hilft mir**.", why: "helfen + dative. Verb: sie hilft (e → i)." },
      { q: "We know him.", a: "Wir kennen ihn.", s: "Wir kennen **ihn**.", why: "kennen takes the accusative." },
      { q: "Do you (informal) miss me?", a: "Vermisst du mich?", s: "Vermisst du **mich**?", why: "vermissen + accusative. The verb comes first in a yes/no question." },
      { q: "The book belongs to them.", a: "Das Buch gehört ihnen.", s: "Das Buch gehört **ihnen**.", why: "gehören + dative, lowercase ihnen = them." },
      { q: "I'll call you (formal) tomorrow.", a: "Ich rufe Sie morgen an.", alt: ["Ich werde Sie morgen anrufen.", "Morgen rufe ich Sie an."], s: "Ich rufe **Sie** morgen an.", why: "Formal → Sie. With a time word, the present tense is more natural, but werden … anrufen is also correct." },
      { q: "He thanks us.", a: "Er dankt uns.", s: "Er dankt **uns**.", why: "danken + dative: uns." },
      { q: "I give him the key.", a: "Ich gebe ihm den Schlüssel.", s: "Ich gebe **ihm** den Schlüssel.", why: "Receiver → dative (ihm). Thing → accusative (den Schlüssel)." },
    ],
  },
  {
    id: "r10",
    group: "Personal pronouns",
    title: "Round 10 · Two pronouns",
    hint: "Replace the noun with a pronoun too (type both words)",
    tip: `<table class="ref">
        <tr><th>Objects</th><th>Order</th></tr>
        <tr><td>two nouns</td><td>person (Dat.) → thing (Akk.)<br><em>Ich gebe dem Mann den Schlüssel.</em></td></tr>
        <tr><td>noun + pronoun</td><td>pronoun first<br><em>Ich gebe ihm den Schlüssel.</em></td></tr>
        <tr><td>two pronouns</td><td>thing (Akk.) → person (Dat.)<br><em>Ich gebe ihn ihm.</em></td></tr>
      </table>`,
    items: [
      { q: "Ich gebe ihm **den Schlüssel**. → Ich gebe ___ ___.", a: "ihn ihm", s: "Ich gebe **ihn ihm**.", why: "den Schlüssel → ihn. Two pronouns: the thing comes before the person." },
      { q: "Ich gebe dir **das Buch**. → Ich gebe ___ ___.", a: "es dir", s: "Ich gebe **es dir**.", why: "das Buch → es, then the person." },
      { q: "Er zeigt uns **die Stadt**. → Er zeigt ___ ___.", a: "sie uns", s: "Er zeigt **sie uns**.", why: "die Stadt → sie, then the person." },
      { q: "Ich schenke ihr **den Ring**. → Ich schenke ___ ___.", a: "ihn ihr", s: "Ich schenke **ihn ihr**.", why: "den Ring → ihn, then ihr (to her)." },
      { q: "Sie schreibt ihnen **den Brief**. → Sie schreibt ___ ___.", a: "ihn ihnen", s: "Sie schreibt **ihn ihnen**.", why: "den Brief is masculine → ihn, then ihnen." },
    ],
  },

  // --- Formal Sie ---------------------------------------------------------
  {
    id: "w1",
    group: "Formal Sie",
    title: "Warm-up · ihn vs. ihr, formal Sie",
    tip: `<p>Ask what you would say about a man:</p>
      <table class="ref">
        <tr><th>About a man</th><th>Formal "you"</th></tr>
        <tr><td>Ich sehe <strong>ihn</strong>.</td><td>Ich sehe <strong>Sie</strong>.</td></tr>
        <tr><td>Ich danke <strong>ihm</strong>.</td><td>Ich danke <strong>Ihnen</strong>.</td></tr>
      </table>`,
    items: [
      { q: "Wo ist der Brief? Ich lese ___ jetzt.", cue: "it = der Brief", a: "ihn", s: "Wo ist der Brief? Ich lese **ihn** jetzt.", why: "der Brief → den Brief → ihn." },
      { q: "Ich helfe ___ morgen.", cue: "her", a: "ihr", s: "Ich helfe **ihr** morgen.", why: "helfen + dative: her → ihr." },
      { q: "Herr Schmidt, ich danke ___.", cue: "you, formal", a: "Ihnen", s: "Herr Schmidt, ich danke **Ihnen**.", why: "danken + dative, formal → Ihnen." },
      { q: "Ich besuche ___ am Montag.", cue: "him", a: "ihn", s: "Ich besuche **ihn** am Montag.", why: "besuchen is not on the dative list → ihn." },
      { q: "Frau Weber, ich sehe ___ morgen.", cue: "you, formal", a: "Sie", s: "Frau Weber, ich sehe **Sie** morgen.", why: "sehen + accusative. About a man: ihn → formal: Sie." },
      { q: "Das Handy gehört ___.", cue: "her", a: "ihr", s: "Das Handy gehört **ihr**.", why: "gehören + dative. her → ihr (ihnen = them)." },
    ],
  },
  {
    id: "s1",
    group: "Formal Sie",
    title: "Formal Sie drill",
    tip: `<table class="ref">
        <tr><th>About a man</th><th>Formal "you"</th></tr>
        <tr><td>er (subject)</td><td>Sie</td></tr>
        <tr><td>ihn (accusative)</td><td>Sie</td></tr>
        <tr><td>ihm (dative)</td><td>Ihnen</td></tr>
      </table>
      <p>Only the dative is <strong>Ihnen</strong>. Watch the capitals: lowercase <em>sie / ihnen</em> mean "they / them".</p>`,
    items: [
      { q: "Herr Klein, können ___ mir helfen?", cue: "you, formal", a: "Sie", s: "Herr Klein, können **Sie** mir helfen?", why: "'You' is doing the helping → subject → Sie. The dative object is mir." },
      { q: "Frau Weber, ich rufe ___ morgen an.", cue: "you, formal", a: "Sie", s: "Frau Weber, ich rufe **Sie** morgen an.", why: "anrufen takes the accusative → Sie." },
      { q: "Herr Klein, das Buch gehört ___.", cue: "you, formal", a: "Ihnen", s: "Herr Klein, das Buch gehört **Ihnen**.", why: "gehören + dative → Ihnen." },
      { q: "Die Kinder sind laut. Ich höre ___.", cue: "them", a: "sie", s: "Die Kinder sind laut. Ich höre **sie**.", why: "hören + accusative: them → sie (lowercase)." },
      { q: "Frau Bauer, ich verstehe ___ nicht.", cue: "you, formal", a: "Sie", s: "Frau Bauer, ich verstehe **Sie** nicht.", why: "verstehen + accusative → Sie." },
      { q: "Herr Doktor, ich glaube ___.", cue: "you, formal", a: "Ihnen", s: "Herr Doktor, ich glaube **Ihnen**.", why: "glauben is a dative verb → Ihnen." },
      { q: "Meine Eltern kommen morgen. Ich helfe ___.", cue: "them", a: "ihnen", s: "Meine Eltern kommen morgen. Ich helfe **ihnen**.", why: "helfen + dative: them → ihnen (lowercase)." },
      { q: "Frau Weber, gefällt ___ das Hotel?", cue: "you, formal", a: "Ihnen", s: "Frau Weber, gefällt **Ihnen** das Hotel?", why: "gefallen + dative → Ihnen." },
    ],
  },
  {
    id: "s2",
    group: "Formal Sie",
    title: "Short Sie round",
    tip: `<ol>
        <li>Is "you" doing the action? → <strong>Sie</strong></li>
        <li>Otherwise, is the verb on the dative list? → <strong>Ihnen</strong></li>
        <li>Otherwise → <strong>Sie</strong></li>
      </ol>`,
    items: [
      { q: "Herr Braun, ich frage ___ morgen.", cue: "you, formal", a: "Sie", s: "Herr Braun, ich frage **Sie** morgen.", why: "fragen takes the accusative → Sie." },
      { q: "Frau Klein, ich danke ___ für die Hilfe.", cue: "you, formal", a: "Ihnen", s: "Frau Klein, ich danke **Ihnen** für die Hilfe.", why: "danken + dative → Ihnen." },
      { q: "Herr Braun, helfen ___ mir bitte?", cue: "you, formal", a: "Sie", s: "Herr Braun, helfen **Sie** mir bitte?", why: "'You' is the subject → Sie. The dative object is mir." },
      { q: "Frau Klein, ich antworte ___ morgen.", cue: "you, formal", a: "Ihnen", s: "Frau Klein, ich antworte **Ihnen** morgen.", why: "antworten is a dative verb. You give someone an answer → Ihnen." },
    ],
  },

  // --- Possessive pronouns ------------------------------------------------
  {
    id: "p1",
    group: "Possessive pronouns",
    title: "Possessives · Round 1",
    tip: `<p><strong>Step 1:</strong> who owns it? That picks the base word.<br><strong>Step 2:</strong> what is owned? That picks the ending.</p>${POSSESSIVE_TABLE}
      <p>The ending follows the thing, not the owner: <em>his mother</em> = <strong>seine</strong> Mutter.</p>`,
    items: [
      { q: "___ Bruder heißt Max.", cue: "my", a: "Mein", s: "**Mein** Bruder heißt Max.", why: "der Bruder → no ending." },
      { q: "Wo ist ___ Tasche?", cue: "your, informal", a: "deine", s: "Wo ist **deine** Tasche?", why: "die Tasche → -e." },
      { q: "___ Mutter ist Lehrerin.", cue: "his", a: "Seine", s: "**Seine** Mutter ist Lehrerin.", why: "Owner is male → sein. die Mutter → -e." },
      { q: "___ Vater kommt aus Wien.", cue: "her", a: "Ihr", s: "**Ihr** Vater kommt aus Wien.", why: "Owner is female → ihr. der Vater as subject → no ending (ihren is accusative)." },
      { q: "___ Haus ist groß.", cue: "our", a: "Unser", s: "**Unser** Haus ist groß.", why: "das Haus → no ending. The -er belongs to unser itself." },
      { q: "___ Kinder sind laut.", cue: "their", a: "Ihre", s: "**Ihre** Kinder sind laut.", why: "their → ihr (not sein). Plural → -e." },
      { q: "Ist das ___ Auto?", cue: "your, formal", a: "Ihr", s: "Ist das **Ihr** Auto?", why: "Formal Sie → Ihr. das Auto → no ending." },
      { q: "___ Eltern wohnen in Berlin.", cue: "her", a: "Ihre", s: "**Ihre** Eltern wohnen in Berlin.", why: "her → ihr. Plural → -e." },
    ],
  },
  {
    id: "p2",
    group: "Possessive pronouns",
    title: "sein vs. ihr drill",
    tip: `<ul>
        <li><strong>er / es</strong> → <strong>sein</strong></li>
        <li><strong>sie</strong> (she), <strong>sie</strong> (they), <strong>Sie</strong> (formal) → <strong>ihr / Ihr</strong></li>
      </ul>
      <p>Memory hook: German <strong>ihr</strong> sounds and looks like English <strong>her</strong>.</p>
      <p>Talking <em>about</em> Herr Weber → sein. Talking <em>to</em> Herr Weber → Ihr.</p>`,
    items: [
      { q: "Das ist Anna. ___ Bruder ist Arzt.", a: "Ihr", s: "Das ist Anna. **Ihr** Bruder ist Arzt.", why: "Anna = sie → ihr. der Bruder → no ending." },
      { q: "Das ist Thomas. ___ Schwester wohnt in Wien.", a: "Seine", s: "Das ist Thomas. **Seine** Schwester wohnt in Wien.", why: "Thomas = er → sein. die Schwester → -e." },
      { q: "Das sind Lisa und Paul. ___ Haus ist alt.", a: "Ihr", s: "Das sind Lisa und Paul. **Ihr** Haus ist alt.", why: "Lisa und Paul = sie (they) → ihr. das Haus → no ending." },
      { q: "Das ist das Baby. ___ Bett ist klein.", a: "Sein", s: "Das ist das Baby. **Sein** Bett ist klein.", why: "das Baby = es → sein. das Bett → no ending." },
      { q: "Herr Weber, ist das ___ Tasche?", cue: "your, formal", a: "Ihre", s: "Herr Weber, ist das **Ihre** Tasche?", why: "You're talking TO him → Sie → Ihr. die Tasche → -e. (seine = his, about another man)" },
      { q: "Das ist Maria. ___ Eltern sind nett.", a: "Ihre", s: "Das ist Maria. **Ihre** Eltern sind nett.", why: "Maria = sie → ihr. Plural → -e." },
    ],
  },
  {
    id: "p3",
    group: "Possessive pronouns",
    title: "Quick-fire · sein, ihr or Ihr?",
    hint: "Choose the base possessive for this owner",
    tip: `<p>Find the pronoun first, then the possessive follows:</p>
      <ul>
        <li>das Kind → es → <strong>sein</strong> · die Kinder → sie → <strong>ihr</strong></li>
        <li>das Mädchen → es → <strong>sein</strong> (words ending in -chen are always neuter)</li>
      </ul>`,
    items: [
      { q: "Anna", a: "ihr", options: ["sein", "ihr", "Ihr"], s: "Anna → sie → **ihr**" },
      { q: "Peter", a: "sein", options: ["sein", "ihr", "Ihr"], s: "Peter → er → **sein**" },
      { q: "die Kinder", a: "ihr", options: ["sein", "ihr", "Ihr"], s: "die Kinder → sie (plural) → **ihr**", why: "Plural owners always take ihr." },
      { q: "Herr Weber (talking to him)", a: "Ihr", options: ["sein", "ihr", "Ihr"], s: "Herr Weber → Sie → **Ihr**" },
      { q: "Herr Weber (talking about him)", a: "sein", options: ["sein", "ihr", "Ihr"], s: "Herr Weber → er → **sein**" },
      { q: "Maria und Lisa", a: "ihr", options: ["sein", "ihr", "Ihr"], s: "Maria und Lisa → sie (plural) → **ihr**" },
      { q: "das Mädchen", a: "sein", options: ["sein", "ihr", "Ihr"], s: "das Mädchen → es → **sein**", why: "Grammar follows the article das, not the meaning." },
      { q: "Frau Klein (talking to her)", a: "Ihr", options: ["sein", "ihr", "Ihr"], s: "Frau Klein → Sie → **Ihr**" },
    ],
  },
  {
    id: "p4",
    group: "Possessive pronouns",
    title: "Possessives · Accusative",
    tip: `<p>In the accusative only the masculine changes. It gets <strong>-en</strong>, just like <em>den</em>, <em>ihn</em> and <em>einen</em>.</p>
      <table class="ref">
        <tr><th>Thing owned</th><th>Nominative</th><th>Accusative</th></tr>
        <tr><td>der</td><td>mein Vater</td><td><strong>meinen</strong> Vater</td></tr>
        <tr><td>die</td><td>meine Mutter</td><td>meine Mutter</td></tr>
        <tr><td>das</td><td>mein Kind</td><td>mein Kind</td></tr>
        <tr><td>plural</td><td>meine Eltern</td><td>meine Eltern</td></tr>
      </table>
      <ol>
        <li>Who owns it? → mein / dein / sein / ihr / unser / Ihr...</li>
        <li>What gender is the thing owned?</li>
        <li>Is it a masculine accusative object? → add <strong>-en</strong></li>
      </ol>
      <p><em><strong>Mein</strong> Vater sieht mich.</em> (subject) · <em>Ich sehe <strong>meinen</strong> Vater.</em> (object)</p>`,
    items: [
      { q: "Ich sehe ___ Vater.", cue: "my · der Vater", a: "meinen", s: "Ich sehe **meinen** Vater.", why: "The father is the object → accusative. Masculine → -en, like der → den." },
      { q: "Hast du ___ Schlüssel?", cue: "your, informal · der Schlüssel", a: "deinen", s: "Hast du **deinen** Schlüssel?", why: "Masculine object → -en." },
      { q: "Er besucht ___ Mutter.", cue: "his · die Mutter", a: "seine", s: "Er besucht **seine** Mutter.", why: "Owner er → sein. Feminine → -e, the same as in the nominative." },
      { q: "Sie liebt ___ Hund.", cue: "her · der Hund", a: "ihren", s: "Sie liebt **ihren** Hund.", why: "Owner sie → ihr. Masculine object → -en." },
      { q: "Wir verkaufen ___ Auto.", cue: "our · das Auto", a: "unser", s: "Wir verkaufen **unser** Auto.", why: "Neuter doesn't change in the accusative → no ending." },
      { q: "Ich kenne ___ Eltern.", cue: "their · die Eltern", a: "ihre", s: "Ich kenne **ihre** Eltern.", why: "their → ihr (sein is only for er/es). Plural → -e in the nominative and accusative." },
      { q: "Herr Weber, ich habe ___ Koffer.", cue: "your, formal · der Koffer", a: "Ihren", s: "Herr Weber, ich habe **Ihren** Koffer.", why: "Talking to him → Ihr (capital). Masculine object → -en." },
      { q: "Anna sucht ___ Bruder.", cue: "her · der Bruder", a: "ihren", s: "Anna sucht **ihren** Bruder.", why: "Anna = sie → ihr. Masculine object → -en." },
    ],
  },
  {
    id: "p5",
    group: "Possessive pronouns",
    title: "Possessives · Dative",
    tip: `<p>In the dative every gender gets an ending, matching the dative article:</p>
      <table class="ref">
        <tr><th>Thing owned</th><th>Article</th><th>Possessive</th></tr>
        <tr><td>der</td><td>de<strong>m</strong> Vater</td><td>meine<strong>m</strong> Vater</td></tr>
        <tr><td>die</td><td>de<strong>r</strong> Mutter</td><td>meine<strong>r</strong> Mutter</td></tr>
        <tr><td>das</td><td>de<strong>m</strong> Kind</td><td>meine<strong>m</strong> Kind</td></tr>
        <tr><td>plural</td><td>de<strong>n</strong> Kinder<strong>n</strong></td><td>meine<strong>n</strong> Kinder<strong>n</strong></td></tr>
      </table>
      <ul>
        <li>A possessive in the dative is never bare. Plain <em>ihr</em> or <em>sein</em> means an ending is missing.</li>
        <li>Masculine or neuter → <strong>-em</strong>, feminine → <strong>-er</strong>, plural → <strong>-en</strong> (and the noun gets <strong>-n</strong>).</li>
        <li>Dative triggers: dative verbs (<em>helfen, danken, gehören</em>...), the receiver (<em>geben, schenken</em>), and <em>mit, bei, von, zu</em>.</li>
      </ul>`,
    items: [
      { q: "Ich helfe ___ Vater.", cue: "my · der Vater", a: "meinem", s: "Ich helfe **meinem** Vater.", why: "helfen + dative. Masculine: dem → meinem." },
      { q: "Ich wohne bei ___ Mutter.", cue: "my · die Mutter", a: "meiner", s: "Ich wohne bei **meiner** Mutter.", why: "bei + dative. Feminine: der → meiner." },
      { q: "Er spielt mit ___ Kind.", cue: "his · das Kind", a: "seinem", s: "Er spielt mit **seinem** Kind.", why: "Owner er → sein. mit + dative, neuter → -em. (mit ihr = with her, the personal pronoun.)" },
      { q: "Sie schenkt ___ Bruder ein Buch.", cue: "her · der Bruder", a: "ihrem", s: "Sie schenkt **ihrem** Bruder ein Buch.", why: "He receives the book → dative. Masculine → -em." },
      { q: "Wir danken ___ Eltern.", cue: "our · die Eltern", a: "unseren", alt: ["unsren", "unsern"], s: "Wir danken **unseren** Eltern.", why: "danken + dative. Plural → -en. Eltern already ends in n." },
      { q: "Das Auto gehört ___ Schwester.", cue: "his · die Schwester", a: "seiner", s: "Das Auto gehört **seiner** Schwester.", why: "Owner er → sein. gehören + dative, feminine → -er." },
      { q: "Herr Weber, ich spreche mit ___ Frau.", cue: "your, formal · die Frau", a: "Ihrer", s: "Herr Weber, ich spreche mit **Ihrer** Frau.", why: "Talking to him → Ihr (capital). mit + dative, feminine → -er." },
      { q: "Anna fährt mit ___ Kindern.", cue: "her · die Kinder", a: "ihren", s: "Anna fährt mit **ihren** Kindern.", why: "Anna = sie → ihr. Dative plural → -en, and the noun gets -n: Kindern." },
    ],
  },

  // --- Review -------------------------------------------------------------
  {
    id: "m1",
    group: "Review",
    title: "Mixed review",
    tip: `<ol>
        <li>The accusative is the default. Use the dative only for dative verbs, receivers, and after dative prepositions like <em>mit</em>.</li>
        <li>The pronoun matches the article: den → ihn, dem → ihm, dative der → ihr.</li>
        <li>"Him" is never <em>ihr</em>.</li>
        <li>Formal: Sie / Sie / Ihnen / Ihr.</li>
        <li>Two pronouns: the thing before the person.</li>
        <li>er/es → sein; sie, sie (plural), Sie → ihr/Ihr.</li>
      </ol>`,
    items: [
      { q: "Ich sehe ___ morgen.", cue: "him", a: "ihn", s: "Ich sehe **ihn** morgen.", why: "sehen + accusative." },
      { q: "Das ist Anna. ___ Bruder wohnt in Köln.", a: "Ihr", s: "Das ist Anna. **Ihr** Bruder wohnt in Köln.", why: "Anna = sie → ihr." },
      { q: "Herr Braun, ich antworte ___ morgen.", cue: "you, formal", a: "Ihnen", s: "Herr Braun, ich antworte **Ihnen** morgen.", why: "antworten + dative → Ihnen." },
      { q: "Wo ist der Schlüssel? Ich finde ___ nicht.", cue: "it = der Schlüssel", a: "ihn", s: "Wo ist der Schlüssel? Ich finde **ihn** nicht.", why: "den → ihn. Casual speech sometimes uses den here, but the personal pronoun is ihn." },
      { q: "Das ist Thomas. ___ Mutter ist nett.", a: "Seine", s: "Das ist Thomas. **Seine** Mutter ist nett.", why: "Thomas = er → sein. die Mutter → -e." },
      { q: "Kannst du ___ helfen?", cue: "us", a: "uns", s: "Kannst du **uns** helfen?", why: "helfen + dative: uns." },
      { q: "Ich gebe dir **das Buch**. → Ich gebe ___ ___.", a: "es dir", s: "Ich gebe **es dir**.", why: "Two pronouns: the thing before the person." },
      { q: "Die Kinder spielen. ___ Ball ist rot.", a: "Ihr", s: "Die Kinder spielen. **Ihr** Ball ist rot.", why: "die Kinder = sie (plural) → ihr. (deren is a demonstrative.)" },
      { q: "Frau Klein, ich rufe ___ heute an.", cue: "you, formal", a: "Sie", s: "Frau Klein, ich rufe **Sie** heute an.", why: "anrufen + accusative → Sie." },
      { q: "Das Kleid gefällt ___.", cue: "her", a: "ihr", s: "Das Kleid gefällt **ihr**.", why: "gefallen + dative: her → ihr." },
    ],
  },
];

const CHEAT_SHEET = `
  <h3>Personal pronouns</h3>${PRONOUN_TABLE}
  <h3>Rules</h3>
  <ol>
    <li><strong>The accusative is the default.</strong> Use the dative only for dative verbs, for the receiver of something, and after dative prepositions like <em>mit</em>.</li>
    <li><strong>The pronoun matches the article:</strong> den → ihn, dem → ihm, dative der → ihr.</li>
    <li><strong>"Him" is never ihr.</strong></li>
    <li><strong>Formal "you"</strong> = the "they" forms, capitalized: Sie / Sie / Ihnen.</li>
    <li><strong>Two pronouns:</strong> the thing before the person: <em>Ich gebe es dir.</em></li>
  </ol>
  <h3>Dative verbs</h3>${DATIVE_VERBS}
  <h3>Possessive pronouns</h3>${POSSESSIVE_TABLE}
  <p>er / es → <strong>sein</strong> · sie, sie (plural), Sie → <strong>ihr / Ihr</strong></p>
  <h3>Possessive endings by case</h3>${POSSESSIVE_CASES}
  <p>Masculine accusative → <strong>-en</strong>. Dative: masculine/neuter → <strong>-em</strong>, feminine → <strong>-er</strong>, plural → <strong>-en</strong>. A dative possessive is never bare.</p>`;
