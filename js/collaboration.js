/* =========================================================
   SD AURA
   COLLABORATION PAGE
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
           REVEAL ANIMATIONS
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
                        threshold: .12,

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
           STAGGER CARDS
        ================================================= */

        const collabCards =
            document.querySelectorAll(
                ".collab-card"
            );


        collabCards.forEach(
            (card, index) => {

                card.style.transitionDelay =
                    `${index * 80}ms`;

            }
        );


        /* =================================================
           STAGGER PRINCIPLES
        ================================================= */

        const principleRows =
            document.querySelectorAll(
                ".principle-row"
            );


        principleRows.forEach(
            (row, index) => {

                row.style.transitionDelay =
                    `${index * 60}ms`;

            }
        );


        /* =================================================
           STAGGER VALUE ITEMS
        ================================================= */

        const valueItems =
            document.querySelectorAll(
                ".value-item"
            );


        valueItems.forEach(
            (item, index) => {

                item.style.transitionDelay =
                    `${index * 70}ms`;

            }
        );


        /* =================================================
           SMOOTH ANCHOR SCROLL
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


        /* =================================================
           MOBILE NAV
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
           HERO MOUSE MOVEMENT
        ================================================= */

        const hero =
            document.querySelector(
                ".collaboration-hero"
            );

        const visual =
            document.querySelector(
                ".hero-visual"
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
                            -
                            .5
                        );


                    const y =
                        (
                            event.clientY /
                            window.innerHeight
                            -
                            .5
                        );


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
           ECO NODE INTERACTION
        ================================================= */

        const ecoNodes =
            document.querySelectorAll(
                ".eco-node"
            );


        ecoNodes.forEach(
            (node) => {

                node.addEventListener(
                    "mouseenter",
                    () => {

                        const lines =
                            document.querySelectorAll(
                                ".ecosystem-line"
                            );


                        lines.forEach(
                            (line) => {

                                line.style.opacity =
                                    ".35";

                            }
                        );

                    }
                );


                node.addEventListener(
                    "mouseleave",
                    () => {

                        const lines =
                            document.querySelectorAll(
                                ".ecosystem-line"
                            );


                        lines.forEach(
                            (line) => {

                                line.style.opacity =
                                    "";

                            }
                        );

                    }
                );

            }
        );


        /* =================================================
           PARALLAX ORBITS
        ================================================= */

        const orbitOne =
            document.querySelector(
                ".orbit-one"
            );

        const orbitTwo =
            document.querySelector(
                ".orbit-two"
            );

        const orbitThree =
            document.querySelector(
                ".orbit-three"
            );


        if (
            hero &&
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
                            -
                            .5
                        );

                    const y =
                        (
                            event.clientY /
                            window.innerHeight
                            -
                            .5
                        );


                    if (orbitOne) {

                        orbitOne.style.marginLeft =
                            `${x * 8}px`;

                        orbitOne.style.marginTop =
                            `${y * 8}px`;

                    }


                    if (orbitTwo) {

                        orbitTwo.style.marginLeft =
                            `${x * -12}px`;

                        orbitTwo.style.marginTop =
                            `${y * -12}px`;

                    }


                    if (orbitThree) {

                        orbitThree.style.marginLeft =
                            `${x * 18}px`;

                        orbitThree.style.marginTop =
                            `${y * 18}px`;

                    }

                },
                {
                    passive: true
                }
            );

        }


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