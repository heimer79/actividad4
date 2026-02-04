'use strict';

import { Carrito } from './modules/Carrito.js';

// URL de la API (JSONBlob) con los productos
const URL_API = 'https://api.jsonblob.com/019c1efb-d734-7de1-b3a5-2d63ae986d32'; 

let carrito;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const respuesta = await fetch(URL_API);
        const datos = await respuesta.json();

        carrito = new Carrito(datos.products);

        renderizarProductos(datos.products);
        actualizarResumen();

    } catch (error) {
        console.error("Error cargando los productos:", error);
    }
});

/**
 * Renderiza la lista de productos en el DOM
 * @param {Array} productos - Array de productos
 */
function renderizarProductos(productos) {
    const contenedor = document.querySelector('.articulos-carrito');
    
    const encabezado = document.querySelector('.fila-encabezado');
    contenedor.innerHTML = ''; 
    contenedor.appendChild(encabezado);

    productos.forEach(producto => {
        const fila = document.createElement('div');
        fila.classList.add('fila-carrito');
        fila.dataset.sku = producto.SKU;

        fila.innerHTML = `
            <div class="col-producto">
                <div class="info-producto">
                    <h3>${producto.title}</h3>
                    <span class="referencia">Ref: ${producto.SKU}</span>
                </div>
            </div>
            <div class="col-cantidad controles">
                <button class="btn-cantidad btn-menos">-</button>
                <input type="text" value="0" readonly>
                <button class="btn-cantidad btn-mas">+</button>
            </div>
            <div class="col-unidad">${producto.price}€</div>
            <div class="col-total">0.00€</div>
        `;

        contenedor.appendChild(fila);
        
        const botonMenos = fila.querySelector('.btn-menos');
        const botonMas = fila.querySelector('.btn-mas');
        const inputCantidad = fila.querySelector('input');
        const columnaTotal = fila.querySelector('.col-total');

        botonMas.addEventListener('click', () => {
            let cantidad = Number.parseInt(inputCantidad.value);
            cantidad++;
            inputCantidad.value = cantidad;
            carrito.actualizarUnidades(producto.SKU, cantidad);
            columnaTotal.textContent = (producto.price * cantidad).toFixed(2) + '€';
            actualizarResumen();
        });

        botonMenos.addEventListener('click', () => {
            let cantidad = Number.parseInt(inputCantidad.value);
            if (cantidad > 0) {
                cantidad--;
                inputCantidad.value = cantidad;
                carrito.actualizarUnidades(producto.SKU, cantidad);
                columnaTotal.textContent = (producto.price * cantidad).toFixed(2) + '€';
                actualizarResumen();
            }
        });
    });
}

/**
 * Actualiza el resumen del carrito en la parte derecha
 * Muestra solo los productos con cantidad > 0 y el total
 */
function actualizarResumen() {
    const resumen = carrito.obtenerCarrito();
    const detallesResumen = document.querySelector('.detalles-resumen');
    const montoTotal = document.querySelector('.monto-total');
    
    detallesResumen.innerHTML = '';
    
    resumen.products.forEach(producto => {
        if (producto.quantity > 0) {
            const fila = document.createElement('div');
            fila.classList.add('fila-resumen');
            fila.innerHTML = `
                <span>${producto.title}</span>
                <span>${producto.subtotal.toFixed(2)}€</span>
            `;
            detallesResumen.appendChild(fila);
        }
    });
    
    montoTotal.textContent = resumen.total + '€';
}