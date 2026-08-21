/* =========================================================
   SD AURA — CONTACT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navbar =
        document.getElementById("mainNavbar");

    const revealElements =
        document.querySelectorAll(".reveal");

    const contactForm =
        document.getElementById("contactForm");

    const formSuccess =
        document.getElementById("formSuccess");

    const submitButton =
        document.getElementById("submitButton");

    const interestInput =
        document.getElementById("interest");

    const interestOptions =
        document.querySelectorAll(".interest-option");

    const faqItems =
        document.querySelectorAll(".faq-item");

    const navigation =
        document.getElementById("mainNavigation");


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
       REVEAL ANIMATION
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


        revealElements.forEach(
            (element) => {

                observer.observe(element);

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add("active");

            }
        );

    }


    /* =====================================================
       INTEREST SELECTION
    ===================================================== */

    interestOptions.forEach((option) => {

        option.addEventListener(
            "click",
            () => {

                interestOptions.forEach(
                    (item) => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                option.classList.add(
                    "selected"
                );


                if (interestInput) {

                    interestInput.value =
                        option.dataset.value || "";

                }

            }
        );

    });


    /* =====================================================
       FORM VALIDATION
    ===================================================== */

    const validateField = (field) => {

        const group =
            field.closest(".form-group");

        if (!group) return true;

        let valid = true;


        if (
            field.type === "email"
        ) {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            valid =
                emailPattern.test(
                    field.value.trim()
                );

        } else {

            valid =
                field.value.trim().length > 0;

        }


        if (valid) {

            group.classList.remove(
                "has-error"
            );

        } else {

            group.classList.add(
                "has-error"
            );

        }


        return valid;

    };


    const requiredFields =
        contactForm
            ? contactForm.querySelectorAll(
                "input[required], textarea[required]"
            )
            : [];


    requiredFields.forEach((field) => {

        field.addEventListener(
            "blur",
            () => {

                validateField(field);

            }
        );


        field.addEventListener(
            "input",
            () => {

                if (
                    field.value.trim()
                ) {

                    validateField(field);

                }

            }
        );

    });


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                let isValid = true;


                requiredFields.forEach(
                    (field) => {

                        if (
                            !validateField(field)
                        ) {

                            isValid = false;

                        }

                    }
                );


                const consent =
                    document.getElementById(
                        "consent"
                    );


                if (
                    consent &&
                    !consent.checked
                ) {

                    consent
                        .closest(".form-consent")
                        .classList.add(
                            "has-error"
                        );

                    isValid = false;

                } else if (consent) {

                    consent
                        .closest(".form-consent")
                        .classList.remove(
                            "has-error"
                        );

                }


                if (!isValid) {

                    const firstError =
                        contactForm.querySelector(
                            ".has-error"
                        );

                    if (firstError) {

                        firstError.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }

                    return;

                }


                /* -----------------------------------------
                   DEMO SUBMISSION STATE
                ----------------------------------------- */

                submitButton.disabled = true;

                submitButton.querySelector(
                    ".button-text"
                ).textContent =
                    "Sending...";


                setTimeout(() => {

                    formSuccess.classList.add(
                        "show"
                    );


                    submitButton.querySelector(
                        ".button-text"
                    ).textContent =
                        "Enquiry sent";


                    contactForm
                        .querySelectorAll(
                            "input, textarea, button"
                        )
                        .forEach((element) => {

                            if (
                                element !==
                                submitButton
                            ) {

                                element.disabled =
                                    true;

                            }

                        });


                }, 1200);

            }
        );

    }


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    faqItems.forEach((item) => {

        const question =
            item.querySelector(
                ".faq-question"
            );


        if (!question) return;


        question.addEventListener(
            "click",
            () => {

                const wasActive =
                    item.classList.contains(
                        "active"
                    );


                /* Close all */

                faqItems.forEach(
                    (faqItem) => {

                        faqItem.classList.remove(
                            "active"
                        );

                    }
                );


                /* Open selected */

                if (!wasActive) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    });


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

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
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

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
                        target.getBoundingClientRect()
                            .top +
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