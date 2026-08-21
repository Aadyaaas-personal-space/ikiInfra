/* =========================================================
   SD AURA — HOME PAGE JAVASCRIPT
   Premium SaaS / Corporate Website
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       GLOBAL ELEMENTS
    ===================================================== */

    const navbar =
        document.querySelector(".AURA-navbar");

    const body =
        document.body;


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =====================================================
       NAVBAR — SCROLL EFFECT
    ===================================================== */

    const updateNavbar = () => {

        if (!navbar) return;


        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    updateNavbar();



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navLinks =
        document.querySelectorAll(
            ".navbar-nav .nav-link"
        );


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) return;


        const cleanHref =
            href
                .split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();


        if (
            cleanHref === currentPage ||
            (
                currentPage === "" &&
                cleanHref === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });



    /* =====================================================
       SMOOTH INTERNAL SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                const targetID =
                    this.getAttribute("href");


                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetID
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
                    10;


                window.scrollTo({

                    top: targetPosition,

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth"

                });

            }
        );

    });



    /* =====================================================
       MOBILE NAVBAR
    ===================================================== */

    const navbarCollapse =
        document.querySelector(
            ".navbar-collapse"
        );


    const mobileNavLinks =
        document.querySelectorAll(
            ".navbar-collapse .nav-link"
        );


    mobileNavLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth >= 992 ||
                    !navbarCollapse
                ) {
                    return;
                }


                if (
                    navbarCollapse.classList.contains(
                        "show"
                    )
                ) {

                    const collapse =
                        bootstrap.Collapse
                            .getInstance(
                                navbarCollapse
                            );


                    if (collapse) {

                        collapse.hide();

                    }

                }

            }
        );

    });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            [
                ".reveal",
                ".fade-up",
                ".section-heading",
                ".solution-card",
                ".business-card",
                ".project-card",
                ".feature-card",
                ".stat-card",
                ".about-card",
                ".service-card",
                ".process-item"
            ].join(",")
        );


    if (
        !prefersReducedMotion &&
        revealElements.length
    ) {

        revealElements.forEach(
            (element, index) => {

                element.classList.add(
                    "AURA-reveal"
                );


                element.style.setProperty(
                    "--reveal-delay",
                    `${(index % 6) * 70}ms`
                );

            }
        );


        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "revealed"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "revealed"
                );

            }
        );

    }



    /* =====================================================
       NUMBER COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    const animateCounter = counter => {

        const target =
            parseFloat(
                counter.dataset.counter
            );


        if (Number.isNaN(target)) {
            return;
        }


        const suffix =
            counter.dataset.suffix || "";


        const prefix =
            counter.dataset.prefix || "";


        const decimals =
            counter.dataset.decimals
                ? parseInt(
                    counter.dataset.decimals,
                    10
                )
                : 0;


        const duration =
            parseInt(
                counter.dataset.duration || "1800",
                10
            );


        if (prefersReducedMotion) {

            counter.textContent =
                `${prefix}${target.toFixed(decimals)}${suffix}`;

            return;

        }


        const startTime =
            performance.now();


        const easeOut =
            progress =>
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


        const updateCounter =
            currentTime => {

                const elapsed =
                    currentTime -
                    startTime;


                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );


                const eased =
                    easeOut(progress);


                const value =
                    target * eased;


                counter.textContent =
                    `${prefix}${value.toFixed(decimals)}${suffix}`;


                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        `${prefix}${target.toFixed(decimals)}${suffix}`;

                }

            };


        requestAnimationFrame(
            updateCounter
        );

    };


    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const counter =
                            entry.target;


                        if (
                            counter.dataset.counted ===
                            "true"
                        ) {
                            return;
                        }


                        counter.dataset.counted =
                            "true";


                        animateCounter(
                            counter
                        );


                        counterObserver.unobserve(
                            counter
                        );

                    });

                },
                {
                    threshold: .5
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(
                counter
            );

        });

    }



    /* =====================================================
       HERO LOAD ANIMATION
    ===================================================== */

    const hero =
        document.querySelector(
            ".hero-section, .home-hero, .AURA-hero"
        );


    if (hero) {

        window.requestAnimationFrame(
            () => {

                hero.classList.add(
                    "hero-loaded"
                );

            }
        );

    }



    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual, .hero-dashboard, .hero-orbit"
        );


    if (
        heroVisual &&
        !prefersReducedMotion &&
        window.innerWidth >= 992
    ) {

        window.addEventListener(
            "mousemove",
            event => {

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


                heroVisual.style.transform =
                    `
                    translate3d(
                        ${x * 8}px,
                        ${y * 8}px,
                        0
                    )
                    `;

            },
            {
                passive: true
            }
        );

    }



    /* =====================================================
       PREMIUM CARD TILT
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            [
                ".tilt-card",
                ".solution-card",
                ".business-card",
                ".feature-card",
                ".project-card"
            ].join(",")
        );


    if (
        !prefersReducedMotion &&
        window.innerWidth >= 992
    ) {

        tiltCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const rotateX =
                        (
                            (y / rect.height) -
                            .5
                        ) * -4;


                    const rotateY =
                        (
                            (x / rect.width) -
                            .5
                        ) * 4;


                    card.style.transform =
                        `
                        perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-5px)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }



    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            [
                ".AURA-primary-btn",
                ".AURA-nav-btn",
                ".cta-button",
                ".magnetic-btn"
            ].join(",")
        );


    if (
        !prefersReducedMotion &&
        window.innerWidth >= 992
    ) {

        magneticButtons.forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        event.clientX -
                        (
                            rect.left +
                            rect.width / 2
                        );


                    const y =
                        event.clientY -
                        (
                            rect.top +
                            rect.height / 2
                        );


                    button.style.transform =
                        `
                        translate(
                            ${x * .12}px,
                            ${y * .12}px
                        )
                        `;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });

    }



    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    if (
        !prefersReducedMotion &&
        window.innerWidth >= 1200
    ) {

        const cursorGlow =
            document.createElement("div");


        cursorGlow.className =
            "AURA-cursor-glow";


        cursorGlow.setAttribute(
            "aria-hidden",
            "true"
        );


        body.appendChild(
            cursorGlow
        );


        let mouseX = -100;
        let mouseY = -100;

        let currentX = -100;
        let currentY = -100;


        window.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            },
            {
                passive: true
            }
        );


        const animateCursor =
            () => {

                currentX +=
                    (
                        mouseX -
                        currentX
                    ) * .12;


                currentY +=
                    (
                        mouseY -
                        currentY
                    ) * .12;


                cursorGlow.style.transform =
                    `
                    translate3d(
                        ${currentX}px,
                        ${currentY}px,
                        0
                    )
                    translate(-50%, -50%)
                    `;


                requestAnimationFrame(
                    animateCursor
                );

            };


        animateCursor();

    }



    /* =====================================================
       HOVER GLOW FOR PREMIUM CARDS
    ===================================================== */

    const glowCards =
        document.querySelectorAll(
            ".solution-card, .business-card, .feature-card, .project-card"
        );


    glowCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );


                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );

    });



    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const progressBar =
        document.querySelector(
            ".scroll-progress"
        );


    if (progressBar) {

        const updateProgress =
            () => {

                const documentHeight =
                    document.documentElement
                        .scrollHeight -
                    window.innerHeight;


                if (documentHeight <= 0) {
                    return;
                }


                const progress =
                    (
                        window.scrollY /
                        documentHeight
                    ) * 100;


                progressBar.style.width =
                    `${progress}%`;

            };


        window.addEventListener(
            "scroll",
            updateProgress,
            {
                passive: true
            }
        );


        updateProgress();

    }



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(
            ".back-to-top"
        );


    if (backToTop) {

        const updateBackToTop =
            () => {

                if (
                    window.scrollY > 500
                ) {

                    backToTop.classList.add(
                        "show"
                    );

                } else {

                    backToTop.classList.remove(
                        "show"
                    );

                }

            };


        window.addEventListener(
            "scroll",
            updateBackToTop,
            {
                passive: true
            }
        );


        backToTop.addEventListener(
            "click",
            event => {

                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth"

                });

            }
        );


        updateBackToTop();

    }



    /* =====================================================
       DROPDOWN HOVER — DESKTOP
    ===================================================== */

    const dropdowns =
        document.querySelectorAll(
            ".navbar .dropdown"
        );


    if (
        window.innerWidth >= 992
    ) {

        dropdowns.forEach(dropdown => {

            const toggle =
                dropdown.querySelector(
                    ".dropdown-toggle"
                );


            const menu =
                dropdown.querySelector(
                    ".dropdown-menu"
                );


            if (!toggle || !menu) {
                return;
            }


            dropdown.addEventListener(
                "mouseenter",
                () => {

                    dropdown.classList.add(
                        "show"
                    );


                    toggle.setAttribute(
                        "aria-expanded",
                        "true"
                    );


                    menu.classList.add(
                        "show"
                    );

                }
            );


            dropdown.addEventListener(
                "mouseleave",
                () => {

                    dropdown.classList.remove(
                        "show"
                    );


                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menu.classList.remove(
                        "show"
                    );

                }
            );

        });

    }



    /* =====================================================
       IMAGE LAZY LOAD
    ===================================================== */

    const lazyImages =
        document.querySelectorAll(
            "img[data-src]"
        );


    if (lazyImages.length) {

        const imageObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const image =
                            entry.target;


                        const source =
                            image.dataset.src;


                        if (source) {

                            image.src =
                                source;

                        }


                        image.removeAttribute(
                            "data-src"
                        );


                        imageObserver.unobserve(
                            image
                        );

                    });

                },
                {
                    rootMargin:
                        "200px"
                }
            );


        lazyImages.forEach(
            image => {

                imageObserver.observe(
                    image
                );

            }
        );

    }



    /* =====================================================
       FAQ ACCORDION ICON
    ===================================================== */

    const accordionItems =
        document.querySelectorAll(
            ".accordion-item"
        );


    accordionItems.forEach(item => {

        const button =
            item.querySelector(
                ".accordion-button"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            () => {

                setTimeout(
                    () => {

                        const icon =
                            button.querySelector(
                                ".faq-icon"
                            );


                        if (!icon) {
                            return;
                        }


                        if (
                            !button.classList.contains(
                                "collapsed"
                            )
                        ) {

                            icon.style.transform =
                                "rotate(45deg)";

                        } else {

                            icon.style.transform =
                                "rotate(0deg)";

                        }

                    },
                    50
                );

            }
        );

    });



    /* =====================================================
       YEAR — FOOTER
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(
        element => {

            element.textContent =
                new Date()
                    .getFullYear();

        }
    );



    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader =
        document.querySelector(
            ".AURA-preloader"
        );


    if (preloader) {

        if (document.readyState === "complete") {

            hidePreloader();

        } else {

            window.addEventListener(
                "load",
                hidePreloader
            );

        }

    }


    function hidePreloader() {

        if (!preloader) {
            return;
        }


        preloader.classList.add(
            "loaded"
        );


        setTimeout(
            () => {

                preloader.remove();

            },
            700
        );

    }



    /* =====================================================
       SERVICE / BUSINESS CARD HOVER
    ===================================================== */

    const interactiveCards =
        document.querySelectorAll(
            ".business-card, .service-card, .solution-card"
        );


    interactiveCards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "is-hovered"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "is-hovered"
                );

            }
        );

    });



    /* =====================================================
       HERO MOUSE GLOW
    ===================================================== */

    const heroGlow =
        document.querySelector(
            ".hero-glow"
        );


    if (
        heroGlow &&
        !prefersReducedMotion &&
        window.innerWidth >= 992
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    event.clientX /
                    window.innerWidth *
                    100;


                const y =
                    event.clientY /
                    window.innerHeight *
                    100;


                heroGlow.style.left =
                    `${x}%`;


                heroGlow.style.top =
                    `${y}%`;

            },
            {
                passive: true
            }
        );

    }



    /* =====================================================
       SECTION ACTIVE STATE
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    if (sections.length) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const id =
                                entry.target.id;


                            const relatedLinks =
                                document.querySelectorAll(
                                    `.navbar a[href="#${id}"]`
                                );


                            document
                                .querySelectorAll(
                                    ".navbar .nav-link"
                                )
                                .forEach(link => {

                                    link.classList.remove(
                                        "section-active"
                                    );

                                });


                            relatedLinks.forEach(
                                link => {

                                    link.classList.add(
                                        "section-active"
                                    );

                                });

                        }
                    );

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(
                section
            );

        });

    }



    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                document
                    .querySelectorAll(
                        ".dropdown.show"
                    )
                    .forEach(dropdown => {

                        dropdown.classList.remove(
                            "show"
                        );

                    });

            }

        }
    );



    /* =====================================================
       CONSOLE BRAND MESSAGE
    ===================================================== */

    console.log(
        "%cSD AURA",
        "font-size:24px;font-weight:800;color:#55d69b;"
    );

    console.log(
        "%cPremium digital experience loaded.",
        "font-size:12px;color:#84938f;"
    );

});