/* ON START */

document.addEventListener("DOMContentLoaded", function (event) {
    // enable color theme
    if (localStorage.getItem("color-theme")) {
        // get hue as a number
        const hue = +localStorage.getItem("color-theme");
        // change the variable "hue" of the :root
        document.documentElement.style.setProperty('--hue', hue);
        // TODO: select the button with the hue selected
    }

    // enable light theme
    if (localStorage.getItem("light-theme") === "dark") {
        setTheme(true, "dark", activateLightModeMessage);
    } else {
        setTheme(false, "light", activateDarkModeMessage);
    }
    // activate highlight on current navigation
    checkCurrentNavigation();
});


/* TOGGLE THEME */

// Change color theme
function changeColorTheme(hue) {
    if (hue && !isNaN(hue)) {
        // change the variable "hue" of the :root
        document.documentElement.style.setProperty('--hue', hue);
        // save preferences in local storage
        localStorage.setItem("color-theme", hue);
    }
}

// Change light theme
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
    localStorage.setItem("light-theme", themeName);
}

/* NAVIGATION LINKS */

window.addEventListener("scroll", checkCurrentNavigation);

function checkCurrentNavigation() {
    const navLinks = document.querySelectorAll("nav ul li a");
    const scrollFromTop = window.scrollY;
    const halfOfWindow = document.documentElement.clientHeight / 2;

    navLinks.forEach(link => {
        const sectionAnchor = document.querySelector(link.hash);

        if (
            sectionAnchor.offsetTop - halfOfWindow <= scrollFromTop &&
            sectionAnchor.offsetTop + sectionAnchor.offsetHeight - halfOfWindow >= scrollFromTop
        ) {
            link.classList.add("selected-nav");
        } else {
            link.classList.remove("selected-nav");
        }
    });
}

/* BUTTON ACTIONS */

/**
 * Toggle hide/show example
 */
function displayExample(button, exampleId) {
    const example = document.getElementById(exampleId);
    // change button innerText
    button.textContent = example.classList.contains("d-none") ?
        "Hide example" : "Show me an example";
    // display/hide example
    example.classList.toggle("d-none");
}