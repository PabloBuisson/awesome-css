/* ON START */

document.addEventListener("DOMContentLoaded", function (event) {
    // enable color theme
    if (localStorage.getItem("color-theme")) {
        // get hue as a number
        const hue = +localStorage.getItem("color-theme");
        // change the variable "hue" of the :root
        document.documentElement.style.setProperty('--hue', hue);
        hightlightButtonTheme(hue);
    } else {
        hightlightButtonTheme(336);
    }

    // enable light theme
    // the dark theme is enabled by default
    if (localStorage.getItem("light-theme") === "light") {
        setTheme(false, "light", activateDarkModeMessage);
    } else {
        setTheme(true, "dark", activateLightModeMessage);
    }
    // activate highlight on current navigation
    checkCurrentNavigation();


    // get the height of the header to place the big title
    const header = document.querySelector("#header");
    const headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
});


/* TOGGLE THEME */

// Change color theme
function changeColorTheme(hue) {
    if (hue && !isNaN(hue)) {
        // change the variable "hue" of the :root
        document.documentElement.style.setProperty('--hue', hue);
        // save preferences in local storage
        localStorage.setItem("color-theme", hue);
        hightlightButtonTheme(hue);
    }
}

// change color theme with the slider
const slider = document.querySelector('#slider-shade');
const containerSlider = document.querySelector('#container-user-theme');
slider.addEventListener('input', function (event) {
    // prevent document to call the function on restored tab
    if (!containerSlider.classList.contains("d-none")) {
        changeColorTheme(this.value);
    }
});

// display slider
function displayUserTheme() {
    const userThemeBlock = document.querySelector('#container-user-theme');
    userThemeBlock.classList.toggle('d-none');
}

// hightlight the button color theme
function hightlightButtonTheme(hue) {
    const btnColorTheme = document.querySelectorAll(".btn-color-theme");
    btnColorTheme.forEach(btn => {
        const colorData = btn.getAttribute("data-color");
        if (+colorData == hue) {
            btn.classList.add("btn-color-theme-selected");
        } else {
            btn.classList.remove("btn-color-theme-selected");
        }
    })
}

// Change light theme
const buttonTheme = document.querySelector("#btn-theme");
const buttonThemeExample = document.querySelector("#btn-example-theme");
const activateDarkModeMessage = "Activate dark mode";
const activateLightModeMessage = "Activate light mode";

buttonTheme.addEventListener("click", (e) => {
    // if dark mode is enabled
    if (buttonTheme.getAttribute("aria-pressed") === "true") {
        setTheme(false, "light", activateDarkModeMessage);
    } else {
        setTheme(true, "dark", activateLightModeMessage);
    }
});

buttonThemeExample.addEventListener("click", (e) => {
    // if dark mode is enabled
    if (buttonThemeExample.textContent === activateLightModeMessage) {
        setTheme(false, "light", activateDarkModeMessage);
    } else {
        setTheme(true, "dark", activateLightModeMessage);
    }
})

function setTheme(isButtonPressed, themeName, themeMessage) {
    buttonTheme.setAttribute("aria-pressed", isButtonPressed.toString());
    buttonTheme.setAttribute("title", themeMessage);
    buttonTheme.setAttribute("aria-label", themeMessage);
    document.documentElement.setAttribute("theme", themeName);
    // change light theme example
    buttonThemeExample.textContent = themeMessage;
    // save preferences in local storage
    localStorage.setItem("light-theme", themeName);
}

// change light theme example
// const buttonTheme = document.querySelector("#btn-example-theme");

/* NAVIGATION LINKS */

window.addEventListener("scroll", checkCurrentNavigation);

function checkCurrentNavigation() {
    const navLinks = document.querySelectorAll(".nav-bullets a");
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