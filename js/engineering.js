/* =========================================================
   SD AURA
   ENGINEERING SOLUTIONS
   PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const navbar =
        document.getElementById("mainNavbar");

    const navigation =
        document.getElementById("mainNavigation");

    const revealElements =
        document.querySelectorAll(".reveal");


    /* =====================================================
       NAVBAR SCROLL
    ====================================================== */

    const updateNavbar = () => {

        if (!navbar) {
            return;
        }

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
    ====================================================== */

    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            entry.target.classList.add(
                                "active"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -45px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

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
       STAGGERED CAPABILITY ANIMATION
    ====================================================== */

    const capabilityCards =
        document.querySelectorAll(
            ".capability-card"
        );


    capabilityCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 70}ms`;

        }
    );


    /* =====================================================
       STAGGERED METHOD ANIMATION
    ====================================================== */

    const methodItems =
        document.querySelectorAll(
            ".method-item"
        );


    methodItems.forEach(
        (item, index) => {

            item.style.transitionDelay =
                `${index * 70}ms`;

        }
    );


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    (event) => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {

                            return;

                        }


                        event.preventDefault();


                        const navbarHeight =
                            navbar
                                ? navbar.offsetHeight
                                : 0;


                        const targetPosition =
                            target
                                .getBoundingClientRect()
                                .top
                            +
                            window.scrollY
                            -
                            navbarHeight
                            -
                            15;


                        window.scrollTo({

                            top:
                                targetPosition,

                            behavior:
                                "smooth"

                        });


                    }
                );

            }
        );


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    if (navigation) {

        const navLinks =
            navigation.querySelectorAll(
                ".nav-link"
            );


        navLinks.forEach(
            (link) => {

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

            }
        );

    }


    /* =====================================================
       ACTIVE PAGE DETECTION
    ====================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    document
        .querySelectorAll(
            ".navbar .nav-link"
        )
        .forEach(
            (link) => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    href === currentPage
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );


    /* =====================================================
       PARALLAX TECHNICAL VISUAL
    ====================================================== */

    const engineeringVisual =
        document.querySelector(
            ".engineering-visual"
        );


    if (
        engineeringVisual &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        window.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (event.clientX /
                        window.innerWidth
                        - 0.5) * 12;


                const y =
                    (event.clientY /
                        window.innerHeight
                        - 0.5) * 12;


                engineeringVisual.style.transform =
                    `translate(${x}px, ${y}px)`;

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       INDUSTRY TAG INTERACTION
    ====================================================== */

    const industryTags =
        document.querySelectorAll(
            ".industry-tags span"
        );


    industryTags.forEach(
        (tag) => {

            tag.addEventListener(
                "mouseenter",
                () => {

                    tag.style.transform =
                        "translateY(-3px)";

                }
            );


            tag.addEventListener(
                "mouseleave",
                () => {

                    tag.style.transform =
                        "";

                }
            );

        }
    );


    /* =====================================================
       REDUCED MOTION
    ====================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

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
    ====================================================== */

    document.body.classList.add(
        "page-ready"
    );

});