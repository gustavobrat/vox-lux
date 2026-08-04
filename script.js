document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. TELA DE CARREGAMENTO ESTROBOSCÓPICA (COM FADE-OUT SUAVE)
    // ==========================================
    const strobeLoader = document.getElementById('strobeLoader');
    const strobeWords = document.querySelectorAll('.strobe-word');
    
    if (strobeLoader) {
        document.body.style.overflow = 'hidden';

        const strobeInterval = setInterval(() => {
            strobeLoader.classList.toggle('strobe-flash');
            
            strobeWords.forEach(word => {
                word.style.opacity = Math.random() > 0.5 ? '1' : '0.2';
                word.style.transform = `scale(${0.98 + Math.random() * 0.04}) skew(${Math.random() * 4}deg)`;
            });
        }, 50);

        // Termina a piscadeira aos 4 segundos e inicia o desbotamento (fade-out)
        setTimeout(() => {
            clearInterval(strobeInterval);
            
            // Força a transição suave de opacidade e visibilidade via JS
            strobeLoader.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s';
            strobeLoader.style.opacity = '0';
            strobeLoader.style.visibility = 'hidden';
            
            document.body.style.overflow = ''; // Devolve o scroll da página

            // Limpa o elemento do DOM para não pesar a página
            setTimeout(() => {
                if (strobeLoader) strobeLoader.remove();
            }, 600);
        }, 4000);
    }

    // ==========================================
    // 2. EFEITO HOLOGRÁFICO DINÂMICO DE ROLAGEM
    // ==========================================
    const hologramOverlay = document.getElementById('hologramOverlay');
    
    if (hologramOverlay) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const opacityModifier = 0.2 + (Math.sin(scrollPosition * 0.005) * 0.15);
            const hueModifier = (scrollPosition * 0.15) % 360;
            
            hologramOverlay.style.opacity = opacityModifier;
            hologramOverlay.style.background = `linear-gradient(${135 + (scrollPosition * 0.08)}deg, rgba(255,255,255,0.02) 0%, rgba(0,242,254,0.05) 50%, rgba(253,38,121,0.05) 100%)`;
            hologramOverlay.style.backdropFilter = `hue-rotate(${hueModifier}deg)`;
        });
    }

    // ==========================================
    // 3. CONTROLE DO MENU MOBILE
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('open');
            if (menuToggle) menuToggle.classList.remove('active');
        });
    });

    // ==========================================
    // 4. CONSOLE DE ÁUDIO DO TERMINAL
    // ==========================================
    const consoleButtons = document.querySelectorAll('.console-tab-btn');
    const consoleStatusText = document.getElementById('consoleStatusText');
    const barNodes = document.querySelectorAll('.bar-node');

    // Frequências originais restauradas e salvas
    const trackFrequencies = {
        sia: ['40%', '95%', '70%', '100%', '55%', '85%', '60%'],
        walker: ['95%', '30%', '85%', '20%', '90%', '40%', '80%']
    };

    consoleButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            consoleButtons.forEach(btn => btn.classList.remove('active'));
            
            const targetBtn = event.target.closest('.console-tab-btn');
            if (!targetBtn) return;
            
            targetBtn.classList.add('active');
            const stream = targetBtn.getAttribute('data-stream');

            if (consoleStatusText) {
                if (stream === 'sia') {
                    consoleStatusText.textContent = '// CANAL ATIVO: EMISSÃO POP SINTÉTICA OTIMIZADA // MAX-EDM-OUTPUT';
                } else {
                    consoleStatusText.textContent = '// CANAL ATIVO: RESSONÂNCIA E TENSÃO ORQUESTRAL DISSONANTE // WARNING-HIGH-PITCH';
                }
            }

            barNodes.forEach((bar, index) => {
                if (trackFrequencies[stream] && trackFrequencies[stream][index]) {
                    bar.style.height = trackFrequencies[stream][index];
                }
            });
        });
    });
});
