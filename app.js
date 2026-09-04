// Supported languages: which vocabulary field/sentence to quiz on. The GUI language
// always matches the selected target language (state.targetLang doubles as UI language).
const LANG_META = {
  it: { code: 'it', field: 'italian', sentenceField: 'sentence_it' },
  de: { code: 'de', field: 'german', sentenceField: 'sentence_de' },
  en: { code: 'en', field: 'english', sentenceField: 'sentence_en' }
};

// Display name of each language, as shown in each possible UI language.
const LANG_DISPLAY_NAME = {
  it: { it: 'italiano', de: 'tedesco', en: 'inglese' },
  de: { it: 'Italienisch', de: 'Deutsch', en: 'Englisch' },
  en: { it: 'Italian', de: 'German', en: 'English' }
};

const LANG_FLAG = { it: '🇮🇹', de: '🇩🇪', en: '🇬🇧' };

// Adjective form of "[language] translation" used in the hint sentence, per UI language.
const ADJ_FORM = {
  it: { it: 'italiana', de: 'tedesca', en: 'inglese' },
  de: { it: 'italienische', de: 'deutsche', en: 'englische' },
  en: { it: 'Italian', de: 'German', en: 'English' }
};

// Word-type labels per UI language.
const WORD_TYPE_LABELS = {
  it: {
    noun: 'Sostantivo', verb: 'Verbo', adjective: 'Aggettivo', adverb: 'Avverbio',
    pronoun: 'Pronome', determiner: 'Determinante', conjunction: 'Congiunzione',
    'adverbial phrase': 'Locuzione avverbiale'
  },
  de: {
    noun: 'Substantiv', verb: 'Verb', adjective: 'Adjektiv', adverb: 'Adverb',
    pronoun: 'Pronomen', determiner: 'Artikelwort', conjunction: 'Konjunktion',
    'adverbial phrase': 'Adverbiale Wendung'
  },
  en: {
    noun: 'Noun', verb: 'Verb', adjective: 'Adjective', adverb: 'Adverb',
    pronoun: 'Pronoun', determiner: 'Determiner', conjunction: 'Conjunction',
    'adverbial phrase': 'Adverbial phrase'
  }
};

// Gender-word labels per UI language.
const GENDER_WORDS = {
  it: { masculine: 'maschile', feminine: 'femminile', plural: 'plurale' },
  de: { masculine: 'männlich', feminine: 'weiblich', plural: 'Plural' },
  en: { masculine: 'masculine', feminine: 'feminine', plural: 'plural' }
};

