/* =========================================================
   IKI INFRA
   GALLERY JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR SCROLL
    ====================================================== */

    const navbar = document.getElementById("mainNavbar");

    const handleNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    handleNavbar();

    window.addEventListener("scroll", handleNavbar, {
        passive: true
    });


    /* =====================================================
       REVEAL ANIMATION
    ====================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       GALLERY LIGHTBOX
    ====================================================== */

    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCategory = document.getElementById("lightboxCategory");
    const lightboxNumber = document.getElementById("lightboxNumber");

    const closeButton = document.querySelector(".lightbox-close");
    const previousButton = document.querySelector(".lightbox-prev");
    const nextButton = document.querySelector(".lightbox-next");

    const galleryCards = Array.from(
        document.querySelectorAll(".gallery-card")
    );

    let currentIndex = 0;


    /* =====================================================
       OPEN LIGHTBOX
    ====================================================== */

    function openLightbox(index) {

        if (!galleryCards.length) return;

        currentIndex = index;

        const card = galleryCards[currentIndex];

        const imagePath = card.dataset.image;
        const category = card.dataset.category;

        const numberElement = card.querySelector(".gallery-number");

        const number = numberElement
            ? numberElement.textContent.trim()
            : String(currentIndex + 1).padStart(2, "0");


        lightboxImage.src = imagePath;

        lightboxImage.alt =
            `${category} project ${number}`;

        lightboxCategory.textContent = category;
        lightboxNumber.textContent = number;

        lightbox.classList.add("active");

        document.body.classList.add("gallery-lightbox-open");

    }


    /* =====================================================
       CLOSE LIGHTBOX
    ====================================================== */

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.classList.remove("gallery-lightbox-open");

        setTimeout(() => {

            if (!lightbox.classList.contains("active")) {

                lightboxImage.src = "";

            }

        }, 350);

    }


    /* =====================================================
       NEXT IMAGE
    ====================================================== */

    function showNext() {

        currentIndex =
            (currentIndex + 1) % galleryCards.length;

        openLightbox(currentIndex);

    }


    /* =====================================================
       PREVIOUS IMAGE
    ====================================================== */

    function showPrevious() {

        currentIndex =
            (currentIndex - 1 + galleryCards.length)
            % galleryCards.length;

        openLightbox(currentIndex);

    }


    /* =====================================================
       CARD CLICK
    ====================================================== */

    galleryCards.forEach((card, index) => {

        card.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    /* =====================================================
       BUTTONS
    ====================================================== */

    if (closeButton) {

        closeButton.addEventListener("click", closeLightbox);

    }

    if (nextButton) {

        nextButton.addEventListener("click", showNext);

    }

    if (previousButton) {

        previousButton.addEventListener("click", showPrevious);

    }


    /* =====================================================
       BACKDROP CLICK
    ====================================================== */

    const backdrop = document.querySelector(".lightbox-backdrop");

    if (backdrop) {

        backdrop.addEventListener("click", closeLightbox);

    }


    /* =====================================================
       KEYBOARD CONTROLS
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowRight") {

            showNext();

        }

        if (event.key === "ArrowLeft") {

            showPrevious();

        }

    });


    /* =====================================================
       PREVENT BODY SCROLL WHEN LIGHTBOX IS OPEN
    ====================================================== */

    const style = document.createElement("style");

    style.textContent = `
        body.gallery-lightbox-open {
            overflow: hidden;
        }
    `;

    document.head.appendChild(style);


    /* =====================================================
       SMOOTH CATEGORY NAVIGATION
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

});