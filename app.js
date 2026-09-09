(() => {
  const viewEl = document.getElementById('view');
  const tabs = [...document.querySelectorAll('.tab')];

  const templates = {
    notes: document.getElementById('tpl-notes'),
    quizIntro: document.getElementById('tpl-quiz-intro'),
    question: document.getElementById('tpl-question'),
    result: document.getElementById('tpl-result'),
    glossary: document.getElementById('tpl-glossary'),
    glossaryList: document.getElementById('tpl-glossary-list'),
    glossaryCards: document.getElementById('tpl-glossary-cards'),
    noteItem: document.getElementById('tpl-note-item'),
    glossaryItem: document.getElementById('tpl-glossary-item'),
    option: document.getElementById('tpl-option'),
    cases: document.getElementById('tpl-cases'),
    caseItem: document.getElementById('tpl-case-item'),
    dailyQuestion: document.getElementById('tpl-daily-question'),
    weeklyCase: document.getElementById('tpl-weekly-case'),
  };

  // ---------------------------------------------------------------------
  // Almacenamiento local (mejor puntaje + última pestaña visitada).
  // Todo envuelto en try/catch por si el navegador bloquea localStorage.
  // ---------------------------------------------------------------------
  const STORAGE_KEYS = { lastTab: 'is-app:last-tab', bestScore: 'is-app:best-score', dailyAnswer: 'is-app:daily-answer', notesRead: 'is-app:notes-read' };

  function storageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* silencioso: la app funciona igual sin persistencia */
    }
  }

  // ---------------------------------------------------------------------
  // Router simple entre pestañas
  // ---------------------------------------------------------------------
  function setActiveTab(name) {
    tabs.forEach((t) => {
      const active = t.dataset.view === name;
      t.setAttribute('aria-current', active ? 'page' : 'false');
    });
  }

  function navigate(name, remember = true) {
    stopTimer();
    setActiveTab(name);
    viewEl.innerHTML = '';
    viewEl.scrollTop = 0;
    if (remember) storageSet(STORAGE_KEYS.lastTab, name);

    if (name === 'notes') renderNotes();
    else if (name === 'quiz') renderQuizIntro();
    else if (name === 'glossary') renderGlossary();
    else if (name === 'cases') renderCases();

    const heading = viewEl.querySelector('h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }

  tabs.forEach((t) => t.addEventListener('click', () => navigate(t.dataset.view)));

  // ---------------------------------------------------------------------
  // Utilidad: resaltar coincidencias de búsqueda dentro de un texto
  // ---------------------------------------------------------------------
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function highlight(text, query) {
    if (!query) return escapeHtml(text);
    const safeText = escapeHtml(text);
    const safeQuery = escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return safeText.replace(new RegExp(`(${safeQuery})`, 'ig'), '<mark>$1</mark>');
  }

  // ---------------------------------------------------------------------
  // Acordeones con soporte de "expandir/colapsar todo"
  // ---------------------------------------------------------------------
  function wireToggleAll(container, button) {
    function setAll(expand) {
      container
        .querySelectorAll('.accordion__head[aria-expanded], .accordion__toggle[aria-expanded]')
        .forEach((el) => {
          el.setAttribute('aria-expanded', String(expand));
          const item = el.closest('.accordion__item');
          const body = item ? item.querySelector('.accordion__body') : null;
          if (body) body.hidden = !expand;
        });
      button.textContent = expand ? 'Colapsar todo' : 'Expandir todo';
      button.dataset.expanded = String(expand);
    }

    button.dataset.expanded = 'false';
    button.addEventListener('click', () => {
      setAll(button.dataset.expanded !== 'true');
    });
  }

  // ---------------------------------------------------------------------
  // Apuntes (acordeón)
  // ---------------------------------------------------------------------
  function getReadSet() {
    try {
      const raw = JSON.parse(storageGet(STORAGE_KEYS.notesRead) || '[]');
      return new Set(Array.isArray(raw) ? raw : []);
    } catch (e) {
      return new Set();
    }
  }

  function saveReadSet(set) {
    storageSet(STORAGE_KEYS.notesRead, JSON.stringify([...set]));
  }

  function updateNotesProgress(readSet) {
    const progressEl = document.getElementById('notes-progress');
    if (!progressEl) return;
    progressEl.textContent = `${readSet.size} / ${NOTES.length} leídos`;
  }

  function renderNotes() {
    viewEl.innerHTML = '';
    const node = templates.notes.content.cloneNode(true);
    const list = node.querySelector('#notes-list');
    const readSet = getReadSet();

    NOTES.forEach((note) => {
      const item = templates.noteItem.content.cloneNode(true);
      const li = item.querySelector('.accordion__item');
      const check = item.querySelector('.note-check');
      const toggle = item.querySelector('.accordion__toggle');
      const title = item.querySelector('.accordion__title');
      const body = item.querySelector('.accordion__body');
      const p = item.querySelector('.accordion__body p');

      title.textContent = note.title;
      p.textContent = note.body;

      const isRead = readSet.has(note.id);
      check.setAttribute('aria-checked', String(isRead));
      li.classList.toggle('accordion__item--read', isRead);

      check.addEventListener('click', () => {
        const currentlyRead = check.getAttribute('aria-checked') === 'true';
        const nextRead = !currentlyRead;
        check.setAttribute('aria-checked', String(nextRead));
        li.classList.toggle('accordion__item--read', nextRead);

        const set = getReadSet();
        if (nextRead) set.add(note.id);
        else set.delete(note.id);
        saveReadSet(set);
        updateNotesProgress(set);
      });

      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        body.hidden = expanded;
      });

      list.appendChild(item);
    });

    viewEl.appendChild(node);
    updateNotesProgress(readSet);
    wireToggleAll(document.getElementById('notes-list'), document.querySelector('#view .btn-toggle-all'));
    renderDailyQuestion();
  }

  // ---------------------------------------------------------------------
  // Pregunta del día: se elige a partir de la fecha, así es la misma
  // durante todo el día en este dispositivo, y cambia al día siguiente.
  // ---------------------------------------------------------------------
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function renderDailyQuestion() {
    const slot = document.getElementById('daily-slot');
    if (!slot) return;
    slot.innerHTML = '';

    const todayKey = getTodayKey();
    const qIndex = hashString(todayKey) % QUESTIONS.length;
    const question = QUESTIONS[qIndex];

    const node = templates.dailyQuestion.content.cloneNode(true);
    slot.appendChild(node);

    const textEl = slot.querySelector('.daily__text');
    const optionsEl = slot.querySelector('.daily__options');
    const feedbackEl = slot.querySelector('.daily__feedback');
    textEl.textContent = question.text;

    let stored = null;
    try {
      stored = JSON.parse(storageGet(STORAGE_KEYS.dailyAnswer) || 'null');
    } catch (e) {
      stored = null;
    }
    const alreadyAnswered = stored && stored.date === todayKey;

    question.options.forEach((optText, idx) => {
      const opt = templates.option.content.cloneNode(true);
      const li = opt.querySelector('.option');
      li.querySelector('.option__label').textContent = optText;

      if (alreadyAnswered) {
        li.classList.add('option--disabled');
        if (idx === question.correctIndex) li.classList.add('option--correct');
        if (idx === stored.chosenIndex && idx !== question.correctIndex) li.classList.add('option--incorrect');
      } else {
        li.addEventListener('click', () => {
          storageSet(STORAGE_KEYS.dailyAnswer, JSON.stringify({ date: todayKey, chosenIndex: idx }));
          renderDailyQuestion();
        });
      }
      optionsEl.appendChild(opt);
    });

    if (alreadyAnswered) {
      const isCorrect = stored.chosenIndex === question.correctIndex;
      feedbackEl.hidden = false;
      feedbackEl.textContent = isCorrect
        ? 'Ya la respondiste hoy — ¡acertaste!'
        : 'Ya la respondiste hoy — la correcta era otra opción.';
      feedbackEl.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
    }
  }

  // ---------------------------------------------------------------------
  // Casos para debatir en clase
  // ---------------------------------------------------------------------
  function renderCases() {
    const node = templates.cases.content.cloneNode(true);
    const list = node.querySelector('#cases-list');

    CASES.forEach((c) => {
      const item = templates.caseItem.content.cloneNode(true);
      const head = item.querySelector('.accordion__head');
      const title = item.querySelector('.accordion__title');
      const body = item.querySelector('.accordion__body');
      const scenario = item.querySelector('.case__scenario');
      const questionsList = item.querySelector('.case__questions');
      const answerToggle = item.querySelector('.case__answer-toggle');
      const answerBox = item.querySelector('.case__answer');
      const answerText = item.querySelector('.case__answer-text');

      title.textContent = c.title;
      scenario.textContent = c.scenario;
      c.questions.forEach((q) => {
        const li = document.createElement('li');
        li.textContent = q;
        questionsList.appendChild(li);
      });
      answerText.textContent = c.answer;

      head.addEventListener('click', () => {
        const expanded = head.getAttribute('aria-expanded') === 'true';
        head.setAttribute('aria-expanded', String(!expanded));
        body.hidden = expanded;
      });

      answerToggle.addEventListener('click', () => {
        const shown = answerToggle.getAttribute('aria-expanded') === 'true';
        answerToggle.setAttribute('aria-expanded', String(!shown));
        answerBox.hidden = shown;
        answerToggle.textContent = shown ? 'Ver respuesta sugerida' : 'Ocultar respuesta sugerida';
      });

      list.appendChild(item);
    });

    viewEl.appendChild(node);
    wireToggleAll(document.getElementById('cases-list'), document.querySelector('#view .btn-toggle-all'));
    renderWeeklyCase();
  }

  // ---------------------------------------------------------------------
  // Caso de la semana: se elige según la semana actual (cambia cada lunes),
  // usando el mismo esquema de hash que la pregunta del día.
  // ---------------------------------------------------------------------
  function getWeekKey() {
    const d = new Date();
    const dayIndex = (d.getDay() + 6) % 7; // 0 = lunes
    const monday = new Date(d);
    monday.setDate(d.getDate() - dayIndex);
    return `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`;
  }

  function renderWeeklyCase() {
    const slot = document.getElementById('weekly-case-slot');
    if (!slot) return;
    slot.innerHTML = '';

    const weekKey = getWeekKey();
    const cIndex = hashString(`week-${weekKey}`) % CASES.length;
    const c = CASES[cIndex];

    const node = templates.weeklyCase.content.cloneNode(true);
    slot.appendChild(node);

    slot.querySelector('.weekly-case__title').textContent = c.title;
    slot.querySelector('.weekly-case__scenario').textContent = c.scenario;

    const questionsList = slot.querySelector('.case__questions');
    c.questions.forEach((q) => {
      const li = document.createElement('li');
      li.textContent = q;
      questionsList.appendChild(li);
    });

    const answerToggle = slot.querySelector('.case__answer-toggle');
    const answerBox = slot.querySelector('.case__answer');
    slot.querySelector('.case__answer-text').textContent = c.answer;

    answerToggle.addEventListener('click', () => {
      const shown = answerToggle.getAttribute('aria-expanded') === 'true';
      answerToggle.setAttribute('aria-expanded', String(!shown));
      answerBox.hidden = shown;
      answerToggle.textContent = shown ? 'Ver respuesta sugerida' : 'Ocultar respuesta sugerida';
    });
  }

  // ---------------------------------------------------------------------
  // Glosario: modo lista (con búsqueda) y modo tarjetas (flashcards)
  // ---------------------------------------------------------------------
  const GLOSSARY_MODE_KEY = 'is-app:glossary-mode';

  function renderGlossary() {
    const node = templates.glossary.content.cloneNode(true);
    viewEl.appendChild(node);

    const savedMode = storageGet(GLOSSARY_MODE_KEY);
    let mode = savedMode === 'cards' ? 'cards' : 'list';

    const toggleBtns = [...document.querySelectorAll('.mode-toggle__btn')];

    function setMode(newMode) {
      mode = newMode;
      storageSet(GLOSSARY_MODE_KEY, mode);
      toggleBtns.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.mode === mode)));
      const body = document.getElementById('glossary-body');
      body.innerHTML = '';
      if (mode === 'list') renderGlossaryList(body);
      else renderGlossaryCards(body);
    }

    toggleBtns.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode)));
    setMode(mode);
  }

  function renderGlossaryList(container) {
    const node = templates.glossaryList.content.cloneNode(true);
    container.appendChild(node);

    const search = document.getElementById('glossary-search');
    const list = document.getElementById('glossary-list');

    function paint(filter) {
      list.innerHTML = '';
      const q = filter.trim();
      const qLower = q.toLowerCase();
      const filtered = GLOSSARY.filter(
        (g) => g.term.toLowerCase().includes(qLower) || g.def.toLowerCase().includes(qLower)
      );

      if (filtered.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'glossary-empty';
        empty.textContent = 'No se encontraron términos.';
        list.appendChild(empty);
        return;
      }

      filtered.forEach((g) => {
        const item = templates.glossaryItem.content.cloneNode(true);
        item.querySelector('.glossary-item__term').innerHTML = highlight(g.term, q);
        item.querySelector('.glossary-item__def').innerHTML = highlight(g.def, q);
        list.appendChild(item);
      });
    }

    search.addEventListener('input', () => paint(search.value));
    paint('');
  }

  let flashOrder = GLOSSARY.map((_, i) => i);
  let flashIndex = 0;

  function renderGlossaryCards(container) {
    const node = templates.glossaryCards.content.cloneNode(true);
    container.appendChild(node);

    if (flashIndex >= flashOrder.length) flashIndex = 0;

    function paintCard() {
      const term = GLOSSARY[flashOrder[flashIndex]];
      const card = document.getElementById('flash-card');
      card.classList.remove('is-flipped');
      document.querySelector('.flash-card__term').textContent = term.term;
      document.querySelector('.flash-card__def').textContent = term.def;
      document.querySelector('.flash-index').textContent = flashIndex + 1;
      document.querySelector('.flash-total').textContent = flashOrder.length;
    }

    function flip() {
      document.getElementById('flash-card').classList.toggle('is-flipped');
    }

    document.getElementById('flash-card').addEventListener('click', flip);
    document.getElementById('flash-card').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip();
      }
    });

    document.getElementById('flash-prev').addEventListener('click', () => {
      flashIndex = (flashIndex - 1 + flashOrder.length) % flashOrder.length;
      paintCard();
    });

    document.getElementById('flash-next').addEventListener('click', () => {
      flashIndex = (flashIndex + 1) % flashOrder.length;
      paintCard();
    });

    document.getElementById('flash-shuffle').addEventListener('click', () => {
      flashOrder = shuffledIndexes(GLOSSARY.length);
      flashIndex = 0;
      paintCard();
    });

    paintCard();
  }

  // ---------------------------------------------------------------------
  // Cuestionario (con modo práctica y modo examen)
  // ---------------------------------------------------------------------
  let current = 0;
  const answers = {};
  let optionOrder = {};
  let examMode = false;
  let timeLeft = 0;
  let timerInterval = null;
  let timedOut = false;
  const EXAM_SECONDS = 8 * 60; // 8 minutos

  function getBestScore() {
    const raw = storageGet(STORAGE_KEYS.bestScore);
    return raw ? parseInt(raw, 10) : null;
  }

  // Fisher-Yates: devuelve un nuevo arreglo con los índices mezclados
  function shuffledIndexes(length) {
    const arr = Array.from({ length }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateTimerDisplay() {
    const el = document.getElementById('quiz-timer');
    if (!el) return;
    el.textContent = formatTime(Math.max(timeLeft, 0));
    el.classList.toggle('quiz-timer--warning', timeLeft <= 60);
  }

  function startTimer() {
    stopTimer();
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      timeLeft -= 1;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        stopTimer();
        timedOut = true;
        renderResult(gradeQuiz());
      }
    }, 1000);
  }

  function renderQuizIntro() {
    stopTimer();
    Object.keys(answers).forEach((k) => delete answers[k]);
    current = 0;
    examMode = false;
    timedOut = false;

    viewEl.innerHTML = '';
    const node = templates.quizIntro.content.cloneNode(true);
    viewEl.appendChild(node);

    const best = getBestScore();
    const bestEl = document.getElementById('best-score');
    if (best !== null) {
      bestEl.innerHTML = `Tu mejor puntaje: <strong>${best} / ${QUESTIONS.length}</strong>`;
      bestEl.hidden = false;
    }

    document.getElementById('btn-start-practice').addEventListener('click', () => startQuiz(false));
    document.getElementById('btn-start-exam').addEventListener('click', () => startQuiz(true));
  }

  function startQuiz(isExam) {
    examMode = isExam;
    current = 0;
    Object.keys(answers).forEach((k) => delete answers[k]);
    optionOrder = {};
    QUESTIONS.forEach((q) => {
      optionOrder[q.id] = shuffledIndexes(q.options.length);
    });
    if (examMode) {
      timeLeft = EXAM_SECONDS;
    }
    renderQuestion();
    if (examMode) startTimer();
  }

  function renderQuestion() {
    const q = QUESTIONS[current];
    const node = templates.question.content.cloneNode(true);

    node.querySelector('.q-index').textContent = String(current + 1).padStart(2, '0');
    node.querySelector('.q-total').textContent = String(QUESTIONS.length).padStart(2, '0');
    node.querySelector('.question__text').textContent = q.text;

    const list = node.querySelector('.options');
    const order = optionOrder[q.id] || q.options.map((_, i) => i);
    order.forEach((idx) => {
      const optText = q.options[idx];
      const opt = templates.option.content.cloneNode(true);
      const li = opt.querySelector('.option');
      li.querySelector('.option__label').textContent = optText;
      const isSelected = answers[q.id] === idx;
      li.setAttribute('aria-selected', String(isSelected));

      const select = () => {
        answers[q.id] = idx;
        renderQuestion();
      };
      li.addEventListener('click', select);
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          select();
        }
      });

      list.appendChild(opt);
    });

    viewEl.innerHTML = '';
    viewEl.appendChild(node);

    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const fill = document.getElementById('progress-fill');
    const timerEl = document.getElementById('quiz-timer');

    if (examMode) {
      timerEl.hidden = false;
      updateTimerDisplay();
      btnPrev.hidden = true;
    } else {
      timerEl.hidden = true;
      btnPrev.hidden = false;
      btnPrev.disabled = current === 0;
    }

    btnNext.textContent = current === QUESTIONS.length - 1 ? 'Finalizar' : 'Siguiente';
    btnNext.disabled = answers[q.id] === undefined;
    fill.style.width = `${Math.round((Object.keys(answers).length / QUESTIONS.length) * 100)}%`;

    btnPrev.addEventListener('click', () => {
      if (current > 0) {
        current -= 1;
        renderQuestion();
      }
    });

    btnNext.addEventListener('click', () => {
      if (current < QUESTIONS.length - 1) {
        current += 1;
        renderQuestion();
      } else {
        stopTimer();
        renderResult(gradeQuiz());
      }
    });
  }

  function gradeQuiz() {
    let score = 0;
    const results = QUESTIONS.map((q) => {
      const chosenIdx = answers[q.id];
      const isCorrect = chosenIdx === q.correctIndex;
      if (isCorrect) score += 1;
      return {
        text: q.text,
        isCorrect,
        chosenText: chosenIdx !== undefined ? q.options[chosenIdx] : null,
        correctText: q.options[q.correctIndex],
      };
    });
    const total = QUESTIONS.length;

    const prevBest = getBestScore();
    if (prevBest === null || score > prevBest) {
      storageSet(STORAGE_KEYS.bestScore, String(score));
    }

    return { score, total, percentage: Math.round((score / total) * 100), results };
  }

  function renderResult(data) {
    const node = templates.result.content.cloneNode(true);
    node.querySelector('.result__score-num').textContent = data.score;
    node.querySelector('.result__score-den').textContent = `/${data.total}`;
    node.querySelector('.result__pct').textContent = `${data.percentage}% de aciertos`;

    if (timedOut) {
      node.querySelector('#result-timeout-note').hidden = false;
    }

    const list = node.querySelector('.result__list');
    data.results.forEach((r, i) => {
      const li = document.createElement('li');

      const row = document.createElement('div');
      row.className = 'tag-row';
      const tag = document.createElement('span');
      tag.className = `tag ${r.isCorrect ? 'tag--ok' : 'tag--no'}`;
      tag.textContent = r.isCorrect ? 'CORRECTA' : 'INCORRECTA';
      const label = document.createElement('span');
      label.textContent = `Pregunta ${i + 1}`;
      row.appendChild(tag);
      row.appendChild(label);
      li.appendChild(row);

      if (!r.isCorrect) {
        const detail = document.createElement('span');
        detail.className = 'review-answer';
        detail.innerHTML =
          `Tu respuesta: <span class="is-wrong">${escapeHtml(r.chosenText ?? '(sin responder)')}</span><br>` +
          `Respuesta correcta: <span class="is-right">${escapeHtml(r.correctText)}</span>`;
        li.appendChild(detail);
      }

      list.appendChild(li);
    });

    viewEl.innerHTML = '';
    viewEl.appendChild(node);

    document.getElementById('btn-retry').addEventListener('click', renderQuizIntro);
  }

  // ---------------------------------------------------------------------
  // Arranque: recuerda la última pestaña visitada
  // ---------------------------------------------------------------------
  const savedTab = storageGet(STORAGE_KEYS.lastTab);
  const validTabs = ['notes', 'quiz', 'glossary', 'cases'];
  navigate(validTabs.includes(savedTab) ? savedTab : 'notes', false);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = new URL('service-worker.js', document.baseURI);
      navigator.serviceWorker.register(swUrl, { scope: './' }).catch(() => {});
    });
  }
})();