// All other static UI text, per UI language.
const I18N = {
  it: {
    pageTitle: 'Carte di Vocaboli',
    appTitle: 'Carte di Vocaboli',
    subtitleSpanish: 'Spagnolo',
    subtitleSuffix: 'Allenamento del vocabolario',
    statCorrect: 'Corrette:', statIncorrect: 'Sbagliate:', statAccuracy: 'Precisione:', statStreak: 'Serie:',
    titleCorrect: 'Risposte corrette', titleIncorrect: 'Risposte sbagliate',
    titleAccuracy: 'Percentuale di successo', titleStreak: 'Serie attuale',
    langTargetLabel: 'Lingua di destinazione:', typeFilterLabel: 'Filtro per categoria grammaticale:',
    btnSoundText: '🔊 Ascolta', btnSoundTitle: 'Ascolta la pronuncia spagnola',
    btnResetStatsText: 'Reimposta statistiche', btnResetStatsTitle: 'Reimposta le statistiche',
    cardBadgeDefault: 'Categoria', genderBadgeDefault: 'Genere',
    cardProgress: (n) => `Carta #${n}`,
    wordHint: (adjForm) => `Trova la traduzione ${adjForm} corretta con la stessa categoria grammaticale:`,
    sentenceEsLabel: 'Frase in spagnolo',
    sentenceTargetLabel: (langName) => `Frase in ${langName}`,
    btnPlayEsTitle: 'Ascolta la frase in spagnolo',
    btnPlayTargetTitle: (langName) => `Ascolta la frase in ${langName}`,
    btnNextText: 'Prossima carta ➔', keyHintText: '(Barra spaziatrice o Invio)',
    historyTitle: 'Parole recenti',
    historyCount: (n) => `${n} voci`,
    emptyHistory: "Nessuna parola ancora giocata. Scegli un'opzione qui sopra!",
    correctBadge: 'Corretto', incorrectBadge: 'Sbagliato',
    feedbackCorrect: (sym, sp, tgt) => `Ottimo! ${sym}"${sp}" significa "${tgt}".`,
    feedbackIncorrect: (sym, sp, tgt) => `Non proprio. ${sym}"${sp}" significa "${tgt}".`,
    resetConfirm: 'Vuoi davvero azzerare i contatori e la cronologia?',
    typeFilterAll: (n) => `Tutte le categorie (${n} parole)`,
    typeFilterNoun: (n) => `Sostantivi (${n})`,
    typeFilterVerb: (n) => `Verbi (${n})`,
    typeFilterAdjective: (n) => `Aggettivi (${n})`,
    typeFilterAdverb: (n) => `Avverbi (${n})`
  },
  de: {
    pageTitle: 'Wortkarten',
    appTitle: 'Wortkarten',
    subtitleSpanish: 'Spanisch',
    subtitleSuffix: 'Vokabeltraining',
    statCorrect: 'Richtig:', statIncorrect: 'Falsch:', statAccuracy: 'Quote:', statStreak: 'Serie:',
    titleCorrect: 'Richtig beantwortet', titleIncorrect: 'Falsch beantwortet',
    titleAccuracy: 'Trefferquote', titleStreak: 'Aktuelle Serie',
    langTargetLabel: 'Zielsprache:', typeFilterLabel: 'Wortart-Filter:',
    btnSoundText: '🔊 Anhören', btnSoundTitle: 'Spanische Aussprache anhören',
    btnResetStatsText: 'Statistik zurücksetzen', btnResetStatsTitle: 'Statistik zurücksetzen',
    cardBadgeDefault: 'Wortart', genderBadgeDefault: 'Genus',
    cardProgress: (n) => `Karte #${n}`,
    wordHint: (adjForm) => `Finde die passende ${adjForm} Übersetzung mit der gleichen Wortart:`,
    sentenceEsLabel: 'Satz auf Spanisch',
    sentenceTargetLabel: (langName) => `Satz auf ${langName}`,
    btnPlayEsTitle: 'Spanischen Satz anhören',
    btnPlayTargetTitle: (langName) => `Satz auf ${langName} anhören`,
    btnNextText: 'Nächste Karte ➔', keyHintText: '(Leertaste oder Enter)',
    historyTitle: 'Zuletzt geübte Wörter',
    historyCount: (n) => `${n} Einträge`,
    emptyHistory: 'Noch keine Wörter gespielt. Wähle eine Option oben!',
    correctBadge: 'Richtig', incorrectBadge: 'Falsch',
    feedbackCorrect: (sym, sp, tgt) => `Ausgezeichnet! ${sym}"${sp}" bedeutet "${tgt}".`,
    feedbackIncorrect: (sym, sp, tgt) => `Nicht ganz. ${sym}"${sp}" bedeutet "${tgt}".`,
    resetConfirm: 'Möchtest du die bisherigen Zähler und die Historie wirklich zurücksetzen?',
    typeFilterAll: (n) => `Alle Wortarten (${n} Wörter)`,
    typeFilterNoun: (n) => `Substantive (${n})`,
    typeFilterVerb: (n) => `Verben (${n})`,
    typeFilterAdjective: (n) => `Adjektive (${n})`,
    typeFilterAdverb: (n) => `Adverbien (${n})`
  },
  en: {
    pageTitle: 'Word Cards',
    appTitle: 'Word Cards',
    subtitleSpanish: 'Spanish',
    subtitleSuffix: 'Vocabulary training',
    statCorrect: 'Correct:', statIncorrect: 'Incorrect:', statAccuracy: 'Accuracy:', statStreak: 'Streak:',
    titleCorrect: 'Correct answers', titleIncorrect: 'Incorrect answers',
    titleAccuracy: 'Success rate', titleStreak: 'Current streak',
    langTargetLabel: 'Target language:', typeFilterLabel: 'Word-type filter:',
    btnSoundText: '🔊 Listen', btnSoundTitle: 'Listen to Spanish pronunciation',
    btnResetStatsText: 'Reset statistics', btnResetStatsTitle: 'Reset statistics',
    cardBadgeDefault: 'Type', genderBadgeDefault: 'Gender',
    cardProgress: (n) => `Card #${n}`,
    wordHint: (adjForm) => `Find the correct ${adjForm} translation with the same word type:`,
    sentenceEsLabel: 'Sentence in Spanish',
    sentenceTargetLabel: (langName) => `Sentence in ${langName}`,
    btnPlayEsTitle: 'Listen to the Spanish sentence',
    btnPlayTargetTitle: (langName) => `Listen to the ${langName} sentence`,
    btnNextText: 'Next card ➔', keyHintText: '(Spacebar or Enter)',
    historyTitle: 'Recent words',
    historyCount: (n) => `${n} entries`,
    emptyHistory: 'No words played yet. Choose an option above!',
    correctBadge: 'Correct', incorrectBadge: 'Incorrect',
    feedbackCorrect: (sym, sp, tgt) => `Great! ${sym}"${sp}" means "${tgt}".`,
    feedbackIncorrect: (sym, sp, tgt) => `Not quite. ${sym}"${sp}" means "${tgt}".`,
    resetConfirm: 'Do you really want to reset the counters and history?',
    typeFilterAll: (n) => `All types (${n} words)`,
    typeFilterNoun: (n) => `Nouns (${n})`,
    typeFilterVerb: (n) => `Verbs (${n})`,
    typeFilterAdjective: (n) => `Adjectives (${n})`,
    typeFilterAdverb: (n) => `Adverbs (${n})`
  }
};

