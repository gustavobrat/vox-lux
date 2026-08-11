```javascript
/* =========================================================
   VOX LUX — SCRIPT.JS
   Compatível com o HTML atualizado
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HEADER — FADE NO SCROLL
    ===================================================== */

    const dynamicHeader =
        document.getElementById("dynamicHeader");

    let lastScrollTop = 0;

    if (dynamicHeader) {

        window.addEventListener("scroll", () => {

            const currentScroll =
                window.pageYOffset ||
                document.documentElement.scrollTop;

            if (currentScroll > 10) {

                if (currentScroll > lastScrollTop) {
                    dynamicHeader.classList.add("visible-fade");
                } else {
                    dynamicHeader.classList.add("visible-fade");
                }

            } else {

                dynamicHeader.classList.remove("visible-fade");

            }

            lastScrollTop =
                currentScroll <= 0
                    ? 0
                    : currentScroll;

        });

    }


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuBurger =
        document.getElementById("menuBurger");

    const mainNav =
        document.getElementById("mainNav");

    if (menuBurger && mainNav) {

        menuBurger.addEventListener("click", () => {

            const isOpen =
                mainNav.classList.toggle("active");

            menuBurger.classList.toggle(
                "active",
                isOpen
            );

            menuBurger.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                menuBurger.classList.remove("active");

                menuBurger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       PLAYER DE ÁUDIO
    ===================================================== */

    const audioEngine =
        document.getElementById("audioEngine");

    const btnPlayPause =
        document.getElementById("btnPlayPause");

    const currentTitle =
        document.getElementById("currentTitle");

    const currentArtist =
        document.getElementById("currentArtist");

    const playerTimer =
        document.getElementById("playerTimer");

    const vinylRecord =
        document.querySelector(".vinyl-record-effect");


    if (
        audioEngine &&
        btnPlayPause &&
        playerTimer
    ) {

        /* PLAY / PAUSE */

        btnPlayPause.addEventListener(
            "click",
            () => {

                if (audioEngine.paused) {

                    audioEngine.play()
                        .then(() => {

                            btnPlayPause.textContent =
                                "❚❚ PAUSAR";

                            if (vinylRecord) {
                                vinylRecord.classList.add(
                                    "spinning"
                                );
                            }

                        })
                        .catch(error => {

                            console.warn(
                                "Não foi possível reproduzir o áudio:",
                                error
                            );

                        });

                } else {

                    audioEngine.pause();

                    btnPlayPause.textContent =
                        "▶ REPRODUZIR";

                    if (vinylRecord) {
                        vinylRecord.classList.remove(
                            "spinning"
                        );
                    }

                }

            }
        );


        /* TEMPO */

        audioEngine.addEventListener(
            "timeupdate",
            () => {

                const minutes =
                    Math.floor(
                        audioEngine.currentTime / 60
                    );

                const seconds =
                    Math.floor(
                        audioEngine.currentTime % 60
                    )
                    .toString()
                    .padStart(2, "0");

                playerTimer.textContent =
                    `${minutes}:${seconds}`;

            }
        );


        /* FIM DA FAIXA */

        audioEngine.addEventListener(
            "ended",
            () => {

                btnPlayPause.textContent =
                    "▶ REPRODUZIR";

                if (vinylRecord) {
                    vinylRecord.classList.remove(
                        "spinning"
                    );
                }

            }
        );


        /* ERRO DE ÁUDIO */

        audioEngine.addEventListener(
            "error",
            () => {

                console.warn(
                    "Arquivo de áudio não disponível."
                );

                btnPlayPause.textContent =
                    "▶ REPRODUZIR";

            }
        );

    }


    /* =====================================================
       TRACKLIST
    ===================================================== */

    const trackRows =
        document.querySelectorAll(".track-row");


    trackRows.forEach(row => {

        row.addEventListener(
            "click",
            () => {

                const title =
                    row.querySelector(
                        ".track-title"
                    )?.textContent.trim();

                const source =
                    row.getAttribute("data-url") ||
                    row.dataset.url;


                /* Remove estado anterior */

                trackRows.forEach(track => {
                    track.classList.remove("active");
                });


                /* Ativa faixa */

                row.classList.add("active");


                /* Atualiza título */

                if (title && currentTitle) {
                    currentTitle.textContent =
                        title;
                }


                /* Se houver URL, carrega */

                if (source && audioEngine) {

                    audioEngine.pause();

                    audioEngine.src = source;

                    audioEngine.load();

                    audioEngine.currentTime = 0;

                    audioEngine.play()
                        .then(() => {

                            if (btnPlayPause) {
                                btnPlayPause.textContent =
                                    "❚❚ PAUSAR";
                            }

                            if (vinylRecord) {
                                vinylRecord.classList.add(
                                    "spinning"
                                );
                            }

                        })
                        .catch(() => {

                            if (btnPlayPause) {
                                btnPlayPause.textContent =
                                    "▶ REPRODUZIR";
                            }

                        });

                }

            }
        );

    });


    /* =====================================================
       CAST / FICHA TÉCNICA
    ===================================================== */

    const castTabs =
        document.querySelectorAll(".cast-tab");

    const castDisplayBox =
        document.getElementById(
            "castDisplayBox"
        );


    const castDatabase = {

        celeste: {

            name: "Celeste Montgomery",

            actors:
                "Interpretação: Natalie Portman (Adulta) / Raffey Cassidy (Jovem)",

            biography:
                "A personagem central representa as demandas psicológicas exigidas pelo estrelato de massa. Sua trajetória transforma um acontecimento traumático em capital midiático e posteriormente em produto cultural."

        },


        manager: {

            name: "O Empresário",

            actors:
                "Gestão, imagem e estratégia comercial",

            biography:
                "O núcleo empresarial representa a estrutura corporativa responsável pela administração da carreira, da imagem pública e das demandas comerciais da artista."

        },


        eleanor: {

            name: "Eleanor Montgomery",

            actors:
                "Núcleo familiar",

            biography:
                "Eleanor funciona como contraponto ao universo profissional de Celeste, evidenciando as tensões entre identidade pessoal, família e espetáculo."

        }

    };


    castTabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                castTabs.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                tab.classList.add("active");


                const key =
                    tab.textContent
                        .trim()
                        .toLowerCase()
                        .includes("empres")
                        ? "manager"
                        : tab.textContent
                            .trim()
                            .toLowerCase()
                            .includes("eleanor")
                            ? "eleanor"
                            : "celeste";


                const character =
                    castDatabase[key];


                if (
                    character &&
                    castDisplayBox
                ) {

                    castDisplayBox.innerHTML = `

                        <h4>
                            ${character.name}
                        </h4>

                        <span class="actor-credit">
                            ${character.actors}
                        </span>

                        <p>
                            ${character.biography}
                        </p>

                    `;

                }

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL — SEÇÕES
    ===================================================== */

    const sections =
        document.querySelectorAll(
            ".promo-section"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "section-visible"
                            );

                        }

                    });

                },
                {
                    threshold: 0.08
                }
            );


        sections.forEach(section => {
            observer.observe(section);
        });

    }

});
```
