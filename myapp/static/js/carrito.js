document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('producto');
  let carrito = localStorage.getItem('carrito');
  carrito = carrito ? JSON.parse(carrito) : [];

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }

  let html = '<ul>';
  carrito.forEach((item, index) => {
    html += `
      <li>
        <strong>${item.name}</strong> - $${item.price}
        <button class="eliminar" data-index="${index}">Eliminar</button>
      </li>
    `;
  });
  html += '</ul>';
  html += '<button id="btn-comprar" type="button">Comprar</button>';

  const total = carrito.reduce((sum, item) => sum + parseFloat(item.price), 0);
  html += `<p><strong>Total:</strong> $${total.toFixed(2)}</p>`;

  contenedor.innerHTML = html;

  // Botones eliminar
  document.querySelectorAll('.eliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      eliminarDelCarrito(index);
    });
  });

  const btnComprar = document.getElementById('btn-comprar');
  const divProductos = document.getElementById('producto');

  btnComprar.addEventListener('click', () => {
    const form = document.getElementById('form');
    form.classList.remove('oculto');
    form.classList.add('form');
    divProductos.classList.add('oculto');
  });

  const form = document.getElementById('form');
  const nombreInput = document.getElementById('name');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nombreInput.value.trim();
    if (!name) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }
    if (carrito.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de comprar.');
      return;
    }

    let mensaje = `Hola, mi nombre es ${name}. Quiero comprar los siguientes productos:\n`;
    let total = 0;
    carrito.forEach(item => {
      mensaje += `- ${item.name}: $${item.price}\n`;
      total += parseFloat(item.price);
    });
    mensaje += `Total: $${total.toFixed(2)}\n`;

    const numero = "527121895039";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    // Mostrar mensaje y redirigir luego
    mensajeComplete(url);
  });

  function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload();
  }

  function mensajeComplete(url) {
    Swal.fire({
      title: '¡Compra realizada!',
      text: 'Gracias por tu compra.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      localStorage.removeItem('carrito');
      window.location.href = url; // Redirige a WhatsApp después del "Aceptar"
    });
  }
});