const TARGET_LANG_KEY = 'spanish_cards_target_lang_v1';

function loadTargetLang() {
  try {
    const saved = localStorage.getItem(TARGET_LANG_KEY);
    if (saved && LANG_META[saved]) return saved;
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return 'it';
}

// State management
let state = {
  allWords: typeof WORDS_DATA !== 'undefined' ? WORDS_DATA : [],
  filteredWords: [],
  currentWord: null,
  currentOptions: [],
  hasAnswered: false,
  selectedFilter: 'all',
  targetLang: loadTargetLang(),

  // Statistics
  stats: {
    correct: 0,
    incorrect: 0,
    streak: 0,
    history: []
  },

  cardCounter: 0
};

// DOM Elements
const el = {
  htmlRoot: document.getElementById('html-root'),
  pageTitle: document.getElementById('page-title'),
  appTitle: document.getElementById('app-title'),
  subtitleSpanish: document.getElementById('subtitle-spanish'),
  subtitleLang: document.getElementById('subtitle-lang'),
  subtitleSuffix: document.getElementById('subtitle-suffix'),
  correctCount: document.getElementById('correct-count'),
  incorrectCount: document.getElementById('incorrect-count'),
  accuracyRate: document.getElementById('accuracy-rate'),
  streakCount: document.getElementById('streak-count'),
  statCorrectPill: document.getElementById('stat-correct-pill'),
  statIncorrectPill: document.getElementById('stat-incorrect-pill'),
  statAccuracyPill: document.getElementById('stat-accuracy-pill'),
  statStreakPill: document.getElementById('stat-streak-pill'),
  statCorrectLabel: document.getElementById('stat-correct-label'),
  statIncorrectLabel: document.getElementById('stat-incorrect-label'),
  statAccuracyLabel: document.getElementById('stat-accuracy-label'),
  statStreakLabel: document.getElementById('stat-streak-label'),
  langTarget: document.getElementById('lang-target'),
  langTargetLabel: document.getElementById('lang-target-label'),
  typeFilter: document.getElementById('type-filter'),
  typeFilterLabel: document.getElementById('type-filter-label'),
  btnResetStats: document.getElementById('btn-reset-stats'),
  btnSound: document.getElementById('btn-sound'),
  cardTypeBadge: document.getElementById('card-type-badge'),
  cardGenderBadge: document.getElementById('card-gender-badge'),
  cardProgress: document.getElementById('card-progress-counter'),
  wordSymbol: document.getElementById('word-symbol'),
  spanishWord: document.getElementById('spanish-word'),
  wordHint: document.getElementById('word-hint'),
  optionsContainer: document.getElementById('options-container'),
  feedbackArea: document.getElementById('feedback-area'),
  feedbackBanner: document.getElementById('feedback-banner'),
  feedbackIcon: document.getElementById('feedback-icon'),
  feedbackText: document.getElementById('feedback-text'),
  sentenceEsLabel: document.getElementById('sentence-es-label'),
  sentenceSpanish: document.getElementById('sentence-spanish'),
  sentenceTargetLabel: document.getElementById('sentence-target-label'),
  sentenceTarget: document.getElementById('sentence-target'),
  btnPlayEs: document.getElementById('btn-play-es'),
  btnPlayTarget: document.getElementById('btn-play-target'),
  detailLabelItalian: document.getElementById('detail-label-italian'),
  detailLabelGerman: document.getElementById('detail-label-german'),
  detailLabelEnglish: document.getElementById('detail-label-english'),
  detailItalian: document.getElementById('detail-italian'),
  detailGerman: document.getElementById('detail-german'),
  detailEnglish: document.getElementById('detail-english'),
  btnNext: document.getElementById('btn-next'),
  btnNextLabel: document.getElementById('btn-next-label'),
  keyHint: document.getElementById('key-hint'),
  historyTitle: document.getElementById('history-title'),
  historyList: document.getElementById('history-list'),
  historyCount: document.getElementById('history-count')
};

// LocalStorage helpers
const STORAGE_KEY = 'spanish_cards_game_stats_v1';

function loadStats() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state.stats = {
        correct: parsed.correct || 0,
        incorrect: parsed.incorrect || 0,
        streak: parsed.streak || 0,
        history: parsed.history || []
      };
    }
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

