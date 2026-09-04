# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page Spanish vocabulary flashcard trainer. It's a static site — plain HTML/CSS/JS, no framework, no bundler, no build step, no package.json, no test suite.

- `index.html` — page structure. Nearly every piece of static text carries an `id` because all UI copy is set/overwritten from `app.js` at runtime (see i18n below) rather than hardcoded per language.
- `style.css` — dark-theme styling, custom properties in `:root`, mobile-first with a `600px` breakpoint for the 2-column options grid.
- `words_data.js` — defines `const WORDS_DATA = [...]`, loaded via `<script>` before `app.js`. 200 vocabulary entries.
- `app.js` — all application logic (state, quiz flow, i18n, speech synthesis), vanilla JS, no modules.
- `spanish_words_no_italian_cognate_200.csv` — the original raw data source (same 200 entries, fewer fields). Not loaded by the app at runtime; `words_data.js` is the live data file. Treat the CSV as historical/reference only unless asked to regenerate data from it.

## Running it

No dev server config exists in the repo. `speechSynthesis` and some browser APIs behave inconsistently (or are blocked) under a bare `file://` URL, so serve it over HTTP instead:

```bash
python3 -m http.server 8123
# then open http://localhost:8123/index.html
```

There is no build, lint, or test command — verify changes by loading the page in a real browser and exercising the flow (see below).

## Data model (`words_data.js`)

Each of the 200 entries has:
- `spanish`, `type` (e.g. `noun`, `verb`, `"noun / adjective"`), `gender` (e.g. `masculine`, `"feminine (plural)"`, or `-`), `symbol` (emoji, may be empty)
- `italian`, `german`, `english` — single-word/phrase translations
- `sentence_es`, `sentence_it`, `sentence_de`, `sentence_en` — one example sentence per language, all four expressing the same scene. The vocabulary word's inflected form is wrapped in `**double asterisks**` (e.g. `"El **perro** corre."`) — `renderSentenceHTML()` turns that into `<u>` for display, `stripSentenceMarkers()` strips it before speaking.

When adding/editing entries, keep all four sentences semantically aligned and grammatically correct in each language (case/agreement for German, conjugation for verbs, etc.) — this was previously done by hand/agent pass and reviewed for correctness; don't regress quality by generating sentences mechanically.

## App architecture (`app.js`)

**Language model**: `state.targetLang` (`'it' | 'de' | 'en'`) is the single source of truth for *both* which language the quiz answers/example sentences are in *and* which language the entire GUI chrome is rendered in — the two are intentionally coupled, not independent settings. Persisted to `localStorage` under `spanish_cards_target_lang_v1`.

- `LANG_META` maps a target-lang code to the `WORDS_DATA` field/sentence field to quiz on.
- `I18N`, `WORD_TYPE_LABELS`, `GENDER_WORDS`, `LANG_DISPLAY_NAME`, `ADJ_FORM` hold every UI string per language.
- `applyUILanguage()` is the one function that re-renders *all* static chrome (title, labels, button text/titles, badges, filter option text, etc.) from those tables. Call it after changing `state.targetLang`, and extend it (plus the `I18N`/label tables) rather than hardcoding new UI text — the app has no other translation mechanism.
- Spanish is always the fixed *source* language of the quiz; only the target side is switchable.

**Quiz flow**: `nextQuestion()` picks a random word from `state.filteredWords`, builds 5 options via `generateOptions()` (same grammatical type as distractors, in the current target language), and renders the card. `handleOptionSelect()` scores the answer, updates `state.stats` (persisted under `spanish_cards_game_stats_v1`), reveals the feedback/sentence/detail panels, and triggers speech.

**Speech synthesis** (`pickVoiceForLang`, `buildUtterance`, `withVoicesReady`, `speakBilingualSentences`): resolves a `SpeechSynthesisVoice` fresh from `speechSynthesis.getVoices()` on every call — voice objects are deliberately **not** cached across calls, because a stale cached reference has been observed to silently fall back to the browser's default UI-language voice in Chrome. `NOVELTY_VOICE_NAMES` deprioritizes macOS's joke persona voices (Eddy, Flo, Grandma, ...); `PREFERRED_VOICE_NAMES` force-picks known-good standard voices (Mónica/Alice/Anna/Samantha) by name when present. `withVoicesReady()` guards the load-time race where `getVoices()` briefly returns `[]` before the browser populates it.

Note: Brave's fingerprinting protection can suppress the real voice list from `speechSynthesis.getVoices()`, which breaks voice selection in a way that isn't fixable from app code — this is a known limitation, not a bug to chase in `app.js`.
