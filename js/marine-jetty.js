/* =========================================================
   SD AURA — MARINE & JETTY JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    const navbar =
        document.querySelector(".AURA-navbar");

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
        { passive: true }
    );

    updateNavbar();



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                const id =
                    this.getAttribute("href");

                if (!id || id === "#") {
                    return;
                }

                const target =
                    document.querySelector(id);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const navHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const position =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            }
        );

    });



    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealItems =
        document.querySelectorAll(
            ".capability-card, .engineering-point, .process-step, .system-card"
        );


    revealItems.forEach((item, index) => {

        item.style.opacity = "0";

        item.style.transform =
            "translateY(28px)";

        item.style.transition =
            "opacity .7s ease, transform .7s cubic-bezier(.22,.61,.36,1)";

        item.style.transitionDelay =
            `${(index % 6) * 70}ms`;

    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealItems.forEach(item => {
        revealObserver.observe(item);
    });



    /* =====================================================
       MARINE DASHBOARD PARALLAX
    ===================================================== */

    const dashboard =
        document.querySelector(
            ".marine-dashboard"
        );


    if (
        dashboard &&
        window.matchMedia(
            "(min-width: 992px)"
        ).matches
    ) {

        dashboard.addEventListener(
            "mousemove",
            event => {

                const rect =
                    dashboard.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateX =
                    ((y / rect.height) - .5) * -4;

                const rotateY =
                    ((x / rect.width) - .5) * 4;

                dashboard.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            }
        );


        dashboard.addEventListener(
            "mouseleave",
            () => {

                dashboard.style.transform =
                    `
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    `;

            }
        );

    }



    /* =====================================================
       FLOATING CARD MOVEMENT
    ===================================================== */

    const floatingCards =
        document.querySelectorAll(
            ".floating-card"
        );


    window.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 992
            ) {
                return;
            }

            const x =
                (event.clientX /
                    window.innerWidth) -
                .5;

            const y =
                (event.clientY /
                    window.innerHeight) -
                .5;


            floatingCards.forEach(
                (card, index) => {

                    const intensity =
                        index === 0
                            ? 5
                            : -4;

                    card.style.marginLeft =
                        `${x * intensity}px`;

                    card.style.marginTop =
                        `${y * intensity}px`;

                }
            );

        },
        { passive: true }
    );



    /* =====================================================
       SIGNAL ANIMATION
    ===================================================== */

    const signals =
        document.querySelectorAll(
            ".signal"
        );


    signals.forEach(
        (signal, index) => {

            signal.style.animationDelay =
                `${index * .45}s`;

        }
    );



    /* =====================================================
       ACTIVE PAGE
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    document.querySelectorAll(
        ".nav-link"
    ).forEach(link => {

        const href =
            link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }

    });



    /* =====================================================
       MOBILE NAV CLOSE
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".navbar-collapse .nav-link"
        );

    const collapseElement =
        document.querySelector(
            ".navbar-collapse"
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth < 992 &&
                    collapseElement &&
                    collapseElement.classList.contains(
                        "show"
                    )
                ) {

                    const collapse =
                        bootstrap.Collapse
                            .getInstance(
                                collapseElement
                            );

                    if (collapse) {
                        collapse.hide();
                    }

                }

            }
        );

    });



    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});