/* =========================================================
   VOX LUX — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       HEADER — FADE IN / FADE OUT
    ===================================================== */

    const dynamicHeader =
        document.getElementById("dynamicHeader");

    let lastScrollTop = 0;

    if (dynamicHeader) {

        window.addEventListener("scroll", () => {

            const currentScroll =
                window.pageYOffset ||
                document.documentElement.scrollTop;


            // No topo
            if (currentScroll <= 20) {

                dynamicHeader.classList.remove(
                    "visible-fade"
                );

            }

            // Descendo
            else if (currentScroll > lastScrollTop) {

                dynamicHeader.classList.add(
                    "visible-fade"
                );

            }

            // Subindo
            else if (currentScroll < lastScrollTop) {

                dynamicHeader.classList.remove(
                    "visible-fade"
                );
            }

            lastScrollTop =
                Math.max(currentScroll, 0);

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
                isOpen
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
       BOTÃO HERO
    ===================================================== */

    const heroButton =
        document.querySelector(".hero-button");

    if (heroButton) {

        heroButton.addEventListener("click", event => {

            event.preventDefault();

            const album =
                document.getElementById("album");

            if (album) {

                album.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    }


    /* =====================================================
       PLAYER
    ===================================================== */

    const audioEngine =
        document.getElementById("audioEngine");

    const playButton =
        document.getElementById("btnPlayPause");

    const currentTitle =
        document.getElementById("currentTitle");

    const currentArtist =
        document.getElementById("currentArtist");

    const playerTimer =
        document.getElementById("playerTimer");

    const vinylRecord =
        document.querySelector(
            ".vinyl-record-effect"
        );


    if (audioEngine && playButton) {


        /* PLAY / PAUSE */

        playButton.addEventListener(
            "click",
            () => {

                if (audioEngine.paused) {

                    audioEngine.play()
                        .then(() => {

                            playButton.textContent =
                                "❚❚ PAUSAR";

                            if (vinylRecord) {

                                vinylRecord.classList.add(
                                    "spinning"
                                );

                            }

                        })
                        .catch(error => {

                            console.log(
                                "Áudio não disponível:",
                                error
                            );

                        });

                } else {

                    audioEngine.pause();

                    playButton.textContent =
                        "▶ REPRODUZIR";

                    if (vinylRecord) {

                        vinylRecord.classList.remove(
                            "spinning"
                        );

                    }

                }

            }
        );


        /* TIMER */

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
                    );

                const formattedSeconds =
                    seconds < 10
                        ? "0" + seconds
                        : seconds;

                if (playerTimer) {

                    playerTimer.textContent =
                        `${minutes}:${formattedSeconds}`;

                }

            }
        );


        /* ÁUDIO TERMINOU */

        audioEngine.addEventListener(
            "ended",
            () => {

                playButton.textContent =
                    "▶ REPRODUZIR";

                if (vinylRecord) {

                    vinylRecord.classList.remove(
                        "spinning"
                    );

                }

                if (playerTimer) {

                    playerTimer.textContent =
                        "0:00";

                }

            }
        );

    }


    /* =====================================================
       TRACKLIST
    ===================================================== */

    window.loadTrack =
        function(title, url, element) {

            if (!audioEngine) return;


            /* Remove active */

            const tracks =
                document.querySelectorAll(
                    ".track-row"
                );

            tracks.forEach(track => {

                track.classList.remove(
                    "active"
                );

            });


            /* Ativa a faixa */

            if (element) {

                element.classList.add(
                    "active"
                );

            }


            /* Atualiza título */

            if (currentTitle) {

                currentTitle.textContent =
                    title;

            }


            /* Atualiza artista */

            if (currentArtist) {

                currentArtist.textContent =
                    "Sia · Vox Lux";

            }


            /* Troca o arquivo */

            audioEngine.pause();

            audioEngine.currentTime = 0;

            audioEngine.src = url;

            audioEngine.load();


            /* Tenta reproduzir */

            audioEngine.play()
                .then(() => {

                    if (playButton) {

                        playButton.textContent =
                            "❚❚ PAUSAR";

                    }

                    if (vinylRecord) {

                        vinylRecord.classList.add(
                            "spinning"
                        );

                    }

                })
                .catch(() => {

                    if (playButton) {

                        playButton.textContent =
                            "▶ REPRODUZIR";

                    }

                });


            if (playerTimer) {

                playerTimer.textContent =
                    "0:00";

            }

        };


    /* =====================================================
       PERSONAGENS
    ===================================================== */

    const castDisplayBox =
        document.getElementById(
            "castDisplayBox"
        );


    const castDatabase = {

        celeste: {

            index: "01",

            role: "PROTAGONISTA",

            name:
                "Celeste Montgomery",

            actors:
                "Natalie Portman / Raffey Cassidy",

            biography:
                "Celeste é o centro do filme e representa a transformação de uma experiência traumática em uma persona pública de grande alcance. Sua trajetória revela a tensão entre identidade individual e imagem construída pela indústria cultural."

        },


        manager: {

            index: "02",

            role: "GESTÃO",

            name:
                "O Empresário",

            actors:
                "Jude Law",

            biography:
                "O empresário representa a dimensão corporativa da carreira de Celeste. Sua função evidencia a relação entre estratégia de imagem, gestão de crises, negócios e construção de uma carreira musical de grande escala."

        },


        eleanor: {

            index: "03",

            role: "FAMÍLIA",

            name:
                "Eleanor Montgomery",

            actors:
                "Stacy Martin",

            biography:
                "Eleanor estabelece uma conexão com a dimensão familiar e privada da protagonista. Sua presença ajuda a evidenciar a distância entre a pessoa existente nos bastidores e a persona criada para o público."

        }

    };


    window.switchCast =
        function(characterKey) {

            if (!castDisplayBox) return;

            const character =
                castDatabase[characterKey];

            if (!character) return;


            /* Botões */

            const tabs =
                document.querySelectorAll(
                    ".cast-tab"
                );

            tabs.forEach(tab => {

                tab.classList.remove(
                    "active"
                );

            });


            /* Determina botão */

            const buttons = {

                celeste: 0,

                manager: 1,

                eleanor: 2

            };


            if (
                tabs[buttons[characterKey]]
            ) {

                tabs[
                    buttons[characterKey]
                ].classList.add(
                    "active"
                );

            }


            /* Animação */

            castDisplayBox.style.opacity =
                "0";

            castDisplayBox.style.transform =
                "translateY(12px)";


            setTimeout(() => {

                castDisplayBox.innerHTML = `

                    <div class="cast-index">
                        ${character.index}
                    </div>

                    <div>

                        <span class="cast-role">
                            ${character.role}
                        </span>

                        <h3>
                            ${character.name}
                        </h3>

                        <span class="actor-credit">
                            ${character.actors}
                        </span>

                        <p>
                            ${character.biography}
                        </p>

                    </div>

                `;


                castDisplayBox.style.opacity =
                    "1";

                castDisplayBox.style.transform =
                    "translateY(0)";


            }, 180);

        };


    /* =====================================================
       GALERIA
    ===================================================== */

    const galleryThumbs =
        document.getElementById(
            "galleryThumbs"
        );

    const showcaseImg =
        document.getElementById(
            "galleryShowcase"
        );

    const captionOverlay =
        document.getElementById(
            "galleryCaption"
        );


    if (
        galleryThumbs &&
        showcaseImg &&
        captionOverlay
    ) {

        const thumbs =
            galleryThumbs.querySelectorAll(
                ".thumb-wrapper"
            );


        thumbs.forEach(thumb => {

            thumb.addEventListener(
                "click",
                () => {

                    thumbs.forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                    thumb.classList.add(
                        "active"
                    );


                    const largeUrl =
                        thumb.getAttribute(
                            "data-large"
                        );

                    const caption =
                        thumb.getAttribute(
                            "data-caption"
                        );


                    if (!largeUrl) return;


                    showcaseImg.style.opacity =
                        "0";


                    setTimeout(() => {

                        showcaseImg.src =
                            largeUrl;

                        showcaseImg.style.opacity =
                            "1";


                        if (caption) {

                            captionOverlay.textContent =
                                caption;

                        }

                    }, 180);

                }
            );

        });

    }


    /* =====================================================
       GRÁFICO
    ===================================================== */

    const chartControls =
        document.getElementById(
            "chartControls"
        );


    const chartDataset = {

        geral: {

            pop: 50,

            ost: 50,

            sint: 75,

            desc:
                "Mapeamento geral da obra: combinação entre linguagem pop, atmosfera cinematográfica e elementos instrumentais."

        },


        sia: {

            pop: 100,

            ost: 0,

            sint: 95,

            desc:
                "Predominância da linguagem pop: estruturas eletrônicas, melodias de grande escala e estética voltada à performance."

        },


        walker: {

            pop: 10,

            ost: 90,

            sint: 40,

            desc:
                "Predominância da dimensão orquestral: arranjos, texturas instrumentais e atmosfera cinematográfica."

        }

    };


    if (chartControls) {

        const buttons =
            chartControls.querySelectorAll(
                ".chart-toggle-btn"
            );


        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    buttons.forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                    button.classList.add(
                        "active"
                    );


                    const filter =
                        button.getAttribute(
                            "data-filter"
                        );


                    const data =
                        chartDataset[filter];


                    if (!data) return;


                    const barPop =
                        document.getElementById(
                            "barPop"
                        );

                    const barOst =
                        document.getElementById(
                            "barOst"
                        );

                    const barSint =
                        document.getElementById(
                            "barSint"
                        );


                    const labelPop =
                        document.getElementById(
                            "labelPop"
                        );

                    const labelOst =
                        document.getElementById(
                            "labelOst"
                        );

                    const labelSint =
                        document.getElementById(
                            "labelSint"
                        );


                    const description =
                        document.getElementById(
                            "chartDescriptionText"
                        );


                    if (barPop)
                        barPop.style.width =
                            data.pop + "%";


                    if (barOst)
                        barOst.style.width =
                            data.ost + "%";


                    if (barSint)
                        barSint.style.width =
                            data.sint + "%";


                    if (labelPop)
                        labelPop.textContent =
                            data.pop + "%";


                    if (labelOst)
                        labelOst.textContent =
                            data.ost + "%";


                    if (labelSint)
                        labelSint.textContent =
                            data.sint + "%";


                    if (description)
                        description.textContent =
                            data.desc;

                }
            );

        });

    }


    /* =====================================================
       ANO DO FOOTER
    ===================================================== */

    const yearElement =
        document.getElementById(
            "currentYear"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       LINKS INTERNOS
       Scroll suave + fechamento do menu
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) return;


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                if (mainNav) {

                    mainNav.classList.remove(
                        "active"
                    );

                }

                if (menuBurger) {

                    menuBurger.classList.remove(
                        "active"
                    );

                    menuBurger.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    });

});
