 // Función para inicializar AOS de forma segura
        function initAOS() {
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                    offset: 100,
                    disable: false
                });
                console.log('AOS inicializado correctamente');
            } else {
                console.log('AOS no disponible, usando animaciones alternativas');
                // Aplicar animaciones alternativas si AOS no carga
                document.querySelectorAll('[data-aos]').forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    el.style.transition = 'all 0.8s ease-out';
                });
            }
        }

        // Inicializar cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', function() {
            // Esperar un poco para asegurar que AOS se cargue
            setTimeout(initAOS, 100);
        });

        // También intentar inicializar cuando la ventana cargue completamente
        window.addEventListener('load', function() {
            if (typeof AOS === 'undefined') {
                initAOS();
            }
        });

        // Efecto navbar al hacer scroll
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scroll para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Efecto parallax sutil en el hero
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Animación de counter numbers (si quisieras añadir estadísticas)
        function animateNumbers() {
            const numbers = document.querySelectorAll('.stat-number');
            numbers.forEach(number => {
                const target = parseInt(number.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    number.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        number.textContent = target;
                        clearInterval(timer);
                    }
                }, 20);
            });
        }
        

        // Intersección observer para animaciones adicionales
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observar elementos para animaciones personalizadas
        document.querySelectorAll('.section-text, .section-image').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease-out';
            observer.observe(el);
        });

        // Efecto hover mejorado para botones
        document.querySelectorAll('.cta-button, .section-button').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Preloader y inicialización final
        window.addEventListener('load', function() {
            // Mostrar contenido suavemente
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease-in-out';
                document.body.style.opacity = '1';
            }, 100);

            // Verificar AOS una vez más después de la carga completa
            if (typeof AOS !== 'undefined' && AOS.refresh) {
                AOS.refresh();
            }
        });

        // Debug: Mostrar información de scroll en consola (removible en producción)
        if (window.location.hostname === 'localhost') {
            let ticking = false;
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    requestAnimationFrame(function() {
                        console.log(`Scroll position: ${window.pageYOffset}px`);
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }
          // Funcionalidad acordeón
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = answer.classList.contains('show');

      // cerrar todos
      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('show'));
      faqButtons.forEach(b => b.classList.remove('active'));

      if(!isOpen){
        answer.classList.add('show');
        btn.classList.add('active');
      }
    });
  });