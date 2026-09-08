# Integración de Sistemas — App de estudio (PWA)

App para alumnos con cuatro secciones, navegación por pestañas, instalable y
funcional offline. 100% estática (sin back-end), pensada para GitHub Pages.

## Secciones

- **Apuntes**: resumen en acordeón de los temas clave, con botón para expandir/colapsar todo. Arriba tiene la **pregunta del día**: se elige según la fecha (misma pregunta todo el día en ese dispositivo, cambia al día siguiente), y queda marcada como respondida una vez que la contestás.
- **Cuestionario**: 10 preguntas de opción única, con dos modos:
  - **Modo práctica**: sin límite de tiempo, se puede volver atrás.
  - **Modo examen**: 8 minutos en total, sin volver atrás, con cronómetro visible (se pone rojo en el último minuto). Si se acaba el tiempo, se califica automáticamente lo que se alcanzó a responder.
  
  Al terminar (en cualquier modo), muestra qué preguntas fallaste y cuál era la respuesta correcta. Guarda tu mejor puntaje en el dispositivo.
- **Casos**: situaciones cotidianas de integración para debatir en clase, con preguntas guía y una respuesta sugerida oculta (para comparar después de debatir), más botón de expandir/colapsar todo.
- **Glosario**: 22 términos técnicos, con dos formas de repasar:
  - **Lista**: buscador en tiempo real que resalta la coincidencia.
  - **Tarjetas**: modo flashcard — mostrás el término, tocás la tarjeta para ver la definición (con animación de vuelta), navegás con Anterior/Siguiente, y podés mezclar el orden. La app recuerda cuál de los dos modos usaste la última vez.

La app recuerda la última pestaña que visitaste, así que al volver a abrirla no arranca siempre en "Apuntes".

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

## Editar contenido

Todo el contenido vive en `data.js`, en cuatro arreglos:

- `NOTES` → apuntes (título + texto)
- `GLOSSARY` → términos + definición
- `CASES` → casos de debate (`title`, `scenario`, `questions`, `answer`)
- `QUESTIONS` → preguntas del cuestionario (con `correctIndex`)

Para cambiar la duración del modo examen, editá la constante `EXAM_SECONDS`
en `app.js` (está en segundos; 8 minutos = `8 * 60`).

## Qué falta para la versión completa

El **foro** y el **calendario de entregas/exámenes** quedan pendientes:

- El foro necesita que todos los alumnos vean los mismos mensajes → requiere
  una base de datos compartida (ej. Firebase/Supabase, con plan gratuito).
- El calendario podría ser estático (fechas fijas en `data.js`) o dinámico
  si un docente lo va a actualizar sin tocar código.
