(() => {
  const viewEl = document.getElementById('view');
  const tabs = [...document.querySelectorAll('.tab')];

  const templates = {
    notes: document.getElementById('tpl-notes'),
    quizIntro: document.getElementById('tpl-quiz-intro'),
    question: document.getElementById('tpl-question'),
    result: document.getElementById('tpl-result'),
    glossary: document.getElementById('tpl-glossary'),
    noteItem: document.getElementById('tpl-note-item'),
    glossaryItem: document.getElementById('tpl-glossary-item'),
    option: document.getElementById('tpl-option'),
    cases: document.getElementById('tpl-cases'),
    caseItem: document.getElementById('tpl-case-item'),
  };

  // ---------------------------------------------------------------------
  // Almacenamiento local (mejor puntaje + última pestaña visitada).
  // Todo envuelto en try/catch por si el navegador bloquea localStorage.
  // ---------------------------------------------------------------------
  const STORAGE_KEYS = { lastTab: 'is-app:last-tab', bestScore: 'is-app:best-score' };

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
      container.querySelectorAll('.accordion__head').forEach((head) => {
        head.setAttribute('aria-expanded', String(expand));
        head.nextElementSibling.hidden = !expand;
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
  function renderNotes() {
    const node = templates.notes.content.cloneNode(true);
    const list = node.querySelector('#notes-list');
    const toggleBtn = node.querySelector('.btn-toggle-all');

    NOTES.forEach((note) => {
      const item = templates.noteItem.content.cloneNode(true);
      const head = item.querySelector('.accordion__head');
      const title = item.querySelector('.accordion__title');
      const body = item.querySelector('.accordion__body');
      const p = item.querySelector('.accordion__body p');

      title.textContent = note.title;
      p.textContent = note.body;

      head.addEventListener('click', () => {
        const expanded = head.getAttribute('aria-expanded') === 'true';
        head.setAttribute('aria-expanded', String(!expanded));
        body.hidden = expanded;
      });

      list.appendChild(item);
    });

    viewEl.appendChild(node);
    wireToggleAll(document.getElementById('notes-list'), document.querySelector('#view .btn-toggle-all'));
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
  }

  // ---------------------------------------------------------------------
  // Glosario (con búsqueda y resaltado de coincidencias)
  // ---------------------------------------------------------------------
  function renderGlossary() {
    const node = templates.glossary.content.cloneNode(true);
    viewEl.appendChild(node);

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

  // ---------------------------------------------------------------------
  // Cuestionario
  // ---------------------------------------------------------------------
  let current = 0;
  const answers = {};

  function getBestScore() {
    const raw = storageGet(STORAGE_KEYS.bestScore);
    return raw ? parseInt(raw, 10) : null;
  }

  function renderQuizIntro() {
    Object.keys(answers).forEach((k) => delete answers[k]);
    current = 0;
    const node = templates.quizIntro.content.cloneNode(true);
    viewEl.appendChild(node);

    const best = getBestScore();
    const bestEl = document.getElementById('best-score');
    if (best !== null) {
      bestEl.innerHTML = `Tu mejor puntaje: <strong>${best} / ${QUESTIONS.length}</strong>`;
      bestEl.hidden = false;
    }

    document.getElementById('btn-start-quiz').addEventListener('click', renderQuestion);
  }

  function renderQuestion() {
    const q = QUESTIONS[current];
    const node = templates.question.content.cloneNode(true);

    node.querySelector('.q-index').textContent = String(current + 1).padStart(2, '0');
    node.querySelector('.q-total').textContent = String(QUESTIONS.length).padStart(2, '0');
    node.querySelector('.question__text').textContent = q.text;

    const list = node.querySelector('.options');
    q.options.forEach((optText, idx) => {
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

    btnPrev.disabled = current === 0;
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
