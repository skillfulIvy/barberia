/* =========================================
   1. MENÚ MÓVIL
   Abre/cierra el menú hamburguesa y mantiene
   sincronizado el atributo aria-expanded
   (importante para accesibilidad).
========================================= */
const navToggle = document.getElementById('navToggle');
const navMovil = document.getElementById('navMovil');

navToggle.addEventListener('click', () => {
    const estaAbierto = navMovil.classList.toggle('abierto');
    navToggle.setAttribute('aria-expanded', estaAbierto);
});

// Cierra el menú al hacer clic en cualquier link (mejora la UX en móvil)
navMovil.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navMovil.classList.remove('abierto');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

/* =========================================
   2. ACORDEÓN DE PREGUNTAS FRECUENTES
   Cada pregunta abre su propia respuesta.
   Se permite tener varias abiertas a la vez
   (es el comportamiento más simple y predecible).
========================================= */
const preguntas = document.querySelectorAll('.acordeon__pregunta');

preguntas.forEach((boton) => {
    boton.addEventListener('click', () => {
        const item = boton.closest('.acordeon__item');
        const respuesta = item.querySelector('.acordeon__respuesta');
        const estaAbierto = item.classList.contains('abierto');

        if (estaAbierto) {
            item.classList.remove('abierto');
            respuesta.style.maxHeight = null;
        } else {
            item.classList.add('abierto');
            // scrollHeight = la altura real del contenido,
            // así la transición de max-height sabe a dónde llegar
            respuesta.style.maxHeight = respuesta.scrollHeight + 'px';
        }
    });
});

/* =========================================
   3. REVEAL AL HACER SCROLL
   Cualquier elemento con data-reveal aparece
   suavemente cuando entra en pantalla.
   Usa IntersectionObserver: mucho más eficiente
   que escuchar el evento "scroll" directamente.
========================================= */
const elementosReveal = document.querySelectorAll('[data-reveal]');

const observador = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('en-vista');
                // Una vez visible, dejamos de observarlo (no se repite la animación)
                observador.unobserve(entrada.target);
            }
        });
    },
    {
        threshold: 0.15, // se activa cuando el 15% del elemento es visible
    }
);

elementosReveal.forEach((el) => observador.observe(el));

/* =========================================
   4. HEADER: sombra/fondo más sólido al hacer scroll
   Detalle pequeño que da sensación de pulido.
========================================= */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.style.borderBottomColor = 'var(--linea)';
    }
});