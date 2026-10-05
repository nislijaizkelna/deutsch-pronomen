const appEl = document.getElementById("app");
const QUESTIONS_PER_TEST = 10;

let quizQuestions = [];
let currentIndex = 0;
let score = 0;
let streak = 0;
let testBestStreak = 0;
let bestStreak = Number(storageGet("de-quiz-best-streak") || 0);
let answered = false;
let currentLesson = null; // null = random quiz
let mistakes = [];

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode); scores just won't persist.
  }
}

function getLessonBest() {
  try {
    return JSON.parse(storageGet("de-quiz-lesson-best") || "{}");
  } catch {
    return {};
  }
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(str, keepCase = false) {
  const s = keepCase ? str.trim() : str.trim().toLowerCase();
  return s
    .replace(/ß/g, "ss")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/Ä/g, "A")
    .replace(/Ö/g, "O")
    .replace(/Ü/g, "U")
    .replace(/[.,!?]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function lowerFirst(s) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

// caseMode: undefined = ignore case, "exact" = case matters (sie ≠ Sie),
// "sentence" = case matters except for the first letter of the sentence.
function isCorrectAnswer(question, given) {
  const candidates = [question.answer, ...(question.altAnswers || [])];
  const norm = (s) => {
    if (question.caseMode === "exact") return normalize(s, true);
    if (question.caseMode === "sentence") return lowerFirst(normalize(s, true));
    return normalize(s);
  };
  const normGiven = norm(given);
  return candidates.some((c) => norm(c) === normGiven);
}

function lessonQuestions(lesson) {
  return lesson.items.map((item) => {
    let caseMode;
    if (lesson.translate) caseMode = "sentence";
    else if (item.options || !/(^|[.!?]\s+)___/.test(item.q)) caseMode = "exact";
    return {
      category: lesson.group,
      type: item.options ? "mc" : "type",
      hint: lesson.hint || (item.options ? "Choose the correct answer" : "Fill in the missing word"),
      prompt: item.q,
      promptHtml:
        formatMarked(item.q, "strong") +
        (item.cue ? ` <span class="cue">(${escapeHtml(item.cue)})</span>` : ""),
      answer: item.a,
      altAnswers: item.alt,
      options: item.options,
      keepOrder: true,
      sentence: item.s,
      why: item.why,
      caseMode,
    };
  });
}

function show(html) {
  appEl.innerHTML = html;
  window.scrollTo(0, 0);
  const menuBtn = document.getElementById("menuBtn");
  if (menuBtn) menuBtn.addEventListener("click", renderHome);
  const cheatLink = document.getElementById("cheatLink");
  cheatLink.addEventListener("click", (e) => {
    // Reuses one named window; if popups are blocked the link opens a tab instead.
    const win = window.open(cheatLink.href, "cheatsheet", "popup,width=560,height=820");
    if (win) {
      e.preventDefault();
      win.focus();
    }
  });
}

function startQuiz() {
  currentLesson = null;
  quizQuestions = shuffle(QUESTIONS).slice(0, QUESTIONS_PER_TEST);
  resetProgress();
  renderQuestion();
}

function startLesson(lesson) {
  currentLesson = lesson;
  quizQuestions = lessonQuestions(lesson);
  resetProgress();
  renderQuestion();
}

function resetProgress() {
  currentIndex = 0;
  score = 0;
  streak = 0;
  testBestStreak = 0;
  mistakes = [];
}

// topic: which cheat sheet section fits the current screen (an id from CHEAT_SECTIONS, or "all").
function renderHeader(topic = "all") {
  return `
    <header>
      <h1>Personalpronomen 🇩🇪</h1>
      <p>Nominativ · Akkusativ · Dativ · Genitiv · Possessiv · Reflexiv · Futur I</p>
      <a class="cheat-link" id="cheatLink" href="cheatsheet.html?v=7#${topic}" target="cheatsheet">📋 Cheat sheet</a>
    </header>
  `;
}

function lessonTopic(lesson) {
  return CHEAT_TOPIC_BY_GROUP[lesson.group] || "all";
}

// Random quiz questions only reveal the topic, never the case.
function questionTopic(q) {
  if (currentLesson) return lessonTopic(currentLesson);
  return q.category === "Future (Futur I)" ? "futur" : "pronouns";
}

function renderFooter() {
  return `<footer>Made to help learn German, one word at a time.</footer>`;
}

function renderNav() {
  return `<button class="back-link" id="menuBtn">← Menu</button>`;
}

function renderHome() {
  currentLesson = null;
  const best = getLessonBest();
  const groups = [];
  LESSONS.forEach((lesson) => {
    let group = groups.find((g) => g.name === lesson.group);
    if (!group) groups.push((group = { name: lesson.group, lessons: [] }));
    group.lessons.push(lesson);
  });

  show(`
    ${renderHeader()}
    <div class="card menu-card">
      <h2>Lessons</h2>
      <p class="muted">The practice rounds from our sessions, with the correct sentence and an explanation after every answer.</p>
      ${groups
        .map(
          (g) => `
        <h3 class="group-title">${escapeHtml(g.name)}</h3>
        <div class="lesson-list">
          ${g.lessons
            .map((l) => {
              const b = best[l.id];
              const meta = b != null ? `Best ${b} / ${l.items.length}` : `${l.items.length} questions`;
              return `
                <button class="lesson-btn" data-id="${l.id}">
                  <span>${escapeHtml(l.title)}</span>
                  <span class="lesson-meta">${meta}</span>
                </button>`;
            })
            .join("")}
        </div>`
        )
        .join("")}
    </div>
    <div class="card menu-card">
      <h2>Random quiz</h2>
      <p class="muted">${QUESTIONS_PER_TEST} random questions from ${QUESTIONS.length.toLocaleString()} generated sentences, covering every case plus Futur I.</p>
      <button class="restart-btn" id="randomBtn">Start random quiz</button>
    </div>
    ${renderFooter()}
  `);

  document.getElementById("randomBtn").addEventListener("click", startQuiz);
  document.querySelectorAll(".lesson-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      renderLessonIntro(LESSONS.find((l) => l.id === btn.dataset.id));
    });
  });
}

