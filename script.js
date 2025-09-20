// Дождемся загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Создаем дополнительные анимированные ромашки (оптимизированно для мобильных)
    function createFloatingFlowers() {
        const flowerBg = document.querySelector('.flower-bg');
        const flowers = ['🌼', '🌻', '🌸', '🌺'];
        
        // Уменьшаем количество цветков на мобильных устройствах
        const isMobile = window.innerWidth <= 768;
        const interval = isMobile ? 5000 : 3000;
        const maxFlowers = isMobile ? 3 : 6;
        let currentFlowers = 0;
        
        const flowerInterval = setInterval(() => {
            if (currentFlowers >= maxFlowers) return;
            
            const flower = document.createElement('div');
            flower.className = 'floating-flower';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = Math.random() * 100 + 'vw';
            flower.style.animationDuration = (Math.random() * 3 + 2) + 's';
            flower.style.opacity = Math.random() * 0.7 + 0.3;
            flower.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            
            flowerBg.appendChild(flower);
            currentFlowers++;
            
            // Удаляем цветок после анимации
            setTimeout(() => {
                if (flower.parentNode) {
                    flower.parentNode.removeChild(flower);
                    currentFlowers--;
                }
            }, 5000);
        }, interval);
        
        // Останавливаем анимацию при переходе на другую вкладку
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(flowerInterval);
            }
        });
    }
    
    // Добавляем стили для падающих ромашек
    const style = document.createElement('style');
    style.textContent = `
        .floating-flower {
            position: absolute;
            top: -50px;
            pointer-events: none;
            z-index: -1;
            animation: fall linear forwards;
        }
        
        @keyframes fall {
            from {
                transform: translateY(-50px) rotate(0deg);
            }
            to {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    createFloatingFlowers();
    
    // Эффект параллакса для фоновых ромашек
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const flowers = document.querySelectorAll('.flower');
        
        flowers.forEach((flower, index) => {
            const speed = 0.5 + (index * 0.1);
            flower.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами семьи
    document.querySelectorAll('.family-member').forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(50px)';
        member.style.transition = 'all 0.6s ease-out';
        observer.observe(member);
    });
    
    // Эффект мерцания для подарка
    const giftBox = document.querySelector('.gift-box');
    if (giftBox) {
        setInterval(() => {
            giftBox.style.textShadow = `
                0 0 10px #f4d03f,
                0 0 20px #f4d03f,
                0 0 30px #f4d03f
            `;
            setTimeout(() => {
                giftBox.style.textShadow = 'none';
            }, 500);
        }, 2000);
    }
    
    // Интерактивность для фотографий с поддержкой touch
    document.querySelectorAll('.photo-item img').forEach(img => {
        const showEnlargedImage = function() {
            // Создаем эффект увеличения
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: pointer;
                -webkit-backdrop-filter: blur(5px);
                backdrop-filter: blur(5px);
            `;
            
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 15px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                animation: zoomIn 0.3s ease-out;
                touch-action: pinch-zoom;
            `;
            
            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);
            
            // Закрытие по клику или touch
            overlay.addEventListener('click', () => {
                overlay.style.animation = 'fadeOut 0.3s ease-out forwards';
                setTimeout(() => {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                    }
                }, 300);
            });
            
            overlay.addEventListener('touchend', (e) => {
                e.preventDefault();
                overlay.click();
            });
        };
        
        img.addEventListener('click', showEnlargedImage);
        img.addEventListener('touchend', showEnlargedImage);
    });
    
    // Добавляем анимацию увеличения
    const zoomStyle = document.createElement('style');
    zoomStyle.textContent = `
        @keyframes zoomIn {
            from {
                transform: scale(0);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(zoomStyle);
    
    // Добавляем конфетти при клике на заголовок
    document.querySelector('.main-title').addEventListener('click', function() {
        createConfetti();
    });
    
    function createConfetti() {
        const colors = ['#4a7c59', '#f4d03f', '#7ba05b', '#fff'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: 50%;
                left: 50%;
                pointer-events: none;
                z-index: 1000;
                border-radius: 50%;
                animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }
    }
    
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            from {
                transform: translate(-50%, -50%) rotate(0deg);
                opacity: 1;
            }
            to {
                transform: translate(${Math.random() * 200 - 100}px, 100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);
    
    // Плавная прокрутка для лучшего UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    console.log('🌼 Сайт для Бабы Иры загружен! С Днем Рождения! 🌼');
});