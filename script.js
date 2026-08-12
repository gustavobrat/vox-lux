/* =========================================================
   VOX LUX — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader =
        document.getElementById("preloader");


    function hidePreloader() {

        if (!preloader) return;

        preloader.classList.add("hidden");

       setTimeout(() => {
          preloader.remove();
       }, 900);
    }

if (document.readyState === "complete") {
   setTimeout(hidePreloader, 500);
} else {
    window.addEventListener("load", () => {
       setTimeout(hidePreloader, 500);
    });
        }
setTimeout(hidePreloader, 3000);


    /* Evita que o preloader fique preso
       caso alguma mídia demore */

    setTimeout(
        hidePreloader,
        4000
    );


    /* =====================================================
       HEADER
    ===================================================== */

    const header =
        document.querySelector(".site-header");


    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 70) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");


    if (menuToggle && mainNav) {


        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mainNav.classList.toggle(
                        "open"
                    );


                menuToggle.classList.toggle(
                    "active",
                    isOpen
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );

            }
        );


        const navLinks =
            mainNav.querySelectorAll("a");


        navLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove(
                        "open"
                    );

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                }
            );

        });

    }


    /* =====================================================
       REVEAL AO ROLAR
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        "IntersectionObserver"
        in window
    ) {


        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");


                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    });

                },
                {
                    threshold: 0.12
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
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       PLAYER DO ÁLBUM
    ===================================================== */

    const tracks =
        document.querySelectorAll(".track");


    let currentAudio = null;

    let currentTrack = null;


    tracks.forEach(track => {


        const button =
            track.querySelector(
                ".play-button"
            );


        const progress =
            track.querySelector(
                ".track-progress div"
            );


        const audio =
            document.createElement("audio");


        audio.src =
            track.dataset.track;


        audio.preload =
            "metadata";


        track.appendChild(audio);


        /* -----------------------------------------------
           PLAY / PAUSE
        ------------------------------------------------ */


        button.addEventListener(
            "click",
            async () => {


                /* Se é a música atual */

                if (
                    currentAudio === audio
                ) {


                    if (
                        audio.paused
                    ) {

                        try {

                            await audio.play();

                            track.classList.add(
                                "playing"
                            );

                            button.textContent =
                                "❚❚";

                        } catch (error) {

                            console.warn(
                                "Não foi possível reproduzir o áudio:",
                                error
                            );

                        }


                    } else {

                        audio.pause();

                        track.classList.remove(
                            "playing"
                        );

                        button.textContent =
                            "▶";

                    }


                    return;

                }


                /* ---------------------------------------
                   PARA QUALQUER OUTRA MÚSICA
                --------------------------------------- */


                if (currentAudio) {

                    currentAudio.pause();

                    currentAudio.currentTime = 0;


                    if (currentTrack) {

                        currentTrack
                            .classList
                            .remove(
                                "playing"
                            );


                        const oldButton =
                            currentTrack
                                .querySelector(
                                    ".play-button"
                                );


                        if (oldButton) {

                            oldButton.textContent =
                                "▶";

                        }


                        const oldProgress =
                            currentTrack
                                .querySelector(
                                    ".track-progress div"
                                );


                        if (oldProgress) {

                            oldProgress.style.width =
                                "0%";

                        }

                    }

                }


                /* ---------------------------------------
                   NOVA MÚSICA
                --------------------------------------- */


                currentAudio = audio;

                currentTrack = track;


                try {

                    await audio.play();

                    track.classList.add(
                        "playing"
                    );

                    button.textContent =
                        "❚❚";

                } catch (error) {

                    console.warn(
                        "Arquivo de áudio não encontrado ou bloqueado:",
                        audio.src
                    );

                    track.classList.remove(
                        "playing"
                    );

                    button.textContent =
                        "▶";

                }

            }
        );


        /* -----------------------------------------------
           PROGRESSO
        ------------------------------------------------ */

        audio.addEventListener(
            "timeupdate",
            () => {

                if (
                    !audio.duration ||
                    !Number.isFinite(
                        audio.duration
                    )
                ) {

                    return;

                }


                const percentage =
                    (
                        audio.currentTime /
                        audio.duration
                    ) * 100;


                progress.style.width =
                    `${percentage}%`;

            }
        );


        /* -----------------------------------------------
           FIM DA MÚSICA
        ------------------------------------------------ */

        audio.addEventListener(
            "ended",
            () => {

                track.classList.remove(
                    "playing"
                );

                button.textContent =
                    "▶";

                progress.style.width =
                    "0%";


                currentAudio = null;

                currentTrack = null;

            }
        );

    });


    /* =====================================================
       GALERIA
    ===================================================== */

    const galleryTrack =
        document.getElementById(
            "galleryTrack"
        );


    const slides =
        document.querySelectorAll(
            ".gallery-slide"
        );


    const previousButton =
        document.getElementById(
            "previousImage"
        );


    const nextButton =
        document.getElementById(
            "nextImage"
        );


    const currentCounter =
        document.getElementById(
            "galleryCurrent"
        );


    const totalCounter =
        document.getElementById(
            "galleryTotal"
        );


    let currentSlide = 0;


    const totalSlides =
        slides.length;


    if (totalCounter) {

        totalCounter.textContent =
            String(totalSlides)
                .padStart(2, "0");

    }


    function updateGallery() {


        if (!galleryTrack) return;


        galleryTrack.style.transform =
            `translateX(-${currentSlide * 100}%)`;


        if (currentCounter) {

            currentCounter.textContent =
                String(currentSlide + 1)
                    .padStart(2, "0");

        }

    }


    function nextSlide() {

        if (totalSlides === 0) return;


        currentSlide =
            (currentSlide + 1)
            % totalSlides;


        updateGallery();

    }


    function previousSlide() {

        if (totalSlides === 0) return;


        currentSlide =
            (
                currentSlide -
                1 +
                totalSlides
            ) % totalSlides;


        updateGallery();

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextSlide
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            previousSlide
        );

    }


    /* =====================================================
       TECLADO
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {


            if (
                event.key ===
                "ArrowRight"
            ) {

                nextSlide();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousSlide();

            }


            /* ESC fecha lightbox */

            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       SWIPE MOBILE
    ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    if (galleryTrack) {


        galleryTrack.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        galleryTrack.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0]
                        .screenX;


                const difference =
                    touchStartX -
                    touchEndX;


                if (
                    Math.abs(difference) <
                    50
                ) {

                    return;

                }


                if (
                    difference > 0
                ) {

                    nextSlide();

                } else {

                    previousSlide();

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       LIGHTBOX DA GALERIA
    ===================================================== */

    let activeLightbox = null;


    function closeLightbox() {

        if (!activeLightbox) return;


        activeLightbox.classList.remove(
            "visible"
        );


        setTimeout(
            () => {

                if (activeLightbox) {

                    activeLightbox.remove();

                    activeLightbox = null;

                }

            },
            300
        );

    }


    slides.forEach(slide => {


        slide.addEventListener(
            "click",
            () => {


                const image =
                    slide.querySelector("img");


                if (!image) return;


                closeLightbox();


                const lightbox =
                    document.createElement(
                        "div"
                    );


                lightbox.className =
                    "image-lightbox";


                lightbox.innerHTML = `

                    <button
                        class="lightbox-close"
                        type="button"
                        aria-label="Fechar imagem"
                    >
                        ×
                    </button>

                    <img
                        src="${image.src}"
                        alt="${image.alt}"
                    >

                `;


                document.body.appendChild(
                    lightbox
                );


                activeLightbox =
                    lightbox;


                requestAnimationFrame(
                    () => {

                        lightbox.classList.add(
                            "visible"
                        );

                    }
                );


                const closeButton =
                    lightbox.querySelector(
                        ".lightbox-close"
                    );


                closeButton.addEventListener(
                    "click",
                    closeLightbox
                );


                lightbox.addEventListener(
                    "click",
                    event => {

                        if (
                            event.target ===
                            lightbox
                        ) {

                            closeLightbox();

                        }

                    }
                );

            }
        );

    });


    /* =====================================================
       TRAILER
    ===================================================== */

    const trailerVideo =
        document.getElementById(
            "trailerVideo"
        );


    const videoOverlay =
        document.getElementById(
            "videoOverlay"
        );


    const playTrailer =
        document.getElementById(
            "playTrailer"
        );


    if (
        trailerVideo &&
        videoOverlay &&
        playTrailer
    ) {


        playTrailer.addEventListener(
            "click",
            async () => {

                try {

                    await trailerVideo.play();

                    videoOverlay.classList.add(
                        "hidden"
                    );

                } catch (error) {

                    console.warn(
                        "Não foi possível reproduzir o trailer.",
                        error
                    );

                }

            }
        );


        trailerVideo.addEventListener(
            "play",
            () => {

                videoOverlay.classList.add(
                    "hidden"
                );

            }
        );


        trailerVideo.addEventListener(
            "pause",
            () => {

                if (
                    !trailerVideo.ended
                ) {

                    videoOverlay.classList.remove(
                        "hidden"
                    );

                }

            }
        );


        trailerVideo.addEventListener(
            "ended",
            () => {

                videoOverlay.classList.remove(
                    "hidden"
                );

            }
        );

    }


    /* =====================================================
       PARALLAX DA HOME
    ===================================================== */

    const heroBackground =
        document.querySelector(
            ".hero-background"
        );


    let ticking = false;


    function updateParallax() {


        if (
            !heroBackground ||
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {

            ticking = false;

            return;

        }


        const scroll =
            window.scrollY;


        if (
            scroll <
            window.innerHeight
        ) {

            heroBackground.style.transform =
                `scale(1.08) translateY(${scroll * .12}px)`;

        }


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


});
