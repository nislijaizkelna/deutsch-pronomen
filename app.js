const appEl = document.getElementById("app");
const QUESTIONS_PER_TEST = 10;

let quizQuestions = [];
let currentIndex = 0;
let score = 0;
let streak = 0;
let testBestStreak = 0;
let bestStreak = Number(localStorage.getItem("de-quiz-best-streak") || 0);
let answered = false;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/[.,!?]/g, "")
    .replace(/\s+/g, " ");
}

function isCorrectAnswer(question, given) {
  const candidates = [question.answer, ...(question.altAnswers || [])];
  const normGiven = normalize(given);
  return candidates.some((c) => normalize(c) === normGiven);
}

function startQuiz() {
  quizQuestions = shuffle(QUESTIONS).slice(0, QUESTIONS_PER_TEST);
  currentIndex = 0;
  score = 0;
  streak = 0;
  testBestStreak = 0;
  renderQuestion();
}

function renderHeader() {
  return `
    <header>
      <h1>Personalpronomen 🇩🇪</h1>
      <p>Nominativ · Akkusativ · Dativ · Genitiv · Futur I — ${QUESTIONS.length.toLocaleString()} questions</p>
    </header>
  `;
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
    const opts = shuffle(q.options);
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
        <input type="text" id="typeInput" placeholder="Type your answer..." autofocus />
        <button type="submit" class="submit-btn" id="submitBtn">Check</button>
      </form>
      <div class="feedback" id="feedback"></div>
      <button class="next-btn" id="nextBtn">Next →</button>
    `;
  }

  appEl.innerHTML = `
    ${renderHeader()}
    ${renderStats()}
    <div class="card">
      <span class="category-tag">${escapeHtml(q.category)}</span>
      <p class="direction-hint">${hint}</p>
      <p class="prompt">${escapeHtml(q.prompt)}</p>
      ${bodyHtml}
    </div>
    <footer>Made to help learn German, one word at a time.</footer>
  `;

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

  showFeedback(correct, q);
}

function handleTypeAnswer(q) {
  if (answered) return;
  answered = true;

  const input = document.getElementById("typeInput");
  const given = input.value;
  const correct = isCorrectAnswer(q, given);

  input.disabled = true;
  input.classList.add(correct ? "correct" : "wrong");
  document.getElementById("submitBtn").disabled = true;

  showFeedback(correct, q);
}

function showFeedback(correct, q) {
  const feedbackEl = document.getElementById("feedback");
  if (correct) {
    score++;
    streak++;
    testBestStreak = Math.max(testBestStreak, streak);
    bestStreak = Math.max(bestStreak, streak);
    localStorage.setItem("de-quiz-best-streak", String(bestStreak));
    feedbackEl.textContent = "✓ Correct!";
    feedbackEl.className = "feedback correct";
  } else {
    streak = 0;
    feedbackEl.textContent = `✗ Correct answer: ${q.answer}`;
    feedbackEl.className = "feedback wrong";
  }
  document.getElementById("nextBtn").classList.add("show");
}

function nextQuestion() {
  currentIndex++;
  renderQuestion();
}

function renderSummary() {
  const pct = Math.round((score / quizQuestions.length) * 100);
  appEl.innerHTML = `
    ${renderHeader()}
    <div class="card summary">
      <p>Quiz complete!</p>
      <div class="score">${score} / ${quizQuestions.length}</div>
      <p>${pct}% correct · Best streak this test: ${testBestStreak}</p>
      <p>All-time best streak: ${bestStreak}</p>
      <button class="restart-btn" id="restartBtn">Practice again</button>
    </div>
    <footer>Made to help learn German, one word at a time.</footer>
  `;
  document.getElementById("restartBtn").addEventListener("click", startQuiz);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

startQuiz();
