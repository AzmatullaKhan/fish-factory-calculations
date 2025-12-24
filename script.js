// ===== LANGUAGE TOGGLE =====
const toggle = document.getElementById("langToggle");
const english = document.querySelectorAll(".en");
const telugu = document.querySelectorAll(".te");

// default: English
telugu.forEach(el => el.style.display = "none");

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        english.forEach(el => el.style.display = "none");
        telugu.forEach(el => el.style.display = "block");
    } else {
        telugu.forEach(el => el.style.display = "none");
        english.forEach(el => el.style.display = "block");
    }
});

// ===== CALCULATION =====
const calcBtn = document.querySelector(".calc-btn");
const rohuInput = document.querySelector("input[placeholder='Enter Rohu value']");
const katlaInput = document.querySelector("input[placeholder='Enter Katla value']");
const avgResult = document.getElementById("avgResult");

// Add per tray result element
let perTrayResult = document.getElementById("perTrayResult");
if (!perTrayResult) {
    perTrayResult = document.createElement("div");
    perTrayResult.id = "perTrayResult";
    perTrayResult.className = "per-tray-result";
    avgResult.insertAdjacentElement("afterend", perTrayResult);
}

calcBtn.addEventListener("click", () => {
    const rohu = parseFloat(rohuInput.value) || 0;
    const katla = parseFloat(katlaInput.value) || 0;

    if (rohu <= 0 || katla <= 0) {
        avgResult.textContent = toggle.checked
            ? "దయచేసి సరైన విలువలను నమోదు చేయండి"
            : "Please enter valid values";
        perTrayResult.textContent = "";
        return;
    }

    const total = rohu + katla;
    const result = (katla * 10000) / total;
    const perTray = result / 40;

    // Display bilingual results
    avgResult.textContent = toggle.checked
        ? `లెక్కింపు ఫలితం: ${result.toFixed(2)} kg`
        : `Calculation Result: ${result.toFixed(2)} kg`;

    perTrayResult.textContent = toggle.checked
        ? `ప్రతి ట్రే: ${perTray.toFixed(2)} kg`
        : `Per Tray: ${perTray.toFixed(2)} kg`;
});