function renderLessonIntro(lesson) {
  show(`
    ${renderHeader(lessonTopic(lesson))}
    ${renderNav()}
    <div class="card">
      <span class="category-tag">${escapeHtml(lesson.group)}</span>
      <h2 class="lesson-heading">${escapeHtml(lesson.title)}</h2>
      <div class="tip">${lesson.tip}</div>
      <button class="restart-btn" id="startBtn">Start · ${lesson.items.length} questions</button>
    </div>
    ${renderFooter()}
  `);
  document.getElementById("startBtn").addEventListener("click", () => startLesson(lesson));
}

function renderStats() {
  const pct = quizQuestions.length ? (currentIndex / quizQuestions.length) * 100 : 0;
  return `
    <div class="stats">
      <span>Question ${Math.min(currentIndex + 1, quizQuestions.length)} / ${quizQuestions.length}</span>
      <span class="streak">🔥 ${streak}</span>
    </div>
    <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
  `;
}

function renderQuestion() {
  answered = false;

  if (currentIndex >= quizQuestions.length) {
    renderSummary();
    return;
  }

  const q = quizQuestions[currentIndex];
  const hint = q.hint || (q.direction === "de-en" ? "Translate to English" : "Translate to German");

  let bodyHtml;
  if (q.type === "mc") {
    const opts = q.keepOrder ? q.options : shuffle(q.options);
    bodyHtml = `
      <div class="options">
        ${opts
          .map(
            (opt) =>
              `<button class="option" data-value="${escapeHtml(opt)}">${escapeHtml(opt)}</button>`
          )
          .join("")}
      </div>
      <div class="feedback" id="feedback"></div>
      <button class="next-btn" id="nextBtn">Next →</button>
    `;
  } else {
    bodyHtml = `
      <form class="type-form" id="typeForm" autocomplete="off">
        <input type="text" id="typeInput" placeholder="Type your answer..." autocapitalize="off" autocorrect="off" spellcheck="false" autofocus />
        <button type="submit" class="submit-btn" id="submitBtn">Check</button>
      </form>
      <div class="feedback" id="feedback"></div>
      <button class="next-btn" id="nextBtn">Next →</button>
    `;
  }

  show(`
    ${renderHeader(questionTopic(q))}
    ${renderNav()}
    ${renderStats()}
    <div class="card">
      <span class="category-tag">${escapeHtml(topicLabel(questionTopic(q), q))}</span>
      <p class="direction-hint">${hint}</p>
      <p class="prompt">${q.promptHtml || escapeHtml(q.prompt)}</p>
      ${bodyHtml}
    </div>
    ${renderFooter()}
  `);

  if (q.type === "mc") {
    document.querySelectorAll(".option").forEach((btn) => {
      btn.addEventListener("click", () => handleMcAnswer(btn, q));
    });
  } else {
    const form = document.getElementById("typeForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleTypeAnswer(q);
    });
    document.getElementById("typeInput").focus();
  }

  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
}

function handleMcAnswer(btn, q) {
  if (answered) return;
  answered = true;

  const given = btn.dataset.value;
  const correct = isCorrectAnswer(q, given);

  document.querySelectorAll(".option").forEach((b) => {
    b.disabled = true;
    if (isCorrectAnswer(q, b.dataset.value)) {
      b.classList.add("correct");
    } else if (b === btn) {
      b.classList.add("wrong");
    }
  });

  showFeedback(correct, q, given);
}

