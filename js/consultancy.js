/* =========================================================
   SD AURA
   CONSULTANCY
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
           STAGGER SERVICES
        ================================================= */

        const serviceCards =
            document.querySelectorAll(
                ".service-card"
            );


        serviceCards.forEach(
            (card, index) => {

                card.style.transitionDelay =
                    `${index * 70}ms`;

            }
        );


        /* =================================================
           STAGGER DIFFERENCE CARDS
        ================================================= */

        const differenceCards =
            document.querySelectorAll(
                ".difference-card"
            );


        differenceCards.forEach(
            (card, index) => {

                card.style.transitionDelay =
                    `${index * 70}ms`;

            }
        );


        /* =================================================
           STAGGER PROCESS
        ================================================= */

        const processItems =
            document.querySelectorAll(
                ".process-item"
            );


        processItems.forEach(
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
                ".consultancy-hero"
            );

        const visual =
            document.querySelector(
                ".consultancy-visual"
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
                            ${x * 12}px,
                            ${y * 12}px
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