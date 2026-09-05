# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page Spanish vocabulary flashcard trainer. It's a static site — plain HTML/CSS/JS, no framework, no bundler, no build step, no package.json, no test suite.

- `index.html` — page structure. Nearly every piece of static text carries an `id` because all UI copy is set/overwritten from `app.js` at runtime (see i18n below) rather than hardcoded per language.
- `style.css` — dark-theme styling, custom properties in `:root`, mobile-first with a `600px` breakpoint for the 2-column options grid.
- `words_data.js` — defines `const WORDS_DATA = [...]`, loaded via `<script>` before `app.js`. 200 vocabulary entries, tagged `"difficulty": "easy"`.
- `words_data_2.js` — defines `const WORDS_DATA_2 = [...]`, same shape, tagged `"difficulty": "hard"` (the next-most-frequent 200 Spanish words not in the first list). Loaded via `<script>` between `words_data.js` and `app.js`; `app.js` concatenates both (guarded with `typeof` checks, so either file can be absent/empty without breaking the app) into `state.allWords`.
- `app.js` — all application logic (state, quiz flow, i18n, speech synthesis), vanilla JS, no modules.
- `spanish_words_no_italian_cognate_200.csv` — the original raw data source (same 200 entries, fewer fields). Not loaded by the app at runtime; `words_data.js` is the live data file. Treat the CSV as historical/reference only unless asked to regenerate data from it.

## Running it

No dev server config exists in the repo. `speechSynthesis` and some browser APIs behave inconsistently (or are blocked) under a bare `file://` URL, so serve it over HTTP instead:

```bash
python3 -m http.server 8123
# then open http://localhost:8123/index.html
```

There is no build, lint, or test command — verify changes by loading the page in a real browser and exercising the flow (see below).

## Data model (`words_data.js` / `words_data_2.js`)

Each entry has:
- `spanish`, `type` (e.g. `noun`, `verb`, `"noun / adjective"`), `gender` (e.g. `masculine`, `"feminine (plural)"`, or `-`), `difficulty` (`"easy"` or `"hard"`, driving the difficulty filter in the UI)
- `italian`, `german`, `english`, `french`, `hungarian`, `irish` — single-word/phrase translations
- `symbol` (emoji, may be empty)
- `sentence_es`, `sentence_it`, `sentence_de`, `sentence_en`, `sentence_fr`, `sentence_hu`, `sentence_ga` — one example sentence per language, all seven expressing the same scene. The vocabulary word's inflected form is wrapped in `**double asterisks**` (e.g. `"El **perro** corre."`) — `renderSentenceHTML()` turns that into `<u>` for display, `stripSentenceMarkers()` strips it before speaking.

When adding/editing entries, keep all seven sentences semantically aligned and grammatically correct in each language (case/agreement for German, gender/elision for French, case-suffix and vowel-harmony agreement for Hungarian, initial mutation (séimhiú/urú) and case for Irish, conjugation for verbs, etc.) — this was previously done by hand/agent pass and reviewed for correctness; don't regress quality by generating sentences mechanically.

## App architecture (`app.js`)

**Language model**: `state.targetLang` (`'it' | 'de' | 'en' | 'fr' | 'hu' | 'ga'`) is the single source of truth for *both* which language the quiz answers/example sentences are in *and* which language the entire GUI chrome is rendered in — the two are intentionally coupled, not independent settings. Persisted to `localStorage` under `spanish_cards_target_lang_v1`. `state.sourceLang` (`'es' | 'it' | 'de' | 'en' | 'fr' | 'hu' | 'ga'`) picks which language the quizzed word/sentence is shown *in* (persisted under `spanish_cards_source_lang_v1`); it does **not** affect UI chrome language. `TARGET_LANG_OPTIONS` (`['it','de','en','fr','hu','ga']`) is the restricted set target may take — Spanish can only ever be a source, never a target/UI language, since `I18N`/`WORD_TYPE_LABELS`/`GENDER_WORDS` are only translated into those six. `source !== target` is enforced by swapping the other selector's value on conflict (see `initLangSource`/`initLangTarget`).
- `LANG_META` maps a lang code (source or target) to the `WORDS_DATA` field/sentence field to quiz on — includes an `es` entry (`spanish`/`sentence_es`) alongside `it`/`de`/`en`/`fr`/`hu`/`ga`.
- Irish's `ADJ_FORM.ga` and `WORD_TYPE_LABELS`/`I18N.ga` templates use genitive-case language names (not true adjectives — Irish expresses "the Spanish translation" via a genitive noun modifier), and `GA_LOCATIVE_LANG` looks up the correctly-mutated "in [language]" form (eclipsis/`in`-before-vowel) the same way `HU_LOCATIVE_LANG` handles Hungarian's vowel-harmony suffix — neither is derivable by simple string concatenation.
- `I18N`, `WORD_TYPE_LABELS`, `GENDER_WORDS`, `LANG_DISPLAY_NAME`, `ADJ_FORM` hold every UI string per *UI/target* language; `LANG_DISPLAY_NAME`/`ADJ_FORM` additionally carry an `es` key in each block so Spanish can be named/described when it's the source.
- `applyUILanguage()` is the one function that re-renders *all* static chrome (title, labels, button text/titles, badges, filter option text, etc.) from those tables. Call it after changing `state.targetLang` or `state.sourceLang`, and extend it (plus the `I18N`/label tables) rather than hardcoding new UI text — the app has no other translation mechanism.