function saveStats() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.stats));
  } catch (e) {
    console.warn('Could not save stats:', e);
  }
}

function saveTargetLang() {
  try {
    localStorage.setItem(TARGET_LANG_KEY, state.targetLang);
  } catch (e) {
    console.warn('Could not save target language:', e);
  }
}

// Utility: Normalize word type for grouping alternatives
function getNormalizedType(typeStr) {
  if (!typeStr) return 'other';
  const t = typeStr.toLowerCase();
  if (t.includes('noun')) return 'noun';
  if (t.includes('verb')) return 'verb';
  if (t.includes('adverb')) return 'adverb';
  if (t.includes('adj')) return 'adjective';
  if (t.includes('pronoun')) return 'pronoun';
  return t;
}

// Translate a raw type string (possibly "noun / adjective") into the current UI language
function translateType(typeStr) {
  const labels = WORD_TYPE_LABELS[state.targetLang];
  if (!typeStr) return labels.noun;
  return typeStr
    .split('/')
    .map(part => {
      const key = part.trim().toLowerCase();
      return labels[key] || part.trim();
    })
    .join(' / ');
}

// Translate gender strings into the current UI language
function translateGender(genderStr) {
  if (!genderStr || genderStr === '-') return '';
  const words = GENDER_WORDS[state.targetLang];
  return genderStr
    .replace(/masculine/gi, words.masculine)
    .replace(/feminine/gi, words.feminine)
    .replace(/plural/gi, words.plural);
}

// Convert **word** markers in a sentence into underlined HTML (safe: internal data only)
function renderSentenceHTML(sentence) {
  if (!sentence) return '-';
  const escaped = sentence
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped.replace(/\*\*(.+?)\*\*/g, '<u>$1</u>');
}

