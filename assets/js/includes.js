function initNavFromInclude(containerEl) {
    var variant = containerEl.getAttribute("data-nav-page") || "work";
    var nav = containerEl.querySelector("nav");
    if (!nav) return;

    var homeLi = nav.querySelector("[data-nav-home-li]");
    var homeA = nav.querySelector("[data-nav-home]");
    var workA = nav.querySelector("[data-nav-work]");
    var aboutLi = nav.querySelector("[data-nav-about-li]");

    nav.querySelectorAll(".nav-item.active").forEach(function (el) {
        el.classList.remove("active");
    });
    nav.querySelectorAll(".nav-link.active").forEach(function (el) {
        el.classList.remove("active");
    });

    if (variant === "home") {
        if (homeA) homeA.setAttribute("href", "#hero-area");
        if (workA) workA.setAttribute("href", "#work");
        if (homeLi) homeLi.classList.add("active");
    } else if (variant === "about") {
        if (aboutLi) aboutLi.classList.add("active");
    } else {
        if (workA) workA.classList.add("active");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var elements = document.querySelectorAll("[data-include]");

    if (elements.length === 0) {
        return;
    }

    var completedCount = 0;

    var markComplete = function () {
        completedCount += 1;
        if (completedCount === elements.length) {
            window.dispatchEvent(new Event("includes:loaded"));
        }
    };

    elements.forEach(function (el) {
        var file = el.getAttribute("data-include");

        fetch(file)
            .then(function (response) {
                if (!response.ok) throw new Error("HTTP " + response.status + ": " + response.statusText);
                return response.text();
            })
            .then(function (data) {
                el.innerHTML = data;
                if (el.hasAttribute("data-nav-page")) {
                    initNavFromInclude(el);
                }
                markComplete();
            })
            .catch(err => {
                console.error(`Failed to load ${file}:`, err.message);
                el.innerHTML = `<!-- Failed to load include: ${file} - ${err.message} -->`;
                
                // Show a helpful message for debugging
                if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
                    console.log("This usually means you're opening the file directly in the browser.");
                    console.log("Try using a local web server instead.");
                    console.log("Run: python3 -m http.server 8000 in your project directory");
                }
                markComplete();
            });
    });
});