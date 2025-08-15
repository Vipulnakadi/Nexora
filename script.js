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
    const headerHeight = document.querySelector('.main-header').offsetHeight;

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - headerHeight - 10) { // Offset for header height
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

    // --- Hide Header on Scroll Down ---
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            // Scrolling Down
            header.classList.add('header-hidden');
        } else {
            // Scrolling Up
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });

    // --- Contact Form Logic for index.html ---
    const contactForm = document.getElementById('contact-form');
    const modal = document.getElementById('contact-success-modal');
    const closeModalButton = modal ? modal.querySelector('.close-button') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real application, you would send this data to a server here.
            // For now, we will just show a success modal.
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Contact form submitted:', data); // Log data for demonstration

            if (modal) {
                modal.style.display = 'flex';
            }
            
            // Clear the form
            contactForm.reset();
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // --- User Profile & Login/Logout Functionality ---
    const userProfileLink = document.getElementById('user-profile-link');
    const user = JSON.parse(localStorage.getItem('nexoraUser'));

    if (userProfileLink && user) {
        userProfileLink.innerHTML = `<a href="#" class="nav-link">Hello, ${user.name}</a>`;
        userProfileLink.onclick = () => {
            showUserModal();
            return false;
        };
    } else if (userProfileLink) {
        userProfileLink.innerHTML = `<a href="login.html" class="nav-link">Login</a>`;
    }

    function showUserModal() {
        const modalHTML = `
            <div id="user-info-modal" class="modal" style="display:flex; align-items:center; justify-content:center;">
                <div class="modal-content" style="max-width: 400px; text-align: left; padding: 30px;">
                    <span class="close-button" onclick="document.getElementById('user-info-modal').remove()">&times;</span>
                    <h2 style="font-family:var(--header-font); color:var(--primary-color); text-align:center;">User Profile</h2>
                    <p style="margin-bottom:10px;"><strong>Name:</strong> ${user.name}</p>
                    <p style="margin-bottom:20px;"><strong>Email:</strong> ${user.email}</p>
                    <button id="logout-btn" class="cta-button" style="width:100%;">Logout</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('nexoraUser');
            window.location.reload();
        });
    }

});