// Apply every static UI string for the current target/UI language
function applyUILanguage() {
  const t = I18N[state.targetLang];

  el.htmlRoot.lang = state.targetLang;
  el.pageTitle.textContent = t.pageTitle;
  el.appTitle.textContent = t.appTitle;
  el.subtitleSpanish.textContent = t.subtitleSpanish;
  el.subtitleLang.textContent = LANG_DISPLAY_NAME[state.targetLang][state.targetLang].replace(/^./, c => c.toUpperCase());
  el.subtitleSuffix.textContent = t.subtitleSuffix;

  el.statCorrectLabel.textContent = t.statCorrect;
  el.statIncorrectLabel.textContent = t.statIncorrect;
  el.statAccuracyLabel.textContent = t.statAccuracy;
  el.statStreakLabel.textContent = t.statStreak;
  el.statCorrectPill.title = t.titleCorrect;
  el.statIncorrectPill.title = t.titleIncorrect;
  el.statAccuracyPill.title = t.titleAccuracy;
  el.statStreakPill.title = t.titleStreak;

  el.langTargetLabel.textContent = t.langTargetLabel;
  el.typeFilterLabel.textContent = t.typeFilterLabel;

  [...el.langTarget.options].forEach(opt => {
    opt.textContent = `${LANG_FLAG[opt.value]} ${LANG_DISPLAY_NAME[state.targetLang][opt.value].replace(/^./, c => c.toUpperCase())}`;
  });

  el.btnSound.textContent = t.btnSoundText;
  el.btnSound.title = t.btnSoundTitle;
  el.btnResetStats.textContent = t.btnResetStatsText;
  el.btnResetStats.title = t.btnResetStatsTitle;

  el.cardTypeBadge.textContent = state.currentWord ? translateType(state.currentWord.type) : t.cardBadgeDefault;
  el.cardGenderBadge.textContent = t.genderBadgeDefault;

  const targetLangName = LANG_DISPLAY_NAME[state.targetLang][state.targetLang];
  el.wordHint.textContent = t.wordHint(ADJ_FORM[state.targetLang][state.targetLang]);
  el.sentenceEsLabel.textContent = t.sentenceEsLabel;
  el.sentenceTargetLabel.textContent = t.sentenceTargetLabel(targetLangName);
  el.btnPlayEs.title = t.btnPlayEsTitle;
  el.btnPlayEs.setAttribute('aria-label', t.btnPlayEsTitle);
  el.btnPlayTarget.title = t.btnPlayTargetTitle(targetLangName);
  el.btnPlayTarget.setAttribute('aria-label', t.btnPlayTargetTitle(targetLangName));

  el.detailLabelItalian.textContent = `${LANG_DISPLAY_NAME[state.targetLang].it.replace(/^./, c => c.toUpperCase())}:`;
  el.detailLabelGerman.textContent = `${LANG_DISPLAY_NAME[state.targetLang].de.replace(/^./, c => c.toUpperCase())}:`;
  el.detailLabelEnglish.textContent = `${LANG_DISPLAY_NAME[state.targetLang].en.replace(/^./, c => c.toUpperCase())}:`;

  el.btnNextLabel.textContent = t.btnNextText;
  el.keyHint.textContent = t.keyHintText;

  el.historyTitle.textContent = t.historyTitle;

  buildTypeFilterOptions();
  updateStatsUI();
}

// Populate Filter Options (localized, preserves current selection)
function buildTypeFilterOptions() {
  const t = I18N[state.targetLang];
  const typeCounts = {};
  state.allWords.forEach(w => {
    const norm = getNormalizedType(w.type);
    typeCounts[norm] = (typeCounts[norm] || 0) + 1;
  });

  const typeLabels = {
    all: t.typeFilterAll(state.allWords.length),
    noun: t.typeFilterNoun(typeCounts['noun'] || 0),
    verb: t.typeFilterVerb(typeCounts['verb'] || 0),
    adjective: t.typeFilterAdjective(typeCounts['adjective'] || 0),
    adverb: t.typeFilterAdverb(typeCounts['adverb'] || 0)
  };

  const previousValue = el.typeFilter.value || state.selectedFilter;
  el.typeFilter.innerHTML = '';
  for (const [key, label] of Object.entries(typeLabels)) {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = label;
    el.typeFilter.appendChild(opt);
  }
  el.typeFilter.value = previousValue;
}

function initTypeFilter() {
  buildTypeFilterOptions();
  el.typeFilter.addEventListener('change', (e) => {
    state.selectedFilter = e.target.value;
    applyFilter();
    nextQuestion();
  });
}

// Wire the target-language selector (this also drives the whole GUI language)
function initLangTarget() {
  el.langTarget.value = state.targetLang;

  el.langTarget.addEventListener('change', (e) => {
    state.targetLang = e.target.value;
    saveTargetLang();
    applyUILanguage();
    nextQuestion();
  });
}

function applyFilter() {
  if (state.selectedFilter === 'all') {
    state.filteredWords = [...state.allWords];
  } else {
    state.filteredWords = state.allWords.filter(w => getNormalizedType(w.type) === state.selectedFilter);
  }
  if (state.filteredWords.length === 0) {
    state.filteredWords = [...state.allWords];
  }
}

// Select 5 alternatives in the current target language with the same word type
function generateOptions(targetWord) {
  const normType = getNormalizedType(targetWord.type);
  const field = LANG_META[state.targetLang].field;

  // Candidates with same normalized word type, excluding target word itself
  let candidates = state.allWords.filter(w =>
    getNormalizedType(w.type) === normType &&
    w.spanish !== targetWord.spanish &&
    w[field] !== targetWord[field]
  );

  // If not enough candidates with exact same normalized type, fall back to any other words
  if (candidates.length < 4) {
    const fallback = state.allWords.filter(w =>
      w.spanish !== targetWord.spanish &&
      w[field] !== targetWord[field] &&
      !candidates.includes(w)
    );
    candidates = candidates.concat(fallback);
  }

  // Shuffle candidates and pick 4
  const shuffledCandidates = [...candidates].sort(() => 0.5 - Math.random());
  const distractorWords = shuffledCandidates.slice(0, 4);

  // Combine target + 4 distractors = 5 options
  const options = [
    { text: targetWord[field], isCorrect: true, word: targetWord },
    ...distractorWords.map(w => ({ text: w[field], isCorrect: false, word: w }))
  ];

  // Shuffle options so correct answer isn't always in the same position
  return options.sort(() => 0.5 - Math.random());
}

