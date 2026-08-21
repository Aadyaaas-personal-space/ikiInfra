/* =========================================================
   SD AURA — FINANCE SOLUTIONS JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.querySelector(".AURA-navbar");

    const handleNavbarScroll = () => {

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", handleNavbarScroll);

    handleNavbarScroll();


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight =
                document.querySelector(".AURA-navbar")?.offsetHeight || 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".solution-card, .advantage-item, .process-step, .dashboard-card"
    );

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "opacity .7s ease, transform .7s cubic-bezier(.22,.61,.36,1)";

        revealObserver.observe(element);

    });


    /* =====================================================
       REVEAL CLASS
    ===================================================== */

    const style = document.createElement("style");

    style.innerHTML = `
        .solution-card.revealed,
        .advantage-item.revealed,
        .process-step.revealed,
        .dashboard-card.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;

    document.head.appendChild(style);


    /* =====================================================
       STAGGER SOLUTION CARDS
    ===================================================== */

    document.querySelectorAll(".solution-card").forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 70}ms`;

        }
    );


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const financialValue =
        document.querySelector(".financial-value");

    let counterStarted = false;

    const animateCounter = () => {

        if (counterStarted || !financialValue) {
            return;
        }

        const rect =
            financialValue.getBoundingClientRect();

        if (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        ) {

            counterStarted = true;

            const target = 24.8;
            const duration = 1400;

            const startTime = performance.now();

            const updateCounter = currentTime => {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(elapsed / duration, 1);

                const eased =
                    1 - Math.pow(1 - progress, 3);

                const current =
                    target * eased;

                financialValue.textContent =
                    `₹${current.toFixed(1)}M`;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }

            };

            requestAnimationFrame(updateCounter);

        }

    };

    window.addEventListener(
        "scroll",
        animateCounter,
        { passive: true }
    );

    animateCounter();


    /* =====================================================
       DASHBOARD BAR ANIMATION
    ===================================================== */

    const bars =
        document.querySelectorAll(".bars span");

    let barsAnimated = false;

    const animateBars = () => {

        if (barsAnimated || !bars.length) {
            return;
        }

        const container =
            document.querySelector(".bars");

        const rect =
            container.getBoundingClientRect();

        if (
            rect.top < window.innerHeight - 80 &&
            rect.bottom > 0
        ) {

            barsAnimated = true;

            bars.forEach((bar, index) => {

                const finalHeight =
                    bar.style.height;

                bar.style.height = "0%";

                setTimeout(() => {

                    bar.style.transition =
                        "height 900ms cubic-bezier(.22,.61,.36,1)";

                    bar.style.height =
                        finalHeight;

                }, index * 100);

            });

        }

    };

    window.addEventListener(
        "scroll",
        animateBars,
        { passive: true }
    );

    animateBars();


    /* =====================================================
       ACTIVE NAV LINK
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();

    document.querySelectorAll(".nav-link").forEach(link => {

        const href =
            link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       CARD TILT EFFECT
    ===================================================== */

    const financeCard =
        document.querySelector(".main-card");

    if (
        financeCard &&
        window.matchMedia("(min-width: 992px)").matches
    ) {

        financeCard.addEventListener(
            "mousemove",
            event => {

                const rect =
                    financeCard.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateX =
                    ((y / rect.height) - 0.5) * -4;

                const rotateY =
                    ((x / rect.width) - 0.5) * 4;

                financeCard.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );

        financeCard.addEventListener(
            "mouseleave",
            () => {

                financeCard.style.transform =
                    "perspective(1000px) rotateX(0) rotateY(0)";

            }
        );

    }


    /* =====================================================
       MOBILE NAV CLOSE
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".navbar-collapse .nav-link"
        );

    const navbarCollapse =
        document.querySelector(".navbar-collapse");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (
                window.innerWidth < 992 &&
                navbarCollapse.classList.contains("show")
            ) {

                const bsCollapse =
                    bootstrap.Collapse.getInstance(
                        navbarCollapse
                    );

                if (bsCollapse) {
                    bsCollapse.hide();
                }

            }

        });

    });


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add("page-loaded");

});