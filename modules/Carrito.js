'use strict';

/**
 * Clase Carrito
 * Gestiona la lógica del carrito de compras
 * No interactúa con el DOM, solo maneja datos y cálculos
 */
export class Carrito {
    /**
     * Constructor de la clase Carrito
     * @param {Array} productos - Array de productos obtenidos de la API
     */
    constructor(productos) {
        this.productos = productos;
        this.cantidades = {};
        
        this.productos.forEach(prod => {
            this.cantidades[prod.SKU] = 0;
        });
    }

    /**
     * Actualiza el número de unidades de un producto
     * @param {string} sku - Código SKU del producto
     * @param {number} unidades - Cantidad de unidades a establecer
     */
    actualizarUnidades(sku, unidades) {
        if (unidades >= 0) {
            this.cantidades[sku] = unidades;
        }
    }

    /**
     * Obtiene información de un producto específico
     * @param {string} sku - Código SKU del producto
     * @returns {Object} Objeto con datos del producto y cantidad seleccionada
     */
    obtenerInformacionProducto(sku) {
        const producto = this.productos.find(p => p.SKU === sku);
        return {
            ...producto,
            quantity: this.cantidades[sku]
        };
    }

    /**
     * Obtiene el estado completo del carrito
     * @returns {Object} Objeto con total, moneda y array de productos
     */
    obtenerCarrito() {
        let total = 0;
        const productosEnCarrito = [];

        this.productos.forEach(prod => {
            const cantidad = this.cantidades[prod.SKU];
            const precio = Number.parseFloat(prod.price);
            
            // Calculamos subtotal por producto y sumamos al total general
            total += precio * cantidad;

            productosEnCarrito.push({
                sku: prod.SKU,
                title: prod.title,
                quantity: cantidad,
                price: precio,
                subtotal: precio * cantidad
            });
        });

        return {
            total: total.toFixed(2), // Redondeamos a 2 decimales
            currency: "€",
            products: productosEnCarrito
        };
    }
}
