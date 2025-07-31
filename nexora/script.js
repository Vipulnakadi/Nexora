document.addEventListener('DOMContentLoaded', function() {
    
    // --- Tab Functionality for Policies ---
    window.openTab = function(evt, tabName) {
        // Get all elements with class="tab-content" and hide them
        const tabcontent = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove("active");
        }

        // Get all elements with class="tab-button" and remove the class "active"
        const tablinks = document.getElementsByClassName("tab-button");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";
        document.getElementById(tabName).classList.add("active");
        evt.currentTarget.className += " active";
    }

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll("section[id]");
    const navLi = document.querySelectorAll(".main-nav ul li a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 75) { // 75 is header height
                current = section.getAttribute("id");
            }
        });

        navLi.forEach((a) => {
            a.classList.remove("active");
            if (a.getAttribute('href').includes(current)) {
                a.classList.add("active");
            }
        });
    });

});
