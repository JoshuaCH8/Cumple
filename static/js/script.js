$(document).ready(function () {
    // ========================================
    // 1. SMOOTH SCROLL PARA NAVBAR
    // ========================================
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // ========================================
    // 2. NAVBAR TRANSPARENTE AL SCROLL
    // ========================================
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').css('padding', '0.5rem 0');
        } else {
            $('.navbar').css('padding', '1rem 0');
        }
    });

    // ========================================
    // 3. ANIMACIONES AL SCROLL
    // ========================================
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

    // ========================================
    // 4. TARJETAS EXPANDIBLES
    // ========================================
    document.querySelectorAll('.expandable-card').forEach(card => {
        card.addEventListener('click', function (e) {
            if (card.classList.contains('expanded')) {
                card.classList.remove('expanded');
            } else {
                // Cerrar otras tarjetas
                document.querySelectorAll('.expandable-card.expanded').forEach(other => {
                    other.classList.remove('expanded');
                });
                card.classList.add('expanded');
            }
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.expandable-card.expanded').forEach(card => {
                card.classList.remove('expanded');
            });
        }
    });

    // ========================================
    // 5. VALIDACIÓN DEL FORMULARIO
    // ========================================
    $('form').on('submit', function (e) {
        var nombre = $('#nombre').val();
        if (!nombre) {
            e.preventDefault();
            alert('Por favor, completa los campos requeridos.');
            return false;
        }
    });

    // ========================================
    // 6. CONTADOR REGRESIVO (22 Agosto 2026, 13:00)
    // ========================================
    function actualizarContador() {
        const fechaObjetivo = new Date(2026, 7, 22, 13, 0, 0).getTime();
        const ahora = new Date().getTime();
        const diferencia = fechaObjetivo - ahora;

        if (diferencia < 0) {
            document.getElementById('dias').innerHTML = "00";
            document.getElementById('horas').innerHTML = "00";
            document.getElementById('minutos').innerHTML = "00";
            document.getElementById('segundos').innerHTML = "00";
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById('dias').innerHTML = dias.toString().padStart(2, '0');
        document.getElementById('horas').innerHTML = horas.toString().padStart(2, '0');
        document.getElementById('minutos').innerHTML = minutos.toString().padStart(2, '0');
        document.getElementById('segundos').innerHTML = segundos.toString().padStart(2, '0');
    }

    setInterval(actualizarContador, 1000);
    actualizarContador();

    // ========================================
    // 7. CONTROL DE MÚSICA Y TEMAS
    // ========================================
    const btnBailar = document.getElementById('btnBailar');
    const cancion = document.getElementById('cancionBailar');
    const themeCss = document.getElementById('theme-css');
    let cancionReproduciendo = false;

    if (btnBailar && cancion && themeCss) {
        btnBailar.addEventListener('click', function () {
            if (cancionReproduciendo) {
                // Detener canción
                cancion.pause();
                cancion.currentTime = 0;
                themeCss.href = "/static/css/theme-normal.css";
                cancionReproduciendo = false;
                btnBailar.classList.remove('reproduciendo');
                cambiarEstrellas('normal');
            } else {
                // Reproducir canción
                cancion.play();
                themeCss.href = "/static/css/theme-dance.css";
                cancionReproduciendo = true;
                btnBailar.classList.add('reproduciendo');
                cambiarEstrellas('dance');
            }
        });
    }

    // Evento 'play' de la canción
    cancion.addEventListener('play', function () {
        window.scrollTo({ top: 0, behavior: "smooth" });

        document.querySelectorAll('.expandable-card').forEach(card => {
            if (!card.classList.contains('expanded')) {
                card.classList.add('expanded');
            }
        });
    });

    // Evento 'pause' de la canción (cuando se detiene)
    cancion.addEventListener('pause', function () {
        // Cerrar tarjetas al pausar
        document.querySelectorAll('.expandable-card.expanded').forEach(card => {
            card.classList.remove('expanded');
        });
    });

    // ========================================
    // 8. NIEVE + ESTRELLAS (VERSIÓN FINAL)
    // ========================================
    let elementos = [];
    let temaActual = 'normal';

    function crearNieveYEstrellas() {
        const container = document.getElementById('particles-container');
        if (!container) {
            console.error('❌ Contenedor no encontrado');
            return;
        }

        container.innerHTML = '';
        elementos = [];

        const cantidadNieve = 60;
        const cantidadEstrellas = 30;

        // ---- NIEVE ----
        for (let i = 0; i < cantidadNieve; i++) {
            const copo = document.createElement('div');
            const size = Math.random() * 8 + 4;
            const x = Math.random() * 100;
            const y = Math.random() * 100 - 20;

            copo.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0.5) 100%);
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                opacity: ${Math.random() * 0.5 + 0.3};
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 6px rgba(255,255,255,0.2);
            `;

            container.appendChild(copo);

            elementos.push({
                el: copo,
                tipo: 'nieve',
                x: x,
                y: y,
                vy: Math.random() * 1.2 + 0.3,
                vx: (Math.random() - 0.5) * 0.3,
                rotacion: 0
            });
        }

        // ---- ESTRELLAS ----
        for (let i = 0; i < cantidadEstrellas; i++) {
            const estrella = document.createElement('div');
            const size = Math.random() * 30 + 20;
            const x = Math.random() * 100;
            const y = Math.random() * 100 - 30;

            const imgSrc = temaActual === 'dance'
                ? '/static/images/estrella-dance.png'
                : '/static/images/estrella-normal.png';

            estrella.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${Math.random() * 0.5 + 0.5};
                transform: rotate(${Math.random() * 360}deg);
                transition: all 0.8s ease;
            `;
            estrella.innerHTML = `<img src="${imgSrc}" style="width:100%;height:100%;object-fit:contain;" class="estrella-img">`;
            container.appendChild(estrella);

            elementos.push({
                el: estrella,
                tipo: 'estrella',
                x: x,
                y: y,
                vy: Math.random() * 0.2 + 0.1,
                vx: (Math.random() - 0.5) * 0.2,
                rotacion: Math.random() * 360,
                imgNormal: '/static/images/estrella-normal.png',
                imgDance: '/static/images/estrella-dance.png'
            });
        }

        // ---- ANIMACIÓN ----
        function animarElementos() {
            for (const el of elementos) {
                el.y += el.vy * 0.08;
                el.x += el.vx * 0.08;

                if (el.x > 100) el.x = -5;
                if (el.x < -5) el.x = 100;

                if (el.y > 110) {
                    el.y = -10;
                    el.x = Math.random() * 100;
                    el.vy = Math.random() * 1.2 + 0.3;
                    el.vx = (Math.random() - 0.5) * 0.3;
                }

                if (el.tipo === 'estrella') {
                    el.rotacion += 0.3;
                    el.el.style.top = el.y + '%';
                    el.el.style.left = el.x + '%';
                    el.el.style.transform = `rotate(${el.rotacion}deg)`;
                } else {
                    el.el.style.top = el.y + '%';
                    el.el.style.left = el.x + '%';
                }
            }

            requestAnimationFrame(animarElementos);
        }

        animarElementos();
    }

    // ---- CAMBIAR ESTRELLAS SEGÚN TEMA ----
    function cambiarEstrellas(tema) {
        temaActual = tema;
        let imagen;
        if (tema == 'dance'){
            imagen = '/static/images/estrella-dance.png'
        }
        else {
            imagen = '/static/images/estrella-normal.png';
        }

        document.querySelectorAll('.estrella-img').forEach(img => {
            img.src = imagen;
        });
    }

    // ---- INICIALIZAR NIEVE + ESTRELLAS ----
    crearNieveYEstrellas();
});