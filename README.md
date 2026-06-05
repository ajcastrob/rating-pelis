# Rating Pelis

Aplicación web que permite buscar series de televisión y visualizar de un vistazo la valoración de cada episodio por temporada, mediante un mapa de calor ("heatmap") generado con Web Components.

Pensada como ejercicio práctico dentro del curso de **asincronía** de [ManzDev](https://manz.dev/), la app consume la API pública de [TVMaze](https://www.tvmaze.com/api) y representa el resultado haciendo uso intensivo de las APIs modernas del navegador: Custom Elements, Shadow DOM y Constructable Stylesheets.

## Tabla de contenidos

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Requisitos previos](#requisitos-previos)
- [Puesta en marcha](#puesta-en-marcha)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Arquitectura y flujo de datos](#arquitectura-y-flujo-de-datos)
- [Componentes](#componentes)
- [Servicios](#servicios)
- [Estilos](#estilos)
- [Calidad de código (lint)](#calidad-de-código-lint)
- [Despliegue en GitHub Pages](#despliegue-en-github-pages)
- [Variables de entorno](#variables-de-entorno)
- [Solución de problemas](#solución-de-problemas)
- [Créditos y licencia](#créditos-y-licencia)

## Características

- 🔎 **Búsqueda de series** por nombre contra la API de TVMaze.
- 🧱 **Web Components** nativos (sin frameworks): `<header-tv-show>` y `<season-tv>`.
- 🎨 **Shadow DOM** con `adoptedStyleSheets` para encapsular estilos.
- 🌡️ **Mapa de calor** por episodio: el color de cada celda se calcula a partir de la nota media.
- ⚡ **Asincronía moderna** con `async/await` y `fetch`.
- 🚦 **Manejo de errores** centralizado: si la búsqueda no devuelve resultados, se muestra una advertencia visual.
- 📦 **Build optimizado** con Vite 8 + Lightning CSS.
- 🚀 **Despliegue automático** en GitHub Pages mediante `gh-pages`.

## Stack tecnológico

| Área               | Tecnología                                             |
| ------------------ | ------------------------------------------------------ |
| Lenguaje           | JavaScript (ES2024)                                    |
| Build / dev server | [Vite 8](https://vitejs.dev/)                          |
| Empaquetado CSS    | [Lightning CSS](https://lightningcss.dev/)             |
| CSS Modules        | `vite-plugin-standard-css-modules`                     |
| Componentes        | Web Components nativos (Custom Elements + Shadow DOM)  |
| API externa        | [TVMaze API](https://www.tvmaze.com/api)               |
| Linter             | [oxlint](https://oxc.rs/) + `oxlint-plugin-complexity` |
| Gestor de paquetes | [pnpm](https://pnpm.io/) 11.x                          |
| Despliegue         | GitHub Pages (`gh-pages`)                              |

## Requisitos previos

- **Node.js 20+** (Vite 8 lo requiere).
- **pnpm 11+** (recomendado, definido en `devEngines` del `package.json`).
  Si no lo tienes: `npm install -g pnpm`.
- Conexión a internet (la app consume la API de TVMaze en tiempo de ejecución).
- Una cuenta de GitHub con acceso al repositorio (solo para desplegar).

> El proyecto **no requiere backend ni base de datos**: todo se calcula en el cliente.

## Puesta en marcha

```bash
# 1. Clona el repositorio
git clone https://github.com/ajcastrob/rating-pelis.git
cd rating-pelis

# 2. Instala las dependencias
pnpm install

# 3. Arranca el servidor de desarrollo (puerto 1234)
pnpm dev
```

Abre `http://localhost:1234/` en el navegador y empieza a escribir nombres de series (por ejemplo: `lost`, `friends`, `breaking bad`, `the office`).

### Comandos disponibles

| Comando        | Descripción                                                            |
| -------------- | ---------------------------------------------------------------------- |
| `pnpm dev`     | Inicia el servidor de desarrollo de Vite en `http://localhost:1234`.   |
| `pnpm build`   | Genera la build de producción en `dist/`.                              |
| `pnpm preview` | Sirve la build de producción localmente para verificar el resultado.   |
| `pnpm deploy`  | Publica el contenido de `dist/` en la rama `gh-pages` del repositorio. |
| `pnpm lint`    | Ejecuta `oxlint` sobre todo el código del proyecto.                    |

## Estructura del proyecto

```text
rating-pelis/
├── public/
│   └── Icon.svg                # Icono de búsqueda (usado por el botón del form)
├── src/
│   ├── index.html              # Entrada HTML con el formulario y los custom elements
│   ├── main.js                 # Registro de custom elements + bootstrap del controlador
│   ├── styles.css              # Estilos globales y tokens (custom properties, @property)
│   ├── assets/                 # Recursos estáticos servidos por Vite
│   ├── components/
│   │   ├── HeadtTvShow/        # <header-tv-show>: cabecera con póster y nombre
│   │   │   ├── HtmlHeader.js
│   │   │   └── HeaderTvShows.css
│   │   └── SeasonTvShow/       # <season-tv>: grid de episodios con heatmap
│   │       ├── HtmlTvShow.js
│   │       └── SeasonTvShows.css
│   ├── services/
│   │   └── api.js              # Capa de acceso a la API de TVMaze
│   └── utils/
│       └── EventControl.js     # Controlador del formulario (orquesta el flujo)
├── dist/                       # Salida de `pnpm build` (publicada en gh-pages)
├── vite.config.js              # Configuración de Vite
├── pnpm-workspace.yaml         # Política de versiones en pnpm
├── pnpm-lock.yaml
├── .oxlintrc.json              # Reglas del linter
├── .gitignore
└── README.md
```

## Arquitectura y flujo de datos

La aplicación sigue un patrón **clásico de tres capas** totalmente en cliente:

1. **Vista** → HTML declarativo + Web Components.
2. **Controlador** → `EventControl` escucha el `submit` del formulario.
3. **Servicio** → `api.js` se encarga de la comunicación con TVMaze.

```text
┌────────────────────┐    submit     ┌──────────────────────┐
│ <form class="form">│ ────────────▶ │  EvenControl (utils) │
└────────────────────┘               └──────────┬───────────┘
                                                │
                                                ▼
                                ┌───────────────────────────────┐
                                │ services/api.js               │
                                │  • getShowData(name)          │
                                │  • getEpisodeList(id)         │
                                └───────────────┬───────────────┘
                                                │ fetch
                                                ▼
                                    ┌─────────────────────┐
                                    │   TVMaze API        │
                                    └─────────┬───────────┘
                                              │
                                              ▼
                ┌──────────────────────────────────────────────┐
                │ Actualización de los Web Components:        │
                │  • <header-tv-show>.update(data)            │
                │  • <season-tv>.update(episodesBySeason)     │
                └──────────────────────────────────────────────┘
```

### Ciclo de vida de una búsqueda

1. El usuario escribe un nombre y envía el formulario.
2. `EvenControl.handleEvent` cancela el `submit`, extrae el campo `name` y aborta si está vacío.
3. Llama a `getShowData(name)` → devuelve `{ id, name, rating, image }` o `null`.
4. Si hay resultado, llama a `getEpisodeList(id)` → agrupa los episodios por temporada con `Object.groupBy`.
5. Reparte los datos a los dos Web Components mediante sus métodos `update(...)`.
6. Resetea el formulario.

## Componentes

### `<header-tv-show>` (`src/components/HeadtTvShow/HtmlHeader.js`)

- **Responsabilidad**: mostrar el póster y el nombre de la serie.
- **API pública**: `update(infoTv)` con `{ name, image, rating }`.
- **Comportamiento**:
  - Si recibe datos válidos → renderiza `<header>` con `<img>` y `<h1>`.
  - Si recibe `null` o sin `name` → renderiza un _warning-badge_ con un haz de escaneo animado.
- **Encapsulación**: Shadow DOM abierto + `adoptedStyleSheets` con `HeaderTvShows.css`.

### `<season-tv>` (`src/components/SeasonTvShow/HtmlTvShow.js`)

- **Responsabilidad**: pintar el mapa de calor de episodios por temporada.
- **API pública**: `update(episodesBySeason)` con un objeto `{ [seasonNumber]: Episode[] }`.
- **Comportamiento**:
  - Por cada temporada genera un `<section class="season">` con cabecera `T{n}`.
  - Cada episodio es un `<div class="episode rating-{n}">` donde `n` es la nota media truncada (`Math.floor`).
  - La escala cromática va de `#2b0a27` (0) a `#4caf50` (10), pasando por rojo, naranja, amarillo y verde.
- **Encapsulación**: Shadow DOM abierto + `adoptedStyleSheets` con `SeasonTvShows.css`.

> El nombre del elemento es `season-tv` (sin `show`) y se registra en `main.js` con `customElements.define("season-tv", SeasonTvShows)`.

## Servicios

### `src/services/api.js`

Dos funciones asíncronas, ambas tolerantes a fallos (devuelven `null` ante cualquier error):

```js
getShowData(id); // -> { id, name, rating, image } | null
getEpisodeList(id); // -> { [seasonNumber]: Episode[] } | null
```

- `getShowData` consulta `https://api.tvmaze.com/search/shows?q={query}` y se queda con el **primer resultado**.
- `getEpisodeList` consulta `https://api.tvmaze.com/shows/{id}/episodes` y agrupa los episodios por temporada usando `Object.groupBy`.
- Si la serie no tiene imagen, se usa un placeholder en `PLACEHOLDER_IMAGE`.

## Estilos

- **Tokens** en `src/styles.css` con `:root` (`--color-bg`, `--color-fg`, `--color-accent`, `--font-sans`, `--font-mono`, `--space-unit`, `--radius`).
- **Anidamiento CSS nativo** soportado por Lightning CSS (`input { &::placeholder, &:focus, &:active }`).
- **`@property --scan-pos`** en `src/styles.css` para tipar la propiedad custom que anima el `warning-badge`.
- **CSS por componente** cargado en Shadow DOM mediante `adoptedStyleSheets` y `import ... with { type: "css" }`.

## Calidad de código (lint)

`oxlint` se ejecuta con `pnpm lint` y aplica:

- Categoría `correctness` con severidad `error`.
- Regla `complexity/complexity` con límites **cyclomatic: 4** y **cognitive: 4** (aviso).
- `ignorePatterns`: `**/node_modules/**`.
- `env`: `es2024` + `builtin`.

> Si una función crece en ramas, el linter lo marcará como warning. Refactoriza extrayendo helpers o usando tablas de despacho.

## Despliegue en GitHub Pages

El proyecto está preconfigurado para GitHub Pages con `base: "/rating-pelis/"` en `vite.config.js`.

```bash
# 1. Genera la build
pnpm build

# 2. Despliega (publica dist/ en la rama gh-pages)
pnpm deploy
```

El script `deploy` usa `gh-pages -d dist`, que sube el contenido de `dist/` a la rama `gh-pages` del remoto configurado (`origin`). Asegúrate de tener permisos de _push_ sobre el repositorio.

En la configuración del repositorio, en **Settings → Pages**, selecciona la rama `gh-pages` y la raíz (`/`) como fuente.

## Variables de entorno

El proyecto **no utiliza variables de entorno**: no hay claves, tokens ni configuración sensible. Todo el consumo de la API de TVMaze es público y anónimo.

## Solución de problemas

| Problema                                               | Causa probable                                      | Solución                                                                             |
| ------------------------------------------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------ |
| El servidor de dev no arranca en el puerto 1234        | Puerto ocupado                                      | Cambia `server.port` en `vite.config.js` o libera el puerto.                         |
| `pnpm install` falla con errores de resolución         | Versión antigua de pnpm o `node_modules` previo     | Usa Node 20+ y `pnpm@11`, después `rm -rf node_modules && pnpm install`.             |
| `pnpm dev` muestra pantalla en blanco                  | Bloqueador de scripts del navegador                 | Revisa la consola y permite módulos ES / fetch desde `localhost`.                    |
| La búsqueda siempre devuelve "No se encontró película" | API sin conexión, o serie con nombre incorrecto     | Verifica la pestaña _Network_ y prueba con un nombre exacto (`lost`, `friends`...).  |
| No se ven los colores del heatmap                      | `rating.average` es `null` para algún episodio      | La clase `rating-0` aplica un color por defecto oscuro, pero conviene revisar datos. |
| El placeholder de imagen no carga                      | El literal contiene un `htpps://` con una `p` extra | Corrige la constante `PLACEHOLDER_IMAGE` en `src/services/api.js`.                   |
| `pnpm deploy` falla con 403                            | `gh-pages` no tiene permisos de push                | Revisa `git remote -v` y tus credenciales SSH/HTTPS.                                 |
| `oxlint` se queja por complejidad cognitiva            | Funciones con demasiadas ramas                      | Divide la función en helpers más pequeños.                                           |

## Créditos y licencia

- Código y diseño del proyecto: [ajcastrob](https://github.com/ajcastrob).
- Datos de series: [TVMaze API](https://www.tvmaze.com/api) — usados bajo sus términos.
- Curso de referencia: _Asincronía_ de [ManzDev](https://manz.dev/).

Licencia **ISC** (la indicada en `package.json`).
