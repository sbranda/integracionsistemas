(function () {
  'use strict';

  // ===== Storage helpers =====
  const STORAGE_KEYS = {
    lastTab: 'is_last_tab',
    theme: 'is_theme',
    themeAuto: 'is_theme_auto_done',
    fontScale: 'is_font_scale',
    readNotes: 'is_read_notes',
    casesViewed: 'is_cases_viewed',
    bestScorePractice: 'is_best_score_practice',
    bestScoreExam: 'is_best_score_exam',
    dailyAnswered: 'is_daily_answered_',
    installDismissed: 'is_install_dismissed',
    teacherMode: 'is_teacher_mode',
    glossaryMode: 'is_glossary_mode',
    failedQuestions: 'is_failed_questions'
  };

  function storageGet(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v === null ? fallback : v;
    } catch (e) { return fallback; }
  }
  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }
  function storageRemove(key) {
    try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }

  // ===== Splash screen =====
  const SPLASH_TAGLINES = [
    'Cada sistema que entendés hoy es una app menos que te va a sorprender mañana.',
    'Integrar no es magia: es práctica. ¡Vamos con todo!',
    'Un paso por vez: hoy un concepto, mañana un sistema completo.',
    'Los mejores desarrolladores empezaron exactamente donde estás vos ahora.',
    'Aprender a integrar sistemas es aprender a resolver problemas reales.',
    'Repasá un poco hoy: tu yo del futuro te lo va a agradecer.',
    'Cada API que entendés te acerca a construir algo más grande.',
    '¡Vamos que se puede! Un concepto a la vez.'
  ];

  function initSplash() {
    const splash = document.getElementById('splash');
    const bar = document.getElementById('splash-progress-bar');
    const tagline = document.getElementById('splash-tagline');
    if (!splash) return;
    const DURATION = 5000;
    if (tagline) {
      tagline.textContent = SPLASH_TAGLINES[Math.floor(Math.random() * SPLASH_TAGLINES.length)];
    }
    requestAnimationFrame(function () {
      if (bar) {
        bar.style.transition = 'width ' + DURATION + 'ms linear';
        bar.style.width = '100%';
      }
    });
    setTimeout(function () {
      splash.classList.add('is-hidden');
      setTimeout(function () { splash.remove(); }, 550);
    }, DURATION);
  }

  // ===== Utilities =====
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function highlight(text, term) {
    if (!term) return escapeHtml(text);
    const escaped = escapeHtml(text);
    const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return escaped.replace(new RegExp('(' + safeTerm + ')', 'ig'), '<mark>$1</mark>');
  }
  function shuffledIndexes(n) {
    const arr = [];
    for (let i = 0; i < n; i++) arr.push(i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function hashString(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  }
  function getTodayKey() {
    const d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
  function getWeekKey() {
    const d = new Date();
    const onejan = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    return d.getFullYear() + '-w' + week;
  }

  // ===== Elements =====
  const viewEl = document.getElementById('view');
  const tabs = document.querySelectorAll('.tab');
  const btnScrollTop = document.getElementById('btn-scroll-top');

  // ===== Router =====
  function setActiveTab(name) {
    tabs.forEach(function (t) {
      t.classList.toggle('is-active', t.dataset.tab === name);
    });
  }

  function navigate(name, remember) {
    if (remember !== false) storageSet(STORAGE_KEYS.lastTab, name);
    setActiveTab(name);
    btnScrollTop.hidden = true;
    viewEl.scrollTop = 0;
    if (name === 'notes') renderNotes();
    else if (name === 'quiz') renderQuizIntro();
    else if (name === 'cases') renderCases();
    else if (name === 'glossary') renderGlossary();
    viewEl.focus({ preventScroll: true });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { navigate(t.dataset.tab); });
  });

  // Aplica una animación suave de entrada a la pantalla recién renderizada.
  function animateScreenIn() {
    const el = viewEl.firstElementChild;
    if (el) el.classList.add('screen-fade-in');
  }

  // ===== Accordion toggle helper =====
  function wireAccordionItem(itemEl) {
    const head = itemEl.querySelector('.accordion__head');
    const body = itemEl.querySelector('.accordion__body');
    head.addEventListener('click', function () {
      const expanded = head.getAttribute('aria-expanded') === 'true';
      head.setAttribute('aria-expanded', String(!expanded));
      body.hidden = expanded;
    });
  }

  // Botón "Expandir todo / Contraer todo" para una lista de acordeones.
  function wireToggleAll(listId, buttonId) {
    const list = document.getElementById(listId);
    const btn = document.getElementById(buttonId);
    if (!list || !btn) return;
    btn.addEventListener('click', function () {
      const heads = list.querySelectorAll('.accordion__head');
      const anyCollapsed = Array.from(heads).some(function (h) { return h.getAttribute('aria-expanded') !== 'true'; });
      heads.forEach(function (h) {
        const body = h.parentElement.querySelector('.accordion__body');
        h.setAttribute('aria-expanded', String(anyCollapsed));
        body.hidden = !anyCollapsed;
      });
      btn.textContent = anyCollapsed ? 'Contraer todo' : 'Expandir todo';
      btn.setAttribute('aria-expanded', String(anyCollapsed));
    });
  }

  // ===== Progress tracking =====
  function getReadSet() {
    try { return new Set(JSON.parse(storageGet(STORAGE_KEYS.readNotes, '[]'))); }
    catch (e) { return new Set(); }
  }
  function saveReadSet(set) { storageSet(STORAGE_KEYS.readNotes, JSON.stringify(Array.from(set))); }
  function getCasesViewedSet() {
    try { return new Set(JSON.parse(storageGet(STORAGE_KEYS.casesViewed, '[]'))); }
    catch (e) { return new Set(); }
  }
  function markCaseViewed(id) {
    const set = getCasesViewedSet();
    set.add(id);
    storageSet(STORAGE_KEYS.casesViewed, JSON.stringify(Array.from(set)));
    updateProgressSummary();
  }
  function getFailedSet() {
    try { return new Set(JSON.parse(storageGet(STORAGE_KEYS.failedQuestions, '[]')).map(Number)); }
    catch (e) { return new Set(); }
  }
  function saveFailedSet(set) { storageSet(STORAGE_KEYS.failedQuestions, JSON.stringify(Array.from(set))); }
  function markQuestionResult(qIdx, correct) {
    const set = getFailedSet();
    if (correct) set.delete(qIdx); else set.add(qIdx);
    saveFailedSet(set);
  }

  function getBestScore() {
    const p = storageGet(STORAGE_KEYS.bestScorePractice, null);
    const e = storageGet(STORAGE_KEYS.bestScoreExam, null);
    let best = null;
    if (p !== null && p !== '') best = Number(p);
    if (e !== null && e !== '') best = best === null ? Number(e) : Math.max(best, Number(e));
    return best;
  }

  function updateProgressSummary() {
    const statNotes = document.getElementById('stat-notes-read');
    const statScore = document.getElementById('stat-best-score');
    const statCases = document.getElementById('stat-cases-viewed');
    const readCount = getReadSet().size;
    const casesCount = getCasesViewedSet().size;
    const best = getBestScore();
    if (statNotes) statNotes.textContent = readCount + '/' + NOTES.length;
    if (statCases) statCases.textContent = casesCount + '/' + CASES.length;
    if (statScore) statScore.textContent = best === null ? '—' : best + '/' + QUESTIONS.length;

    const overallEl = document.getElementById('stat-overall-pct');
    const fillEl = document.getElementById('progress-overall-fill');
    if (overallEl && fillEl) {
      const notesPct = NOTES.length ? readCount / NOTES.length : 0;
      const casesPct = CASES.length ? casesCount / CASES.length : 0;
      const quizPct = best !== null && QUESTIONS.length ? best / QUESTIONS.length : 0;
      const overallPct = Math.round(((notesPct + casesPct + quizPct) / 3) * 100);
      overallEl.textContent = overallPct + '%';
      fillEl.style.width = overallPct + '%';
    }
  }

  // ===== Notes tab =====
  function renderNotes() {
    viewEl.innerHTML = '';
    const tpl = document.getElementById('tpl-notes');
    viewEl.appendChild(tpl.content.cloneNode(true));
    animateScreenIn();
    updateProgressSummary();

    document.getElementById('btn-reset-progress').addEventListener('click', function (ev) {
      ev.preventDefault();
      if (window.confirm('¿Reiniciar todo tu progreso guardado (apuntes leídos, casos vistos y mejor puntaje)?')) {
        storageSet(STORAGE_KEYS.readNotes, '[]');
        storageSet(STORAGE_KEYS.casesViewed, '[]');
        storageSet(STORAGE_KEYS.bestScorePractice, '');
        storageSet(STORAGE_KEYS.bestScoreExam, '');
        storageSet(STORAGE_KEYS.failedQuestions, '[]');
        storageRemove(STORAGE_KEYS.dailyAnswered + getTodayKey());
        updateNotesBadge();
        renderNotes();
      }
    });

    document.getElementById('btn-export-notes-pdf').addEventListener('click', function () {
      document.querySelectorAll('#notes-list .accordion__body, #misconceptions-list .accordion__body').forEach(function (b) { b.hidden = false; });
      window.print();
    });

    renderDailyQuestion();

    const readSet = getReadSet();
    const list = document.getElementById('notes-list');
    NOTES.forEach(function (note) {
      const item = document.getElementById('tpl-note-item').content.cloneNode(true);
      const article = item.querySelector('.accordion__item');
      item.querySelector('.note-item__title').textContent = note.title;
      if (note.diagram) {
        const diagramEl = item.querySelector('.note-item__diagram');
        diagramEl.innerHTML = note.diagram;
        diagramEl.hidden = false;
      }
      const bodyEl = item.querySelector('.note-item__body');
      String(note.body).split(/\n\s*\n/).forEach(function (para) {
        const p = document.createElement('p');
        p.textContent = para.replace(/\s+/g, ' ').trim();
        bodyEl.appendChild(p);
      });
      const readBadge = item.querySelector('.note-item__read-badge');
      const checkbox = item.querySelector('.note-item__checkbox');
      const isRead = readSet.has(note.id);
      readBadge.hidden = !isRead;
      checkbox.checked = isRead;
      if (note.resource) {
        const link = item.querySelector('.note-resource');
        link.hidden = false;
        link.href = note.resource.url;
        link.textContent = (note.resource.type === 'video' ? '▶ ' : '📄 ') + note.resource.label;
      }
      checkbox.addEventListener('change', function () {
        const set = getReadSet();
        if (checkbox.checked) set.add(note.id); else set.delete(note.id);
        saveReadSet(set);
        readBadge.hidden = !checkbox.checked;
        updateProgressSummary();
      });
      list.appendChild(item);
      wireAccordionItem(list.lastElementChild);
    });

    const miscList = document.getElementById('misconceptions-list');
    MISCONCEPTIONS.forEach(function (m) {
      const item = document.getElementById('tpl-misconception-item').content.cloneNode(true);
      item.querySelector('.misconception-item__title').textContent = m.title || 'Error común';
      item.querySelector('.misconception-item__text').textContent = m.text;
      miscList.appendChild(item);
      wireAccordionItem(miscList.lastElementChild);
    });

    wireToggleAll('notes-list', 'btn-toggle-notes');
    wireToggleAll('misconceptions-list', 'btn-toggle-misconceptions');
  }

  function updateNotesBadge() {
    const badge = document.getElementById('notes-tab-badge');
    if (!badge) return;
    const todayKey = getTodayKey();
    const answered = storageGet(STORAGE_KEYS.dailyAnswered + todayKey, null);
    badge.hidden = !!answered;
  }

  function renderDailyQuestion() {
    const slot = document.getElementById('daily-slot');
    if (!slot) return;
    const todayKey = getTodayKey();
    const idx = hashString(todayKey) % QUESTIONS.length;
    const question = QUESTIONS[idx];
    const answeredKey = STORAGE_KEYS.dailyAnswered + todayKey;
    const alreadyAnswered = storageGet(answeredKey, null);

    const tpl = document.getElementById('tpl-daily-question').content.cloneNode(true);
    tpl.querySelector('.daily-card__question').textContent = question.q;
    const optsWrap = tpl.querySelector('.daily-card__options');
    const feedback = tpl.querySelector('.daily-card__feedback');
    const order = shuffledIndexes(question.options.length);

    order.forEach(function (optIdx) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option';
      btn.textContent = question.options[optIdx];
      if (alreadyAnswered !== null) {
        btn.disabled = true;
        if (optIdx === question.correct) btn.classList.add('is-correct');
        if (String(optIdx) === alreadyAnswered && optIdx !== question.correct) btn.classList.add('is-wrong');
      }
      btn.addEventListener('click', function () {
        storageSet(answeredKey, String(optIdx));
        updateNotesBadge();
        Array.from(optsWrap.children).forEach(function (b) { b.disabled = true; });
        if (optIdx === question.correct) {
          btn.classList.add('is-correct');
          feedback.textContent = '¡Correcto!';
        } else {
          btn.classList.add('is-wrong');
          const correctBtn = Array.from(optsWrap.children).find(function (b) { return b.textContent === question.options[question.correct]; });
          if (correctBtn) correctBtn.classList.add('is-correct');
          feedback.textContent = 'La respuesta correcta era: ' + question.options[question.correct];
        }
        feedback.hidden = false;
        if (navigator.vibrate) navigator.vibrate(optIdx === question.correct ? 40 : [30, 40, 30]);
      });
      optsWrap.appendChild(btn);
    });

    if (alreadyAnswered !== null) {
      feedback.hidden = false;
      const wasCorrect = Number(alreadyAnswered) === question.correct;
      feedback.textContent = wasCorrect ? '¡Ya respondiste correctamente hoy!' : 'Ya respondiste hoy. La correcta era: ' + question.options[question.correct];
    }

    slot.appendChild(tpl);
  }

  // ===== Cases tab =====
  function renderCases() {
    viewEl.innerHTML = '';
    const tpl = document.getElementById('tpl-cases');
    viewEl.appendChild(tpl.content.cloneNode(true));
    animateScreenIn();

    let teacherMode = storageGet(STORAGE_KEYS.teacherMode, 'false') === 'true';
    const modeBtns = viewEl.querySelectorAll('.mode-toggle__btn');
    function applyMode() {
      modeBtns.forEach(function (b) { b.classList.toggle('is-active', b.dataset.mode === (teacherMode ? 'teacher' : 'student')); });
      viewEl.querySelectorAll('.case__tips').forEach(function (t) { t.hidden = !teacherMode; });
    }
    modeBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        teacherMode = b.dataset.mode === 'teacher';
        storageSet(STORAGE_KEYS.teacherMode, String(teacherMode));
        applyMode();
      });
    });

    renderWeeklyCase();

    const list = document.getElementById('cases-list');
    CASES.forEach(function (c) {
      const item = document.getElementById('tpl-case-item').content.cloneNode(true);
      item.querySelector('.case-item__title').textContent = c.title;
      item.querySelector('.case-item__scenario').textContent = c.scenario;
      const answerToggle = item.querySelector('.case__answer-toggle');
      const answerBox = item.querySelector('.case__answer');
      answerBox.querySelector('p').textContent = c.answer;
      const tipsBox = item.querySelector('.case__tips');
      const tipsUl = tipsBox.querySelector('ul');
      c.tips.forEach(function (tip) {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsUl.appendChild(li);
      });
      answerToggle.addEventListener('click', function () {
        answerBox.hidden = !answerBox.hidden;
        answerToggle.textContent = answerBox.hidden ? 'Ver respuesta sugerida' : 'Ocultar respuesta';
      });
      list.appendChild(item);
      const articleEl = list.lastElementChild;
      wireAccordionItem(articleEl);
      articleEl.querySelector('.accordion__head').addEventListener('click', function () {
        markCaseViewed(c.id);
      });
    });

    wireToggleAll('cases-list', 'btn-toggle-cases');

    applyMode();
  }

  function renderWeeklyCase() {
    const slot = document.getElementById('weekly-case-slot');
    if (!slot) return;
    const weekKey = getWeekKey();
    const idx = hashString(weekKey) % CASES.length;
    const c = CASES[idx];
    const tpl = document.getElementById('tpl-weekly-case').content.cloneNode(true);
    tpl.querySelector('.weekly-card__title').textContent = c.title;
    slot.appendChild(tpl);
  }

  // ===== Glossary tab =====
  let flashIndex = 0;
  let flashOrder = [];

  function renderGlossary() {
    viewEl.innerHTML = '';
    const tpl = document.getElementById('tpl-glossary');
    viewEl.appendChild(tpl.content.cloneNode(true));
    animateScreenIn();

    let mode = storageGet(STORAGE_KEYS.glossaryMode, 'list');
    const modeBtns = viewEl.querySelectorAll('.mode-toggle__btn');
    const listView = document.getElementById('glossary-list-view');
    const cardsView = document.getElementById('glossary-cards-view');
    const searchInput = document.getElementById('glossary-search');

    function applyMode() {
      modeBtns.forEach(function (b) { b.classList.toggle('is-active', b.dataset.mode === mode); });
      listView.hidden = mode !== 'list';
      cardsView.hidden = mode !== 'cards';
      if (mode === 'list') paintGlossaryList(searchInput.value);
      else paintGlossaryCards();
    }
    modeBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        mode = b.dataset.mode;
        storageSet(STORAGE_KEYS.glossaryMode, mode);
        applyMode();
      });
    });

    searchInput.addEventListener('input', function () {
      if (mode === 'list') paintGlossaryList(searchInput.value);
    });

    document.getElementById('btn-export-glossary-pdf').addEventListener('click', function () {
      mode = 'list';
      applyMode();
      window.print();
    });

    function paintGlossaryList(filter) {
      listView.innerHTML = '';
      const ul = document.getElementById('tpl-glossary-list').content.cloneNode(true).querySelector('ul');
      const term = (filter || '').trim().toLowerCase();
      GLOSSARY.filter(function (g) {
        return !term || g.term.toLowerCase().includes(term) || g.def.toLowerCase().includes(term);
      }).forEach(function (g) {
        const li = document.getElementById('tpl-glossary-item').content.cloneNode(true);
        li.querySelector('.glossary-list__term').innerHTML = highlight(g.term, filter);
        li.querySelector('.glossary-list__def').innerHTML = highlight(g.def, filter);
        ul.appendChild(li);
      });
      listView.appendChild(ul);
    }

    function paintGlossaryCards() {
      cardsView.innerHTML = '';
      cardsView.appendChild(document.getElementById('tpl-glossary-cards').content.cloneNode(true));
      if (flashOrder.length !== GLOSSARY.length) flashOrder = shuffledIndexes(GLOSSARY.length);
      flashIndex = 0;
      showFlashcard();

      document.getElementById('flashcard').addEventListener('click', flipFlashcard);
      document.getElementById('btn-flash-flip').addEventListener('click', flipFlashcard);
      document.getElementById('btn-flash-prev').addEventListener('click', function () {
        flashIndex = (flashIndex - 1 + flashOrder.length) % flashOrder.length;
        showFlashcard();
      });
      document.getElementById('btn-flash-next').addEventListener('click', function () {
        flashIndex = (flashIndex + 1) % flashOrder.length;
        showFlashcard();
      });
      document.getElementById('btn-flash-shuffle').addEventListener('click', function () {
        flashOrder = shuffledIndexes(GLOSSARY.length);
        flashIndex = 0;
        showFlashcard();
      });
    }

    function showFlashcard() {
      const g = GLOSSARY[flashOrder[flashIndex]];
      const front = document.querySelector('.flashcard__front');
      const back = document.querySelector('.flashcard__back');
      if (!front) return;
      front.textContent = g.term;
      back.textContent = g.def;
      front.hidden = false;
      back.hidden = true;
      document.getElementById('flashcard-counter').textContent = (flashIndex + 1) + ' / ' + flashOrder.length;
    }
    function flipFlashcard() {
      const front = document.querySelector('.flashcard__front');
      const back = document.querySelector('.flashcard__back');
      if (!front) return;
      front.hidden = !front.hidden;
      back.hidden = !back.hidden;
    }

    applyMode();
  }

  // ===== Quiz =====
  const EXAM_SECONDS = 8 * 60;
  let quizState = null;
  let timerInterval = null;

  function renderQuizIntro() {
    viewEl.innerHTML = '';
    const tpl = document.getElementById('tpl-quiz-intro');
    viewEl.appendChild(tpl.content.cloneNode(true));
    animateScreenIn();
    const best = getBestScore();
    document.getElementById('best-score').textContent = best === null ? '—' : best + '/' + QUESTIONS.length;

    document.getElementById('btn-start-practice').addEventListener('click', function () { startQuiz(false); });
    document.getElementById('btn-start-exam').addEventListener('click', function () { startQuiz(true); });
    document.getElementById('btn-start-review').addEventListener('click', startQuickReview);
  }

  function startQuiz(isExam) {
    const order = shuffledIndexes(QUESTIONS.length);
    quizState = {
      isExam: isExam,
      order: order,
      current: 0,
      answers: [],
      optionOrder: {},
      secondsLeft: EXAM_SECONDS
    };
    order.forEach(function (qIdx) {
      quizState.optionOrder[qIdx] = shuffledIndexes(QUESTIONS[qIdx].options.length);
    });
    renderQuestion();
    if (isExam) startTimer();
  }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
  }

  function updateTimerDisplay() {
    const el = document.getElementById('quiz-timer');
    if (el) el.textContent = '⏱ ' + formatTime(quizState.secondsLeft);
  }

  function startTimer() {
    stopTimer();
    timerInterval = setInterval(function () {
      quizState.secondsLeft--;
      updateTimerDisplay();
      if (quizState.secondsLeft <= 0) {
        stopTimer();
        gradeQuiz();
      }
    }, 1000);
  }
  function stopTimer() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  }

  function renderQuestion() {
    viewEl.innerHTML = '';
    const tpl = document.getElementById('tpl-question');
    viewEl.appendChild(tpl.content.cloneNode(true));
    animateScreenIn();

    const qIdx = quizState.order[quizState.current];
    const question = QUESTIONS[qIdx];
    document.getElementById('quiz-question-counter').textContent = 'Pregunta ' + (quizState.current + 1) + ' de ' + QUESTIONS.length;
    document.getElementById('quiz-question-text').textContent = question.q;
    document.getElementById('quiz-progress-bar').style.width = ((quizState.current) / QUESTIONS.length * 100) + '%';

    const timerEl = document.getElementById('quiz-timer');
    if (quizState.isExam) { timerEl.hidden = false; updateTimerDisplay(); }

    const optsWrap = document.getElementById('quiz-options');
    const order = quizState.optionOrder[qIdx];
    order.forEach(function (optIdx) {
      const btn = document.getElementById('tpl-option').content.cloneNode(true).querySelector('button');
      btn.textContent = question.options[optIdx];
      btn.addEventListener('click', function () { selectAnswer(qIdx, optIdx, btn, optsWrap, question); });
      optsWrap.appendChild(btn);
    });
  }

  function selectAnswer(qIdx, optIdx, btn, optsWrap, question) {
    Array.from(optsWrap.children).forEach(function (b) { b.disabled = true; });
    const isCorrect = optIdx === question.correct;
    btn.classList.add(isCorrect ? 'is-correct' : 'is-wrong');
    if (!isCorrect) {
      const correctBtn = Array.from(optsWrap.children).find(function (b) { return b.textContent === question.options[question.correct]; });
      if (correctBtn) correctBtn.classList.add('is-correct');
    }
    quizState.answers[qIdx] = isCorrect;
    markQuestionResult(qIdx, isCorrect);
    if (navigator.vibrate) navigator.vibrate(isCorrect ? 40 : [30, 40, 30]);
    setTimeout(function () {
      quizState.current++;
      if (quizState.current >= QUESTIONS.length) {
        stopTimer();
        gradeQuiz();
      } else {
        renderQuestion();
      }
    }, quizState.isExam ? 400 : 900);
  }

  function gradeQuiz() {
    const score = Object.values(quizState.answers).filter(Boolean).length;
    const key = quizState.isExam ? STORAGE_KEYS.bestScoreExam : STORAGE_KEYS.bestScorePractice;
    const prev = storageGet(key, null);
    if (prev === null || prev === '' || score > Number(prev)) storageSet(key, String(score));
    renderResult({ score: score, total: QUESTIONS.length, isExam: quizState.isExam });
  }

  function renderResult(data) {
    viewEl.innerHTML = '';
    const tpl = document.getElementById('tpl-result');
    viewEl.appendChild(tpl.content.cloneNode(true));
    animateScreenIn();
    document.getElementById('result-score').textContent = data.score + ' / ' + data.total;
    document.getElementById('result-detail').textContent = data.isExam ? 'Modo examen' : 'Modo práctica';
    document.getElementById('result-title').textContent = data.score === data.total ? '¡Puntaje perfecto! 🎉' : '¡Listo!';

    if (data.score === data.total) {
      celebrateConfetti();
      if (navigator.vibrate) navigator.vibrate([40, 60, 40, 60, 80]);
    }

    document.getElementById('btn-retry').addEventListener('click', renderQuizIntro);
    document.getElementById('btn-share-result').addEventListener('click', function () { shareResult(data); });
  }

  function celebrateConfetti() {
    const colors = ['#f5a623', '#3ecf8e', '#e5484d', '#4a90d9', '#fff'];
    const container = document.createElement('div');
    container.className = 'confetti-container';
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = (Math.random() * 0.6) + 's';
      container.appendChild(piece);
    }
    document.body.appendChild(container);
    setTimeout(function () { container.remove(); }, 3200);
  }

  function shareResult(data) {
    const text = 'Saqué ' + data.score + '/' + data.total + ' en el cuestionario de Integración de Sistemas' + (data.isExam ? ' (modo examen)' : '') + '. ¿Te animás?';
    if (navigator.share) {
      navigator.share({ text: text }).catch(function () {});
    } else {
      navigator.clipboard && navigator.clipboard.writeText(text);
      window.alert('Resultado copiado al portapapeles.');
    }
  }

  // ===== Global search =====
  const searchPanel = document.getElementById('search-panel');
  const searchInputGlobal = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  function openSearch() {
    searchPanel.hidden = false;
    searchInputGlobal.value = '';
    searchResults.innerHTML = '';
    searchInputGlobal.focus();
  }
  function closeSearch() { searchPanel.hidden = true; }

  function buildSnippet(text, term) {
    const idx = text.toLowerCase().indexOf(term.toLowerCase());
    if (idx === -1) return highlight(text.slice(0, 90), term);
    const start = Math.max(0, idx - 40);
    return (start > 0 ? '…' : '') + highlight(text.slice(start, start + 120), term) + '…';
  }

  function paintSearchResults(term) {
    searchResults.innerHTML = '';
    if (!term || term.length < 2) return;
    const t = term.toLowerCase();
    const results = [];

    NOTES.forEach(function (n) {
      if (n.title.toLowerCase().includes(t) || n.body.toLowerCase().includes(t)) {
        results.push({ tag: 'Apunte', title: n.title, snippet: buildSnippet(n.body, term), action: function () { jumpToNote(n.id); } });
      }
    });
    MISCONCEPTIONS.forEach(function (m) {
      if (m.text.toLowerCase().includes(t)) {
        results.push({ tag: 'Error común', title: m.title || 'Error común', snippet: buildSnippet(m.text, term), action: function () { jumpToMisconception(m.id); } });
      }
    });
    CASES.forEach(function (c) {
      if (c.title.toLowerCase().includes(t) || c.scenario.toLowerCase().includes(t)) {
        results.push({ tag: 'Caso', title: c.title, snippet: buildSnippet(c.scenario, term), action: function () { jumpToCase(c.id); } });
      }
    });
    QUESTIONS.forEach(function (q, i) {
      if (q.q.toLowerCase().includes(t)) {
        results.push({ tag: 'Pregunta', title: q.q, snippet: '', action: function () { jumpToQuiz(); } });
      }
    });
    GLOSSARY.forEach(function (g) {
      if (g.term.toLowerCase().includes(t) || g.def.toLowerCase().includes(t)) {
        results.push({ tag: 'Glosario', title: g.term, snippet: buildSnippet(g.def, term), action: function () { navigate('glossary'); closeSearch(); } });
      }
    });

    if (!results.length) {
      searchResults.innerHTML = '<p style="color:var(--text-dim);padding:10px;">Sin resultados.</p>';
      return;
    }
    results.forEach(function (r) {
      const div = document.createElement('div');
      div.className = 'search-result';
      div.innerHTML = '<div class="search-result__tag">' + r.tag + '</div><div>' + highlight(r.title, term) + '</div>' +
        (r.snippet ? '<div style="font-size:12px;color:var(--text-dim);margin-top:4px;">' + r.snippet + '</div>' : '');
      div.addEventListener('click', r.action);
      searchResults.appendChild(div);
    });
  }

  function jumpToNote(id) {
    navigate('notes'); closeSearch();
    setTimeout(function () {
      const items = document.querySelectorAll('#notes-list .accordion__item');
      const idx = NOTES.findIndex(function (n) { return n.id === id; });
      if (items[idx]) {
        items[idx].querySelector('.accordion__head').click();
        items[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }
  function jumpToMisconception(id) {
    navigate('notes'); closeSearch();
    setTimeout(function () {
      const items = document.querySelectorAll('#misconceptions-list .accordion__item');
      const idx = MISCONCEPTIONS.findIndex(function (m) { return m.id === id; });
      if (items[idx]) {
        items[idx].querySelector('.accordion__head').click();
        items[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }
  function jumpToCase(id) {
    navigate('cases'); closeSearch();
    setTimeout(function () {
      const items = document.querySelectorAll('#cases-list .accordion__item');
      const idx = CASES.findIndex(function (c) { return c.id === id; });
      if (items[idx]) {
        items[idx].querySelector('.accordion__head').click();
        items[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }
  function jumpToQuiz() { navigate('quiz'); closeSearch(); }

  document.getElementById('btn-search').addEventListener('click', openSearch);
  document.getElementById('btn-search-close').addEventListener('click', closeSearch);
  searchInputGlobal.addEventListener('input', function () { paintSearchResults(searchInputGlobal.value); });

  // ===== Theme / font panels =====
  const themePanel = document.getElementById('theme-panel');
  const fontPanel = document.getElementById('font-panel');

  function closePanel(panel) { panel.hidden = true; }
  function togglePanel(panel, others) {
    const wasHidden = panel.hidden;
    others.forEach(closePanel);
    panel.hidden = !wasHidden ? true : false;
    panel.hidden = wasHidden ? false : true;
  }

  document.getElementById('btn-theme').addEventListener('click', function () {
    fontPanel.hidden = true;
    themePanel.hidden = !themePanel.hidden;
  });
  document.getElementById('btn-font').addEventListener('click', function () {
    themePanel.hidden = true;
    fontPanel.hidden = !fontPanel.hidden;
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    storageSet(STORAGE_KEYS.theme, theme);
    themePanel.querySelectorAll('.settings-panel__btn').forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.themeChoice === theme);
    });
  }
  themePanel.querySelectorAll('.settings-panel__btn').forEach(function (b) {
    b.addEventListener('click', function () { applyTheme(b.dataset.themeChoice); });
  });

  function applyFontScale(scale) {
    document.documentElement.style.setProperty('--font-scale', scale);
    storageSet(STORAGE_KEYS.fontScale, scale);
    fontPanel.querySelectorAll('.settings-panel__btn').forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.fontChoice === String(scale));
    });
  }
  fontPanel.querySelectorAll('.settings-panel__btn').forEach(function (b) {
    b.addEventListener('click', function () { applyFontScale(b.dataset.fontChoice); });
  });

  // ===== Install banner =====
  let deferredPrompt = null;
  const installBanner = document.getElementById('install-banner');
  const installBannerText = document.getElementById('install-banner-text');
  const btnInstall = document.getElementById('btn-install');
  const btnInstallDismiss = document.getElementById('btn-install-dismiss');

  function isStandaloneDisplay() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }
  function isIosDevice() { return /iphone|ipad|ipod/i.test(navigator.userAgent); }
  function isSafariBrowser() { return /^((?!chrome|android).)*safari/i.test(navigator.userAgent); }

  function dismissInstallBanner() {
    installBanner.hidden = true;
    storageSet(STORAGE_KEYS.installDismissed, getTodayKey());
  }

  function showInstallBanner(mode) {
    if (isStandaloneDisplay()) return;
    if (storageGet(STORAGE_KEYS.installDismissed, '') === getTodayKey()) return;
    if (mode === 'ios') {
      installBannerText.textContent = 'Para instalar: tocá compartir (⬆️) y elegí "Agregar a inicio".';
      btnInstall.hidden = true;
    } else {
      installBannerText.textContent = 'Instalá esta app en tu celular o compu para acceder más rápido.';
      btnInstall.hidden = false;
    }
    installBanner.hidden = false;
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner('android');
  });
  window.addEventListener('appinstalled', function () { installBanner.hidden = true; });

  btnInstall.addEventListener('click', function () {
    installBanner.hidden = true;
    if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; }
  });
  btnInstallDismiss.addEventListener('click', dismissInstallBanner);

  if (isIosDevice() && isSafariBrowser() && !isStandaloneDisplay()) {
    setTimeout(function () { showInstallBanner('ios'); }, 1500);
  }

  // ===== Scroll to top =====
  const SCROLL_TOP_THRESHOLD = 300;
  viewEl.addEventListener('scroll', function () {
    btnScrollTop.hidden = viewEl.scrollTop < SCROLL_TOP_THRESHOLD;
  });
  btnScrollTop.addEventListener('click', function () {
    viewEl.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== Repaso rápido (5 min) =====
  let reviewState = null;

  function buildReviewSteps() {
    const steps = [];
    steps.push({ type: 'intro' });

    shuffledIndexes(NOTES.length).slice(0, 3).forEach(function (i) {
      steps.push({ type: 'note', note: NOTES[i] });
    });

    shuffledIndexes(GLOSSARY.length).slice(0, 4).forEach(function (i) {
      steps.push({ type: 'flash', term: GLOSSARY[i] });
    });

    const failed = Array.from(getFailedSet()).filter(function (i) { return i < QUESTIONS.length; });
    let qIndexes;
    if (failed.length >= 5) {
      qIndexes = shuffledIndexes(failed.length).slice(0, 5).map(function (i) { return failed[i]; });
    } else {
      const failedSet = new Set(failed);
      const extra = shuffledIndexes(QUESTIONS.length).filter(function (i) { return !failedSet.has(i); });
      qIndexes = failed.concat(extra).slice(0, 5);
    }
    qIndexes.forEach(function (i) { steps.push({ type: 'question', qIdx: i }); });

    steps.push({ type: 'end' });
    return steps;
  }

  function startQuickReview() {
    reviewState = { steps: buildReviewSteps(), current: 0 };
    renderReviewStep();
  }

  function nextReviewStep() {
    reviewState.current++;
    renderReviewStep();
  }

  function renderReviewStep() {
    viewEl.innerHTML = '';
    const step = reviewState.steps[reviewState.current];
    const total = reviewState.steps.length;

    const section = document.createElement('section');
    section.className = (step.type === 'intro' || step.type === 'end') ? 'screen screen--center' : 'screen';

    if (step.type !== 'intro' && step.type !== 'end') {
      const progWrap = document.createElement('div');
      progWrap.className = 'quiz-progress';
      const progBar = document.createElement('div');
      progBar.className = 'quiz-progress__bar';
      progBar.style.width = (reviewState.current / (total - 1) * 100) + '%';
      progWrap.appendChild(progBar);
      section.appendChild(progWrap);
    }

    if (step.type === 'intro') {
      const h1 = document.createElement('h1');
      h1.className = 'screen__title';
      h1.textContent = 'Repaso rápido (5 min)';
      const p = document.createElement('p');
      p.className = 'quiz-intro__desc';
      p.textContent = 'Vamos a repasar rápido: algunos conceptos clave, tarjetas del glosario, y preguntas que se te complicaron antes (o al azar, si todavía no fallaste ninguna).';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn--primary btn--block';
      btn.textContent = 'Empezar';
      btn.addEventListener('click', nextReviewStep);
      section.append(h1, p, btn);

    } else if (step.type === 'note') {
      const h1 = document.createElement('h1');
      h1.className = 'screen__title';
      h1.textContent = step.note.title;
      const firstPara = String(step.note.body).split(/\n\s*\n/)[0].replace(/\s+/g, ' ').trim();
      const p = document.createElement('p');
      p.className = 'quiz-intro__desc';
      p.style.textAlign = 'left';
      p.textContent = firstPara;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn--primary btn--block';
      btn.textContent = 'Siguiente';
      btn.addEventListener('click', nextReviewStep);
      section.append(h1, p, btn);

    } else if (step.type === 'flash') {
      const h1 = document.createElement('h1');
      h1.className = 'screen__title';
      h1.textContent = 'Repaso de glosario';
      const card = document.createElement('div');
      card.className = 'flashcard';
      card.style.margin = '10px auto 20px';
      const cardText = document.createElement('div');
      cardText.textContent = step.term.term;
      card.appendChild(cardText);
      let flipped = false;
      card.addEventListener('click', function () {
        flipped = !flipped;
        cardText.textContent = flipped ? step.term.def : step.term.term;
        cardText.style.color = flipped ? 'var(--text-dim)' : 'var(--text)';
        cardText.style.fontWeight = flipped ? '400' : '600';
      });
      const hint = document.createElement('p');
      hint.className = 'quiz-intro__desc';
      hint.textContent = 'Tocá la tarjeta para ver la definición.';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn--primary btn--block';
      btn.textContent = 'Siguiente';
      btn.addEventListener('click', nextReviewStep);
      section.append(h1, card, hint, btn);

    } else if (step.type === 'question') {
      const q = QUESTIONS[step.qIdx];
      const h1 = document.createElement('h1');
      h1.className = 'screen__title';
      h1.textContent = 'Pregunta de repaso';
      const p = document.createElement('p');
      p.className = 'quiz-question';
      p.textContent = q.q;
      const optsWrap = document.createElement('div');
      optsWrap.className = 'quiz-options';
      const order = shuffledIndexes(q.options.length);
      order.forEach(function (optIdx) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'quiz-option';
        b.textContent = q.options[optIdx];
        b.addEventListener('click', function () {
          Array.from(optsWrap.children).forEach(function (c) { c.disabled = true; });
          const correct = optIdx === q.correct;
          b.classList.add(correct ? 'is-correct' : 'is-wrong');
          if (!correct) {
            const correctBtn = Array.from(optsWrap.children).find(function (c) { return c.textContent === q.options[q.correct]; });
            if (correctBtn) correctBtn.classList.add('is-correct');
          }
          markQuestionResult(step.qIdx, correct);
          if (navigator.vibrate) navigator.vibrate(correct ? 40 : [30, 40, 30]);
          setTimeout(nextReviewStep, 900);
        });
        optsWrap.appendChild(b);
      });
      section.append(h1, p, optsWrap);

    } else if (step.type === 'end') {
      const h1 = document.createElement('h1');
      h1.className = 'screen__title';
      h1.textContent = '¡Repaso completo! 🎉';
      const p = document.createElement('p');
      p.className = 'quiz-intro__desc';
      p.textContent = 'Repasaste conceptos clave, términos del glosario y preguntas que se te habían complicado antes.';
      const btn1 = document.createElement('button');
      btn1.type = 'button';
      btn1.className = 'btn btn--primary btn--block';
      btn1.textContent = 'Ir al cuestionario completo';
      btn1.addEventListener('click', function () { navigate('quiz'); });
      const btn2 = document.createElement('button');
      btn2.type = 'button';
      btn2.className = 'btn btn--ghost btn--block';
      btn2.textContent = 'Volver a Apuntes';
      btn2.addEventListener('click', function () { navigate('notes'); });
      section.append(h1, p, btn1, btn2);
    }

    viewEl.appendChild(section);
    animateScreenIn();
  }

  // ===== Startup =====
  function init() {
    initSplash();

    const savedTheme = storageGet(STORAGE_KEYS.theme, null);
    if (savedTheme) {
      applyTheme(savedTheme);
    } else if (storageGet(STORAGE_KEYS.themeAuto, null) === null) {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      applyTheme(prefersLight ? 'light' : 'dark');
      storageSet(STORAGE_KEYS.themeAuto, 'true');
    } else {
      applyTheme('dark');
    }

    const savedScale = storageGet(STORAGE_KEYS.fontScale, '1');
    applyFontScale(savedScale);

    updateNotesBadge();

    const lastTab = storageGet(STORAGE_KEYS.lastTab, 'notes');
    navigate(lastTab, false);

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js').catch(function () {});
      });
    }
  }

  init();
})();
