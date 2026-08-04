document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. TELA DE CARREGAMENTO ESTROBOSCÓPICA (EFEITO BRAT)
    // ==========================================
    const strobeLoader = document.getElementById('strobeLoader');
    const strobeWords = document.querySelectorAll('.strobe-word');
    
    if (strobeLoader) {
        // Força o bloqueio do scroll no início
        document.body.style.overflow = 'hidden';

        // Intervalo de piscada rápida (50ms)
        const strobeInterval = setInterval(() => {
            strobeLoader.classList.toggle('strobe-flash');
            
            strobeWords.forEach(word => {
                // Alterna entre opacidade alta e média para efeito estroboscópico visível
                word.style.opacity = Math.random() > 0.5 ? '1' : '0.2';
                word.style.transform = `scale(${0.98 + Math.random() * 0.04}) skew(${Math.random() * 4}deg)`;
            });
        }, 50);

        // Garante a liberação do site após 4 segundos, sem travar
        setTimeout(() => {
            clearInterval(strobeInterval);
            
            // Aplica a transição de saída suave
            strobeLoader.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s';
            strobeLoader.style.opacity = '0';
            strobeLoader.style.visibility = 'hidden';
            
            document.body.style.overflow = ''; // Libera a rolagem do site
            
            // Remove o loader do DOM após o término da transição de opacidade
            setTimeout(() => {
                if (strobeLoader) strobeLoader.remove();
            }, 600);
        }, 4000);
    }

    // ==========================================
    // 2. EFEITO HOLOGRÁFICO DINÂMICO DE ROLAGEM (OTIMIZADO)
    // ==========================================
    const hologramOverlay = document.getElementById('hologramOverlay');
    let ticking = false;
    
    if (hologramOverlay) {
        window.addEventListener('scroll', () => {
            // Evita sobrecarregar o navegador usando requestAnimationFrame
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPosition = window.scrollY;
                    const opacityModifier = 0.2 + (Math.sin(scrollPosition * 0.005) * 0.15);
                    const hueModifier = (scrollPosition * 0.15) % 360;
                    
                    hologramOverlay.style.opacity = opacityModifier;
                    hologramOverlay.style.background = `linear-gradient(${135 + (scrollPosition * 0.08)}deg, rgba(255,255,255,0.02) 0%, rgba(0,242,254,0.05) 50%, rgba(253,38,121,0.05) 100%)`;
                    hologramOverlay.style.backdropFilter = `hue-rotate(${hueModifier}deg)`;
                    hologramOverlay.style.webkitBackdropFilter = `hue-rotate(${hueModifier}deg)`;
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

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
            if (navMenu) navMenu.classList.remove('open');
            if (menuToggle) menuToggle.classList.remove('active');
        });
    });

    // ==========================================
    // 4. CONSOLE DE ÁUDIO INTERATIVO EDM (COM ANIMAÇÃO ORGÂNICA)
    // ==========================================
    const consoleButtons = document.querySelectorAll('.console-tab-btn');
    const consoleStatusText = document.getElementById('consoleStatusText');
    const barNodes = document.querySelectorAll('.bar-node');
    let equalizerAnimation = null;

    const trackFrequencies = {
        sia:,
        walker: [95, 30, 85, 20, 90, 40, 80]
    };

    function startLiveEqualizer(stream) {
        // Limpa animações anteriores se houver
        if (equalizerAnimation) clearInterval(equalizerAnimation);

        // Cria uma oscilação contínua para simular batida de som real
        equalizerAnimation = setInterval(() => {
            barNodes.forEach((bar, index) => {
                const baseHeight = trackFrequencies[stream][index];
                // Cria uma variação randômica de até 15% para cima ou para baixo
                const variance = (Math.random() * 30) - 15; 
                const finalHeight = Math.min(100, Math.max(10, baseHeight + variance));
                
                bar.style.height = `${finalHeight}%`;
            });
        }, 150); // Velocidade da batida do equalizador
    }

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

            if (trackFrequencies[stream]) {
                startLiveEqualizer(stream);
            }
        });
    });

    // Inicializa o equalizador automático na primeira faixa (Sia) caso as barras existam
    if (barNodes.length > 0) {
        startLiveEqualizer('sia');
    }

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
