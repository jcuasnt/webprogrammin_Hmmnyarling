let optionCount = 3; // Default option count
let labels = ["옵션 1", "옵션 2", "옵션 3"]; // Default labels
let isSpinning = false;
let currentRotation = 0; // Tracks the current rotation of the roulette

function updateOptionCount(delta) {
    if (isSpinning) return; // Prevent changes during spinning

    const newCount = optionCount + delta;
    if (newCount >= 2 && newCount <= 6) {
        if (newCount > optionCount) {
            // Add new default options
            for (let i = optionCount; i < newCount; i++) {
                labels.push(`옵션 ${i + 1}`);
            }
        } else {
            // Remove excess options
            labels = labels.slice(0, newCount);
        }

        optionCount = newCount;
        document.getElementById("optionCountDisplay").innerText = optionCount;
        updateInputs();
        drawRoulette();
    }
}

function updateInputs() {
    const container = document.getElementById("inputsContainer");
    container.innerHTML = ""; // Clear previous inputs
    labels.forEach((label, index) => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = label;
        input.dataset.index = index;
        input.disabled = isSpinning; // Disable input during spinning
        input.addEventListener("input", (e) => updateLabelText(e.target));
        container.appendChild(input);
    });
}

function updateLabelText(input) {
    const index = parseInt(input.dataset.index, 10);
    labels[index] = input.value; // Update the label
    drawRoulette(); // Redraw the roulette with updated labels
}

// 1. Load the custom font using FontFace API
const customFont = new FontFace("PFStardust", "url('../asset/font/PF스타더스트 3.0 S.ttf')");

// 2. Add the font to the document and load it
customFont.load().then((loadedFont) => {
    document.fonts.add(loadedFont); // Add the font to the document

    // Redraw the roulette after the font is loaded
    drawRoulette();
}).catch((error) => {
    console.error("Failed to load custom font:", error);
});
function drawRoulette() {
    const canvas = document.getElementById("rouletteCanvas");
    const ctx = canvas.getContext("2d");
    const colors = [
        "#F49999", "#FFF5A8", "#C1FFBE", // 지정 색상
        "#A8D5FF", "#D5A8FF", "#FFA8E5"  // 추가 색상 (파랑, 보라, 분홍 계열)
    ];
    const angleStep = (2 * Math.PI) / optionCount;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw segments
    for (let i = 0; i < optionCount; i++) {
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, i * angleStep, (i + 1) * angleStep);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();

        // Add text
        const angle = i * angleStep + angleStep / 2;
        const x = 200 + Math.cos(angle) * 120;
        const y = 200 + Math.sin(angle) * 120;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Default font settings (reset to original)
        ctx.fillStyle = "#000";
        ctx.font = "14px Arial"; // Default font: Arial, 14px
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(labels[i], 0, 0); // Draw option text
        ctx.restore();
    }
}
function spinRoulette() {
    if (isSpinning) return; // Prevent multiple spins
    isSpinning = true;

    // Disable inputs during spinning
    const inputs = document.querySelectorAll("#inputsContainer input");
    inputs.forEach((input) => (input.disabled = true));

    const canvas = document.getElementById("rouletteCanvas");

    // Generate a random angle ensuring at least 2 full rotations (720 degrees)
    const extraRotation = Math.floor(Math.random() * 360); // Random extra angle (0 to 359 degrees)
    const totalRotation = 720 + extraRotation; // 2 full rotations + random extra angle
    currentRotation = (currentRotation + totalRotation) % 360; // Update current rotation

    // Apply the rotation
    canvas.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
        // End spinning state after animation
        isSpinning = false;

        // Re-enable inputs after spinning
        inputs.forEach((input) => (input.disabled = false));
    }, 4000); // Match the CSS animation duration
}

function resetRoulette() {
    if (isSpinning) return; // Prevent resetting during spin

    // Reset variables to initial state
    optionCount = 3; // Default option count
    labels = ["옵션 1", "옵션 2", "옵션 3"]; // Default labels
    currentRotation = 0; // Reset rotation state

    // Reset UI
    document.getElementById("optionCountDisplay").innerText = optionCount;
    updateInputs();
    drawRoulette();

    // Reset canvas rotation (fix unwanted spinning)
    const canvas = document.getElementById("rouletteCanvas");
    canvas.style.transition = "none"; // Temporarily disable transition
    canvas.style.transform = "rotate(0deg)"; // Reset rotation to initial position

    // Re-enable transition after resetting
    setTimeout(() => {
        canvas.style.transition = "transform 4s cubic-bezier(0.33, 1, 0.68, 1)";
    }, 50);
}

// Initialize
document.getElementById("optionCountDisplay").innerText = optionCount; // Initial count
updateInputs();
drawRoulette();
