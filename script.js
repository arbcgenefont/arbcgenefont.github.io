const text = document.getElementById("text");
const font = document.getElementById("font");
const color = document.getElementById("color");
const preview = document.getElementById("preview");
const download = document.getElementById("download");

function update() {
    preview.textContent = text.value || "اكتب النص هنا";
    preview.style.fontFamily = `"${font.value}", sans-serif`;
    preview.style.color = color.value;
}

text.addEventListener("input", update);
font.addEventListener("change", update);
color.addEventListener("input", update);

download.addEventListener("click", async () => {
    const canvas = await html2canvas(preview, {
        scale: 2,
        backgroundColor: null
    });

    const link = document.createElement("a");
    link.download = "arabic-design.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

update();