// Audio speech synthesis — pick the best-sounding available voice per language.
// Note: the voice is re-resolved fresh on every call rather than cached, because
// caching a SpeechSynthesisVoice reference across calls is unreliable in Chrome —
// a stale reference silently falls back to the browser's default UI-language voice.

// OS "novelty" persona voices (Apple reuses these names across every language) —
// fun but low-fidelity, so they're actively deprioritized in favor of standard voices.
const NOVELTY_VOICE_NAMES = new Set([
  'eddy', 'flo', 'grandma', 'grandpa', 'reed', 'rocko', 'sandy', 'shelley',
  'albert', 'bad news', 'bahh', 'bells', 'boing', 'bubbles', 'cellos', 'wobble',
  'trinoids', 'whisper', 'zarvox', 'good news', 'jester', 'organ', 'superstar'
]);

// Explicit override: always prefer a voice with one of these names, if present,
// regardless of how its lang tag is reported — the known-good standard voices on
// macOS for each language.
const PREFERRED_VOICE_NAMES = {
  es: ['monica'],
  it: ['alice'],
  de: ['anna'],
  en: ['samantha']
};

const FALLBACK_LANG_TAG = { es: 'es-ES', it: 'it-IT', de: 'de-DE', en: 'en-US' };

function normalizeName(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function pickVoiceForLang(langPrefix) {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();

  const preferredNames = PREFERRED_VOICE_NAMES[langPrefix] || [];
  for (const name of preferredNames) {
    const match = voices.find(v => normalizeName(v.name).includes(name));
    if (match) return match;
  }

  const langVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith(langPrefix));
  if (langVoices.length === 0) return null;

  const scoreVoice = (v) => {
    let score = 0;
    const baseName = v.name.split('(')[0].trim().toLowerCase();
    if (NOVELTY_VOICE_NAMES.has(baseName)) score -= 20;
    if (/natural|neural|premium|enhanced|wavenet/i.test(v.name)) score += 10;
    if (/google/i.test(v.name)) score += 5;
    if (!v.localService) score += 2; // higher-quality voices are often network-hosted
    return score;
  };

  return [...langVoices].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0];
}

// Right after page load, getVoices() can briefly return an empty list before the
// browser populates it — speaking then risks silently falling back to the
// browser's default UI-language voice. Wait for the list instead of guessing.
function withVoicesReady(callback) {
  if (!('speechSynthesis' in window)) return;
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener('voiceschanged', callback, { once: true });
    window.speechSynthesis.getVoices(); // nudge the engine to populate the list
  } else {
    callback();
  }
}

function buildUtterance(text, langPrefix) {
  const voice = pickVoiceForLang(langPrefix);
  const utterance = new SpeechSynthesisUtterance(text);
  if (voice) utterance.voice = voice;
  // Force the canonical lang tag unconditionally — never trust voice.lang, since
  // privacy-hardened browsers (e.g. Brave's fingerprinting protection) can return
  // voice objects with farbled/inconsistent lang values. Setting this explicitly,
  // regardless of whether a matching voice object was found, gives the engine the
  // best chance of selecting the right language and never drifting to the
  // browser's default UI-language voice.
  utterance.lang = FALLBACK_LANG_TAG[langPrefix];
  utterance.rate = 0.92;
  utterance.pitch = 1;
  return utterance;
}

// Strip the **underline** markers used in sentence data before speaking.
function stripSentenceMarkers(sentence) {
  return (sentence || '').replace(/\*\*/g, '');
}

function speakSpanishWord(word) {
  if (!('speechSynthesis' in window)) return;
  withVoicesReady(() => {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(buildUtterance(word, 'es'));
  });
}

