/* ON START */

document.addEventListener("DOMContentLoaded", function (event) {
    // enable theme
    if (localStorage.getItem("theme") === "dark") {
        setTheme(true, "dark", activateLightModeMessage);
    } else {
        setTheme(false, "light", activateDarkModeMessage);
    }
    // activate display on current navigation
    checkCurrentNavigation();
});


/* TOGGLE THEME */

const buttonTheme = document.querySelector("#btn-theme");
const activateDarkModeMessage = "Activate dark mode";
const activateLightModeMessage = "Activate light mode";

buttonTheme.addEventListener("click", (e) => {
    console.log("Switching theme");
    // if dark mode is enabled
    if (buttonTheme.getAttribute("aria-pressed") === "true") {
        setTheme(false, "light", activateDarkModeMessage);
    } else {
        setTheme(true, "dark", activateLightModeMessage);
    }
});

function setTheme(isButtonPressed, themeName, themeMessage) {
    buttonTheme.setAttribute("aria-pressed", isButtonPressed.toString());
    buttonTheme.setAttribute("title", themeMessage);
    buttonTheme.setAttribute("aria-label", themeMessage);
    document.documentElement.setAttribute("theme", themeName);
    // save preferences in local storage
    localStorage.setItem("theme", themeName);
}

/* NAVIGATION LINKS */

window.addEventListener("scroll", checkCurrentNavigation);

function checkCurrentNavigation() {
    const navLinks = document.querySelectorAll("nav ul li a");
    const mainSections = document.querySelectorAll("main section");
    const scrollFromTop = window.scrollY;
    const halfOfWindow = document.documentElement.clientHeight / 2;

    navLinks.forEach(link => {
        const sectionAnchor = document.querySelector(link.hash);

        if (
            sectionAnchor.offsetTop - halfOfWindow <= scrollFromTop &&
            sectionAnchor.offsetTop + sectionAnchor.offsetHeight - halfOfWindow >= scrollFromTop
        ) {
            link.classList.add("current");
        } else {
            link.classList.remove("current");
        }
    });
}