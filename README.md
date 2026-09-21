# Integración de Sistemas — App de estudio

App web (PWA) para estudiar la materia Integración de Sistemas. Funciona 100% del lado del cliente
(sin backend), pensada para publicarse en GitHub Pages.

## Cómo subir los cambios a GitHub

1. Entrá al repositorio `sbranda/integracionsistemas`.
2. Para cada archivo modificado: abrilo, tocá el lápiz (editar) o usá "Add file → Upload files" y
   subí el archivo con el mismo nombre para que reemplace al anterior.
3. Confirmá los cambios (commit). GitHub Pages tarda uno o dos minutos en actualizarse.
4. Si algo no se ve actualizado, probá en una ventana de incógnito (para descartar caché del navegador).

## Archivos del proyecto (todos en la raíz, sin carpetas)

- `index.html` — estructura de la app y todas las plantillas de contenido.
- `style.css` — todos los estilos (temas, splash screen, tarjetas, etc.).
- `app.js` — toda la lógica de la app.
- `data.js` — el contenido (apuntes, preguntas, casos, glosario). **Es el único archivo que
  normalmente hay que tocar para agregar contenido nuevo.**
- `manifest.json` — configuración de la PWA (nombre, ícono, colores).
- `service-worker.js` — permite que la app funcione instalada y con algo de uso sin conexión.
- `icon-192.png` / `icon-512.png` — íconos de la app.
- `generador.html` — herramienta para el profesor: arma el bloque de texto de una pregunta nueva
  para pegar en `data.js`, sin tener que escribir código a mano.

## Pantalla de bienvenida (splash screen)

Al abrir la app se muestra una pantalla de bienvenida durante **5 segundos**, con el ícono, el
nombre de la app y una barra de progreso que se llena en ese mismo tiempo. Después desaparece sola
con una transición suave y se ve el contenido normal. Está implementada en:

- HTML: el `<div id="splash">` al principio de `index.html`.
- CSS: la sección `/* ===== SPLASH SCREEN ===== */` en `style.css`.
- JS: la función `initSplash()` en `app.js` (se llama una sola vez, al iniciar la app).

Para cambiar la duración, hay que modificar la constante `DURATION` (en milisegundos) dentro de
`initSplash()` en `app.js`.

## Pestañas de la app

### Apuntes
- Lista de apuntes en formato acordeón (tocás el título y se despliega el contenido).
- Cada apunte se puede marcar como "leído" con un checkbox; esto se guarda en el celular/compu de
  cada alumno (no se comparte entre dispositivos).
- Tarjeta de progreso con: apuntes leídos, mejor puntaje del cuestionario y casos vistos.
- Link para "Reiniciar progreso" (pide confirmación antes de borrar).
- Botón para exportar los apuntes a PDF (usa la función de impresión del navegador).
- "Pregunta del día": una pregunta al azar (pero la misma para todos ese día) que cambia todos los
  días. Si no la respondiste, aparece un punto rojo en el ícono de la pestaña Apuntes.
- Sección "Errores comunes": malentendidos típicos sobre integración de sistemas.

### Cuestionario
- Modo práctica: sin límite de tiempo.
- Modo examen: 8 minutos en total, con cronómetro visible.
- Las opciones de cada pregunta aparecen en orden distinto cada vez que se juega.
- Al terminar se muestra el puntaje, se puede compartir el resultado (o copiarlo al portapapeles) y
  volver a intentar. Si el puntaje es perfecto, aparece una animación de confeti.
- Se guarda el mejor puntaje logrado (por separado para práctica y examen).

### Casos
- Casos de debate en lenguaje simple, pensados para resolver en clase.
- Cada caso tiene una respuesta sugerida (oculta hasta que se toca "Ver respuesta sugerida").
- "Modo profesor": muestra tips extra sobre cómo guiar el debate de cada caso (además de la
  respuesta). Se activa con el botón "Modo profesor" arriba de la lista.
- "Caso de la semana": se destaca un caso distinto cada semana automáticamente.

### Glosario
- Vista de lista con buscador de términos.
- Vista de tarjetas (flashcards) para repasar de a un término por vez, con mezcla al azar.
- Los acrónimos están en inglés y español (ej: "API (Application Programming Interface / Interfaz
  de Programación de Aplicaciones)").
- Botón para exportar el glosario a PDF.

## Otras funciones

- **Buscador global** (ícono de lupa arriba): busca en apuntes, errores comunes, casos, preguntas y
  glosario al mismo tiempo, resaltando el término buscado.
- **Temas**: oscuro, claro y alto contraste (ícono 🎨). Detecta automáticamente la preferencia del
  sistema la primera vez que se abre.
- **Tamaño de letra**: chico, normal, grande, muy grande (ícono "Aa").
- **Instalación como app (PWA)**: aparece un banner para instalar en Android/Chrome/Edge. En
  iPhone/Safari (que no tiene ese botón nativo) se muestran instrucciones manuales ("Compartir →
  Agregar a inicio").
- **Botón "volver arriba"**: aparece al bajar bastante en cualquier pestaña con contenido largo.

## Cómo agregar contenido nuevo

- **Preguntas del cuestionario**: usar `generador.html` (recomendado) o agregar directamente un
  objeto al arreglo `QUESTIONS` en `data.js`.
- **Apuntes, casos, términos del glosario o errores comunes**: agregar un objeto nuevo al arreglo
  correspondiente en `data.js`, siguiendo el mismo formato que los existentes.

## Notas técnicas

- Todo el progreso (lecturas, puntajes, tema elegido, etc.) se guarda con `localStorage`, en el
  navegador de cada alumno. No hay servidor ni base de datos compartida.
- El `service-worker.js` usa una estrategia "red primero": siempre intenta traer la versión más
  nueva de internet, y solo usa la copia guardada si no hay conexión. Esto evita el problema de
  quedar viendo contenido viejo por caché.
- Los íconos actuales (`icon-192.png`, `icon-512.png`) son un diseño genérico de engranaje/red. Si
  todavía tenés guardada la imagen personalizada que habías subido antes, se puede volver a subir
  con el mismo nombre de archivo para reemplazar estos íconos (no hace falta tocar ningún otro
  archivo).
