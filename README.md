# Carrito de Compras - agoodshop

Aplicación web de carrito de compras desarrollada con JavaScript vanilla, utilizando programación orientada a objetos y manipulación del DOM.

## Características

- Carga de productos desde una API externa (JSONBlob)
- Gestión de cantidades de productos
- Cálculo automático de totales
- Interfaz responsive y moderna
- Separación de responsabilidades (lógica de negocio separada del DOM)

## Estructura del Proyecto

```
act4/
├── index.html          # Página principal
├── app.js             # Lógica de la aplicación y manipulación del DOM
├── estilos.css        # Estilos de la interfaz
└── modules/
    └── Carrito.js     # Clase Carrito (lógica de negocio)
```

## Clase Carrito

La clase `Carrito` gestiona toda la lógica del carrito sin interactuar con el DOM:

### Métodos principales:

- `constructor(productos)`: Inicializa el carrito con los productos de la API
- `actualizarUnidades(sku, unidades)`: Actualiza la cantidad de un producto
- `obtenerInformacionProducto(sku)`: Devuelve información de un producto específico
- `obtenerCarrito()`: Devuelve el estado completo del carrito con el total calculado

## Uso

1. Abrir `index.html` en un navegador moderno
2. Los productos se cargan automáticamente desde la API
3. Usar los botones + y - para ajustar cantidades
4. El resumen se actualiza en tiempo real

## API

Los productos se obtienen de JSONBlob:
```
https://api.jsonblob.com/019c1efb-d734-7de1-b3a5-2d63ae986d32
```

### Formato de datos:

```json
{
  "currency": "€",
  "products": [
    {
      "SKU": "0K3QOSOV4V",
      "title": "iFhone 13 Pro",
      "price": "938.99"
    }
  ]
}
```

## Tecnologías

- HTML5
- CSS3
- JavaScript ES6+ (Modules, Classes, Async/Await)
- Fetch API

## Autor
Heimer Martinez
Proyecto desarrollado como actividad académica para el Máster en Desarrollo Full Stack.
