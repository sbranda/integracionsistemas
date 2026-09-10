# Integración de Sistemas — App de estudio (PWA)

App para alumnos con cuatro secciones, navegación por pestañas, instalable y
funcional offline. 100% estática (sin back-end), pensada para GitHub Pages.

## Secciones

- **Apuntes**: resumen en acordeón de los temas clave, con un check para marcar cada uno como "leído" (se ve sin necesidad de abrirlo) y un contador de progreso ("3 / 8 leídos"), un link a un artículo o video externo para profundizar en cada tema, y una segunda sección abajo con **6 errores comunes** (malentendidos típicos sobre integración de sistemas, aclarados en pocas líneas). El botón de expandir/colapsar todo y el de exportar a PDF cubren ambas secciones. Arriba tiene la **pregunta del día**: se elige según la fecha (misma pregunta todo el día en ese dispositivo, cambia al día siguiente), y queda marcada como respondida una vez que la contestás.
- **Cuestionario**: 10 preguntas de opción única, con dos modos:
  - **Modo práctica**: sin límite de tiempo, se puede volver atrás.
  - **Modo examen**: 8 minutos en total, sin volver atrás, con cronómetro visible (se pone rojo en el último minuto). Si se acaba el tiempo, se califica automáticamente lo que se alcanzó a responder.
  
  Al terminar (en cualquier modo), muestra qué preguntas fallaste y cuál era la respuesta correcta. Guarda tu mejor puntaje en el dispositivo.
- **Casos**: arriba tiene el **caso de la semana** (se elige solo según la semana actual — cambia cada lunes — y aparece listo para debatir, sin tener que elegir uno). Debajo, la lista completa de situaciones cotidianas de integración para debatir en clase, con preguntas guía y una respuesta sugerida oculta (para comparar después de debatir), más botón de expandir/colapsar todo. Un selector de **Vista alumno / Modo profesor** muestra u oculta tips de facilitación por caso (distintos de la respuesta sugerida: son sobre cómo guiar la charla, no sobre la solución técnica). La preferencia se guarda en el dispositivo.
- **Glosario**: 22 términos técnicos, con dos formas de repasar, y botón para **exportar a PDF** (siempre exporta en modo lista, aunque estés viendo las tarjetas):
  - **Lista**: buscador en tiempo real que resalta la coincidencia.
  - **Tarjetas**: modo flashcard — mostrás el término, tocás la tarjeta para ver la definición (con animación de vuelta), navegás con Anterior/Siguiente, y podés mezclar el orden. La app recuerda cuál de los dos modos usaste la última vez.

La app recuerda la última pestaña que visitaste, así que al volver a abrirla no arranca siempre en "Apuntes". En el encabezado (visible en cualquier pestaña) hay tres botones:

- **"🔍" Buscar**: busca al mismo tiempo en Apuntes, Errores comunes, Casos y Cuestionario. Al tocar un resultado de Apuntes, Errores comunes o Casos, te lleva directo a esa pestaña con el ítem ya abierto. Los resultados de Cuestionario llevan a la pantalla de inicio del cuestionario (no se puede saltar a una pregunta específica en medio de un intento).
- **"🎨" Tema**: Oscuro (por defecto) / Claro / Alto contraste (negro y blanco puros con acentos muy saturados, pensado para máxima legibilidad).
- **"Aa" Tamaño de letra**: Chica / Normal / Grande / Muy grande, escala todo el texto de la app proporcionalmente.

Estas preferencias se guardan en el dispositivo.

## Estructura

```
integracion-app/
├── index.html
├── style.css
├── app.js
├── data.js          # apuntes, preguntas, casos y glosario — editá acá el contenido
├── manifest.json
├── service-worker.js
├── icon-192.png
└── icon-512.png
```

## Publicar en GitHub Pages

1. Subí el contenido de esta carpeta a la raíz de un repo nuevo (o reemplazá
   los archivos existentes usando "Add file → Upload files" en GitHub).
2. **Settings → Pages → Source** → branch `main`, carpeta `/ (root)` → Save.
3. Listo en `https://TU_USUARIO.github.io/TU_REPO/`.

Todas las rutas son relativas, así que funciona sin importar el nombre del repo.

## Datos guardados en el dispositivo

La app usa `localStorage` del navegador (no un servidor) para recordar la
última pestaña que visitaste y tu mejor puntaje en el cuestionario. Esto es
por dispositivo/navegador: cada alumno ve solo lo suyo, sin compartirse con
nadie ni con ningún servidor.

## Herramienta para agregar preguntas sin tocar código

`generador.html` es una página aparte (no aparece en la navegación de los
alumnos) con un formulario para crear preguntas del cuestionario: completás
el texto, las opciones, marcás cuál es la correcta, y genera el bloque de
código listo para copiar y pegar en `data.js`. Incluye validaciones (campos
vacíos, IDs repetidos con caracteres raros, ninguna opción marcada como
correcta) y un botón para copiar al portapapeles.

Para usarla, una vez publicado el sitio, andá a:

```
https://TU_USUARIO.github.io/TU_REPO/generador.html
```

Guardala en tus favoritos — no hace falta compartirla con los alumnos.

## Editar contenido

Todo el contenido vive en `data.js`, en cuatro arreglos:

- `NOTES` → apuntes (`title`, `body`, `resource`: `{ type: 'article'|'video', label, url }`)
- `MISCONCEPTIONS` → errores comunes (`title`, `body`)
- `GLOSSARY` → términos + definición
- `CASES` → casos de debate (`title`, `scenario`, `questions`, `answer`, `tips`)
- `QUESTIONS` → preguntas del cuestionario (con `correctIndex`)

Para cambiar la duración del modo examen, editá la constante `EXAM_SECONDS`
en `app.js` (está en segundos; 8 minutos = `8 * 60`).

## Qué falta para la versión completa

El **foro** y el **calendario de entregas/exámenes** quedan pendientes:

- El foro necesita que todos los alumnos vean los mismos mensajes → requiere
  una base de datos compartida (ej. Firebase/Supabase, con plan gratuito).
- El calendario podría ser estático (fechas fijas en `data.js`) o dinámico
  si un docente lo va a actualizar sin tocar código.