// Speak the Spanish sentence followed by the target-language sentence, each in its own voice.
// speechSynthesis queues utterances automatically when speak() is called without an
// intervening cancel(), so the two play back to back.
function speakBilingualSentences(sentenceEs, sentenceTarget, targetLangCode) {
  if (!('speechSynthesis' in window)) return;
  withVoicesReady(() => {
    window.speechSynthesis.cancel();
    if (sentenceEs) window.speechSynthesis.speak(buildUtterance(stripSentenceMarkers(sentenceEs), 'es'));
    if (sentenceTarget) window.speechSynthesis.speak(buildUtterance(stripSentenceMarkers(sentenceTarget), targetLangCode));
  });
}

// Warm up the voice list as early as possible so the first click doesn't race it.
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
}

// Render UI Statistics
function updateStatsUI() {
  const total = state.stats.correct + state.stats.incorrect;
  const rate = total > 0 ? Math.round((state.stats.correct / total) * 100) : 0;

  el.correctCount.textContent = state.stats.correct;
  el.incorrectCount.textContent = state.stats.incorrect;
  el.accuracyRate.textContent = `${rate}%`;
  el.streakCount.textContent = state.stats.streak;

  renderHistory();
}

function renderHistory() {
  const t = I18N[state.targetLang];
  const history = state.stats.history || [];
  el.historyCount.textContent = t.historyCount(history.length);

  if (history.length === 0) {
    el.historyList.innerHTML = `<p class="empty-history-text">${t.emptyHistory}</p>`;
    return;
  }

  el.historyList.innerHTML = history.slice(0, 20).map(item => {
    return `
      <div class="history-row ${item.correct ? 'was-correct' : 'was-incorrect'}">
        <div class="history-words">
          ${item.symbol ? `<span class="hw-symbol">${item.symbol}</span>` : ''}
          <span class="hw-spanish">${item.spanish}</span>
          <span class="hw-arrow">➔</span>
          <span class="hw-german">${item.answer}</span>
          <span class="hw-type">${translateType(item.type)}</span>
        </div>
        <span class="history-badge ${item.correct ? 'badge-success' : 'badge-error'}">
          ${item.correct ? t.correctBadge : t.incorrectBadge}
        </span>
      </div>
    `;
  }).join('');
}

// Pick and display next question
function nextQuestion() {
  const t = I18N[state.targetLang];
  state.hasAnswered = false;
  state.cardCounter++;

  // Pick random word from filtered pool
  const pool = state.filteredWords.length > 0 ? state.filteredWords : state.allWords;
  const randomIndex = Math.floor(Math.random() * pool.length);
  state.currentWord = pool[randomIndex];

  const word = state.currentWord;
  state.currentOptions = generateOptions(word);

  // Update card UI
  el.cardProgress.textContent = t.cardProgress(state.cardCounter);
  el.cardTypeBadge.textContent = translateType(word.type);
  el.wordHint.textContent = t.wordHint(ADJ_FORM[state.targetLang][state.targetLang]);
  el.sentenceTargetLabel.textContent = t.sentenceTargetLabel(LANG_DISPLAY_NAME[state.targetLang][state.targetLang]);

  const genderLabel = translateGender(word.gender);
  if (genderLabel) {
    el.cardGenderBadge.textContent = genderLabel;
    el.cardGenderBadge.style.display = 'inline-block';
  } else {
    el.cardGenderBadge.style.display = 'none';
  }

  // Symbol display for nouns, verbs, adjectives
  const normType = getNormalizedType(word.type);
  const isSymbolType = ['noun', 'verb', 'adjective'].includes(normType);
  if (isSymbolType && word.symbol) {
    el.wordSymbol.textContent = word.symbol;
    el.wordSymbol.style.display = 'flex';
  } else {
    el.wordSymbol.textContent = '';
    el.wordSymbol.style.display = 'none';
  }

  el.spanishWord.textContent = word.spanish;

  // Render 5 alternative buttons
  el.optionsContainer.innerHTML = '';
  state.currentOptions.forEach((option, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.setAttribute('data-index', idx);
    btn.innerHTML = `
      <span class="option-index">${idx + 1}</span>
      <span class="option-text">${option.text}</span>
    `;
    btn.addEventListener('click', () => handleOptionSelect(idx));
    el.optionsContainer.appendChild(btn);
  });

  // Hide feedback area
  el.feedbackArea.classList.add('hidden');
}

