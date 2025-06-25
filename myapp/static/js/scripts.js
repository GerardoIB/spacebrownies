document.addEventListener('DOMContentLoaded', () => {
    // Mostrar/ocultar menú de navegación
    const icono = document.getElementById('nav-var');
    const navbar = document.getElementById('nav');

    icono.addEventListener('mouseenter', () => {
        navbar.classList.remove('oculto');
        navbar.classList.add('navigate');
    });

    navbar.addEventListener('mouseleave', () => {
        navbar.classList.remove('navigate');
        navbar.classList.add('oculto');
    });

    // Cargar carrito y actualizar contador al iniciar
    actualizarContadorCarrito();

    // Agregar eventos a todos los botones "Agregar al carrito"
    const botones = document.querySelectorAll('.btn-carrito');
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const name = boton.dataset.name;
            const price = parseFloat(boton.dataset.price);
            agregarAlCarrito({ name, price });
            actualizarContadorCarrito(); // ✅ ACTUALIZA después de agregar
        });
    });

    // Funciones del carrito
    function obtenerCarrito() {
        let carrito = localStorage.getItem('carrito');
        return carrito ? JSON.parse(carrito) : [];
    }

    function guardarCarrito(carrito) {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function agregarAlCarrito(producto) {
        let carrito = obtenerCarrito();
        carrito.push(producto);
        guardarCarrito(carrito);
    }

    function actualizarContadorCarrito() {
        const carrito = obtenerCarrito();
        const contador = document.getElementById('contador');
        contador.textContent = carrito.length;
    }
});
