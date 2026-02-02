'use strict';

export class Carrito {
    constructor(productos) {
        this.productos = productos; // Array de productos de la API
        this.cantidades = {}; // Objeto para guardar { SKU: cantidad }
        
        // Inicializamos las cantidades a 0
        this.productos.forEach(prod => {
            this.cantidades[prod.SKU] = 0;
        });
    }

    // Actualiza el número de unidades de un producto específico
    actualizarUnidades(sku, unidades) {
        // Aseguramos que no sea negativo
        if (unidades >= 0) {
            this.cantidades[sku] = unidades;
        }
    }

    // Devuelve info de un producto + su cantidad actual
    obtenerInformacionProducto(sku) {
        const producto = this.productos.find(p => p.SKU === sku);
        return {
            ...producto,
            quantity: this.cantidades[sku]
        };
    }

    // Devuelve el estado global del carrito y el total
    obtenerCarrito() {
        let total = 0;
        const productosEnCarrito = [];

        this.productos.forEach(prod => {
            const cantidad = this.cantidades[prod.SKU];
            const precio = parseFloat(prod.price);
            
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