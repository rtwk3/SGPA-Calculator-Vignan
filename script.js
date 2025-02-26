// Waveform Animation
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let wavePhase = 0;
function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    for (let i = 0; i < canvas.width; i++) {
        let y = Math.sin(i * 0.02 + wavePhase) * 50 + canvas.height / 2;
        ctx.lineTo(i, y);
    }

    if (document.body.classList.contains("dark-mode")) {
        ctx.strokeStyle = "rgba(138, 43, 226, 0.8)"; // Dark mode color
    } else {
        ctx.strokeStyle = "rgba(6, 214, 160, 0.8)"; // Light mode color
    }

    ctx.lineWidth = 2;
    ctx.stroke();

    wavePhase += 0.05;
    requestAnimationFrame(drawWave);
}

drawWave();
// Modal JavaScript
const modal = document.getElementById("errorModal");
const errorMessage = document.getElementById("errorMessage");
const closeBtn = document.querySelector(".close");

//Hide Modal Initially (important!)
window.addEventListener('DOMContentLoaded', (event) => {
    hideErrorModal();
});


function showErrorModal(message) {
    errorMessage.textContent = message;
    modal.style.display = "block";  // Now guaranteed to work after DOM loads
}

function hideErrorModal() {
    modal.style.display = "none";
}

closeBtn.addEventListener("click", hideErrorModal);

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        hideErrorModal();
    }
});

function addCourse() {
    const container = document.getElementById("courseContainer");
    const div = document.createElement("div");
    div.classList.add("course");
    div.innerHTML = `
        <input type="number" placeholder="Credits (C)" class="credits" min="1" max="4" required>
        <input type="number" placeholder="Grade Points (P)" class="grade" min="0" max="10" required>
        <button class="remove-btn" onclick="removeCourse(this)"><i class="fas fa-trash"></i></button>
    `;
    container.appendChild(div);

    // Add event listeners to the new inputs
    div.querySelectorAll(".credits, .grade").forEach(input => {
        input.addEventListener("input", updateButtons);
    });

    // Update button states
    updateButtons();
}

function removeCourse(button) {
    button.parentElement.remove();
    updateButtons();
}
// Function to validate a single course's inputs
function validateCourse(course) {
    const creditsInput = course.querySelector(".credits");
    const gradeInput = course.querySelector(".grade");

    // Check if credits are within the range (1-4)
    const creditsValid = creditsInput.value >= 1 && creditsInput.value <= 4;
    // Check if grade points are within the range (0-10)
    const gradeValid = gradeInput.value >= 0 && gradeInput.value <= 10;

    // Add/remove red outline based on validity
    creditsInput.style.border = creditsValid ? "" : "2px solid red";
    gradeInput.style.border = gradeValid ? "" : "2px solid red";

    // Return true only if both inputs are valid
    return creditsValid && gradeValid;
}

// Function to validate all courses
function validateAllCourses() {
    const courses = document.querySelectorAll(".course");
    let allValid = true;

    courses.forEach(course => {
        if (!validateCourse(course)) {
            allValid = false;
        }
    });

    return allValid;
}

// Function to enable/disable buttons based on validation
function updateButtons() {
    const addButton = document.querySelector(".add-btn");
    const calculateButton = document.querySelector(".calculate-btn");

    // Enable buttons only if all courses are valid
    if (validateAllCourses()) {
        addButton.disabled = false;
        calculateButton.disabled = false;
    } else {
        addButton.disabled = true;
        calculateButton.disabled = true;
    }
}

// Add event listeners to all input fields
document.querySelectorAll(".credits, .grade").forEach(input => {
    input.addEventListener("input", updateButtons);
});

// Initial button state (disabled)
updateButtons();

// Add event listeners to all input fields
document.querySelectorAll(".credits, .grade").forEach(input => {
    input.addEventListener("input", updateButtons);
});

