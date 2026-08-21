/* =========================================================
   SD AURA
   ARCHITECTURE & INTERIOR
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
       NAVBAR
    ====================================================== */

    function updateNavbar() {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }
    }


    updateNavbar();


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    /* =====================================================
       REVEAL ANIMATION
    ====================================================== */

    if (
        "IntersectionObserver" in window
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
       STAGGER PRINCIPLES
    ====================================================== */

    const principleCards =
        document.querySelectorAll(
            ".principle-card"
        );


    principleCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 70}ms`;

        }
    );


    /* =====================================================
       STAGGER PROCESS ITEMS
    ====================================================== */

    const processItems =
        document.querySelectorAll(
            ".process-item"
        );


    processItems.forEach(
        (item, index) => {

            item.style.transitionDelay =
                `${index * 65}ms`;

        }
    );


    /* =====================================================
       STAGGER SERVICE ROWS
    ====================================================== */

    const serviceRows =
        document.querySelectorAll(
            ".service-row"
        );


    serviceRows.forEach(
        (row, index) => {

            row.style.transitionDelay =
                `${index * 45}ms`;

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


                        const position =
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
                                position,

                            behavior:
                                "smooth"

                        });

                    }
                );

            }
        );


    /* =====================================================
       MOBILE NAV
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
       ACTIVE PAGE
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
       HERO PARALLAX
    ====================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    if (
        heroImage &&
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
                        - .5) * 10;


                const y =
                    (event.clientY /
                        window.innerHeight
                        - .5) * 10;


                heroImage.style.transform =
                    `scale(1.04)
                     translate(${x}px, ${y}px)`;

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       DISCIPLINE CARD PARALLAX
    ====================================================== */

    const disciplineCards =
        document.querySelectorAll(
            ".discipline-card"
        );


    disciplineCards.forEach(
        (card) => {

            const image =
                card.querySelector(
                    ".discipline-image"
                );


            if (!image) {
                return;
            }


            card.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        window.innerWidth < 992
                    ) {
                        return;
                    }


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width -
                        .5;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height -
                        .5;


                    image.style.transform =
                        `scale(1.06)
                         translate(${x * 8}px,
                                   ${y * 8}px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    image.style.transform =
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