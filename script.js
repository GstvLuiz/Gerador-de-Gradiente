const gradientBox = document.querySelector(".gradient-box");
const selectMenu = document.querySelector(".select-box select");
const colorInputs = document.querySelectorAll(".colors input");
const textarea = document.querySelector("textarea");
const refreshBtn = document.querySelector(".refresh");
const copyBtn = document.querySelector(".copy");

const getRandomColor = () => {
    const randomHex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
    return `#${randomHex}`;
}

const generateGradient = (isRandom) => {
    if (isRandom) {
        colorInputs.forEach(input => input.value = getRandomColor());
    }
    
    const colors = Array.from(colorInputs).map(input => input.value).join(", ");
    const gradient = `linear-gradient(${selectMenu.value}, ${colors})`;

    gradientBox.style.background = gradient;
    document.body.style.background = gradient;
    copyBtn.style.background = gradient;
    copyBtn.style.color = getTextColor(colorInputs[0].value); 

    textarea.value = `background: ${gradient};`;
}

const getTextColor = (hex) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? "#000" : "#fff"; 
}

const copyCode = () => {
    navigator.clipboard.writeText(textarea.value);
    copyBtn.innerText = "Code Copied!";
    setTimeout(() => copyBtn.innerText = "Copy Code", 1600);
}

colorInputs.forEach(input => {
    input.addEventListener("input", () => generateGradient(false));
});

selectMenu.addEventListener("change", () => generateGradient(false));
refreshBtn.addEventListener("click", () => generateGradient(true));
copyBtn.addEventListener("click", copyCode);

generateGradient(false);
