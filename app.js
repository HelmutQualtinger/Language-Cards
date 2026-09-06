// Supported languages: which vocabulary field/sentence to quiz on. The GUI language
// always matches the selected target language (state.targetLang doubles as UI language).
const LANG_META = {
  es: { code: 'es', field: 'spanish', sentenceField: 'sentence_es' },
  it: { code: 'it', field: 'italian', sentenceField: 'sentence_it' },
  de: { code: 'de', field: 'german', sentenceField: 'sentence_de' },
  en: { code: 'en', field: 'english', sentenceField: 'sentence_en' },
  fr: { code: 'fr', field: 'french', sentenceField: 'sentence_fr' },
  hu: { code: 'hu', field: 'hungarian', sentenceField: 'sentence_hu' },
  ga: { code: 'ga', field: 'irish', sentenceField: 'sentence_ga' }
};

// Target language is restricted to these (the UI is only translated into these six);
// Spanish can only ever be the source, never the target/UI language.
const TARGET_LANG_OPTIONS = ['it', 'de', 'en', 'fr', 'hu', 'ga'];

// The "word details" reveal panel shows every language except whichever is currently
// the source (that one is already visible as the question itself). Order matches the
// card's own field order in WORDS_DATA.
const DETAIL_LANGS = ['es', 'it', 'de', 'en', 'fr', 'hu', 'ga'];
const DETAIL_LANG_SUFFIX = { es: 'spanish', it: 'italian', de: 'german', en: 'english', fr: 'french', hu: 'hungarian', ga: 'irish' };

// Display name of each language, as shown in each possible UI language.
const LANG_DISPLAY_NAME = {
  it: { es: 'spagnolo', it: 'italiano', de: 'tedesco', en: 'inglese', fr: 'francese', hu: 'ungherese', ga: 'irlandese' },
  de: { es: 'Spanisch', it: 'Italienisch', de: 'Deutsch', en: 'Englisch', fr: 'Französisch', hu: 'Ungarisch', ga: 'Irisch' },
  en: { es: 'Spanish', it: 'Italian', de: 'German', en: 'English', fr: 'French', hu: 'Hungarian', ga: 'Irish' },
  fr: { es: 'espagnol', it: 'italien', de: 'allemand', en: 'anglais', fr: 'français', hu: 'hongrois', ga: 'irlandais' },
  hu: { es: 'spanyol', it: 'olasz', de: 'német', en: 'angol', fr: 'francia', hu: 'magyar', ga: 'ír' },
  ga: { es: 'Spáinnis', it: 'Iodáilis', de: 'Gearmáinis', en: 'Béarla', fr: 'Fraincis', hu: 'Ungáiris', ga: 'Gaeilge' }
};

const LANG_FLAG = { es: '🇪🇸', it: '🇮🇹', de: '🇩🇪', en: '🇬🇧', fr: '🇫🇷', hu: '🇭🇺', ga: '🇮🇪' };

// Adjective form of "[language] translation" used in the hint sentence, per UI language.
// For Irish, this instead holds the genitive-case form of the language name (Irish
// expresses "the Spanish translation" as "an t-aistriúchán Spáinnise" — a genitive noun
// modifier, not a true adjective), which slots into I18N.ga's templates the same way a
// plain adjective slots into the other languages'.
const ADJ_FORM = {
  it: { es: 'spagnola', it: 'italiana', de: 'tedesca', en: 'inglese', fr: 'francese', hu: 'ungherese', ga: 'irlandese' },
  de: { es: 'spanische', it: 'italienische', de: 'deutsche', en: 'englische', fr: 'französische', hu: 'ungarische', ga: 'irische' },
  en: { es: 'Spanish', it: 'Italian', de: 'German', en: 'English', fr: 'French', hu: 'Hungarian', ga: 'Irish' },
  fr: { es: 'espagnole', it: 'italienne', de: 'allemande', en: 'anglaise', fr: 'française', hu: 'hongroise', ga: 'irlandaise' },
  hu: { es: 'spanyol', it: 'olasz', de: 'német', en: 'angol', fr: 'francia', hu: 'magyar', ga: 'ír' },
  ga: { es: 'Spáinnise', it: 'Iodáilise', de: 'Gearmáinise', en: 'Béarla', fr: 'Fraincise', hu: 'Ungáirise', ga: 'Gaeilge' }
};

// Irish "in [language]" mutates the following word's initial consonant (eclipsis) or takes
// the "in" variant before a vowel — not derivable by simple concatenation — so look it up
// explicitly, the same way HU_LOCATIVE_LANG handles Hungarian's vowel-harmony suffix.
const GA_LOCATIVE_LANG = {
  'Spáinnis': 'i Spáinnis', 'Iodáilis': 'in Iodáilis', 'Gearmáinis': 'i nGearmáinis',
  'Béarla': 'i mBéarla', 'Fraincis': 'i bhFraincis', 'Ungáiris': 'in Ungáiris', 'Gaeilge': 'i nGaeilge'
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
  },
  fr: {
    noun: 'Nom', verb: 'Verbe', adjective: 'Adjectif', adverb: 'Adverbe',
    pronoun: 'Pronom', determiner: 'Déterminant', conjunction: 'Conjonction',
    'adverbial phrase': 'Locution adverbiale'
  },
  hu: {
    noun: 'Főnév', verb: 'Ige', adjective: 'Melléknév', adverb: 'Határozószó',
    pronoun: 'Névmás', determiner: 'Névelő', conjunction: 'Kötőszó',
    'adverbial phrase': 'Határozói szókapcsolat'
  },
  ga: {
    noun: 'Ainmfhocal', verb: 'Briathar', adjective: 'Aidiacht', adverb: 'Dobhriathar',
    pronoun: 'Forainm', determiner: 'Deitéarmanaí', conjunction: 'Cónasc',
    'adverbial phrase': 'Frása dobhriathartha'
  }
};

