/* =========================================================
   VOX LUX — SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       HEADER — FADE IN / FADE OUT
    ===================================================== */

    const header =
        document.getElementById("siteHeader");

    let previousScroll =
        window.scrollY;

    let ticking = false;


    function updateHeader() {

        const currentScroll =
            window.scrollY;


        /*
            Se estiver no topo:
            header desaparece.
        */

        if (currentScroll <= 20) {

            header.classList.remove(
                "header-visible"
            );

        }

        /*
            Descendo:
            header aparece.
        */

        else if (
            currentScroll > previousScroll
        ) {

            header.classList.add(
                "header-visible"
            );

        }

        /*
            Subindo:
            header desaparece.
        */

        else if (
            currentScroll < previousScroll
        ) {

            header.classList.remove(
                "header-visible"
            );

        }


        previousScroll =
            currentScroll;

        ticking = false;
    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateHeader
                );

                ticking = true;
            }

        },
        { passive: true }
    );


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");


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
                isOpen
            );

        }
    );


    /*
        Fecha o menu depois de clicar
        em qualquer item.
    */

    mainNav
        .querySelectorAll("a")
        .forEach(link => {

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

                }
            );

        });


    /* =====================================================
       PLAYER
    ===================================================== */

    const audio =
        document.getElementById(
            "audioPlayer"
        );

    const playButton =
        document.getElementById(
            "playButton"
        );

    const previousButton =
        document.getElementById(
            "previousTrack"
        );

    const nextButton =
        document.getElementById(
            "nextTrack"
        );

    const progressBar =
        document.getElementById(
            "progressBar"
        );

    const progressFill =
        document.getElementById(
            "progressFill"
        );

    const currentTime =
        document.getElementById(
            "currentTime"
        );

    const duration =
        document.getElementById(
            "duration"
        );

    const trackTitle =
        document.getElementById(
            "trackTitle"
        );

    const trackArtist =
        document.getElementById(
            "trackArtist"
        );

    const tracks =
        Array.from(
            document.querySelectorAll(
                ".track"
            )
        );


    let currentTrack = 0;


    /*
        Formata segundos para
        minutos:segundos.
    */

    function formatTime(seconds) {

        if (!Number.isFinite(seconds)) {
            return "0:00";
        }

        const minutes =
            Math.floor(
                seconds / 60
            );

        const secs =
            Math.floor(
                seconds % 60
            )
            .toString()
            .padStart(2, "0");

        return `${minutes}:${secs}`;
    }


    /*
        Carrega uma faixa.
    */

    function loadTrack(index) {

        if (!tracks.length) {
            return;
        }

        currentTrack =
            (index + tracks.length)
            % tracks.length;


        const selectedTrack =
            tracks[currentTrack];


        const title =
            selectedTrack.dataset.title;

        const artist =
            selectedTrack.dataset.artist;

        const source =
            selectedTrack.dataset.audio;


        trackTitle.textContent =
            title;

        trackArtist.textContent =
            artist;


        tracks.forEach(
            track => {

                track.classList.remove(
                    "active"
                );

            }
        );


        selectedTrack.classList.add(
            "active"
        );


        /*
            O áudio só é carregado
            quando existe um arquivo.
        */

        if (source) {

            audio.src = source;

            audio.load();

        }


        progressFill.style.width =
            "0%";

        currentTime.textContent =
            "0:00";

        duration.textContent =
            "0:00";

    }


    /*
        Play / Pause
    */

    playButton.addEventListener(
        "click",
        async () => {

            if (!audio.src) {

                /*
                    Caso os arquivos ainda
                    não tenham sido colocados.
                */

                alert(
                    "Adicione o arquivo de áudio em assets/audio para reproduzir esta faixa."
                );

                return;
            }


            if (audio.paused) {

                try {

                    await audio.play();

                    playButton.textContent =
                        "❚❚";

                }

                catch (error) {

                    console.warn(
                        "Não foi possível reproduzir o áudio.",
                        error
                    );

                }

            }

            else {

                audio.pause();

                playButton.textContent =
                    "▶";

            }

        }
    );


    /*
        Faixa anterior
    */

    previousButton.addEventListener(
        "click",
        () => {

            loadTrack(
                currentTrack - 1
            );

        }
    );


    /*
        Próxima faixa
    */

    nextButton.addEventListener(
        "click",
        () => {

            loadTrack(
                currentTrack + 1
            );

        }
    );


    /*
        Atualização do player
    */

    audio.addEventListener(
        "loadedmetadata",
        () => {

            duration.textContent =
                formatTime(
                    audio.duration
                );

        }
    );


    audio.addEventListener(
        "timeupdate",
        () => {

            currentTime.textContent =
                formatTime(
                    audio.currentTime
                );


            if (
                audio.duration &&
                Number.isFinite(
                    audio.duration
                )
            ) {

                const percentage =
                    (
                        audio.currentTime /
                        audio.duration
                    ) * 100;


                progressFill.style.width =
                    `${percentage}%`;

            }

        }
    );


    /*
        Ao terminar:
        passa automaticamente
        para a próxima faixa.
    */

    audio.addEventListener(
        "ended",
        () => {

            loadTrack(
                currentTrack + 1
            );

            audio.play()
                .then(() => {

                    playButton.textContent =
                        "❚❚";

                })
                .catch(() => {

                    playButton.textContent =
                        "▶";

                });

        }
    );


    /*
        Clique na barra de progresso.
    */

    progressBar.addEventListener(
        "click",
        event => {

            if (!audio.duration) {
                return;
            }


            const rect =
                progressBar.getBoundingClientRect();


            const position =
                event.clientX -
                rect.left;


            const percentage =
                position /
                rect.width;


            audio.currentTime =
                percentage *
                audio.duration;

        }
    );


    /*
        Clique nas músicas.
    */

    tracks.forEach(
        (track, index) => {

            track.addEventListener(
                "click",
                () => {

                    loadTrack(index);

                }
            );

        }
    );


    /*
        Carrega a primeira faixa.
    */

    loadTrack(0);


    /* =====================================================
       PERSONAGENS
    ===================================================== */

    const characterTabs =
        document.querySelectorAll(
            ".character-tab"
        );

    const characterName =
        document.getElementById(
            "characterName"
        );

    const characterRole =
        document.getElementById(
            "characterRole"
        );

    const characterDescription =
        document.getElementById(
            "characterDescription"
        );

    const characterActor =
        document.getElementById(
            "characterActor"
        );

    const characterImage =
        document.getElementById(
            "characterImage"
        );


    const characters = {

        celeste: {

            name:
                "Celeste Montgomery",

            role:
                "PROTAGONISTA",

            actor:
                "Natalie Portman / Raffey Cassidy",

            image:
                "assets/images/celeste.jpg",

            description:
                "Interpretada por Raffey Cassidy na juventude e Natalie Portman na fase adulta, Celeste é o centro da narrativa. Sua trajetória transforma um acontecimento traumático em capital cultural e, posteriormente, em uma carreira construída pela indústria do entretenimento."

        },


        eleanor: {

            name:
                "Eleanor Montgomery",

            role:
                "IRMÃ",

            actor:
                "Stacy Martin",

            image:
                "assets/images/eleanor.jpg",

            description:
                "Eleanor é a irmã mais velha de Celeste e participa da formação artística da personagem. Sua presença representa uma ligação com a vida anterior à fama e funciona como contraponto ao universo de espetáculo construído ao redor da protagonista."

        },


        manager: {

            name:
                "O Manager",

            role:
                "GESTÃO DE CARREIRA",

            actor:
                "Jude Law",

            image:
                "assets/images/manager.jpg",

            description:
                "Interpretado por Jude Law, o empresário representa a dimensão estratégica da carreira de Celeste. Sua atuação está diretamente ligada à administração da imagem, dos compromissos profissionais e da máquina de comunicação que sustenta a persona pública da artista."

        },


        albertine: {

            name:
                "Albertine",

            role:
                "NOVA GERAÇÃO",

            actor:
                "Raffey Cassidy",

            image:
                "assets/images/albertine.jpg",

            description:
                "Albertine, filha de Celeste, estabelece uma relação entre a estrela consolidada e uma nova geração que cresceu dentro das consequências da fama da mãe."

        }

    };


    characterTabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    const key =
                        tab.dataset.character;

                    const character =
                        characters[key];


                    if (!character) {
                        return;
                    }


                    characterTabs.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    tab.classList.add(
                        "active"
                    );


                    characterName.textContent =
                        character.name;

                    characterRole.textContent =
                        character.role;

                    characterActor.textContent =
                        character.actor;

                    characterDescription.textContent =
                        character.description;


                    characterImage.style.opacity =
                        "0";


                    setTimeout(
                        () => {

                            characterImage.src =
                                character.image;

                            characterImage.alt =
                                character.name;

                            characterImage.style.opacity =
                                "1";

                        },
                        180
                    );

                }
            );

        }
    );


    /* =====================================================
       GALERIA
    ===================================================== */

    const galleryMainImage =
        document.getElementById(
            "galleryMainImage"
        );

    const galleryCaption =
        document.getElementById(
            "galleryCaption"
        );

    const galleryThumbs =
        document.querySelectorAll(
            ".gallery-thumb"
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


                    galleryMainImage.style.opacity =
                        "0";


                    setTimeout(
                        () => {

                            galleryMainImage.src =
                                image;

                            galleryCaption.textContent =
                                caption;

                            galleryMainImage.style.opacity =
                                "1";

                        },
                        180
                    );

                }
            );

        }


    /* =====================================================
       ESC — FECHA MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

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

            }

        }
    );

});
