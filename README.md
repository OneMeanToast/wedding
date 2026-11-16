# Oona & Wes wedding site
Static site (no build), published by GitHub Pages to https://wesandoona.wedding.

- **Languages:** every guest-facing text exists twice, as `lang="en"` and `lang="fi"` elements; CSS hides the inactive one. Switch with the EN/FI buttons or `?lang=fi`. Page title/description are in `main.js`.
- **Config / placeholders:** the RSVP Google Form link, the IBAN and the USD gift details are set at the top of `main.js` (`RSVP_URL`, `GIFT_IBAN`, `GIFT_USD`). Empty = "coming soon".
- **Updates:** edit `updates.json` (date YYYY-MM-DD, `title` and `body` as `{ "en": "...", "fi": "..." }`; newest shown first).
- When changing `styles.css` or `main.js`, bump the `?v=` query in `index.html`.
