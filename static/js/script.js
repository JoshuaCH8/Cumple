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

    // Cerrar con tecla ESC 
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

    cancion.addEventListener('play', function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        // Expandir ambas tarjetas
        document.querySelectorAll('.expandable-card').forEach(card => {
            if (!card.classList.contains('expanded')) {
                card.classList.add('expanded');
            }
        });
    });

    function iniciarNieve() {
        const container = document.getElementById('particles-container');
        if (!container) {
            console.error('❌ Contenedor de partículas no encontrado');
            return;
        }

        console.log('❄️ Iniciando nieve en toda la página...');
        container.innerHTML = '';

        const cantidad = 70;
        const particulas = [];

        for (let i = 0; i < cantidad; i++) {
            const p = document.createElement('div');
            const size = Math.random() * 10 + 4;
            const x = Math.random() * 100;
            const y = Math.random() * 100 - 30;
            const velocidadY = Math.random() * 1.2 + 0.3;
            const velocidadX = (Math.random() - 0.5) * 0.4;
            const opacidad = Math.random() * 0.4 + 0.3;

            p.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%, #FFFFFF, rgba(200,220,255,0.6));
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: ${opacidad};
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 6px rgba(255,255,255,0.2);
        `;

            container.appendChild(p);

            particulas.push({
                el: p,
                x: x,
                y: y,
                vy: velocidadY,
                vx: velocidadX,
                size: size
            });
        }

        console.log('✅ ' + particulas.length + ' copos de nieve creados');

        // Animación
        function animar() {
            for (const p of particulas) {
                p.y += p.vy * 0.08;
                p.x += p.vx * 0.08;

                // Rebote lateral
                if (p.x > 100) p.x = -5;
                if (p.x < -5) p.x = 100;

                // Reiniciar al salir abajo
                if (p.y > 110) {
                    p.y = -10;
                    p.x = Math.random() * 100;
                    p.vy = Math.random() * 1.2 + 0.3;
                    p.vx = (Math.random() - 0.5) * 0.4;
                }

                p.el.style.top = p.y + '%';
                p.el.style.left = p.x + '%';

                // Girar ligeramente mientras caen
                const rotacion = p.y * 0.3;
                p.el.style.transform = `rotate(${rotacion}deg)`;
            }

            requestAnimationFrame(animar);
        }

        animar();
    }

    // Ejecutar al cargar la página (con varios métodos de respaldo)
    window.addEventListener('load', iniciarNieve);
    document.addEventListener('DOMContentLoaded', iniciarNieve);
    setTimeout(iniciarNieve, 500);
});