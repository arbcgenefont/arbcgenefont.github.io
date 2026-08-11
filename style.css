/* ---------------------------------------------------------
   Tokens
   Palette: illuminated-manuscript folio
   --------------------------------------------------------- */
:root {
  --paper: #f6efe2;
  --paper-deep: #efe4cf;
  --ink: #221b14;
  --ink-soft: #58503f;
  --rule: #d8c9a8;
  --emerald: #1f6f54;
  --emerald-deep: #164f3c;
  --gold: #b98a2e;
  --gold-soft: #e4c789;

  --display: "Aref Ruqaa", serif;
  --ui: "Cairo", sans-serif;
  --utility: "Noto Kufi Arabic", sans-serif;

  --radius: 2px;
  --shadow: 0 1px 0 rgba(34, 27, 20, 0.06), 0 12px 30px -18px rgba(34, 27, 20, 0.35);
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--paper-deep);
  color: var(--ink);
  font-family: var(--ui);
}

body {
  background-image:
    radial-gradient(1200px 600px at 15% -10%, rgba(31, 111, 84, 0.06), transparent 60%),
    radial-gradient(900px 500px at 100% 0%, rgba(185, 138, 46, 0.08), transparent 55%);
}

.page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 56px 24px 96px;
}

/* ---------------------------------------------------------
   Hero
   --------------------------------------------------------- */
.hero {
  text-align: center;
  margin-bottom: 48px;
}

.eyebrow {
  font-family: var(--utility);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--emerald-deep);
  margin: 0 0 14px;
  text-transform: none;
}

.title {
  font-family: var(--display);
  font-size: clamp(42px, 8vw, 76px);
  line-height: 1.15;
  margin: 0 0 12px;
  color: var(--ink);
  font-weight: 700;
}

.subtitle {
  font-size: 16px;
  color: var(--ink-soft);
  margin: 0;
}

/* ---------------------------------------------------------
   Workspace: folio + controls
   --------------------------------------------------------- */
.workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 24px;
  align-items: start;
}

@media (max-width: 760px) {
  .workspace { grid-template-columns: 1fr; }
}

.folio {
  position: relative;
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 48px 40px 28px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
}

.corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border-color: var(--gold);
  border-style: solid;
  border-width: 0;
  opacity: 0.85;
}
.corner--tl { top: 10px; right: 10px; border-top-width: 2px; border-right-width: 2px; }
.corner--tr { top: 10px; left: 10px; border-top-width: 2px; border-left-width: 2px; }
.corner--bl { bottom: 10px; right: 10px; border-bottom-width: 2px; border-right-width: 2px; }
.corner--br { bottom: 10px; left: 10px; border-bottom-width: 2px; border-left-width: 2px; }

.preview-text {
  flex: 1;
  width: 100%;
  min-height: 220px;
  resize: vertical;
  border: none;
  outline: none;
  background: transparent;
  color: var(--ink);
  font-family: "Amiri", serif;
  font-size: 44px;
  line-height: 1.5;
  text-align: right;
}

.preview-text::placeholder { color: var(--ink-soft); }

.folio-meta {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed var(--rule);
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: var(--utility);
  font-size: 12px;
  color: var(--ink-soft);
}

.dot { color: var(--gold); }

/* ---------------------------------------------------------
   Controls panel
   --------------------------------------------------------- */
.controls {
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.control-block--row {
  display: flex;
  gap: 16px;
}
.control-block--row > div { flex: 1; }

.control-title {
  font-family: var(--utility);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--emerald-deep);
  margin: 0 0 8px;
}

input[type="range"] {
  width: 100%;
  accent-color: var(--emerald);
}

output {
  display: block;
  font-size: 12px;
  color: var(--ink-soft);
  margin-top: 4px;
}

input[type="color"] {
  width: 100%;
  height: 32px;
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  padding: 2px;
  background: transparent;
  cursor: pointer;
}

.align-group {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

.align-btn {
  font-family: var(--ui);
  font-size: 12px;
  padding: 8px 4px;
  border: 1px solid var(--rule);
  background: var(--paper);
  color: var(--ink-soft);
  border-radius: var(--radius);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.align-btn:hover { border-color: var(--gold); color: var(--ink); }

.align-btn[aria-pressed="true"] {
  background: var(--emerald);
  border-color: var(--emerald);
  color: var(--paper);
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--ink-soft);
  cursor: pointer;
}

.checkbox-row input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: var(--emerald);
  cursor: pointer;
}

.control-block--actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}

.action-btn {
  font-family: var(--ui);
  font-size: 14px;
  font-weight: 600;
  padding: 12px 16px;
  border-radius: var(--radius);
  border: 1px solid var(--rule);
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
  transition: transform 0.12s ease, background 0.15s ease, border-color 0.15s ease;
}

.action-btn:hover { border-color: var(--gold); }
.action-btn:active { transform: translateY(1px); }

.action-btn--primary {
  background: var(--emerald);
  border-color: var(--emerald);
  color: var(--paper);
}
.action-btn--primary:hover { background: var(--emerald-deep); border-color: var(--emerald-deep); }

/* ---------------------------------------------------------
   Font gallery — signature element
   --------------------------------------------------------- */
.gallery {
  margin-top: 40px;
}

.gallery-title {
  font-family: var(--utility);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--emerald-deep);
  margin: 0 0 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--rule);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.font-chip {
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  padding: 16px 12px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.12s ease;
}

.font-chip:hover {
  border-color: var(--gold);
  transform: translateY(-2px);
}

.font-chip[aria-selected="true"] {
  border-color: var(--emerald);
  box-shadow: 0 0 0 1px var(--emerald) inset;
}

.font-chip-sample {
  font-size: 22px;
  color: var(--ink);
  line-height: 1.3;
}

.font-chip-name {
  font-family: var(--utility);
  font-size: 10px;
  letter-spacing: 0.03em;
  color: var(--ink-soft);
  direction: ltr;
}

/* Focus visibility */
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
.font-chip:focus-visible {
  outline: 2px solid var(--emerald);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}