// Handle User Click on Option
function handleOptionSelect(selectedIndex) {
  if (state.hasAnswered) return;
  state.hasAnswered = true;

  const t = I18N[state.targetLang];
  const chosenOption = state.currentOptions[selectedIndex];
  const isCorrect = chosenOption.isCorrect;
  const word = state.currentWord;
  const meta = LANG_META[state.targetLang];
  const targetText = word[meta.field];

  // Update stats
  if (isCorrect) {
    state.stats.correct++;
    state.stats.streak++;
  } else {
    state.stats.incorrect++;
    state.stats.streak = 0;
  }

  // Record history (most recent first)
  state.stats.history.unshift({
    spanish: word.spanish,
    answer: targetText,
    type: word.type,
    symbol: word.symbol || '',
    chosen: chosenOption.text,
    correct: isCorrect,
    timestamp: Date.now()
  });

  saveStats();
  updateStatsUI();

  // Style buttons
  const buttons = el.optionsContainer.querySelectorAll('.option-btn');
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    const opt = state.currentOptions[idx];
    if (opt.isCorrect) {
      btn.classList.add('correct');
    } else if (idx === selectedIndex) {
      btn.classList.add('incorrect');
    } else {
      btn.classList.add('dimmed');
    }
  });

  // Display Feedback banner & details
  el.feedbackArea.classList.remove('hidden');
  const symbolPrefix = word.symbol ? word.symbol + ' ' : '';
  if (isCorrect) {
    el.feedbackBanner.className = 'feedback-banner correct';
    el.feedbackIcon.textContent = '✓';
    el.feedbackText.textContent = t.feedbackCorrect(symbolPrefix, word.spanish, targetText);
  } else {
    el.feedbackBanner.className = 'feedback-banner incorrect';
    el.feedbackIcon.textContent = '✗';
    el.feedbackText.textContent = t.feedbackIncorrect(symbolPrefix, word.spanish, targetText);
  }

  el.sentenceSpanish.innerHTML = renderSentenceHTML(word.sentence_es);
  el.sentenceTarget.innerHTML = renderSentenceHTML(word[meta.sentenceField]);

  el.detailItalian.textContent = word.italian || '-';
  el.detailGerman.textContent = word.german || '-';
  el.detailEnglish.textContent = word.english || '-';

  // Automatically read the full example sentence aloud, Spanish then target language,
  // each with its own voice.
  speakBilingualSentences(word.sentence_es, word[meta.sentenceField], meta.code);
}

// Keyboard navigation (1-5 for options, Space/Enter for Next)
function handleKeydown(e) {
  if (e.target.tagName === 'SELECT') return;

  const key = e.key;

  // Numbers 1 to 5 to select options
  if (['1', '2', '3', '4', '5'].includes(key) && !state.hasAnswered) {
    const idx = parseInt(key, 10) - 1;
    if (idx >= 0 && idx < state.currentOptions.length) {
      handleOptionSelect(idx);
    }
  }

  // Space or Enter to trigger Next question when answered
  if ((key === ' ' || key === 'Enter') && state.hasAnswered) {
    e.preventDefault();
    nextQuestion();
  }
}

// Reset stats
function resetStats() {
  const t = I18N[state.targetLang];
  if (confirm(t.resetConfirm)) {
    state.stats = {
      correct: 0,
      incorrect: 0,
      streak: 0,
      history: []
    };
    saveStats();
    updateStatsUI();
  }
}

// Event Listeners
function initEventListeners() {
  el.btnNext.addEventListener('click', nextQuestion);
  el.btnResetStats.addEventListener('click', resetStats);
  el.btnSound.addEventListener('click', () => {
    if (state.currentWord) {
      speakSpanishWord(state.currentWord.spanish);
    }
  });
  el.btnPlayEs.addEventListener('click', () => {
    if (state.currentWord) {
      speakBilingualSentences(state.currentWord.sentence_es, null, LANG_META[state.targetLang].code);
    }
  });
  el.btnPlayTarget.addEventListener('click', () => {
    if (state.currentWord) {
      const meta = LANG_META[state.targetLang];
      speakBilingualSentences(null, state.currentWord[meta.sentenceField], meta.code);
    }
  });
  window.addEventListener('keydown', handleKeydown);
}

// Initialization
function init() {
  loadStats();
  initLangTarget();
  initTypeFilter();
  applyUILanguage();
  applyFilter();
  initEventListeners();
  updateStatsUI();
  nextQuestion();
}

document.addEventListener('DOMContentLoaded', init);