//SGPA Calculate
function calculateSGPA() {
    if (!validateAllCourses()) { // Validate FIRST
        showErrorModal("Please ensure all inputs are valid:\n- Credits (C) must be between 1 and 4.\n- Grade Points (P) must be between 0 and 10.");
        return; // Stop calculation if validation fails
    }

    let totalCredits = 0;
    let totalWeightedPoints = 0;

    document.querySelectorAll(".course").forEach((course) => {
        let c = parseFloat(course.querySelector(".credits").value) || 0;
        let p = parseFloat(course.querySelector(".grade").value) || 0;
        totalCredits += c;
        totalWeightedPoints += c * p;
    });

    let sgpa = totalCredits ? (totalWeightedPoints / totalCredits).toFixed(2) : 0;
    document.getElementById("result").textContent = sgpa;
}


//SGPA Calculate
function displaySGPAResult(result) {
    const resultBox = document.getElementById('result-box');
    resultBox.innerText = `Your SGPA is: ${result}`;
    resultBox.classList.add('visible');
  }
  
// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Change toggle button color based on mode
    updateToggleButton();
}
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
}

// Toggle Theme
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});
// 🎉 Confetti Rain for SGPA 7-9
// 🎉 Confetti Animation (with different shapes)
function startConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.classList.add("confetti-container");
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear`;
        confetti.style.backgroundColor = getRandomColor();
        
        // Apply random shapes
        setRandomShape(confetti);

        confettiContainer.appendChild(confetti);
    }

    // Remove confetti after 5 seconds
    setTimeout(() => {
        confettiContainer.remove();
    }, 2000);
}
// 🔥 Function to get a random confetti shape (Circle, Rectangle, or Star)
function setRandomShape(element) {
    const shapeType = Math.floor(Math.random() * 3);
    
    if (shapeType === 0) {
        element.style.borderRadius = "50%"; // Circle
    } else if (shapeType === 1) {
        element.style.borderRadius = "0"; // Rectangle
        element.style.width = "15px";
        element.style.height = "5px";
    } else {
        element.innerHTML = "★"; // Star
        element.style.fontSize = "14px";
        element.style.color = getRandomColor();
        element.style.background = "transparent";
    }
}

// 🎨 Function to get a random bright color
function getRandomColor() {
    const colors = ["#ff595e", "#ff924c", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
    return colors[Math.floor(Math.random() * colors.length)];
}
// 🧮 SGPA Calculation with Confetti Animations
function calculateSGPA() {
    let totalCredits = 0;
    let totalWeightedPoints = 0;

    document.querySelectorAll(".course").forEach((course) => {
        let c = parseFloat(course.querySelector(".credits").value) || 0;
        let p = parseFloat(course.querySelector(".grade").value) || 0;
        totalCredits += c;
        totalWeightedPoints += c * p;
    });

    let sgpa = totalCredits ? (totalWeightedPoints / totalCredits).toFixed(2) : 0;
    document.getElementById("result").textContent = sgpa;

    // Clear previous animations
    document.querySelectorAll(".confetti-container, .motivation-popup").forEach(el => el.remove());

    if (sgpa >= 9) {
        startConfetti();
        showMotivationMessage("🎆 Incredible! You did amazing! 🌟");
    } else if (sgpa >= 7 && sgpa < 9) {
        startConfetti();
        showMotivationMessage("✨ Great Work! Keep it up! 👍");
    } else {
        startSadAnimation();
        showMotivationMessage("Success is not final 🎯,  failure is not fatal;🏋it is the courage to continue that counts. 💯🫵🏻");
    }
}

// 🎭 Sad Emoji Animation for SGPA < 7
function startSadAnimation() {
    const emojiContainer = document.createElement("div");
    emojiContainer.classList.add("emoji-container");
    document.body.appendChild(emojiContainer);

    for (let i = 0; i < 30; i++) {
        const emoji = document.createElement("div");
        emoji.classList.add("emoji");
        emoji.innerText = ["😐", "🌟", "👏", "💪"][Math.floor(Math.random() * 4)];
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.animation = `fall ${Math.random() * 3 + 2}s linear`;

        emojiContainer.appendChild(emoji);
    }

    setTimeout(() => {
        emojiContainer.remove();
    }, 1500);
}

// 🌟 Show Motivational Message
function showMotivationMessage(message) {
    const messageBox = document.createElement("div");
    messageBox.classList.add("motivation-popup");
    messageBox.innerHTML = message;
    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.classList.add("fade-out");
        setTimeout(() => messageBox.remove(), 3000);
    }, 3000);
}


