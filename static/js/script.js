$(document).ready(function () {
    // Smooth scroll para los enlaces del navbar
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Navbar transparente al hacer scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').css('padding', '0.5rem 0');
        } else {
            $('.navbar').css('padding', '1rem 0');
        }
    });

    // Animación al hacer scroll
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateOnScroll() {
        $('.about-card, .info-card, .gallery-item').each(function () {
            if (isElementInViewport(this)) {
                $(this).addClass('fade-in-up');
            }
        });
    }

    $(window).on('scroll', animateOnScroll);
    animateOnScroll();

    // Tarjetas expandibles - Un clic abre, otro clic cierra
    document.querySelectorAll('.expandable-card').forEach(card => {

        // Alternar expansión al hacer clic
        card.addEventListener('click', function (e) {
            // Si ya está expandida, la cierra
            if (card.classList.contains('expanded')) {
                card.classList.remove('expanded');
            }
            // Si está cerrada, la abre y cierra las demás
            else {
                // Abrir 
                card.classList.add('expanded');
            }
        });
    });

    // Cerrar con tecla ESC (opcional, pero útil)
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.expandable-card.expanded').forEach(card => {
                card.classList.remove('expanded');
            });
        }
    });

    // Validación del formulario
    $('form').on('submit', function (e) {
        var nombre = $('#nombre').val();

        if (!nombre) {
            e.preventDefault();
            alert('Por favor, completa los campos requeridos.');
            return false;
        }
    });

    // Contador regresivo para la Misa (22 de Agosto 2026, 13:00)
    function actualizarContador() {
        // Fecha objetivo: 22 de Agosto de 2026 a las 13:00 (1:00 PM)
        const fechaObjetivo = new Date(2026, 7, 22, 13, 0, 0).getTime();

        // Fecha actual
        const ahora = new Date().getTime();

        // Diferencia en milisegundos
        const diferencia = fechaObjetivo - ahora;

        // Si ya pasó la fecha
        if (diferencia < 0) {
            document.getElementById('dias').innerHTML = "00";
            document.getElementById('horas').innerHTML = "00";
            document.getElementById('minutos').innerHTML = "00";
            document.getElementById('segundos').innerHTML = "00";
            return;
        }

        // Cálculos
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        // Actualizar HTML (con dos dígitos siempre)
        document.getElementById('dias').innerHTML = dias.toString().padStart(2, '0');
        document.getElementById('horas').innerHTML = horas.toString().padStart(2, '0');
        document.getElementById('minutos').innerHTML = minutos.toString().padStart(2, '0');
        document.getElementById('segundos').innerHTML = segundos.toString().padStart(2, '0');
    }

    // Ejecutar cada segundo
    setInterval(actualizarContador, 1000);

    // Ejecutar inmediatamente al cargar
    actualizarContador();

    // Control de la canción "Vamos a bailar"
    const btnBailar = document.getElementById('btnBailar');
    const cancion = document.getElementById('cancionBailar');
    const themeCss = document.getElementById('theme-css');
    let cancionReproduciendo = false;

    if (btnBailar && cancion && themeCss) {
        btnBailar.addEventListener('click', function () {
            if (cancionReproduciendo) {
                // Detener canción
                cancion.pause();
                cancion.currentTime = 0;  // Reinicia al inicio
                themeCss.href = "/static/css/theme-normal.css"; 
                cancionReproduciendo = false;
                btnBailar.classList.remove('reproduciendo');  // ← Quita efecto
            } else {
                // Reproducir canción
                cancion.play();
                themeCss.href = "/static/css/theme-dance.css"; 
                cancionReproduciendo = true;
                btnBailar.classList.add('reproduciendo');
            }
        });
    }

    // Efecto de partículas (opcional)
    function createParticles() {
        if ($('.hero').length) {
            for (var i = 0; i < 50; i++) {
                var particle = $('<div class="particle"></div>');
                particle.css({
                    position: 'absolute',
                    width: Math.random() * 5 + 'px',
                    height: Math.random() * 5 + 'px',
                    background: 'rgba(255,255,255,' + Math.random() + ')',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                });
                $('.hero').append(particle);
            }
        }
    }

    // Agregar animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0px);
                opacity: 0;
            }
            50% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    createParticles();
});