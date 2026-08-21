/* =========================================================
   SD AURA — BUSINESS DIVISIONS JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar =
        document.getElementById("mainNavbar");

    const revealElements =
        document.querySelectorAll(".reveal");

    const tabs =
        document.querySelectorAll(".division-tab");

    const cards =
        document.querySelectorAll(".division-card");

    const orbitWrap =
        document.querySelector(".division-orbit-wrap");

    const orbitCore =
        document.querySelector(".division-orbit-core");

    const orbitNodes =
        document.querySelectorAll(".orbit-particle");

    const integrationVisual =
        document.querySelector(".integration-visual");

    const integrationNodes =
        document.querySelectorAll(".integration-node");


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
       REVEAL
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
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


        revealElements.forEach((element) => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add(
                "active"
            );

        });

    }


    /* =====================================================
       STAGGER DIVISION CARDS
    ===================================================== */

    cards.forEach((card, index) => {

        card.style.transitionDelay =
            `${Math.min(index * 70, 350)}ms`;

    });


    /* =====================================================
       DIVISION FILTER
    ===================================================== */

    tabs.forEach((tab) => {

        tab.addEventListener(
            "click",
            () => {

                const filter =
                    tab.dataset.filter;


                tabs.forEach((item) => {

                    item.classList.remove(
                        "active"
                    );

                });


                tab.classList.add(
                    "active"
                );


                cards.forEach((card) => {

                    const category =
                        card.dataset.category;


                    const shouldShow =
                        filter === "all" ||
                        category === filter;


                    if (shouldShow) {

                        card.classList.remove(
                            "is-hidden"
                        );

                        /*
                         * Small delay gives the
                         * layout a smoother feel.
                         */
                        requestAnimationFrame(() => {

                            card.classList.remove(
                                "is-filtering"
                            );

                        });

                    } else {

                        card.classList.add(
                            "is-filtering"
                        );


                        setTimeout(() => {

                            card.classList.add(
                                "is-hidden"
                            );

                        }, 220);

                    }

                });

            }
        );

    });


    /* =====================================================
       ORBIT PARALLAX
    ===================================================== */

    if (
        orbitWrap &&
        window.matchMedia(
            "(min-width: 992px)"
        ).matches
    ) {

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;


        orbitWrap.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    orbitWrap.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width;

                const y =
                    (event.clientY - rect.top) /
                    rect.height;


                targetX =
                    (x - 0.5) * 14;

                targetY =
                    (y - 0.5) * 14;

            }
        );


        orbitWrap.addEventListener(
            "mouseleave",
            () => {

                targetX = 0;
                targetY = 0;

            }
        );


        const animateOrbit = () => {

            currentX +=
                (targetX - currentX) * 0.05;

            currentY +=
                (targetY - currentY) * 0.05;


            if (orbitCore) {

                orbitCore.style.transform =
                    `translate(
                        calc(-50% + ${currentX}px),
                        calc(-50% + ${currentY}px)
                    )`;

            }


            orbitNodes.forEach(
                (particle, index) => {

                    const factor =
                        0.5 + index * 0.3;

                    particle.style.marginLeft =
                        `${currentX * factor}px`;

                    particle.style.marginTop =
                        `${currentY * factor}px`;

                }
            );


            requestAnimationFrame(
                animateOrbit
            );

        };


        animateOrbit();

    }


    /* =====================================================
       INTEGRATION NODE HOVER
    ===================================================== */

    integrationNodes.forEach((node) => {

        node.addEventListener(
            "mouseenter",
            () => {

                integrationNodes.forEach(
                    (item) => {

                        if (item !== node) {

                            item.style.opacity =
                                "0.45";

                        }

                    }
                );

            }
        );


        node.addEventListener(
            "mouseleave",
            () => {

                integrationNodes.forEach(
                    (item) => {

                        item.style.opacity =
                            "";

                    }
                );

            }
        );

    });


    /* =====================================================
       INTEGRATION VISUAL PARALLAX
    ===================================================== */

    if (
        integrationVisual &&
        window.matchMedia(
            "(min-width: 992px)"
        ).matches
    ) {

        integrationVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    integrationVisual.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width;

                const y =
                    (event.clientY - rect.top) /
                    rect.height;


                const moveX =
                    (x - 0.5) * 8;

                const moveY =
                    (y - 0.5) * 8;


                integrationVisual.style.transform =
                    `translate(
                        ${moveX}px,
                        ${moveY}px
                    )`;

            }
        );


        integrationVisual.addEventListener(
            "mouseleave",
            () => {

                integrationVisual.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");


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
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        navbarHeight -
                        20;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

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

        const mobileLinks =
            navigation.querySelectorAll(
                ".nav-link"
            );


        mobileLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    if (
                        window.innerWidth >= 992
                    ) {
                        return;
                    }


                    const Collapse =
                        window.bootstrap?.Collapse;


                    if (!Collapse) {
                        return;
                    }


                    const collapse =
                        Collapse.getOrCreateInstance(
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


            if (!href) return;


            link.classList.remove(
                "active"
            );


            if (href === currentPage) {

                link.classList.add(
                    "active"
                );

            }

        });


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {

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