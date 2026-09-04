# Carte di Vocaboli / Wortkarten / Word Cards

Un'app a pagina singola per esercitarsi con il vocabolario spagnolo tramite flashcard. HTML/CSS/JS puro — nessuna build, nessuna dipendenza.

Lo spagnolo è sempre la lingua di partenza. Scegli una lingua di destinazione — italiano, tedesco o inglese — e il quiz, il feedback, le frasi di esempio e l'intera interfaccia si adattano di conseguenza.

![Screenshot dell'app](screenshot.jpg)

## Funzionalità

- Flashcard a scelta multipla: viene mostrata una parola spagnola, bisogna scegliere la traduzione corretta tra 5 opzioni della stessa categoria grammaticale.
- Lingua di destinazione selezionabile (🇮🇹/🇩🇪/🇬🇧) — cambia sia le risposte del quiz sia l'intera lingua dell'interfaccia, e viene ricordata tra una sessione e l'altra.
- Dopo la risposta, viene mostrata una frase di esempio in spagnolo e nella lingua di destinazione, con la parola pertinente sottolineata in entrambe, oltre alle traduzioni di riferimento in tutte e tre le lingue.
- Sintesi vocale per la parola spagnola e per entrambe le frasi di esempio, con selezione automatica di una voce di buona qualità per ciascuna lingua.
- Filtro per categoria grammaticale (sostantivi, verbi, aggettivi, avverbi, o tutte).
- Statistiche (corrette/sbagliate/precisione/serie) e cronologia delle risposte recenti, salvate in locale (`localStorage`).

## Avvio

Servi la cartella via HTTP invece di aprire `index.html` direttamente — alcune API del browser (in particolare la sintesi vocale) si comportano in modo incoerente con `file://`:

```bash
python3 -m http.server 8123
```

Poi apri `http://localhost:8123/index.html`.

## File

- `index.html`, `style.css`, `app.js` — l'applicazione.
- `words_data.js` — il dataset di 200 parole caricato dall'app.
- `spanish_words_no_italian_cognate_200.csv` — fonte dati grezza originale (solo di riferimento, non caricata a runtime).

Per le note architetturali, vedi `CLAUDE.md`.
