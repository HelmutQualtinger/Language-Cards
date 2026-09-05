# Carte di Vocaboli · Wortkarten · Word Cards · Cartes de Vocabulaire · Szókártyák · Tarjetas de Vocabulario

🌐 **[Prova la app dal vivo / Live-Demo ausprobieren / Try it live / Essayer en ligne / Próbáld ki élőben / Pruébala en vivo](https://helmutqualtinger.github.io/Language-Cards/)**

![Screenshot](screenshot.jpg)

**🇩🇪 [Deutsch](#deutsch) · 🇬🇧 [English](#english) · 🇮🇹 [Italiano](#italiano) · 🇫🇷 [Français](#français) · 🇭🇺 [Magyar](#magyar) · 🇪🇸 [Español](#español)**

---

## Deutsch

Eine einseitige App zum Üben von spanischem Vokabular mit Karteikarten. Reines HTML/CSS/JS — kein Build, keine Abhängigkeiten.

Wähle frei die Ausgangssprache (Spanisch, Italienisch, Deutsch, Englisch, Französisch, Ungarisch oder Irisch) und die Zielsprache (Italienisch, Deutsch, Englisch, Französisch, Ungarisch oder Irisch — immer verschieden von der Ausgangssprache); Quiz, Feedback, Beispielsätze und die gesamte Oberfläche passen sich automatisch an.

### Funktionen

- Multiple-Choice-Karteikarten: Ein Wort in der Ausgangssprache wird angezeigt, du wählst die richtige Übersetzung aus 5 Optionen derselben Wortart.
- Ausgangssprache (🇪🇸/🇮🇹/🇩🇪/🇬🇧/🇫🇷/🇭🇺/🇮🇪) und Zielsprache (🇮🇹/🇩🇪/🇬🇧/🇫🇷/🇭🇺/🇮🇪) unabhängig wählbar — die Zielsprache bestimmt zugleich die gesamte Oberflächensprache; beide Auswahlen werden zwischen Sitzungen gespeichert und können nie gleich sein (wählst du zweimal dieselbe, wird die andere automatisch getauscht).
- Der Beispielsatz in der Ausgangssprache wird sofort angezeigt und vorgelesen, noch bevor du antwortest. Nach der Antwort erscheint zusätzlich der Satz in der Zielsprache, das jeweils passende Wort ist in beiden unterstrichen, dazu Referenzübersetzungen in allen anderen verfügbaren Sprachen.
- Sprachausgabe für das Ausgangswort und beide Beispielsätze mit automatischer Auswahl einer möglichst guten Stimme je Sprache; ein Schieberegler passt die Sprechgeschwindigkeit an, die Ausgangssprache wird zusätzlich immer 10 % langsamer gesprochen, um das Lernen zu erleichtern.
- Filter nach Wortart (Substantive, Verben, Adjektive, Adverbien oder alle) und nach Schwierigkeit (leicht/schwer/alle), unabhängig kombinierbar.
- 400 Vokabeln insgesamt: 200 häufige Grundwörter ("leicht") plus 200 weitere häufige Wörter ("schwer").
- Statistiken (richtig/falsch/Quote/Serie) und Verlauf der letzten Antworten, lokal gespeichert (`localStorage`).

### Start

Den Ordner über HTTP bereitstellen statt `index.html` direkt zu öffnen — einige Browser-APIs (insbesondere die Sprachsynthese) verhalten sich unter `file://` inkonsistent:

```bash
python3 -m http.server 8123
```

Dann `http://localhost:8123/index.html` öffnen.

### Dateien

- `index.html`, `style.css`, `app.js` — die Anwendung.
- `words_data.js` — die ersten 200 ("leichten") Wörter, von der App geladen.
- `words_data_2.js` — die nächsten 200 häufigsten Wörter ("schwer"), gleiches Format.
- `spanish_words_no_italian_cognate_200.csv` — ursprüngliche Rohdatenquelle (nur zur Referenz, wird nicht zur Laufzeit geladen).

Architektur-Hinweise siehe `CLAUDE.md`.

---

## English

A single-page app for practicing Spanish vocabulary with flashcards. Plain HTML/CSS/JS — no build, no dependencies.

Freely choose the source language (Spanish, Italian, German, English, French, Hungarian, or Irish) and the target language (Italian, German, English, French, Hungarian, or Irish — always different from the source), and the quiz, feedback, example sentences, and the entire interface adapt accordingly.

### Features

- Multiple-choice flashcards: a word is shown in the source language, and you pick the correct translation from 5 options of the same grammatical type.
- Source language (🇪🇸/🇮🇹/🇩🇪/🇬🇧/🇫🇷/🇭🇺/🇮🇪) and target language (🇮🇹/🇩🇪/🇬🇧/🇫🇷/🇭🇺/🇮🇪) selectable independently — the target language also drives the entire UI language; both choices are remembered across sessions and can never match (picking one equal to the other swaps the other automatically).
- The example sentence in the source language is shown and read aloud immediately, before you answer. After answering, the target-language sentence appears too, with the relevant word underlined in both, plus reference translations in every other available language.
- Speech synthesis for the source word and both example sentences, automatically picking a good-quality voice per language; a slider adjusts speech speed, and the source language is additionally always spoken 10% slower to make it easier to follow.
- Filter by word type (nouns, verbs, adjectives, adverbs, or all) and by difficulty (easy/hard/all), combinable independently.
- 400 words total: 200 common core words ("easy") plus 200 further high-frequency words ("hard").
- Statistics (correct/incorrect/accuracy/streak) and a history of recent answers, saved locally (`localStorage`).

### Running it

Serve the folder over HTTP instead of opening `index.html` directly — some browser APIs (particularly speech synthesis) behave inconsistently under `file://`:

```bash
python3 -m http.server 8123
```

Then open `http://localhost:8123/index.html`.

### Files

- `index.html`, `style.css`, `app.js` — the application.
- `words_data.js` — the first 200 ("easy") words, loaded by the app.
- `words_data_2.js` — the next 200 most-frequent words ("hard"), same format.
- `spanish_words_no_italian_cognate_200.csv` — the original raw data source (reference only, not loaded at runtime).

For architectural notes, see `CLAUDE.md`.

---

## Italiano

Un'app a pagina singola per esercitarsi con il vocabolario spagnolo tramite flashcard. HTML/CSS/JS puro — nessuna build, nessuna dipendenza.

Scegli liberamente la lingua di partenza (spagnolo, italiano, tedesco, inglese, francese, ungherese o irlandese) e la lingua di destinazione (italiano, tedesco, inglese, francese, ungherese o irlandese — sempre diversa dalla lingua di partenza), e il quiz, il feedback, le frasi di esempio e l'intera interfaccia si adattano di conseguenza.

### Funzionalità

- Flashcard a scelta multipla: viene mostrata una parola nella lingua di partenza, bisogna scegliere la traduzione corretta tra 5 opzioni della stessa categoria grammaticale.
- Lingua di partenza (🇪🇸/🇮🇹/🇩🇪/🇬🇧/🇫🇷/🇭🇺/🇮🇪) e lingua di destinazione (🇮🇹/🇩🇪/🇬🇧/🇫🇷/🇭🇺/🇮🇪) selezionabili indipendentemente — la lingua di destinazione cambia anche l'intera lingua dell'interfaccia; entrambe le scelte vengono ricordate tra una sessione e l'altra e non possono mai coincidere (selezionandone una uguale all'altra, l'altra viene scambiata automaticamente).
- La frase di esempio nella lingua di partenza viene mostrata e letta ad alta voce subito, prima di rispondere. Dopo la risposta compare anche la frase nella lingua di destinazione, con la parola pertinente sottolineata in entrambe, oltre alle traduzioni di riferimento in tutte le altre lingue disponibili.
- Sintesi vocale per la parola di partenza e per entrambe le frasi di esempio, con selezione automatica di una voce di buona qualità per ciascuna lingua; un cursore permette di regolare la velocità della sintesi vocale, e la lingua di partenza viene sempre pronunciata il 10% più lentamente per facilitarne l'apprendimento.
- Filtro per categoria grammaticale (sostantivi, verbi, aggettivi, avverbi, o tutte) e per difficoltà (facile/difficile/tutte), combinabili liberamente.
- 400 parole in totale: 200 parole comuni di base ("facili") più altre 200 parole ad alta frequenza ("difficili").
- Statistiche (corrette/sbagliate/precisione/serie) e cronologia delle risposte recenti, salvate in locale (`localStorage`).

### Avvio

Servi la cartella via HTTP invece di aprire `index.html` direttamente — alcune API del browser (in particolare la sintesi vocale) si comportano in modo incoerente con `file://`:

```bash
python3 -m http.server 8123
```

Poi apri `http://localhost:8123/index.html`.

### File

- `index.html`, `style.css`, `app.js` — l'applicazione.
- `words_data.js` — il dataset delle prime 200 parole (facili) caricato dall'app.
- `words_data_2.js` — le successive 200 parole più frequenti (difficili), stesso formato.
- `spanish_words_no_italian_cognate_200.csv` — fonte dati grezza originale (solo di riferimento, non caricata a runtime).

Per le note architetturali, vedi `CLAUDE.md`.

---

## Français

Une application monopage pour s'entraîner au vocabulaire espagnol avec des cartes-mémoire. HTML/CSS/JS pur — aucune compilation, aucune dépendance.

Choisis librement la langue source (espagnol, italien, allemand, anglais, français, hongrois ou irlandais) et la langue cible (italien, allemand, anglais, français, hongrois ou irlandais — toujours différente de la langue source) ; le quiz, le retour, les phrases d'exemple et toute l'interface s'adaptent en conséquence.

### Fonctionnalités

- Cartes-mémoire à choix multiple : un mot s'affiche dans la langue source, il faut choisir la bonne traduction parmi 5 options de la même catégorie grammaticale.
- Langue source (🇪🇸/🇮🇹/🇩🇪/🇬🇧/🇫🇷/🇭🇺/🇮🇪) et langue cible (🇮🇹/🇩🇪/🇬🇧/🇫🇷/🇭🇺/🇮🇪) sélectionnables indépendamment — la langue cible détermine aussi toute la langue de l'interface ; les deux choix sont mémorisés d'une session à l'autre et ne peuvent jamais être identiques (en choisir une identique à l'autre échange automatiquement l'autre).
- La phrase d'exemple dans la langue source est affichée et lue à voix haute immédiatement, avant même de répondre. Après la réponse, la phrase dans la langue cible apparaît aussi, avec le mot concerné souligné dans les deux, ainsi que les traductions de référence dans toutes les autres langues disponibles.
- Synthèse vocale pour le mot source et les deux phrases d'exemple, avec sélection automatique d'une voix de bonne qualité par langue ; un curseur permet de régler la vitesse de la synthèse vocale, et la langue source est en plus toujours prononcée 10 % plus lentement pour faciliter l'apprentissage.
- Filtre par catégorie grammaticale (noms, verbes, adjectifs, adverbes, ou toutes) et par difficulté (facile/difficile/toutes), combinables librement.
- 400 mots au total : 200 mots courants de base ("faciles") plus 200 mots supplémentaires à haute fréquence ("difficiles").
- Statistiques (correctes/incorrectes/précision/série) et historique des réponses récentes, enregistrés localement (`localStorage`).

### Lancement

Sers le dossier via HTTP plutôt que d'ouvrir `index.html` directement — certaines API du navigateur (en particulier la synthèse vocale) se comportent de façon incohérente sous `file://` :

```bash
python3 -m http.server 8123
```

Puis ouvre `http://localhost:8123/index.html`.

### Fichiers

- `index.html`, `style.css`, `app.js` — l'application.
- `words_data.js` — le jeu de données des 200 premiers mots (faciles) chargé par l'application.
- `words_data_2.js` — les 200 mots suivants les plus fréquents (difficiles), même format.
- `spanish_words_no_italian_cognate_200.csv` — source de données brute d'origine (référence uniquement, non chargée à l'exécution).

Pour les notes d'architecture, voir `CLAUDE.md`.

---

## Magyar

Egyoldalas alkalmazás spanyol szókincs gyakorlásához szókártyákkal. Tiszta HTML/CSS/JS — build és függőségek nélkül.

Szabadon választhatod meg a forrásnyelvet (spanyol, olasz, német, angol, francia, magyar vagy ír) és a célnyelvet (olasz, német, angol, francia, magyar vagy ír — mindig más, mint a forrásnyelv); a kvíz, a visszajelzés, a példamondatok és a teljes felhasználói felület ennek megfelelően alkalmazkodik.

### Funkciók

- Feleletválasztós szókártyák: egy szó jelenik meg a forrásnyelven, és 5, azonos szófajú lehetőség közül kell kiválasztani a helyes fordítást.
- A forrásnyelv (🇪🇸/🇮🇹/🇩🇪/🇬🇧/🇫🇷/🇭🇺/🇮🇪) és a célnyelv (🇮🇹/🇩🇪/🇬🇧/🇫🇷/🇭🇺/🇮🇪) egymástól függetlenül választható — a célnyelv egyben a teljes felület nyelvét is meghatározza; mindkét választás megmarad a munkamenetek között, és sosem lehet azonos (ha ugyanazt választod mindkettőhöz, a másik automatikusan átvált).
- A forrásnyelvű példamondat azonnal megjelenik és felolvasásra kerül, még mielőtt válaszolnál. A válasz után megjelenik a célnyelvű mondat is, mindkettőben aláhúzva a releváns szóval, valamint referencia-fordítások az összes többi elérhető nyelven.
- Hangszintézis a forrásszóhoz és mindkét példamondathoz, nyelvenként automatikusan kiválasztott jó minőségű hanggal; egy csúszka állítja a beszédsebességet, a forrásnyelv pedig mindig 10%-kal lassabban hangzik el a könnyebb tanulás érdekében.
- Szűrés szófaj szerint (főnevek, igék, melléknevek, határozószók, vagy mind) és nehézség szerint (könnyű/nehéz/mind), szabadon kombinálhatóan.
- Összesen 400 szó: 200 gyakori alapszó ("könnyű") plusz további 200 gyakori szó ("nehéz").
- Statisztikák (helyes/helytelen/arány/sorozat) és a legutóbbi válaszok előzményei, helyben tárolva (`localStorage`).

### Indítás

A mappát HTTP-n keresztül szolgáld ki ahelyett, hogy közvetlenül megnyitnád az `index.html`-t — egyes böngésző-API-k (különösen a hangszintézis) `file://` alatt következetlenül viselkednek:

```bash
python3 -m http.server 8123
```

Majd nyisd meg: `http://localhost:8123/index.html`.

### Fájlok

- `index.html`, `style.css`, `app.js` — az alkalmazás.
- `words_data.js` — az első 200 ("könnyű") szó, amit az app betölt.
- `words_data_2.js` — a következő 200 leggyakoribb szó ("nehéz"), ugyanolyan formátumban.
- `spanish_words_no_italian_cognate_200.csv` — az eredeti nyers adatforrás (csak referenciaként, futásidőben nem töltődik be).

Az architektúrával kapcsolatos megjegyzésekért lásd a `CLAUDE.md` fájlt.

---

## Español

Una aplicación de una sola página para practicar vocabulario español con tarjetas didácticas. HTML/CSS/JS puro — sin compilación, sin dependencias.

Elige libremente el idioma de origen (español, italiano, alemán, inglés, francés, húngaro o irlandés) y el idioma de destino (italiano, alemán, inglés, francés, húngaro o irlandés — siempre distinto del idioma de origen); el cuestionario, la retroalimentación, las frases de ejemplo y toda la interfaz se adaptan en consecuencia.

### Funcionalidades

- Tarjetas de opción múltiple: se muestra una palabra en el idioma de origen y hay que elegir la traducción correcta entre 5 opciones de la misma categoría gramatical.
- Idioma de origen (🇪🇸/🇮🇹/🇩🇪/🇬🇧/🇫🇷/🇭🇺/🇮🇪) e idioma de destino (🇮🇹/🇩🇪/🇬🇧/🇫🇷/🇭🇺/🇮🇪) seleccionables de forma independiente — el idioma de destino también determina todo el idioma de la interfaz; ambas elecciones se recuerdan entre sesiones y nunca pueden coincidir (si eliges uno igual al otro, el otro se intercambia automáticamente).
- La frase de ejemplo en el idioma de origen se muestra y se lee en voz alta de inmediato, antes de responder. Tras responder, aparece también la frase en el idioma de destino, con la palabra correspondiente subrayada en ambas, además de traducciones de referencia en todos los demás idiomas disponibles.
- Síntesis de voz para la palabra de origen y ambas frases de ejemplo, seleccionando automáticamente una voz de buena calidad para cada idioma; un control deslizante ajusta la velocidad del habla, y el idioma de origen se pronuncia además siempre un 10% más lento para facilitar el aprendizaje.
- Filtro por categoría gramatical (sustantivos, verbos, adjetivos, adverbios, o todas) y por dificultad (fácil/difícil/todas), combinables libremente.
- 400 palabras en total: 200 palabras comunes básicas ("fáciles") más otras 200 palabras de alta frecuencia ("difíciles").
- Estadísticas (correctas/incorrectas/precisión/racha) e historial de respuestas recientes, guardados localmente (`localStorage`).

### Puesta en marcha

Sirve la carpeta por HTTP en lugar de abrir `index.html` directamente — algunas API del navegador (en particular la síntesis de voz) se comportan de forma inconsistente bajo `file://`:

```bash
python3 -m http.server 8123
```

Luego abre `http://localhost:8123/index.html`.

### Archivos

- `index.html`, `style.css`, `app.js` — la aplicación.
- `words_data.js` — el conjunto de las primeras 200 palabras (fáciles) cargado por la app.
- `words_data_2.js` — las siguientes 200 palabras más frecuentes (difíciles), mismo formato.
- `spanish_words_no_italian_cognate_200.csv` — fuente de datos original en bruto (solo de referencia, no se carga en tiempo de ejecución).

Para notas de arquitectura, consulta `CLAUDE.md`.
