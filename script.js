(() => {
  "use strict";

  const FONTS = [
    "Amiri", "Aref Ruqaa", "Cairo", "Changa", "El Messiri",
    "Harmattan", "Jomhuria", "Katibeh", "Lateef", "Lemonada",
    "Mada", "Marhey", "Markazi Text", "Noto Kufi Arabic",
    "Noto Naskh Arabic", "Noto Sans Arabic", "Rakkas",
    "Reem Kufi", "Scheherazade New", "Tajawal"
  ];

  const textEl = document.getElementById("text");
  const galleryEl = document.getElementById("fontGallery");
  const activeFontLabel = document.getElementById("activeFontLabel");
  const charCount = document.getElementById("charCount");

  const fontSizeInput = document.getElementById("fontSize");
  const fontSizeVal = document.getElementById("fontSizeVal");
  const lineHeightInput = document.getElementById("lineHeight");
  const lineHeightVal = document.getElementById("lineHeightVal");
  const inkColor = document.getElementById("inkColor");
  const paperColor = document.getElementById("paperColor");
  const alignBtns = document.querySelectorAll(".align-btn");
  const copyBtn = document.getElementById("copyBtn");
  const downloadPngBtn = document.getElementById("downloadPngBtn");
  const downloadSvgBtn = document.getElementById("downloadSvgBtn");
  const transparentBg = document.getElementById("transparentBg");
  const folio = document.querySelector(".folio");

  const state = {
    font: "Amiri",
    align: "right"
  };

  // Build the font gallery
  FONTS.forEach((font) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "font-chip";
    chip.setAttribute("role", "option");
    chip.setAttribute("aria-selected", font === state.font ? "true" : "false");
    chip.dataset.font = font;

    const sample = document.createElement("span");
    sample.className = "font-chip-sample";
    sample.style.fontFamily = `"${font}", serif`;
    sample.textContent = "أبجد هوز";

    const name = document.createElement("span");
    name.className = "font-chip-name";
    name.textContent = font;

    chip.appendChild(sample);
    chip.appendChild(name);
    chip.addEventListener("click", () => selectFont(font));
    galleryEl.appendChild(chip);
  });

  function selectFont(font) {
    state.font = font;
    textEl.style.fontFamily = `"${font}", serif`;
    activeFontLabel.textContent = font;
    document.querySelectorAll(".font-chip").forEach((chip) => {
      chip.setAttribute("aria-selected", chip.dataset.font === font ? "true" : "false");
    });
    persist();
  }

  function updateCharCount() {
    const len = textEl.value.length;
    charCount.textContent = `${len} حرفًا`;
  }

  textEl.addEventListener("input", updateCharCount);

  fontSizeInput.addEventListener("input", () => {
    textEl.style.fontSize = `${fontSizeInput.value}px`;
    fontSizeVal.textContent = `${fontSizeInput.value}px`;
    persist();
  });

  lineHeightInput.addEventListener("input", () => {
    const ratio = (lineHeightInput.value / 100).toFixed(2);
    textEl.style.lineHeight = ratio;
    lineHeightVal.textContent = ratio;
    persist();
  });

  inkColor.addEventListener("input", () => {
    textEl.style.color = inkColor.value;
    persist();
  });

  paperColor.addEventListener("input", () => {
    folio.style.background = paperColor.value;
    persist();
  });

  transparentBg.addEventListener("change", persist);

  alignBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.align = btn.dataset.align;
      textEl.style.textAlign = state.align;
      alignBtns.forEach((b) => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
      persist();
    });
  });

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(textEl.value);
      flashButton(copyBtn, "تم النسخ ✓");
    } catch (err) {
      flashButton(copyBtn, "تعذّر النسخ");
    }
  });

  downloadPngBtn.addEventListener("click", () => downloadAsImage());
  downloadSvgBtn.addEventListener("click", () => downloadAsSvg());

  function flashButton(btn, message) {
    const original = btn.textContent;
    btn.textContent = message;
    setTimeout(() => { btn.textContent = original; }, 1500);
  }

  function downloadAsImage() {
    const canvas = document.createElement("canvas");
    const scale = 4; // high-res export, crisp at large sizes
    const width = 1000;
    const padding = 60;
    const fontSize = parseInt(fontSizeInput.value, 10);
    const lineHeight = fontSize * parseFloat(lineHeightVal.textContent || "1.5");
    const lines = wrapText(textEl.value, fontSize, width - padding * 2);
    const height = Math.max(240, padding * 2 + lines.length * lineHeight);

    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    // Only paint a background if the user did NOT ask for transparency
    if (!transparentBg.checked) {
      ctx.fillStyle = paperColor.value;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.fillStyle = inkColor.value;
    ctx.font = `${fontSize}px "${state.font}"`;
    ctx.direction = "rtl";
    ctx.textAlign = state.align === "left" ? "left" : state.align === "center" ? "center" : "right";
    ctx.textBaseline = "alphabetic";

    const x = ctx.textAlign === "right" ? width - padding
      : ctx.textAlign === "center" ? width / 2
      : padding;

    lines.forEach((line, i) => {
      ctx.fillText(line, x, padding + fontSize + i * lineHeight);
    });

    const link = document.createElement("a");
    link.download = "arabic-font.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function downloadAsSvg() {
    // True vector export: text stays as <text> elements, not pixels.
    // Note: the font must be installed/available on whatever app opens the SVG,
    // since we reference it by name rather than embedding outlines.
    const width = 1000;
    const padding = 60;
    const fontSize = parseInt(fontSizeInput.value, 10);
    const lineHeight = fontSize * parseFloat(lineHeightVal.textContent || "1.5");
    const lines = wrapText(textEl.value, fontSize, width - padding * 2);
    const height = Math.max(240, padding * 2 + lines.length * lineHeight);

    const anchor = state.align === "left" ? "start" : state.align === "center" ? "middle" : "end";
    const x = anchor === "end" ? width - padding : anchor === "middle" ? width / 2 : padding;

    const bgRect = transparentBg.checked
      ? ""
      : `<rect width="${width}" height="${height}" fill="${paperColor.value}"/>`;

    const textLines = lines.map((line, i) => {
      const y = padding + fontSize + i * lineHeight;
      const safe = escapeXml(line);
      return `<text x="${x}" y="${y}" text-anchor="${anchor}" direction="rtl">${safe}</text>`;
    }).join("\n    ");

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${bgRect}
    <style>text { font-family: '${state.font}', serif; font-size: ${fontSize}px; fill: ${inkColor.value}; }</style>
    ${textLines}
    </svg>`;

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "arabic-font.svg";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  function escapeXml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function wrapText(text, fontSize, maxWidth) {
    const measurer = document.createElement("canvas").getContext("2d");
    measurer.font = `${fontSize}px "${state.font}"`;
    const paragraphs = text.split("\n");
    const lines = [];

    paragraphs.forEach((para) => {
      const words = para.split(" ");
      let current = "";
      words.forEach((word) => {
        const test = current ? `${current} ${word}` : word;
        if (measurer.measureText(test).width > maxWidth && current) {
          lines.push(current);
          current = word;
        } else {
          current = test;
        }
      });
      lines.push(current);
    });

    return lines;
  }

  function persist() {
    try {
      localStorage.setItem("afg-state", JSON.stringify({
        text: textEl.value,
        font: state.font,
        align: state.align,
        fontSize: fontSizeInput.value,
        lineHeight: lineHeightInput.value,
        ink: inkColor.value,
        paper: paperColor.value,
        transparent: transparentBg.checked
      }));
    } catch (err) { /* ignore storage errors */ }
  }

  function restore() {
    try {
      const saved = JSON.parse(localStorage.getItem("afg-state"));
      if (!saved) return;
      if (saved.text) textEl.value = saved.text;
      if (saved.fontSize) {
        fontSizeInput.value = saved.fontSize;
        textEl.style.fontSize = `${saved.fontSize}px`;
        fontSizeVal.textContent = `${saved.fontSize}px`;
      }
      if (saved.lineHeight) {
        lineHeightInput.value = saved.lineHeight;
        const ratio = (saved.lineHeight / 100).toFixed(2);
        textEl.style.lineHeight = ratio;
        lineHeightVal.textContent = ratio;
      }
      if (saved.ink) { inkColor.value = saved.ink; textEl.style.color = saved.ink; }
      if (saved.paper) { paperColor.value = saved.paper; folio.style.background = saved.paper; }
      if (saved.align) {
        state.align = saved.align;
        textEl.style.textAlign = saved.align;
        alignBtns.forEach((b) => b.setAttribute("aria-pressed", b.dataset.align === saved.align ? "true" : "false"));
      }
      if (saved.font) selectFont(saved.font);
      if (typeof saved.transparent === "boolean") transparentBg.checked = saved.transparent;
    } catch (err) { /* ignore */ }
  }

  // Init
  restore();
  updateCharCount();
  document.fonts.ready.then(() => {
    // Re-select current font once webfonts are loaded so metrics/measurement are accurate
    selectFont(state.font);
  });
})();