// Gender-word labels per UI language.
const GENDER_WORDS = {
  it: { masculine: 'maschile', feminine: 'femminile', plural: 'plurale' },
  de: { masculine: 'männlich', feminine: 'weiblich', plural: 'Plural' },
  en: { masculine: 'masculine', feminine: 'feminine', plural: 'plural' },
  fr: { masculine: 'masculin', feminine: 'féminin', plural: 'pluriel' },
  hu: { masculine: 'hímnemű', feminine: 'nőnemű', plural: 'többes szám' },
  ga: { masculine: 'firinscneach', feminine: 'baininscneach', plural: 'iolra' }
};

// Hungarian "in [language]" is a suffix on the language name, not a separate word,
// and which vowel-harmony suffix (-ul/-ül, with "francia" irregularly taking "-ául")
// applies can't be derived by simple concatenation — so look it up explicitly rather
// than templating it from the plain language name used everywhere else.
const HU_LOCATIVE_LANG = {
  spanyol: 'spanyolul', olasz: 'olaszul', német: 'németül',
  angol: 'angolul', francia: 'franciául', magyar: 'magyarul'
};

// All other static UI text, per UI language.
const I18N = {
  it: {
    pageTitle: 'Carte di Vocaboli',
    appTitle: 'Carte di Vocaboli',
    subtitleSuffix: 'Allenamento del vocabolario',
    statCorrect: 'Corrette:', statIncorrect: 'Sbagliate:', statAccuracy: 'Precisione:', statStreak: 'Serie:',
    titleCorrect: 'Risposte corrette', titleIncorrect: 'Risposte sbagliate',
    titleAccuracy: 'Percentuale di successo', titleStreak: 'Serie attuale',
    langSourceLabel: 'Lingua di origine:', langTargetLabel: 'Lingua di destinazione:', typeFilterLabel: 'Filtro per categoria grammaticale:',
    difficultyFilterLabel: 'Difficoltà:',
    speechRateLabel: 'Velocità vocale:', speechRateTitle: 'Regola la velocità della sintesi vocale',
    btnSoundText: '🔊 Ascolta', btnSoundTitle: (adjForm) => `Ascolta la pronuncia ${adjForm}`,
    btnResetStatsText: 'Reimposta statistiche', btnResetStatsTitle: 'Reimposta le statistiche',
    cardBadgeDefault: 'Categoria', genderBadgeDefault: 'Genere',
    cardProgress: (n) => `Carta #${n}`,
    wordHint: (adjForm) => `Trova la traduzione ${adjForm} corretta con la stessa categoria grammaticale:`,
    sentenceTargetLabel: (langName) => `Frase in ${langName}`,
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
    typeFilterAdverb: (n) => `Avverbi (${n})`,
    difficultyFilterAll: (n) => `Tutte (${n} parole)`,
    difficultyFilterEasy: (n) => `Facili (${n})`,
    difficultyFilterHard: (n) => `Difficili (${n})`
  },
  de: {
    pageTitle: 'Wortkarten',
    appTitle: 'Wortkarten',
    subtitleSuffix: 'Vokabeltraining',
    statCorrect: 'Richtig:', statIncorrect: 'Falsch:', statAccuracy: 'Quote:', statStreak: 'Serie:',
    titleCorrect: 'Richtig beantwortet', titleIncorrect: 'Falsch beantwortet',
    titleAccuracy: 'Trefferquote', titleStreak: 'Aktuelle Serie',
    langSourceLabel: 'Ausgangssprache:', langTargetLabel: 'Zielsprache:', typeFilterLabel: 'Wortart-Filter:',
    difficultyFilterLabel: 'Schwierigkeit:',
    speechRateLabel: 'Sprechgeschwindigkeit:', speechRateTitle: 'Sprechgeschwindigkeit der Sprachausgabe einstellen',
    btnSoundText: '🔊 Anhören', btnSoundTitle: (adjForm) => `${adjForm.replace(/^./, c => c.toUpperCase())} Aussprache anhören`,
    btnResetStatsText: 'Statistik zurücksetzen', btnResetStatsTitle: 'Statistik zurücksetzen',
    cardBadgeDefault: 'Wortart', genderBadgeDefault: 'Genus',
    cardProgress: (n) => `Karte #${n}`,
    wordHint: (adjForm) => `Finde die passende ${adjForm} Übersetzung mit der gleichen Wortart:`,
    sentenceTargetLabel: (langName) => `Satz auf ${langName}`,
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
    typeFilterAdverb: (n) => `Adverbien (${n})`,
    difficultyFilterAll: (n) => `Alle (${n} Wörter)`,
    difficultyFilterEasy: (n) => `Leicht (${n})`,
    difficultyFilterHard: (n) => `Schwer (${n})`
  },
  en: {
    pageTitle: 'Word Cards',
    appTitle: 'Word Cards',
    subtitleSuffix: 'Vocabulary training',
    statCorrect: 'Correct:', statIncorrect: 'Incorrect:', statAccuracy: 'Accuracy:', statStreak: 'Streak:',
    titleCorrect: 'Correct answers', titleIncorrect: 'Incorrect answers',
    titleAccuracy: 'Success rate', titleStreak: 'Current streak',
    langSourceLabel: 'Source language:', langTargetLabel: 'Target language:', typeFilterLabel: 'Word-type filter:',
    difficultyFilterLabel: 'Difficulty:',
    speechRateLabel: 'Speech speed:', speechRateTitle: 'Adjust the speech synthesis speed',
    btnSoundText: '🔊 Listen', btnSoundTitle: (adjForm) => `Listen to ${adjForm} pronunciation`,
    btnResetStatsText: 'Reset statistics', btnResetStatsTitle: 'Reset statistics',
    cardBadgeDefault: 'Type', genderBadgeDefault: 'Gender',
    cardProgress: (n) => `Card #${n}`,
    wordHint: (adjForm) => `Find the correct ${adjForm} translation with the same word type:`,
    sentenceTargetLabel: (langName) => `Sentence in ${langName}`,
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
    typeFilterAdverb: (n) => `Adverbs (${n})`,
    difficultyFilterAll: (n) => `All (${n} words)`,
    difficultyFilterEasy: (n) => `Easy (${n})`,
    difficultyFilterHard: (n) => `Hard (${n})`
  },
  fr: {
    pageTitle: 'Cartes de Vocabulaire',
    appTitle: 'Cartes de Vocabulaire',
    subtitleSuffix: 'Entraînement au vocabulaire',
    statCorrect: 'Correctes :', statIncorrect: 'Incorrectes :', statAccuracy: 'Précision :', statStreak: 'Série :',
    titleCorrect: 'Réponses correctes', titleIncorrect: 'Réponses incorrectes',
    titleAccuracy: 'Taux de réussite', titleStreak: 'Série actuelle',
    langSourceLabel: 'Langue source :', langTargetLabel: 'Langue cible :', typeFilterLabel: 'Filtre par catégorie grammaticale :',
    difficultyFilterLabel: 'Difficulté :',
    speechRateLabel: 'Vitesse vocale :', speechRateTitle: 'Régler la vitesse de la synthèse vocale',
    btnSoundText: '🔊 Écouter', btnSoundTitle: (adjForm) => `Écouter la prononciation ${adjForm}`,
    btnResetStatsText: 'Réinitialiser les statistiques', btnResetStatsTitle: 'Réinitialiser les statistiques',
    cardBadgeDefault: 'Catégorie', genderBadgeDefault: 'Genre',
    cardProgress: (n) => `Carte n° ${n}`,
    wordHint: (adjForm) => `Trouve la bonne traduction ${adjForm} de la même catégorie grammaticale :`,
    sentenceTargetLabel: (langName) => `Phrase en ${langName}`,
    btnPlayTargetTitle: (langName) => `Écouter la phrase en ${langName}`,
    btnNextText: 'Carte suivante ➔', keyHintText: '(Barre d\'espace ou Entrée)',
    historyTitle: 'Mots récents',
    historyCount: (n) => `${n} entrées`,
    emptyHistory: "Aucun mot joué pour l'instant. Choisis une option ci-dessus !",
    correctBadge: 'Correct', incorrectBadge: 'Incorrect',
    feedbackCorrect: (sym, sp, tgt) => `Excellent ! ${sym}« ${sp} » signifie « ${tgt} ».`,
    feedbackIncorrect: (sym, sp, tgt) => `Pas tout à fait. ${sym}« ${sp} » signifie « ${tgt} ».`,
    resetConfirm: 'Veux-tu vraiment réinitialiser les compteurs et l\'historique ?',
    typeFilterAll: (n) => `Toutes les catégories (${n} mots)`,
    typeFilterNoun: (n) => `Noms (${n})`,
    typeFilterVerb: (n) => `Verbes (${n})`,
    typeFilterAdjective: (n) => `Adjectifs (${n})`,
    typeFilterAdverb: (n) => `Adverbes (${n})`,
    difficultyFilterAll: (n) => `Toutes (${n} mots)`,
    difficultyFilterEasy: (n) => `Faciles (${n})`,
    difficultyFilterHard: (n) => `Difficiles (${n})`
  },
  hu: {
    pageTitle: 'Szókártyák',
    appTitle: 'Szókártyák',
    subtitleSuffix: 'Szókincsgyakorlás',
    statCorrect: 'Helyes:', statIncorrect: 'Helytelen:', statAccuracy: 'Arány:', statStreak: 'Sorozat:',
    titleCorrect: 'Helyes válaszok', titleIncorrect: 'Helytelen válaszok',
    titleAccuracy: 'Sikerességi arány', titleStreak: 'Jelenlegi sorozat',
    langSourceLabel: 'Forrásnyelv:', langTargetLabel: 'Célnyelv:', typeFilterLabel: 'Szófaj szűrő:',
    difficultyFilterLabel: 'Nehézség:',
    speechRateLabel: 'Beszédsebesség:', speechRateTitle: 'A hangszintézis sebességének beállítása',
    btnSoundText: '🔊 Meghallgatás', btnSoundTitle: (adjForm) => `${adjForm} kiejtés meghallgatása`,
    btnResetStatsText: 'Statisztika visszaállítása', btnResetStatsTitle: 'Statisztika visszaállítása',
    cardBadgeDefault: 'Szófaj', genderBadgeDefault: 'Nem',
    cardProgress: (n) => `${n}. kártya`,
    wordHint: (adjForm) => `Találd meg a helyes ${adjForm} fordítást, amely ugyanolyan szófajú:`,
    sentenceTargetLabel: (langName) => `Mondat ${HU_LOCATIVE_LANG[langName] || langName + 'ul'}`,
    btnPlayTargetTitle: (langName) => `${HU_LOCATIVE_LANG[langName] || langName + 'ul'} mondat meghallgatása`,
    btnNextText: 'Következő kártya ➔', keyHintText: '(Szóköz vagy Enter)',
    historyTitle: 'Legutóbbi szavak',
    historyCount: (n) => `${n} bejegyzés`,
    emptyHistory: 'Még nem játszottál egyetlen szóval sem. Válassz egy lehetőséget fent!',
    correctBadge: 'Helyes', incorrectBadge: 'Helytelen',
    feedbackCorrect: (sym, sp, tgt) => `Kiváló! ${sym}"${sp}" jelentése: "${tgt}".`,
    feedbackIncorrect: (sym, sp, tgt) => `Nem egészen. ${sym}"${sp}" jelentése: "${tgt}".`,
    resetConfirm: 'Valóban vissza szeretnéd állítani a számlálókat és az előzményeket?',
    typeFilterAll: (n) => `Minden szófaj (${n} szó)`,
    typeFilterNoun: (n) => `Főnevek (${n})`,
    typeFilterVerb: (n) => `Igék (${n})`,
    typeFilterAdjective: (n) => `Melléknevek (${n})`,
    typeFilterAdverb: (n) => `Határozószók (${n})`,
    difficultyFilterAll: (n) => `Összes (${n} szó)`,
    difficultyFilterEasy: (n) => `Könnyű (${n})`,
    difficultyFilterHard: (n) => `Nehéz (${n})`
  },
  ga: {
    pageTitle: 'Cártaí Focal',
    appTitle: 'Cártaí Focal',
    subtitleSuffix: 'Cleachtadh Foclóra',
    statCorrect: 'Ceart:', statIncorrect: 'Mícheart:', statAccuracy: 'Cruinneas:', statStreak: 'Sraith:',
    titleCorrect: 'Freagraí cearta', titleIncorrect: 'Freagraí mícheart',
    titleAccuracy: 'Ráta ratha', titleStreak: 'Sraith reatha',
    langSourceLabel: 'Teanga fhoinseach:', langTargetLabel: 'Sprioctheanga:', typeFilterLabel: 'Scagaire cineál focal:',
    difficultyFilterLabel: 'Deacracht:',
    speechRateLabel: 'Luas cainte:', speechRateTitle: 'Coigeartaigh luas na sintéise urlabhra',
    btnSoundText: '🔊 Éist', btnSoundTitle: (adjForm) => `Éist le fuaimniú ${adjForm}`,
    btnResetStatsText: 'Athshocraigh staitisticí', btnResetStatsTitle: 'Athshocraigh staitisticí',
    cardBadgeDefault: 'Cineál', genderBadgeDefault: 'Inscne',
    cardProgress: (n) => `Cárta #${n}`,
    wordHint: (adjForm) => `Aimsigh an t-aistriúchán ceart ${adjForm} den chineál focal céanna:`,
    sentenceTargetLabel: (langName) => `Abairt ${GA_LOCATIVE_LANG[langName] || langName}`,
    btnPlayTargetTitle: (langName) => `Éist leis an abairt ${GA_LOCATIVE_LANG[langName] || langName}`,
    btnNextText: 'An chéad chárta eile ➔', keyHintText: '(Spásbharra nó Enter)',
    historyTitle: 'Focail dhéanacha',
    historyCount: (n) => `${n} iontráil`,
    emptyHistory: 'Níor imríodh aon fhocal fós. Roghnaigh rogha thuas!',
    correctBadge: 'Ceart', incorrectBadge: 'Mícheart',
    feedbackCorrect: (sym, sp, tgt) => `Ar fheabhas! ${sym}"${sp}" a chiallaíonn "${tgt}".`,
    feedbackIncorrect: (sym, sp, tgt) => `Ní hea go díreach. ${sym}"${sp}" a chiallaíonn "${tgt}".`,
    resetConfirm: 'An bhfuil tú cinnte gur mhaith leat na cuntair agus an stair a athshocrú?',
    typeFilterAll: (n) => `Gach cineál (${n} focal)`,
    typeFilterNoun: (n) => `Ainmfhocail (${n})`,
    typeFilterVerb: (n) => `Briathra (${n})`,
    typeFilterAdjective: (n) => `Aidiachtaí (${n})`,
    typeFilterAdverb: (n) => `Dobhriathra (${n})`,
    difficultyFilterAll: (n) => `Gach ceann (${n} focal)`,
    difficultyFilterEasy: (n) => `Éasca (${n})`,
    difficultyFilterHard: (n) => `Deacair (${n})`
  }
};