**Quiz flow**: `nextQuestion()` picks a random word from `state.filteredWords`, builds 5 options via `generateOptions()` (same grammatical type as distractors, in the current target language), and renders the card — including showing and speaking the *source*-language example sentence immediately (`#sentence-preview-box`, always visible), since it gives usage context without revealing the target-language answer. `handleOptionSelect()` scores the answer, updates `state.stats` (persisted under `spanish_cards_game_stats_v1`), reveals the feedback/target-sentence/detail panels (still gated behind `#feedback-area.hidden` until answered), and speaks only the target-language sentence (the source one was already spoken).

**Filtering**: `state.selectedFilter` (word type) and `state.selectedDifficulty` (`'easy'`/`'hard'`/`'all'`) combine with AND logic in `applyFilter()`. Each filter's own dropdown options/counts are computed *against the other filter's current selection* (`wordsMatchingDifficulty`/`wordsMatchingType`), so e.g. picking "hard" narrows the word-type counts to hard words only — call both `buildTypeFilterOptions()` and `buildDifficultyFilterOptions()` whenever either selection changes, since the other one's counts need to stay in sync too.

**Word-details reveal panel**: driven by `DETAIL_LANGS` (`['es','it','de','en','fr','hu','ga']`) and `el.detailRows[lang]` — a generic loop hides whichever row matches the current `state.sourceLang` (it's already visible as the question) and fills in the rest from `LANG_META[lang].field`, rather than hardcoding per-language elements.

**Speech synthesis** (`pickVoiceForLang`, `buildUtterance`, `withVoicesReady`, `speakBilingualSentences`): resolves a `SpeechSynthesisVoice` fresh from `speechSynthesis.getVoices()` on every call — voice objects are deliberately **not** cached across calls, because a stale cached reference has been observed to silently fall back to the browser's default UI-language voice in Chrome. `NOVELTY_VOICE_NAMES` deprioritizes macOS's joke persona voices (Eddy, Flo, Grandma, ...); `PREFERRED_VOICE_NAMES` force-picks known-good standard voices (Mónica/Alice/Anna/Samantha) by name when present. `withVoicesReady()` guards the load-time race where `getVoices()` briefly returns `[]` before the browser populates it.

Note: Brave's fingerprinting protection can suppress the real voice list from `speechSynthesis.getVoices()`, which breaks voice selection in a way that isn't fixable from app code — this is a known limitation, not a bug to chase in `app.js`. Separately, `playNetworkTTS()` calls `translate.googleapis.com/translate_tts` (not `translate.google.com/translate_tts`, despite both serving identical audio): Brave Shields and common ad/tracker filter lists (EasyList-derived) block the `.com` widget endpoint by default, which silently killed all network-fallback audio in Brave specifically (worked in other browsers, silent in Brave) — the `.googleapis.com` REST hostname isn't on those lists.

`NETWORK_ONLY_LANGS` (currently `{'hu'}`) forces a language to always use the network TTS fallback, skipping `pickVoiceForLang` entirely — for languages whose macOS voice is listed in `getVoices()` but commonly isn't actually downloaded (reported: Hungarian "Tünde" silently played back in the Mac's default system voice instead, with no error event at all, since there's no Web Speech API to detect an undownloaded voice). Add a language here if the same symptom (a language's audio "sounds like [wrong language]") gets reported again — but first confirm the network TTS endpoint actually supports that language (`curl` it directly with `tl=<code>`); it doesn't cover everything Google Translate can *translate*. Irish is the counter-example: macOS has no native `ga-IE` voice either, but `translate.google(apis).com/translate_tts?tl=ga` returns HTTP 400 (no Irish TTS voice exists there at all), so forcing network-only would silence Irish for 100% of users instead of just the ones with an undownloaded local voice — Irish is deliberately left on the normal local-first/network-fallback path, and simply has no audio when neither is available. This is a known limitation of the free TTS backends in use, not a bug to chase in app code.
