/* =========================================================
   SD AURA — EXPERTISE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navbar =
        document.getElementById("mainNavbar");

    const revealElements =
        document.querySelectorAll(".reveal");

    const methodologyItems =
        document.querySelectorAll(".methodology-item");

    const visual =
        document.querySelector(".expertise-visual");

    const visualCore =
        document.querySelector(".visual-core");

    const matrixVisual =
        document.querySelector(".matrix-visual");

    const matrixCircles =
        document.querySelectorAll(".matrix-circle");


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
       CARD STAGGER
    ===================================================== */

    document
        .querySelectorAll(".capability-card")
        .forEach((card, index) => {

            card.style.transitionDelay =
                `${Math.min(index * 70, 350)}ms`;

        });


    /* =====================================================
       METHODOLOGY INTERACTION
    ===================================================== */

    methodologyItems.forEach((item) => {

        item.addEventListener(
            "mouseenter",
            () => {

                methodologyItems.forEach(
                    (other) => {

                        other.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );

            }
        );

    });


    /* =====================================================
       HERO VISUAL PARALLAX
    ===================================================== */

    if (
        visual &&
        visualCore &&
        window.matchMedia(
            "(min-width: 992px)"
        ).matches
    ) {

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;


        visual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    visual.getBoundingClientRect();


                const x =
                    (event.clientX - rect.left) /
                    rect.width;

                const y =
                    (event.clientY - rect.top) /
                    rect.height;


                targetX =
                    (x - 0.5) * 12;

                targetY =
                    (y - 0.5) * 12;

            }
        );


        visual.addEventListener(
            "mouseleave",
            () => {

                targetX = 0;
                targetY = 0;

            }
        );


        const animate = () => {

            currentX +=
                (targetX - currentX) * 0.05;

            currentY +=
                (targetY - currentY) * 0.05;


            visualCore.style.transform =
                `translate(
                    calc(-50% + ${currentX}px),
                    calc(-50% + ${currentY}px)
                )`;


            requestAnimationFrame(
                animate
            );

        };


        animate();

    }


    /* =====================================================
       MATRIX INTERACTION
    ===================================================== */

    matrixCircles.forEach((circle) => {

        circle.addEventListener(
            "mouseenter",
            () => {

                matrixCircles.forEach(
                    (other) => {

                        if (other !== circle) {

                            other.style.opacity =
                                "0.3";

                        }

                    }
                );

            }
        );


        circle.addEventListener(
            "mouseleave",
            () => {

                matrixCircles.forEach(
                    (other) => {

                        other.style.opacity =
                            "";

                    }
                );

            }
        );

    });


    /* =====================================================
       MATRIX PARALLAX
    ===================================================== */

    if (
        matrixVisual &&
        window.matchMedia(
            "(min-width: 992px)"
        ).matches
    ) {

        matrixVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    matrixVisual.getBoundingClientRect();


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


                matrixVisual.style.marginLeft =
                    `${moveX}px`;

                matrixVisual.style.marginTop =
                    `${moveY}px`;

            }
        );


        matrixVisual.addEventListener(
            "mouseleave",
            () => {

                matrixVisual.style.marginLeft =
                    "";

                matrixVisual.style.marginTop =
                    "";

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
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
       MOBILE NAV
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