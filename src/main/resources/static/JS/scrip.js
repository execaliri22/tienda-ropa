// Referencias
const carrito = document.querySelector("#carrito tbody");
const listaProductos = document.querySelector("#lista-1");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

let articulosCarrito = [];

// Cargar eventos
document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    renderCarrito();
});

listaProductos.addEventListener("click", agregarProducto);
carrito.addEventListener("click", eliminarProducto);
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

// Agregar producto
function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const producto = e.target.closest(".product");
        leerDatosProducto(producto);
    }
}

function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector("img").src,
        titulo: producto.querySelector("h3").textContent,
        precio: producto.querySelector(".precio").textContent,
        id: producto.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    };

    const existe = articulosCarrito.find(item => item.id === infoProducto.id);

    if (existe) {
        existe.cantidad++;
    } else {
        articulosCarrito.push(infoProducto);
    }

    renderCarrito();
}

// Mostrar carrito en el HTML
function renderCarrito() {
    limpiarCarrito();

    articulosCarrito.forEach(producto => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><a href="#" class="borrar-producto" data-id="${producto.id}">X</a></td>
        `;
        carrito.appendChild(row);
    });

    // Guardar en localStorage
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
    console.log("Carrito actualizado:", articulosCarrito);
}

// Eliminar un producto
function eliminarProducto(e) {
    if (e.target.classList.contains("borrar-producto")) {
        const productoId = e.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter(item => item.id !== productoId);
        renderCarrito();
    }
}

// Vaciar carrito
function vaciarCarrito(e) {
    e.preventDefault();
    articulosCarrito = [];
    renderCarrito();
    localStorage.removeItem("carrito");
}

// Limpiar HTML carrito
function limpiarCarrito() {
    carrito.innerHTML = "";
}
