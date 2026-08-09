const text = document.getElementById("text");
const font = document.getElementById("font");
const color = document.getElementById("color");
const preview = document.getElementById("preview");
const download = document.getElementById("download");

function update() {
    preview.textContent = text.value || "";
    preview.style.fontFamily = `"${font.value}", sans-serif`;
    preview.style.color = color.value;
}

text.addEventListener("input", update);
font.addEventListener("change", update);
color.addEventListener("input", update);

download.addEventListener("click", async () => {

    await document.fonts.ready;

    const rect = preview.getBoundingClientRect();

    const canvas = document.createElement("canvas");
    const scale = 3;

    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;

    const ctx = canvas.getContext("2d");

    // IMPORTANT: do NOT draw a background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.scale(scale, scale);

    ctx.font = getComputedStyle(preview).font;
    ctx.fillStyle = color.value;
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    const textValue = text.value;

    ctx.fillText(
        textValue,
        rect.width - 40,
        rect.height / 2
    );

    const link = document.createElement("a");

    link.download = "arabic-transparent.png";
    link.href = canvas.toDataURL("image/png");

    link.click();
});

update();
