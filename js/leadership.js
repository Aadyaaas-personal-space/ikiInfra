/* =========================================================
   SD AURA — LEADERSHIP JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navbar =
        document.getElementById("mainNavbar");

    const revealElements =
        document.querySelectorAll(".reveal");

    const leaderCards =
        document.querySelectorAll(".leader-card");


    /* =====================================================
       NAVBAR
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

    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "active"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.1,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                observer.observe(element);

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "active"
                );

            }
        );

    }


    /* =====================================================
       LEADER CARD INTERACTION
    ===================================================== */

    leaderCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${Math.min(index * 70, 350)}ms`;


        card.addEventListener(
            "mouseenter",
            () => {

                leaderCards.forEach(
                    (otherCard) => {

                        if (
                            otherCard !== card
                        ) {

                            otherCard.style.opacity =
                                "0.55";

                        }

                    }
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                leaderCards.forEach(
                    (otherCard) => {

                        otherCard.style.opacity =
                            "";

                    }
                );

            }
        );

    });


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const navigation =
        document.getElementById(
            "mainNavigation"
        );


    if (navigation) {

        navigation
            .querySelectorAll(".nav-link")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        if (
                            window.innerWidth >= 992
                        ) {
                            return;
                        }


                        if (
                            !window.bootstrap
                        ) {
                            return;
                        }


                        const collapse =
                            bootstrap.Collapse
                                .getOrCreateInstance(
                                    navigation
                                );


                        collapse.hide();

                    }
                );

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
        .querySelectorAll(
            ".navbar .nav-link"
        )
        .forEach((link) => {

            const href =
                link.getAttribute("href");


            if (
                href === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        });


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "active"
                );

                element.style.transition =
                    "none";

            }
        );

    }


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );

});