```javascript
/* =====================================================
   VOX LUX — JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       HEADER — FADE IN / FADE OUT
    ================================================= */

    const header = document.getElementById("dynamicHeader");

    let lastScroll = window.scrollY;

    window.addEventListener("scroll", () => {

        const currentScroll = window.scrollY;

        if (currentScroll > 80 && currentScroll > lastScroll) {

            // descendo
            header.classList.add("visible-fade");

        } else if (currentScroll < lastScroll) {

            // subindo
            header.classList.remove("visible-fade");

        }

        if (currentScroll <= 20) {
            header.classList.remove("visible-fade");
        }

        lastScroll = currentScroll;

    });


    /* =================================================
       MENU MOBILE
    ================================================= */

    const menuBurger = document.getElementById("menuBurger");
    const mainNav = document.getElementById("mainNav");

    if (menuBurger && mainNav) {

        menuBurger.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("active");

            menuBurger.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                menuBurger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =================================================
       PLAYER DE MÚSICA
    ================================================= */

    const audio = document.getElementById("audioEngine");

    const playButton =
        document.getElementById("btnPlayPause");

    const currentTitle =
        document.getElementById("currentTitle");

    const currentArtist =
        document.getElementById("currentArtist");

    const timer =
        document.getElementById("playerTimer");

    const duration =
        document.getElementById("playerDuration");

    const progress =
        document.getElementById("progressBar");

    const vinyl =
        document.querySelector(".vinyl");

    const tracks =
        document.querySelectorAll(".track-row");


    let currentTrack = 0;


    /* FORMATA TEMPO */

    function formatTime(seconds) {

        if (!Number.isFinite(seconds)) {
            return "0:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const secs =
            Math.floor(seconds % 60);

        return `${minutes}:${secs
            .toString()
            .padStart(2, "0")}`;

    }


    /* CARREGAR TRACK */

    function loadTrack(index, autoPlay = false) {

        if (!tracks[index]) return;

        const track = tracks[index];

        const title =
            track.dataset.title;

        const artist =
            track.dataset.artist;

        const source =
            track.dataset.src;


        currentTrack = index;


        /* Atualiza interface */

        currentTitle.textContent = title;

        currentArtist.textContent =
            artist;


        /* Atualiza música */

        audio.src = source;

        audio.load();


        /* Marca track */

        tracks.forEach(item => {
            item.classList.remove("active");
        });

        track.classList.add("active");


        timer.textContent = "0:00";

        duration.textContent = "0:00";

        progress.value = 0;


        if (autoPlay) {

            const playPromise =
                audio.play();

            if (playPromise !== undefined) {

                playPromise
                    .then(() => {

                        playButton.textContent =
                            "Ⅱ";

                        vinyl.classList.add(
                            "spinning"
                        );

                    })
                    .catch(() => {

                        /*
                            O navegador pode bloquear
                            autoplay. Nesse caso,
                            o usuário pode apertar Play.
                        */

                        playButton.textContent =
                            "▶";

                    });

            }

        }

    }


    /* CARREGA PRIMEIRA FAIXA */

    if (tracks.length > 0) {
        loadTrack(0, false);
    }


    /* CLIQUE NAS TRACKS */

    tracks.forEach((track, index) => {

        track.addEventListener("click", () => {

            loadTrack(index, true);

        });

    });


    /* PLAY / PAUSE */

    if (playButton) {

        playButton.addEventListener("click", () => {

            if (!audio.src) {
                loadTrack(currentTrack, false);
            }


            if (audio.paused) {

                audio.play()
                    .then(() => {

                        playButton.textContent =
                            "Ⅱ";

                        vinyl.classList.add(
                            "spinning"
                        );

                    })
                    .catch(error => {

                        console.log(
                            "Não foi possível reproduzir:",
                            error
                        );

                    });

            } else {

                audio.pause();

                playButton.textContent =
                    "▶";

                vinyl.classList.remove(
                    "spinning"
                );

            }

        });

    }


    /* TEMPO */

    audio.addEventListener(
        "timeupdate",
        () => {

            timer.textContent =
                formatTime(
                    audio.currentTime
                );

            if (
                audio.duration &&
                Number.isFinite(audio.duration)
            ) {

                const percentage =
                    (audio.currentTime /
                    audio.duration) * 100;

                progress.value =
                    percentage;

            }

        }
    );


    /* DURAÇÃO */

    audio.addEventListener(
        "loadedmetadata",
        () => {

            duration.textContent =
                formatTime(audio.duration);

        }
    );


    /* BARRA DE PROGRESSO */

    if (progress) {

        progress.addEventListener(
            "input",
            () => {

                if (
                    audio.duration &&
                    Number.isFinite(audio.duration)
                ) {

                    audio.currentTime =
                        (progress.value / 100) *
                        audio.duration;

                }

            }
        );

    }


    /* QUANDO A MÚSICA TERMINA */

    audio.addEventListener(
        "ended",
        () => {

            vinyl.classList.remove(
                "spinning"
            );

            playButton.textContent =
                "▶";


            /*
                Toca automaticamente
                a próxima música.
            */

            const nextTrack =
                currentTrack + 1;

            if (nextTrack < tracks.length) {

                loadTrack(
                    nextTrack,
                    true
                );

            }

        }
    );


    /* =================================================
       PERSONAGENS
    ================================================= */

    const castTabs =
        document.querySelectorAll(".cast-tab");

    const castName =
        document.getElementById("castName");

    const castActor =
        document.getElementById("castActor");

    const castBiography =
        document.getElementById("castBiography");

    const castImage =
        document.getElementById("castImage");


    const characters = {

        celeste: {

            name:
                "Celeste Montgomery",

            actor:
                "Interpretação: Natalie Portman / Raffey Cassidy",

            image:
                "assets/celeste.jpg",

            biography:
                "A personagem central representa as demandas psicológicas exigidas pelo estrelato de massa. Sua trajetória transforma um acontecimento traumático em uma plataforma para construção de imagem, reconhecimento e poder comercial."

        },


        manager: {

            name:
                "O Empresário",

            actor:
                "Interpretação: Jude Law",

            image:
                "assets/manager.jpg",

            biography:
                "O empresário representa a dimensão corporativa da carreira de Celeste. Sua função está ligada à administração da imagem pública, negociações, contratos, apresentações e estratégias necessárias para transformar uma artista em uma marca internacional."

        },


        eleanor: {

            name:
                "Eleanor Montgomery",

            actor:
                "Interpretação: Stacy Martin",

            image:
                "assets/eleanor.jpg",

            biography:
                "Eleanor funciona como uma presença ligada ao passado e às relações pessoais de Celeste. Sua existência ajuda a revelar a distância entre a identidade privada da personagem e a persona pública construída pela indústria."

        }

    };


    castTabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                const character =
                    characters[
                        tab.dataset.character
                    ];

                if (!character) return;


                castTabs.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });

                tab.classList.add(
                    "active"
                );


                /* Atualiza texto */

                castName.textContent =
                    character.name;

                castActor.textContent =
                    character.actor;

                castBiography.textContent =
                    character.biography;


                /* Atualiza foto */

                castImage.style.opacity =
                    "0";


                setTimeout(() => {

                    castImage.src =
                        character.image;

                    castImage.alt =
                        character.name;

                    castImage.style.opacity =
                        "1";

                }, 180);

            }
        );

    });


    /* =================================================
       GALERIA
    ================================================= */

    const galleryThumbs =
        document.querySelectorAll(
            ".gallery-thumb"
        );

    const galleryImage =
        document.getElementById(
            "galleryShowcase"
        );

    const galleryCaption =
        document.getElementById(
            "galleryCaption"
        );


    galleryThumbs.forEach(
        thumb => {

            thumb.addEventListener(
                "click",
                () => {

                    const image =
                        thumb.dataset.image;

                    const caption =
                        thumb.dataset.caption;


                    galleryThumbs.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );

                    thumb.classList.add(
                        "active"
                    );


                    galleryImage.style.opacity =
                        "0";


                    setTimeout(() => {

                        galleryImage.src =
                            image;

                        galleryCaption.textContent =
                            caption;

                        galleryImage.style.opacity =
                            "1";

                    }, 200);

                }
            );

        }
    );


    /* =================================================
       GRÁFICO
    ================================================= */

    const chartButtons =
        document.querySelectorAll(
            ".chart-toggle"
        );


    const datasets = {

        geral: {

            pop: 50,
            ost: 50,
            sint: 75,

            description:
                "O projeto combina elementos de música pop, texturas eletrônicas e composição orquestral para representar diferentes dimensões da narrativa."

        },


        pop: {

            pop: 100,
            ost: 20,
            sint: 95,

            description:
                "O filtro pop enfatiza as estruturas comerciais, eletrônicas e sintéticas associadas à persona pública de Celeste."

        },


        orquestral: {

            pop: 30,
            ost: 100,
            sint: 45,

            description:
                "O filtro orquestral evidencia o papel das texturas instrumentais e da composição de Scott Walker na construção da atmosfera cinematográfica."

        }

    };


    chartButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter;

                const data =
                    datasets[filter];

                if (!data) return;


                chartButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );


                document.getElementById(
                    "barPop"
                ).style.width =
                    `${data.pop}%`;


                document.getElementById(
                    "barOst"
                ).style.width =
                    `${data.ost}%`;


                document.getElementById(
                    "barSint"
                ).style.width =
                    `${data.sint}%`;


                document.getElementById(
                    "labelPop"
                ).textContent =
                    `${data.pop}%`;


                document.getElementById(
                    "labelOst"
                ).textContent =
                    `${data.ost}%`;


                document.getElementById(
                    "labelSint"
                ).textContent =
                    `${data.sint}%`;


                document.getElementById(
                    "chartDescriptionText"
                ).textContent =
                    data.description;

            }
        );

    });


    /* =================================================
       BOTÃO VOLTAR AO TOPO
    ================================================= */

    const topButton =
        document.querySelector(
            '.footer-bottom a[href="#inicio"]'
        );

    if (topButton) {

        topButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }

});
```
