document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. TELA DE CARREGAMENTO ESTROBOSCÓPICA (EFEITO BRAT)
    // ==========================================
    const strobeLoader = document.getElementById('strobeLoader');
    const strobeWords = document.querySelectorAll('.strobe-word');
    
    if (strobeLoader) {
        // Bloqueia a rolagem da página durante o carregamento
        document.body.style.overflow = 'hidden';

        // Intervalo de piscada rápida em alta velocidade (Inspirado no BRAT)
        const strobeInterval = setInterval(() => {
            strobeLoader.classList.toggle('strobe-flash');
            
            strobeWords.forEach(word => {
                // Alterna a visibilidade das palavras de forma agressiva e aleatória
                word.style.opacity = Math.random() > 0.5 ? '1' : '0';
                word.style.transform = `scale(${0.95 + Math.random() * 0.1}) skew(${Math.random() * 5}deg)`;
            });
        }, 50); // Velocidade do Strobe (50ms)

        // Finaliza o carregamento após exatamente 4 segundos (4000ms)
        setTimeout(() => {
            clearInterval(strobeInterval);
            strobeLoader.classList.add('fade-out-loader');
            document.body.style.overflow = ''; // Libera o scroll do site
            
            // Remove o elemento do DOM após a animação de fade-out acabar
            setTimeout(() => {
                strobeLoader.remove();
            }, 600);
        }, 4000);
    }

    // ==========================================
    // 2. EFEITO HOLOGRÁFICO DINÂMICO DE ROLAGEM
    // ==========================================
    const hologramOverlay = document.getElementById('hologramOverlay');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const opacityModifier = 0.2 + (Math.sin(scrollPosition * 0.005) * 0.15);
        const hueModifier = (scrollPosition * 0.15) % 360;
        
        if (hologramOverlay) {
            hologramOverlay.style.opacity = opacityModifier;
            hologramOverlay.style.background = `linear-gradient(${135 + (scrollPosition * 0.08)}deg, rgba(255,255,255,0.02) 0%, rgba(0,242,254,0.05) 50%, rgba(253,38,121,0.05) 100%)`;
            hologramOverlay.style.backdropFilter = `hue-rotate(${hueModifier}deg)`;
        }
    });

    // ==========================================
    // 3. CONTROLE DO MENU DE NAVEGAÇÃO MOBILE
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
            if (navMenu) {
                navMenu.classList.remove('open');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        });
    });

    // ==========================================
    // 4. CONSOLE DE ÁUDIO INTERATIVO EDM / SCI-FI
    // ==========================================
    const consoleButtons = document.querySelectorAll('.console-tab-btn');
    const consoleStatusText = document.getElementById('consoleStatusText');
    const barNodes = document.querySelectorAll('.bar-node');

    // Mapeamento de picos sônicos para o equalizador gráfico (7 nós de frequência)
    const trackFrequencies = {
        sia: ['40%', '95%', '70%', '100%', '55%', '85%', '60%'],
        walker: ['95%', '30%', '85%', '20%', '90%', '40%', '80%']
    };

    consoleButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            consoleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Garante a captura do botão correto mesmo se houver clique interno
            const targetBtn = event.target.closest('.console-tab-btn');
            targetBtn.classList.add('active');

            const stream = targetBtn.getAttribute('data-stream');

            if (stream === 'sia') {
                consoleStatusText.textContent = '// CANAL ATIVO: EMISSÃO POP SINTÉTICA OTIMIZADA // MAX-EDM-OUTPUT';
            } else {
                consoleStatusText.textContent = '// CANAL ATIVO: RESSONÂNCIA E TENSÃO ORQUESTRAL DISSONANTE // WARNING-HIGH-PITCH';
            }

            // Altera as alturas das barras com transição suave via CSS
            barNodes.forEach((bar, index) => {
                if (trackFrequencies[stream] && trackFrequencies[stream][index]) {
                    bar.style.height = trackFrequencies[stream][index];
                }
            });
        });
    });

    // ==========================================
    // 5. MODO SOBRECARGA ESTÉTICA (GLITCH)
    // ==========================================
    const glitchTrigger = document.getElementById('glitchTrigger');
    if (glitchTrigger) {
        glitchTrigger.addEventListener('click', () => {
            document.body.classList.toggle('glitch-overload-mode');
            
            if (document.body.classList.contains('glitch-overload-mode')) {
                glitchTrigger.textContent = 'Restaurar Sistema';
            } else {
                glitchTrigger.textContent = 'Sobrecarga Estética';
            }
        });
    }
});