function handleTypeAnswer(q) {
  if (answered) return;

  const input = document.getElementById("typeInput");
  const given = input.value;
  if (!given.trim()) return;
  answered = true;

  const correct = isCorrectAnswer(q, given);

  input.disabled = true;
  input.classList.add(correct ? "correct" : "wrong");
  document.getElementById("submitBtn").disabled = true;

  showFeedback(correct, q, given);
}

function showFeedback(correct, q, given) {
  const feedbackEl = document.getElementById("feedback");
  if (correct) {
    score++;
    streak++;
    testBestStreak = Math.max(testBestStreak, streak);
    bestStreak = Math.max(bestStreak, streak);
    storageSet("de-quiz-best-streak", String(bestStreak));
    feedbackEl.textContent = "✓ Correct!";
    feedbackEl.className = "feedback correct";
  } else {
    streak = 0;
    mistakes.push({ q, given });
    feedbackEl.textContent = `✗ Correct answer: ${q.answer}`;
    feedbackEl.className = "feedback wrong";
  }
  const sentence = modelSentence(q);
  if (sentence || q.why) {
    feedbackEl.insertAdjacentHTML("afterend", renderExplanation({ sentence, why: q.why }));
  }
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.classList.add("show");
  nextBtn.focus();
}

// The correct sentence with the answer marked. Lessons provide one; for generated
// fill-in-the-blank questions ("Ich liebe ___. (I love you.)") it's built by filling the blank.
function modelSentence(q) {
  if (q.sentence) return q.sentence;
  if (!q.prompt.includes("___")) return null;
  const german = q.prompt.split(" (")[0];
  return german.replace("___", `**${q.answer}**`);
}

function renderExplanation(q) {
  return `
    <div class="explain">
      ${q.sentence ? `<p class="model">${formatMarked(q.sentence, "mark")}</p>` : ""}
      ${q.why ? `<p class="why">${escapeHtml(q.why)}</p>` : ""}
    </div>
  `;
}

function nextQuestion() {
  currentIndex++;
  renderQuestion();
}

function renderSummary() {
  const pct = Math.round((score / quizQuestions.length) * 100);

  if (currentLesson) {
    const best = getLessonBest();
    best[currentLesson.id] = Math.max(best[currentLesson.id] || 0, score);
    storageSet("de-quiz-lesson-best", JSON.stringify(best));
  }

  const reviewHtml = mistakes.length
    ? `
      <div class="review">
        <h3>Review your mistakes (${mistakes.length})</h3>
        ${mistakes
          .map(({ q, given }) => {
            const sentence = modelSentence(q);
            return `
          <div class="review-item">
            <p class="review-prompt">${q.promptHtml || escapeHtml(q.prompt)}</p>
            <p class="review-given">✗ Your answer: <span>${escapeHtml(given)}</span></p>
            <p class="review-correct">✓ Correct: <strong>${escapeHtml(q.answer)}</strong></p>
            ${sentence || q.why ? renderExplanation({ sentence, why: q.why }) : ""}
          </div>`;
          })
          .join("")}
      </div>`
    : `<p class="perfect">No mistakes. Perfekt! 🎉</p>`;

  show(`
    ${renderHeader(currentLesson ? lessonTopic(currentLesson) : "all")}
    <div class="card summary">
      <p>${currentLesson ? escapeHtml(currentLesson.title) : "Quiz"} complete!</p>
      <div class="score">${score} / ${quizQuestions.length}</div>
      <p>${pct}% correct · Best streak this test: ${testBestStreak}</p>
      <p>All-time best streak: ${bestStreak}</p>
      ${reviewHtml}
      <button class="restart-btn" id="restartBtn">Practice again</button>
      <button class="secondary-btn" id="homeBtn">Back to menu</button>
    </div>
    ${renderFooter()}
  `);
  document.getElementById("restartBtn").addEventListener("click", () => {
    if (currentLesson) startLesson(currentLesson);
    else startQuiz();
  });
  document.getElementById("homeBtn").addEventListener("click", renderHome);
}

function topicLabel(topic, q) {
  if (currentLesson) return q.category;
  const section = CHEAT_SECTIONS.find((sec) => sec.id === topic);
  return section ? section.title : "Random quiz";
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Escapes text, then turns **word** into <tag>word</tag>.
function formatMarked(str, tag) {
  return escapeHtml(str).replace(/\*\*(.+?)\*\*/g, `<${tag}>$1</${tag}>`);
}

renderHome();