const TARGET_LANG_KEY = 'spanish_cards_target_lang_v1';

function loadTargetLang() {
  try {
    const saved = localStorage.getItem(TARGET_LANG_KEY);
    if (saved && TARGET_LANG_OPTIONS.includes(saved)) return saved;
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return 'it';
}

const SOURCE_LANG_KEY = 'spanish_cards_source_lang_v1';

function loadSourceLang() {
  try {
    const saved = localStorage.getItem(SOURCE_LANG_KEY);
    if (saved && LANG_META[saved]) return saved;
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return 'es';
}

function saveSourceLang() {
  try {
    localStorage.setItem(SOURCE_LANG_KEY, state.sourceLang);
  } catch (e) {
    console.warn('Could not save source language:', e);
  }
}

const SPEECH_RATE_KEY = 'spanish_cards_speech_rate_v1';

function loadSpeechRate() {
  try {
    const saved = parseFloat(localStorage.getItem(SPEECH_RATE_KEY));
    if (!isNaN(saved) && saved >= 0.5 && saved <= 1.5) return saved;
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return 1;
}

function saveSpeechRate() {
  try {
    localStorage.setItem(SPEECH_RATE_KEY, String(state.speechRate));
  } catch (e) {
    console.warn('Could not save speech rate:', e);
  }
}

// State management
let state = {
  // Word lists are optionally split across multiple files by difficulty (see
  // words_data.js / words_data_2.js); combine whichever are actually loaded.
  allWords: [
    ...(typeof WORDS_DATA !== 'undefined' ? WORDS_DATA : []),
    ...(typeof WORDS_DATA_2 !== 'undefined' ? WORDS_DATA_2 : [])
  ],
  filteredWords: [],
  currentWord: null,
  currentOptions: [],
  hasAnswered: false,
  selectedFilter: 'all',
  selectedDifficulty: 'all',
  targetLang: loadTargetLang(),
  sourceLang: loadSourceLang(),
  speechRate: loadSpeechRate(),

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
  subtitleSource: document.getElementById('subtitle-spanish'),
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
  langSource: document.getElementById('lang-source'),
  langSourceLabel: document.getElementById('lang-source-label'),
  langTarget: document.getElementById('lang-target'),
  langTargetLabel: document.getElementById('lang-target-label'),
  typeFilter: document.getElementById('type-filter'),
  typeFilterLabel: document.getElementById('type-filter-label'),
  difficultyFilter: document.getElementById('difficulty-filter'),
  difficultyFilterLabel: document.getElementById('difficulty-filter-label'),
  speechRate: document.getElementById('speech-rate'),
  speechRateLabel: document.getElementById('speech-rate-label'),
  speechRateValue: document.getElementById('speech-rate-value'),
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
  detailRows: Object.fromEntries(DETAIL_LANGS.map(lang => {
    const suffix = DETAIL_LANG_SUFFIX[lang];
    return [lang, {
      item: document.getElementById(`detail-item-${lang}`),
      label: document.getElementById(`detail-label-${suffix}`),
      value: document.getElementById(`detail-${suffix}`)
    }];
  })),
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
  if (t.includes('adverb')) return 'adverb';
  if (t.includes('verb')) return 'verb';
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
  el.subtitleSource.textContent = LANG_DISPLAY_NAME[state.targetLang][state.sourceLang].replace(/^./, c => c.toUpperCase());
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

  el.langSourceLabel.textContent = t.langSourceLabel;
  el.langTargetLabel.textContent = t.langTargetLabel;
  el.typeFilterLabel.textContent = t.typeFilterLabel;
  el.difficultyFilterLabel.textContent = t.difficultyFilterLabel;
  el.speechRateLabel.textContent = t.speechRateLabel;
  el.speechRate.title = t.speechRateTitle;

  [...el.langSource.options].forEach(opt => {
    opt.textContent = `${LANG_FLAG[opt.value]} ${LANG_DISPLAY_NAME[state.targetLang][opt.value].replace(/^./, c => c.toUpperCase())}`;
    opt.disabled = (opt.value === state.targetLang);
  });
  [...el.langTarget.options].forEach(opt => {
    opt.textContent = `${LANG_FLAG[opt.value]} ${LANG_DISPLAY_NAME[state.targetLang][opt.value].replace(/^./, c => c.toUpperCase())}`;
    opt.disabled = (opt.value === state.sourceLang);
  });

  el.btnSound.textContent = t.btnSoundText;
  el.btnSound.title = t.btnSoundTitle(ADJ_FORM[state.targetLang][state.sourceLang]);
  el.btnResetStats.textContent = t.btnResetStatsText;
  el.btnResetStats.title = t.btnResetStatsTitle;

  el.cardTypeBadge.textContent = state.currentWord ? translateType(state.currentWord.type) : t.cardBadgeDefault;
  el.cardGenderBadge.textContent = t.genderBadgeDefault;

  const targetLangName = LANG_DISPLAY_NAME[state.targetLang][state.targetLang];
  const sourceLangName = LANG_DISPLAY_NAME[state.targetLang][state.sourceLang];
  el.wordHint.textContent = t.wordHint(ADJ_FORM[state.targetLang][state.targetLang]);
  el.sentenceEsLabel.textContent = t.sentenceTargetLabel(sourceLangName);
  el.sentenceTargetLabel.textContent = t.sentenceTargetLabel(targetLangName);
  el.btnPlayEs.title = t.btnPlayTargetTitle(sourceLangName);
  el.btnPlayEs.setAttribute('aria-label', t.btnPlayTargetTitle(sourceLangName));
  el.btnPlayTarget.title = t.btnPlayTargetTitle(targetLangName);
  el.btnPlayTarget.setAttribute('aria-label', t.btnPlayTargetTitle(targetLangName));

  DETAIL_LANGS.forEach(lang => {
    el.detailRows[lang].label.textContent = `${LANG_DISPLAY_NAME[state.targetLang][lang].replace(/^./, c => c.toUpperCase())}:`;
  });

  el.btnNextLabel.textContent = t.btnNextText;
  el.keyHint.textContent = t.keyHintText;

  el.historyTitle.textContent = t.historyTitle;

  buildTypeFilterOptions();
  buildDifficultyFilterOptions();
  updateStatsUI();
}

// Words matching the *other* filter dimension, used to compute each filter's own
// option counts against whatever the other one currently restricts the pool to.
function wordsMatchingDifficulty(difficulty) {
  return difficulty === 'all' ? state.allWords : state.allWords.filter(w => w.difficulty === difficulty);
}
function wordsMatchingType(typeFilter) {
  return typeFilter === 'all' ? state.allWords : state.allWords.filter(w => getNormalizedType(w.type) === typeFilter);
}

// Populate Filter Options (localized, preserves current selection)
function buildTypeFilterOptions() {
  const t = I18N[state.targetLang];
  const pool = wordsMatchingDifficulty(state.selectedDifficulty);
  const typeCounts = {};
  pool.forEach(w => {
    const norm = getNormalizedType(w.type);
    typeCounts[norm] = (typeCounts[norm] || 0) + 1;
  });

  const typeLabels = {
    all: t.typeFilterAll(pool.length),
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

// Populate Difficulty Filter Options (localized, preserves current selection)
function buildDifficultyFilterOptions() {
  const t = I18N[state.targetLang];
  const pool = wordsMatchingType(state.selectedFilter);
  const difficultyCounts = {};
  pool.forEach(w => {
    const key = w.difficulty || 'easy';
    difficultyCounts[key] = (difficultyCounts[key] || 0) + 1;
  });

  const difficultyLabels = { all: t.difficultyFilterAll(pool.length) };
  if (difficultyCounts.easy) difficultyLabels.easy = t.difficultyFilterEasy(difficultyCounts.easy);
  if (difficultyCounts.hard) difficultyLabels.hard = t.difficultyFilterHard(difficultyCounts.hard);

  const previousValue = el.difficultyFilter.value || state.selectedDifficulty;
  el.difficultyFilter.innerHTML = '';
  for (const [key, label] of Object.entries(difficultyLabels)) {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = label;
    el.difficultyFilter.appendChild(opt);
  }
  el.difficultyFilter.value = Object.prototype.hasOwnProperty.call(difficultyLabels, previousValue) ? previousValue : 'all';
  state.selectedDifficulty = el.difficultyFilter.value;
}

function initTypeFilter() {
  buildTypeFilterOptions();
  el.typeFilter.addEventListener('change', (e) => {
    state.selectedFilter = e.target.value;
    buildDifficultyFilterOptions();
    applyFilter();
    nextQuestion();
  });
}

function initDifficultyFilter() {
  buildDifficultyFilterOptions();
  el.difficultyFilter.addEventListener('change', (e) => {
    state.selectedDifficulty = e.target.value;
    buildTypeFilterOptions();
    applyFilter();
    nextQuestion();
  });
}

// Wire the target-language selector (this also drives the whole GUI language)
function initLangTarget() {
  el.langTarget.value = state.targetLang;

  el.langTarget.addEventListener('change', (e) => {
    const oldTarget = state.targetLang;
    state.targetLang = e.target.value;
    // oldTarget is always a valid source value (it's drawn from TARGET_LANG_OPTIONS,
    // a subset of the source options), so this swap can never leave source invalid.
    if (state.targetLang === state.sourceLang) {
      state.sourceLang = oldTarget;
      el.langSource.value = state.sourceLang;
      saveSourceLang();
    }
    saveTargetLang();
    applyUILanguage();
    nextQuestion();
  });
}

// Wire the source-language selector.
function initLangSource() {
  el.langSource.value = state.sourceLang;

  el.langSource.addEventListener('change', (e) => {
    const oldSource = state.sourceLang;
    state.sourceLang = e.target.value;
    if (state.sourceLang === state.targetLang) {
      // oldSource might be 'es', which can't become the target (UI is only translated
      // into TARGET_LANG_OPTIONS) — fall back to any other valid target in that case.
      state.targetLang = TARGET_LANG_OPTIONS.includes(oldSource)
        ? oldSource
        : TARGET_LANG_OPTIONS.find(l => l !== state.sourceLang);
      el.langTarget.value = state.targetLang;
      saveTargetLang();
    }
    saveSourceLang();
    applyUILanguage();
    nextQuestion();
  });
}

function applyFilter() {
  state.filteredWords = state.allWords.filter(w =>
    (state.selectedFilter === 'all' || getNormalizedType(w.type) === state.selectedFilter) &&
    (state.selectedDifficulty === 'all' || w.difficulty === state.selectedDifficulty)
  );
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
  en: ['samantha'],
  fr: ['thomas', 'amelie'],
  hu: ['tunde']
};

const FALLBACK_LANG_TAG = { es: 'es-ES', it: 'it-IT', de: 'de-DE', en: 'en-US', fr: 'fr-FR', hu: 'hu-HU', ga: 'ga-IE' };

// macOS (and Chrome on top of it) lists every voice the OS *could* use — including ones
// whose actual voice-data package was never downloaded — in speechSynthesis.getVoices().
// Speaking with an undownloaded voice doesn't error or fall through to onerror; it silently
// substitutes the system's default voice instead, so a listener hears the wrong language
// entirely (reported: Hungarian text spoken in what sounds like German — the Mac's default
// system voice — because "Tünde" was listed but not actually installed). There is no Web
// Speech API to check whether a listed voice's data is actually present, so for languages
// whose voice is known to ship this way, skip the local-voice path entirely and always use
// the network TTS fallback, which is guaranteed to speak the requested language correctly.
//
// Irish is deliberately NOT in this set, even though macOS ships no native Irish-Gaelic
// (ga-IE) voice either: unlike Hungarian, Google Translate's TTS endpoint returns HTTP 400
// for tl=ga on both translate.google.com and translate.googleapis.com — it has no Irish
// voice at all, confirmed by direct request, not just an untested assumption. Forcing
// network-only for a language the network endpoint can't speak would silently produce total
// silence for every user, including the rare one with a genuine local Irish voice (e.g.
// Windows ships a "Colm" ga-IE voice in some versions) — so Irish falls through to the
// normal local-voice-first / network-fallback-second path, and simply has no audio when
// neither is available. This is a known limitation of the free TTS backends this app uses,
// not a bug to chase in app code.
//
// If the network endpoint itself is unreachable for a NETWORK_ONLY_LANGS entry (blocked by
// an ad blocker/DNS filter, offline, etc.), speakOne() falls back to the local voice anyway
// once playNetworkTTS's timeout gives up — the exact possibly-wrong-voice risk described
// above, but preferred over guaranteed total silence.
const NETWORK_ONLY_LANGS = new Set(['hu']);

function normalizeName(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function pickVoiceForLang(langPrefix) {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const langVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith(langPrefix));
  if (langVoices.length === 0) return null;

  // Only search for the preferred name among voices already confirmed to have the
  // right lang prefix — never trust a name match whose own declared lang disagrees,
  // that's how a mislabeled/farbled voice entry could end up speaking the wrong language.
  const preferredNames = PREFERRED_VOICE_NAMES[langPrefix] || [];
  for (const name of preferredNames) {
    const match = langVoices.find(v => normalizeName(v.name).includes(name));
    if (match) return match;
  }

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
  if (!('speechSynthesis' in window)) {
    callback(); // no local TTS at all — proceed straight to the network fallback
    return;
  }
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener('voiceschanged', callback, { once: true });
    window.speechSynthesis.getVoices(); // nudge the engine to populate the list
  } else {
    callback();
  }
}

// Whichever language is currently the source is the one learners are still acquiring,
// so its audio plays 10% slower than the target-language audio to make it easier to follow.
const SOURCE_RATE_MULTIPLIER = 0.9;
const BASE_SPEECH_RATE = 0.92;

function buildUtterance(text, langPrefix, voice) {
  const utterance = new SpeechSynthesisUtterance(text);
  if (voice) utterance.voice = voice;
  // Force the canonical lang tag unconditionally — never trust voice.lang, since
  // privacy-hardened browsers can return voice objects with farbled/inconsistent
  // lang values. Setting this explicitly gives the engine the best chance of
  // selecting the right language.
  utterance.lang = FALLBACK_LANG_TAG[langPrefix];
  const baseRate = langPrefix === state.sourceLang ? BASE_SPEECH_RATE * SOURCE_RATE_MULTIPLIER : BASE_SPEECH_RATE;
  utterance.rate = baseRate * state.speechRate;
  utterance.pitch = 1;
  return utterance;
}

// Strip the **underline** markers used in sentence data before speaking.
function stripSentenceMarkers(sentence) {
  return (sentence || '').replace(/\*\*/g, '');
}

// Network TTS fallback (Google Translate's public endpoint — no API key) for when the
// browser exposes no local voice for a language at all (e.g. Brave's fingerprinting
// protection hides the local voice list). This guarantees a correct-language voice is
// always available, regardless of what the browser chooses to expose locally.
let currentNetworkAudio = null;

function stopAllSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  if (currentNetworkAudio) {
    currentNetworkAudio.pause();
    currentNetworkAudio = null;
  }
}

// Resolves true if audio actually played, false on any failure (including timeout) —
// callers use this to decide whether a fallback is needed.
function playNetworkTTS(text, langPrefix) {
  return new Promise((resolve) => {
    // translate.googleapis.com serves the same audio as translate.google.com/translate_tts
    // but isn't caught by the ad/tracker filter lists that block the .com widget endpoint
    // (EasyList and similar commonly blocklist translate.google.com/translate_tts itself).
    const url = `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=${langPrefix}&q=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    audio.playbackRate = (langPrefix === state.sourceLang ? SOURCE_RATE_MULTIPLIER : 1) * state.speechRate;
    currentNetworkAudio = audio;
    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      if (currentNetworkAudio === audio) currentNetworkAudio = null;
      resolve(ok);
    };
    // A request blocked outright (ad blocker, DNS-level filter, offline) can leave the
    // <audio> element hung forever with neither 'ended' nor 'error' ever firing — confirmed
    // directly (a blocked translate_tts request produced no error event even after 45s).
    // Cap the wait so speech resumes instead of freezing the playback queue permanently.
    const timeoutId = setTimeout(() => {
      console.warn('Network TTS timed out:', url);
      finish(false);
    }, 8000);
    audio.addEventListener('ended', () => finish(true));
    audio.addEventListener('error', () => {
      console.warn('Network TTS failed to load:', url, audio.error);
      finish(false);
    });
    audio.play().catch((e) => {
      console.warn('Network TTS play() rejected:', url, e);
      finish(false);
    });
  });
}

// Speak one piece of text in one language, waiting for playback to finish before
// resolving — local voice if the browser has one for that language, otherwise the
// network fallback.
function speakOne(text, langPrefix) {
  return new Promise((resolve) => {
    const forceNetwork = NETWORK_ONLY_LANGS.has(langPrefix);
    const voice = forceNetwork ? null : pickVoiceForLang(langPrefix);
    if (voice) {
      const utterance = buildUtterance(text, langPrefix, voice);
      utterance.onend = () => resolve();
      utterance.onerror = (e) => {
        console.warn('Local speech synthesis failed:', langPrefix, voice.name, e.error);
        resolve();
      };
      window.speechSynthesis.speak(utterance);
    } else {
      playNetworkTTS(text, langPrefix).then((ok) => {
        if (ok || !forceNetwork) {
          resolve();
          return;
        }
        // Network TTS is unreachable for this user (blocked endpoint, offline, ...). Falling
        // back to whatever local voice the browser reports beats guaranteed silence, even
        // though it's the exact possibly-wrong voice NETWORK_ONLY_LANGS exists to avoid.
        const fallbackVoice = pickVoiceForLang(langPrefix);
        if (!fallbackVoice) {
          resolve();
          return;
        }
        const utterance = buildUtterance(text, langPrefix, fallbackVoice);
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
      });
    }
  });
}

// Speak a sequence of {text, langPrefix} items back to back, stopping whatever was
// playing before.
async function speakSequence(items) {
  stopAllSpeech();
  for (const item of items) {
    if (!item.text) continue;
    await speakOne(item.text, item.langPrefix);
  }
}

function speakSourceWord(word, langPrefix) {
  if (!word) return;
  withVoicesReady(() => {
    speakSequence([{ text: word, langPrefix }]);
  });
}

// Speak the source-language sentence followed by the target-language sentence, each in its own voice.
function speakBilingualSentences(sentenceSource, sentenceTarget, sourceLangCode, targetLangCode) {
  withVoicesReady(() => {
    const items = [];
    if (sentenceSource) items.push({ text: stripSentenceMarkers(sentenceSource), langPrefix: sourceLangCode });
    if (sentenceTarget) items.push({ text: stripSentenceMarkers(sentenceTarget), langPrefix: targetLangCode });
    speakSequence(items);
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
  el.sentenceEsLabel.textContent = t.sentenceTargetLabel(LANG_DISPLAY_NAME[state.targetLang][state.sourceLang]);
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

  el.spanishWord.textContent = word[LANG_META[state.sourceLang].field];

  // Show and speak the source-language example sentence up front, before the user
  // answers — it gives usage context without revealing the target-language translation.
  const sourceMeta = LANG_META[state.sourceLang];
  const sourceSentence = word[sourceMeta.sentenceField];
  el.sentenceSpanish.innerHTML = renderSentenceHTML(sourceSentence);
  speakBilingualSentences(sourceSentence, null, sourceMeta.code, null);

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
  const sourceMeta = LANG_META[state.sourceLang];
  const targetText = word[meta.field];
  const sourceText = word[sourceMeta.field];

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
    spanish: sourceText,
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
    el.feedbackText.textContent = t.feedbackCorrect(symbolPrefix, sourceText, targetText);
  } else {
    el.feedbackBanner.className = 'feedback-banner incorrect';
    el.feedbackIcon.textContent = '✗';
    el.feedbackText.textContent = t.feedbackIncorrect(symbolPrefix, sourceText, targetText);
  }

  el.sentenceTarget.innerHTML = renderSentenceHTML(word[meta.sentenceField]);

  DETAIL_LANGS.forEach(lang => {
    const row = el.detailRows[lang];
    if (lang === state.sourceLang) {
      row.item.style.display = 'none';
    } else {
      row.item.style.display = '';
      row.value.textContent = word[LANG_META[lang].field] || '-';
    }
  });

  // The source sentence was already shown/spoken before the user answered (see
  // nextQuestion) — only the target-language sentence is new information now.
  speakBilingualSentences(null, word[meta.sentenceField], null, meta.code);
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
      const sourceMeta = LANG_META[state.sourceLang];
      speakSourceWord(state.currentWord[sourceMeta.field], sourceMeta.code);
    }
  });
  el.btnPlayEs.addEventListener('click', () => {
    if (state.currentWord) {
      const sourceMeta = LANG_META[state.sourceLang];
      speakBilingualSentences(state.currentWord[sourceMeta.sentenceField], null, sourceMeta.code, null);
    }
  });
  el.btnPlayTarget.addEventListener('click', () => {
    if (state.currentWord) {
      const meta = LANG_META[state.targetLang];
      speakBilingualSentences(null, state.currentWord[meta.sentenceField], null, meta.code);
    }
  });
  el.speechRate.addEventListener('input', (e) => {
    state.speechRate = parseFloat(e.target.value);
    updateSpeechRateUI();
    saveSpeechRate();
  });
  window.addEventListener('keydown', handleKeydown);
}

function updateSpeechRateUI() {
  el.speechRate.value = state.speechRate;
  el.speechRateValue.textContent = `${Math.round(state.speechRate * 100)}%`;
}

// Initialization
function init() {
  loadStats();
  if (state.sourceLang === state.targetLang) {
    state.targetLang = TARGET_LANG_OPTIONS.find(l => l !== state.sourceLang) || 'it';
  }
  initLangSource();
  initLangTarget();
  initTypeFilter();
  initDifficultyFilter();
  applyUILanguage();
  applyFilter();
  initEventListeners();
  updateStatsUI();
  updateSpeechRateUI();
  nextQuestion();
}

document.addEventListener('DOMContentLoaded', init);
