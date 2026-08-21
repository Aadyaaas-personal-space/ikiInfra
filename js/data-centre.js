/* =========================================================
   SD AURA
   DATA CENTRE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           ELEMENTS
        ================================================= */

        const navbar =
            document.getElementById(
                "mainNavbar"
            );

        const navigation =
            document.getElementById(
                "mainNavigation"
            );

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        /* =================================================
           NAVBAR
        ================================================= */

        function updateNavbar() {

            if (!navbar) {
                return;
            }

            if (window.scrollY > 40) {

                navbar.classList.add(
                    "scrolled"
                );

            } else {

                navbar.classList.remove(
                    "scrolled"
                );

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


        /* =================================================
           REVEAL ANIMATION
        ================================================= */

        if (
            "IntersectionObserver"
            in window
        ) {

            const observer =
                new IntersectionObserver(
                    (
                        entries,
                        observerInstance
                    ) => {

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

                                observerInstance.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {
                        threshold:
                            0.12,

                        rootMargin:
                            "0px 0px -45px 0px"
                    }
                );


            revealElements.forEach(
                (element) => {

                    observer.observe(
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


        /* =================================================
           STAGGER SOLUTION CARDS
        ================================================= */

        const solutionCards =
            document.querySelectorAll(
                ".solution-card"
            );


        solutionCards.forEach(
            (card, index) => {

                card.style.transitionDelay =
                    `${index * 70}ms`;

            }
        );


        /* =================================================
           STAGGER PERFORMANCE CARDS
        ================================================= */

        const performanceCards =
            document.querySelectorAll(
                ".performance-card"
            );


        performanceCards.forEach(
            (card, index) => {

                card.style.transitionDelay =
                    `${index * 70}ms`;

            }
        );


        /* =================================================
           STAGGER APPROACH
        ================================================= */

        const approachItems =
            document.querySelectorAll(
                ".approach-item"
            );


        approachItems.forEach(
            (item, index) => {

                item.style.transitionDelay =
                    `${index * 80}ms`;

            }
        );


        /* =================================================
           MOBILE NAVIGATION
        ================================================= */

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
                                window.innerWidth >=
                                992
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


        /* =================================================
           ACTIVE PAGE
        ================================================= */

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


        /* =================================================
           HERO PARALLAX
        ================================================= */

        const hero =
            document.querySelector(
                ".data-hero"
            );

        const visual =
            document.querySelector(
                ".data-visual"
            );


        if (
            hero &&
            visual &&
            window.matchMedia(
                "(pointer: fine)"
            ).matches
        ) {

            hero.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        window.innerWidth < 992
                    ) {
                        return;
                    }


                    const x =
                        (
                            event.clientX /
                            window.innerWidth
                        ) - .5;


                    const y =
                        (
                            event.clientY /
                            window.innerHeight
                        ) - .5;


                    visual.style.transform =
                        `translate(
                            ${x * 10}px,
                            ${y * 10}px
                        )`;

                },
                {
                    passive: true
                }
            );


            hero.addEventListener(
                "mouseleave",
                () => {

                    visual.style.transform =
                        "";

                }
            );

        }


        /* =================================================
           SYSTEM DIAGRAM ROTATION
        ================================================= */

        const diagram =
            document.querySelector(
                ".system-diagram"
            );


        const rings =
            document.querySelectorAll(
                ".diagram-ring"
            );


        if (
            diagram &&
            rings.length &&
            !window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {

            let rotation = 0;


            function animateRings() {

                rotation += .08;


                rings.forEach(
                    (ring, index) => {

                        const direction =
                            index % 2 === 0
                                ? 1
                                : -1;


                        ring.style.transform =
                            `translate(
                                -50%,
                                -50%
                            )
                            rotate(
                                ${rotation *
                            direction}deg
                            )`;

                    }
                );


                requestAnimationFrame(
                    animateRings
                );

            }


            animateRings();

        }


        /* =================================================
           SMOOTH ANCHORS
        ================================================= */

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


        /* =================================================
           REDUCED MOTION
        ================================================= */

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );


        if (
            reducedMotion.matches
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


        /* =================================================
           PAGE READY
        ================================================= */

        document.body.classList.add(
            "page-ready"
        );

    }
);