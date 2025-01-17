/* ===================== Toggle Style Switcher ================== */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
const styleSwitcher = document.querySelector(".style-switcher");

// Toggle switcher visibility
styleSwitcherToggle.addEventListener("click", () => {
    styleSwitcher.classList.toggle("open");
});

// Hide style-switcher on scroll
window.addEventListener("scroll", () => {
    if (styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open");
    }
});

/* ===================== Theme Colors ================== */
const alternateStyles = document.querySelectorAll(".alternate-style");

// Set active color style
function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
            styleSwitcher.querySelector(`.color-${color}`).classList.add('active'); // highlight the selected color
        } else {
            style.setAttribute("disabled", "true");
            styleSwitcher.querySelector(`.color-${style.getAttribute("title")}`).classList.remove('active'); // remove highlight from unselected
        }
    });
}

/* ===================== Day & Night Mode ================== */
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
});

// Set default icon based on the initial mode
window.addEventListener("load", () => {
    if (document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.add("fa-sun");
    } else {
        dayNight.querySelector("i").classList.add("fa-moon");
    }
});

// Save user preferences to localStorage
function savePreferences() {
    const selectedColor = document.querySelector('.style-switcher .colors span.active')?.getAttribute('class').split(' ')[1];
    const isDarkMode = document.body.classList.contains("dark");

    localStorage.setItem('themeColor', selectedColor);
    localStorage.setItem('darkMode', isDarkMode);
}

// Apply preferences on page load
window.addEventListener('load', () => {
    const themeColor = localStorage.getItem('themeColor');
    const darkMode = localStorage.getItem('darkMode') === 'true';

    if (themeColor) {
        setActiveStyle(themeColor.split('-')[1]);
    }
    if (darkMode) {
        document.body.classList.add("dark");
        dayNight.querySelector("i").classList.add("fa-sun");
    }
});
