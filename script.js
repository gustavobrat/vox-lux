```javascript
document.addEventListener('DOMContentLoaded', () => {

    // 1. EFEITO HOLOGRÁFICO DINÂMICO BASEADO NA ROLAGEM (SCROLL)
    const hologramOverlay = document.getElementById('hologramOverlay');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        // Calcula uma variação de opacidade e rotação cromática leve baseada na rolagem
        const opacityModifier = 0.3 + (Math.sin(scrollPosition * 0.005) * 0.2);
        const hueModifier = (scrollPosition * 0.1) % 360;
        
        if (hologramOverlay) {
            hologramOverlay.style.opacity = opacityModifier;
            hologramOverlay.style.background = `linear-gradient(${135 + (scrollPosition * 0.05)}deg, rgba(255,255,255,0.03) 0%, rgba(0,242,254,0.04) 50%, rgba(253,38,121,0.04) 100%)`;
            hologramOverlay.style.backdropFilter = `hue-rotate(${hueModifier}deg)`;
        }
    });

    // 2. CONTROLE DO MENU DE NAVEGAÇÃO MOBILE
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Animação visual básica do botão hambúrguer
            menuToggle.classList.toggle('active');
        });
    }

    // Fecha o menu de navegação ao clicar em qualquer item (melhora usabilidade mobile)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('open');
        });
    });

    // 3. CONSOLE DE ÁUDIO INTERATIVO (ALTERAÇÃO DE FREQUÊNCIAS DO EQUALIZADOR)
    const consoleButtons = document.querySelectorAll('.console-btn');
    const consoleStatus = document.getElementById('consoleStatus');
    const eqBars = document.querySelectorAll('.eq-bar');

    // Modelos de frequências gráficas para cada canal
    const trackFrequencies = {
        sia: ['30%', '85%', '50%', '95%', '40%', '75%'],
        walker: ['90%', '25%', '80%', '15%', '85%', '30%']
    };

    consoleButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Remove classe ativa de todos e adiciona no clicado
            consoleButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            const channel = event.target.getAttribute('data-channel');

            // Atualiza o texto descritivo do status do player
            if (channel === 'sia') {
                consoleStatus.textContent = 'Canal Ativo: Emissão Pop Sintética Otimizada';
            } else {
                consoleStatus.textContent = 'Canal Ativo: Ressonância e Tensão Orquestral Dissonante';
            }

            // Manipula a propriedade CSS de altura das barras do equalizador baseado no canal
            eqBars.forEach((bar, index) => {
                bar.style.height = trackFrequencies[channel][index];
            });
        });
    });

    // 4. MODO SOBRECARGA ESTÉTICA (INVERSÃO VISUAL)
    const glitchTrigger = document.getElementById('glitchTrigger');
    if (glitchTrigger) {
        glitchTrigger.addEventListener('click', () => {
            document.body.classList.toggle('glitch-overload-mode');
            
            // Altera o rótulo do botão comercial de acordo com o estado da tela
            if (document.body.classList.contains('glitch-overload-mode')) {
                glitchTrigger.textContent = 'Restaurar Sistema';
            } else {
                glitchTrigger.textContent = 'Sobrecarga Estética';
            }
        });
    }
});
