/* =========================================================
   SD AURA — REAL ESTATE JS
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
       REVEAL ANIMATIONS
    ===================================================== */

    const revealItems =
        document.querySelectorAll(
            ".solution-card, .development-point, .process-item, .development-dashboard"
        );


    revealItems.forEach(
        (item, index) => {

            item.style.opacity = "0";

            item.style.transform =
                "translateY(28px)";

            item.style.transition =
                "opacity .7s ease, transform .7s cubic-bezier(.22,.61,.36,1)";

            item.style.transitionDelay =
                `${(index % 6) * 70}ms`;

        }
    );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.style.opacity =
                        "1";


                    entry.target.style.transform =
                        "translateY(0)";


                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: .12
            }
        );


    revealItems.forEach(item => {

        revealObserver.observe(item);

    });



    /* =====================================================
       PROPERTY DASHBOARD TILT
    ===================================================== */

    const dashboard =
        document.querySelector(
            ".property-dashboard"
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
       DEVELOPMENT DASHBOARD TILT
    ===================================================== */

    const developmentDashboard =
        document.querySelector(
            ".development-dashboard"
        );


    if (
        developmentDashboard &&
        window.matchMedia(
            "(min-width: 992px)"
        ).matches
    ) {

        developmentDashboard.addEventListener(
            "mousemove",
            event => {

                const rect =
                    developmentDashboard
                        .getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) - .5) * -3;


                const rotateY =
                    ((x / rect.width) - .5) * 3;


                developmentDashboard.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            }
        );


        developmentDashboard.addEventListener(
            "mouseleave",
            () => {

                developmentDashboard.style.transform =
                    `
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    `;

            }
        );

    }



    /* =====================================================
       FLOATING CARDS PARALLAX
    ===================================================== */

    const floatingCards =
        document.querySelectorAll(
            ".floating-property-card, .mini-card"
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
                        index % 2 === 0
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
       CURRENT PAGE
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
       MOBILE NAVIGATION
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
       CHART POINT PULSE
    ===================================================== */

    const chartPoints =
        document.querySelectorAll(
            ".chart-point"
        );


    chartPoints.forEach(
        (point, index) => {

            point.style.animation =
                `chartPulse 2.4s ease-in-out ${index * .45}s infinite`;

        }
    );


});