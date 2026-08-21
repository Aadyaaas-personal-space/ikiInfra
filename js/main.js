/* =========================================================
   SD AURA — MAIN JAVASCRIPT
   Premium SaaS / Enterprise Interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar = document.getElementById("mainNavbar");
    const revealElements = document.querySelectorAll(".reveal");
    const counters = document.querySelectorAll(".counter");
    const heroSection = document.querySelector(".hero-section");
    const heroOrbit = document.querySelector(".hero-orbit");


    /* =====================================================
       NAVBAR — SCROLL STATE
    ===================================================== */

    const updateNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

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
            element.classList.add("active");
        });

    }


    /* =====================================================
       STAGGER BUSINESS CARDS
    ===================================================== */

    const animatedGroups = [
        ".business-card",
        ".industry-card",
        ".expertise-row",
        ".stat-item"
    ];

    animatedGroups.forEach((selector) => {

        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {

            element.style.transitionDelay =
                `${Math.min(index * 70, 420)}ms`;

        });

    });


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const animateCounter = (counter) => {

        const target = Number(
            counter.getAttribute("data-target")
        );

        if (Number.isNaN(target)) return;

        const duration = 1600;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {

            const elapsed = currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            /*
             * Ease-out cubic
             */
            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentValue =
                Math.floor(target * easedProgress);

            counter.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        requestAnimationFrame(updateCounter);
    };


    /* =====================================================
       COUNTER OBSERVER
    ===================================================== */

    if (
        counters.length &&
        "IntersectionObserver" in window
    ) {

        const counterObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    animateCounter(entry.target);

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.5
            }
        );

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });

    }


    /* =====================================================
       HERO ORBIT MOUSE MOVEMENT
    ===================================================== */

    if (
        heroSection &&
        heroOrbit &&
        window.matchMedia("(min-width: 992px)").matches
    ) {

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;


        heroSection.addEventListener("mousemove", (event) => {

            const rect =
                heroSection.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;

            targetX = (x - 0.5) * 16;
            targetY = (y - 0.5) * 16;

        });


        heroSection.addEventListener("mouseleave", () => {

            targetX = 0;
            targetY = 0;

        });


        const animateOrbit = () => {

            currentX +=
                (targetX - currentX) * 0.06;

            currentY +=
                (targetY - currentY) * 0.06;

            heroOrbit.style.transform =
                `translate3d(${currentX}px, ${currentY}px, 0)`;

            requestAnimationFrame(animateOrbit);
        };

        animateOrbit();

    }


    /* =====================================================
       CARD TILT EFFECT
    ===================================================== */

    const cards = document.querySelectorAll(
        ".business-card"
    );

    if (
        cards.length &&
        window.matchMedia("(min-width: 992px)").matches
    ) {

        cards.forEach((card) => {

            card.addEventListener("mousemove", (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -2;

                const rotateY =
                    ((x - centerX) / centerX) * 2;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =====================================================
       SMOOTH ANCHOR LINKS
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');


    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

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


    /* =====================================================
       MOBILE NAVBAR — CLOSE AFTER CLICK
    ===================================================== */

    const navigation =
        document.getElementById("mainNavigation");

    if (navigation) {

        const mobileLinks =
            navigation.querySelectorAll(".nav-link");

        const navbarCollapse =
            bootstrap?.Collapse;

        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {

                if (
                    window.innerWidth < 992 &&
                    navbarCollapse
                ) {

                    const collapseInstance =
                        navbarCollapse.getOrCreateInstance(
                            navigation
                        );

                    collapseInstance.hide();

                }

            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    document
        .querySelectorAll(".navbar .nav-link")
        .forEach((link) => {

            const href =
                link.getAttribute("href");

            if (!href) return;

            if (href === currentPage) {

                document
                    .querySelectorAll(".navbar .nav-link")
                    .forEach((item) => {
                        item.classList.remove("active");
                    });

                link.classList.add("active");
            }

        });


    /* =====================================================
       BUTTON ARROW MICRO-INTERACTION
    ===================================================== */

    const interactiveButtons =
        document.querySelectorAll(
            ".btn-primary-custom, " +
            ".btn-outline-custom, " +
            ".btn-dark-custom, " +
            ".btn-light-custom, " +
            ".btn-white-custom, " +
            ".btn-nav"
        );


    interactiveButtons.forEach((button) => {

        button.addEventListener("mouseenter", () => {

            const icon =
                button.querySelector("i");

            if (!icon) return;

            icon.style.transform =
                "translate(3px, -3px)";

        });


        button.addEventListener("mouseleave", () => {

            const icon =
                button.querySelector("i");

            if (!icon) return;

            icon.style.transform = "";

        });

    });


    /* =====================================================
       REDUCE MOTION ACCESSIBILITY
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        document.documentElement.style
            .scrollBehavior = "auto";

        revealElements.forEach((element) => {
            element.classList.add("active");
            element.style.transition = "none";
        });

        counters.forEach((counter) => {

            const target =
                counter.getAttribute("data-target");

            counter.textContent = target;

        });

    }


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add("page-ready");

});