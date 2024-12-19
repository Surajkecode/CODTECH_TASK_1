// Element Selectors
const password = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");
const strength = document.getElementById("strength");
const strengthBar = document.querySelector("#strength-bar .bar");
const copyPassword = document.getElementById("copy-password");

// Criteria
const criteria = {
    length: document.getElementById("length"),
    uppercase: document.getElementById("uppercase"),
    lowercase: document.getElementById("lowercase"),
    number: document.getElementById("number"),
    special: document.getElementById("special"),
};

// Strength Checking Function
const checkStrength = (password) => {
    let strengthValue = 0;

    // Criteria Checks
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*]/.test(password),
    };

    // Update UI for each criterion
    for (const [key, value] of Object.entries(checks)) {
        criteria[key].style.color = value ? "green" : "red";
        if (value) strengthValue++;
    }

    // Update Strength Bar
    const barColors = ["#ff5925", "yellow", "#26d730"];
    const percentage = (strengthValue / 5) * 100;
    strengthBar.style.width = `${percentage}%`;
    strengthBar.style.background = barColors[Math.min(strengthValue - 1, barColors.length - 1)];

    // Update Strength Text
    const strengthLevels = ["Weak", "Medium", "Strong"];
    strength.textContent = strengthLevels[Math.min(strengthValue - 1, strengthLevels.length - 1)] || "Weak";
};

// Event Listeners
password.addEventListener("input", () => {
    checkStrength(password.value);
});

togglePassword.addEventListener("click", () => {
    const isPassword = password.type === "password";
    password.type = isPassword ? "text" : "password";
    togglePassword.textContent = isPassword ? "🙈" : "👁️";
});

submitBtn.addEventListener("click", () => {
    alert(`Password Strength: ${strength.textContent}`);
});

copyPassword.addEventListener("click", () => {
    navigator.clipboard.writeText(password.value).then(() => {
        alert("Password copied to clipboard!");
    });
});
