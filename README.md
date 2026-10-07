# Tutora - Monitores Universitarios Barranquilla

Plataforma web estática para conectar monitores y estudiantes de Uninorte, Uniatlántico, CUC, Unilibre, UniAutónoma y Unisimón.

(https://webtutora.netlify.app/)

## Base de datos - Diseño NoSQL

Como el sitio es estático en Netlify, no uso SQL. Utilicé un diseño NoSQL tipo documento (compatible con Firebase).

- `tutores.json`: 6 monitores verificados con tarifa en COP, calificación y materias.
- `materias.json`: catálogo de materias frecuentes.
- `sesiones.json`: reservas entre estudiante y tutor.
- `usuarios.json`: roles estudiante/tutor.

Ver carpeta `/database`.

## Tecnologías
HTML, CSS, Netlify, JSON.
