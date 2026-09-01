# Integración de Sistemas — App de estudio (PWA)

App para alumnos con tres secciones, navegación por pestañas, instalable y
funcional offline. 100% estática (sin back-end), pensada para GitHub Pages.

## Secciones (MVP)

- **Apuntes**: resumen en acordeón de los temas clave, con botón para expandir/colapsar todo.
- **Cuestionario**: 10 preguntas de opción única. Al terminar, muestra qué preguntas fallaste y cuál era la respuesta correcta. Guarda tu mejor puntaje en el dispositivo.
- **Casos**: situaciones de integración reales para debatir en clase, con preguntas guía y una respuesta sugerida oculta (para comparar después de debatir), más botón de expandir/colapsar todo.
- **Glosario**: términos técnicos con buscador en tiempo real que resalta la coincidencia.

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

1. Subí el contenido de esta carpeta a la raíz de un repo nuevo:

   ```bash
   cd integracion-app
   git init && git add . && git commit -m "App de estudio - Integración de Sistemas"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```

2. **Settings → Pages → Source** → branch `main`, carpeta `/ (root)` → Save.
3. Listo en `https://TU_USUARIO.github.io/TU_REPO/`.

Todas las rutas son relativas, así que funciona sin importar el nombre del
repo (igual que el cuestionario que armamos antes).

## Editar contenido

Todo el contenido vive en `data.js`, en tres arreglos:

- `NOTES` → apuntes (título + texto)
- `GLOSSARY` → términos + definición
- `QUESTIONS` → preguntas del cuestionario (con `correctIndex`)
- `CASES` → casos de debate (`title`, `scenario`, `questions`, `answer`)

No hace falta tocar `app.js` ni `index.html` para agregar o editar contenido.

## Datos guardados en el dispositivo

La app usa `localStorage` del navegador (no un servidor) para recordar la
última pestaña que visitaste y tu mejor puntaje en el cuestionario. Esto es
por dispositivo/navegador: cada alumno ve solo lo suyo, sin compartirse con
nadie ni con ningún servidor.

## Qué falta para la versión completa

Dijimos que el **foro** y el **calendario de entregas/exámenes** quedan para
una siguiente etapa, porque:

- El foro necesita que todos los alumnos vean los mismos mensajes → requiere
  una base de datos compartida (ej. Firebase/Supabase, con plan gratuito).
- El calendario podría ser estático (fechas fijas cargadas en `data.js`, sin
  backend) o dinámico si querés que un docente lo actualice sin tocar código
  — en ese caso también conviene un backend simple.

Avisame cuándo quieras sumar alguna de las dos y vemos la arquitectura.
