/* =========================================================
   SD AURA — ABOUT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar =
        document.getElementById("mainNavbar");

    const revealElements =
        document.querySelectorAll(".reveal");

    const ecosystemCard =
        document.querySelector(".ecosystem-card");

    const ecosystemCenter =
        document.querySelector(".ecosystem-center");

    const ecosystemNodes =
        document.querySelectorAll(".ecosystem-node");

    const capabilityRows =
        document.querySelectorAll(".capability-row");

    const valueCards =
        document.querySelectorAll(".value-card");

    const approachSteps =
        document.querySelectorAll(".approach-step");


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
       REVEAL OBSERVER
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add("active");

                        observer.unobserve(
                            entry.target
                        );

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
       STAGGER ANIMATIONS
    ===================================================== */

    const staggerGroups = [
        capabilityRows,
        valueCards,
        approachSteps
    ];


    staggerGroups.forEach((group) => {

        group.forEach((element, index) => {

            element.style.transitionDelay =
                `${Math.min(index * 90, 450)}ms`;

        });

    });


    /* =====================================================
       ECOSYSTEM PARALLAX
    ===================================================== */

    if (
        ecosystemCard &&
        window.matchMedia("(min-width: 992px)").matches
    ) {

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;


        ecosystemCard.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    ecosystemCard.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width;

                const y =
                    (event.clientY - rect.top) /
                    rect.height;

                targetX =
                    (x - 0.5) * 10;

                targetY =
                    (y - 0.5) * 10;

            }
        );


        ecosystemCard.addEventListener(
            "mouseleave",
            () => {

                targetX = 0;
                targetY = 0;

            }
        );


        const animateParallax = () => {

            currentX +=
                (targetX - currentX) * 0.05;

            currentY +=
                (targetY - currentY) * 0.05;


            if (ecosystemCenter) {

                ecosystemCenter.style.transform =
                    `translate(
                        calc(-50% + ${currentX}px),
                        calc(-50% + ${currentY}px)
                    )`;

            }


            ecosystemNodes.forEach(
                (node, index) => {

                    const multiplier =
                        0.5 + index * 0.1;

                    node.style.marginLeft =
                        `${currentX * multiplier}px`;

                    node.style.marginTop =
                        `${currentY * multiplier}px`;

                }
            );


            requestAnimationFrame(
                animateParallax
            );

        };

        animateParallax();

    }


    /* =====================================================
       CAPABILITY ROW HOVER
    ===================================================== */

    capabilityRows.forEach((row) => {

        const icon =
            row.querySelector(".capability-icon");


        row.addEventListener(
            "mouseenter",
            () => {

                if (!icon) return;

                icon.style.transform =
                    "rotate(-5deg) scale(1.05)";

            }
        );


        row.addEventListener(
            "mouseleave",
            () => {

                if (!icon) return;

                icon.style.transform = "";

            }
        );

    });


    /* =====================================================
       VALUE CARD POINTER EFFECT
    ===================================================== */

    if (
        window.matchMedia("(min-width: 992px)").matches
    ) {

        valueCards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) / centerY) * -1.5;

                    const rotateY =
                        ((x - centerX) / centerX) * 1.5;

                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        });

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

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        document.documentElement.style
            .scrollBehavior = "auto";


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