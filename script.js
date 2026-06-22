/* =========================================
   0. ACTIVAR ANIMACIONES DE SCROLL
   Solo si JS corre se ocultan los [data-reveal]
   (ver regla .js-activo en style.css). Así, si el
   script falla, el contenido nunca queda invisible.
========================================= */
document.documentElement.classList.add('js-activo');

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

// La animación de apertura vive en CSS (grid-template-rows en .acordeon__respuesta);
// acá solo togglear la clase, sin medir scrollHeight.
preguntas.forEach((boton) => {
    boton.addEventListener('click', () => {
        boton.closest('.acordeon__item').classList.toggle('abierto');
    });
});

/* =========================================
   3. REVEAL AL HACER SCROLL
   Cualquier elemento con data-reveal aparece
   suavemente cuando entra en pantalla.
   Usa IntersectionObserver: mucho más eficiente
   que escuchar el evento "scroll" directamente.

   Red de seguridad: cualquier capturador de pantalla, lector
   de PDF o bot que no haga scroll real (algunos crawlers de
   buscadores incluidos) nunca dispara el IntersectionObserver,
   y el contenido se quedaría invisible para siempre. Por eso,
   a los 2.5s se fuerza la revelación de lo que quede oculto:
   para un usuario real ya pasó de sobra, y para esos casos
   evita que secciones completas desaparezcan.
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
        rootMargin: '0px 0px -10% 0px',
    }
);

elementosReveal.forEach((el) => observador.observe(el));

setTimeout(() => {
    elementosReveal.forEach((el) => el.classList.add('en-vista'));
    observador.disconnect();
}, 2500);

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