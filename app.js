'use strict';

import { Carrito } from './modules/Carrito';

// PEGA AQUÍ TU URL DE JSONBLOB
const API_URL = 'https://api.jsonblob.com/019c1efb-d734-7de1-b3a5-2d63ae986d32'; 

let carrito; // Instancia de la clase

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Llamada a la API
        const response = await fetch(API_URL);
        const data = await response.json();

        // 2. Instanciar la clase Carrito
        carrito = new Carrito(data.products);

        // 3. Renderizar la lista de productos
        renderizarProductos(data.products);
        
        // 4. Renderizar el resumen inicial (todo a 0)
        actualizarResumen();

    } catch (error) {
        console.error("Error cargando los productos:", error);
    }
});

function renderizarProductos(productos) {
    const contenedor = document.querySelector('.cart-items');
    
    // Mantenemos el header de la tabla, borramos los productos hardcodeados
    const header = document.querySelector('.header-row');
    contenedor.innerHTML = ''; 
    contenedor.appendChild(header);

    productos.forEach(prod => {
        // Creamos el HTML para cada fila
        const row = document.createElement('div');
        row.classList.add('cart-row');
        row.dataset.sku = prod.SKU; // Guardamos el SKU en el DOM para usarlo luego

        row.innerHTML = `
            <div class="col-product">
                <div class="product-info">
                    <h3>${prod.title}</h3>
                    <span class="ref">Ref: ${prod.SKU}</span>
                </div>
            </div>
            <div class="col-qty control">
                <button class="btn-qty btn-minus">-</button>
                <input type="text" value="0" readonly>
                <button class="btn-qty btn-plus">+</button>
            </div>
            <div class="col-unit">${prod.price}€</div>
            <div class="col-total">0.00€</div>
        `;

        contenedor.appendChild(row);
    });
}

function actualizarResumen() {
    // Esta función la rellenaremos en el siguiente paso
    console.log("Resumen actualizado (pendiente de implementación visual)");
}