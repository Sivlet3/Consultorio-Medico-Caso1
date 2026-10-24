# Consultorio Salud Integral

Este proyecto es una versión modular del archivo `gui.html`. Las once pantallas que estaban empaquetadas dentro de un manifiesto se recuperaron como módulos ES independientes. No requiere dependencias ni una fase de compilación.

## Ejecutar

Desde esta carpeta, inicia un servidor local:

```powershell
python -m http.server 8080
```

Luego abre [http://localhost:8080](http://localhost:8080). También puede abrirse `index.html` directamente en navegadores que permitan módulos locales.

## Estructura

- `index.html`: estructura mínima y punto de entrada.
- `styles/app.css`: estilos compartidos del prototipo y de su contenedor.
- `src/app.js`: navegación, estado de la pantalla activa y vista de todas las pantallas.
- `src/screens/`: un módulo por flujo: acceso, pacientes, citas, recepción, atención, cobros, reportes, usuarios y estados.
- `src/screens/index.js`: registro único de pantallas.

## Mantenimiento

Para modificar una pantalla, edite solo su módulo en `src/screens/`. Para añadir otra, cree el módulo y regístrelo en `src/screens/index.js`.

Los comentarios de la nueva base de código están en español. Se eliminó el cargador y el manifiesto de exportación originales: eran infraestructura generada, no parte de la aplicación. La interfaz usa fuentes de sistema; por tanto, ya no distribuye las fuentes que estaban incrustadas en el HTML original.
