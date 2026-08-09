const text = document.getElementById("text");
const font = document.getElementById("font");
const color = document.getElementById("color");
const preview = document.getElementById("preview");
const download = document.getElementById("download");

function update() {
    preview.textContent = text.value || " ";
    preview.style.fontFamily = `"${font.value}", sans-serif`;
    preview.style.color = color.value;
}

text.addEventListener("input", update);
font.addEventListener("change", update);
color.addEventListener("input", update);

download.addEventListener("click", async () => {

    await document.fonts.ready;

    const canvas = await html2canvas(preview, {
        backgroundColor: null,
        scale: 3,
        useCORS: true
    });

    const link = document.createElement("a");

    link.download = "arabic-text.png";
    link.href = canvas.toDataURL("image/png");

    link.click();
});

update();
