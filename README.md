# aena-redesign

[![Astro](https://img.shields.io/badge/Astro-6-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![flag-icons](https://img.shields.io/badge/flag--icons-7-228BE6)](https://github.com/lipis/flag-icons)

**Rediseño de usabilidad** del área de pasajeros inspirado en la experiencia pública de [Aena — pasajeros](https://www.aena.es/es/pasajeros/pasajeros.html). Práctica académica (Monlau / DIW): **no es el sitio oficial** de Aena ni está afiliado a la compañía.

**Usability redesign** of the passengers area inspired by the public Aena passengers experience. Academic practice — **not the official Aena website** and not affiliated with Aena.

## Características / Features

- Buscador de aeropuertos filtrable (`AirportSearch.svelte`)
- Hero con carrusel de **`<img>`** (LCP: primera imagen prioritaria), CTA y buscador
- Bloques parking, VIP, información de viaje y “market”
- **i18n**: español en `/`, inglés en `/en/` (`LangSwitcher.svelte`, banderas ES/GB vía SVG `flag-icons`)
- Textos y etiquetas de accesibilidad centralizados en `src/i18n/translations.ts`

## Quick start

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Estructura / Structure

```
src/
  components/     AirportSearch.svelte, LangSwitcher.svelte, …
  i18n/           translations.ts
  styles/         critical.css (above the fold), below-fold.css (carga diferida)
  pages/
    index.astro   ES (/)
    en/index.astro EN (/en/)
public/
  .well-known/ai.txt   Contexto para humanos e IA (no oficial) → `/.well-known/ai.txt`
```

## SEO y `<head>`

- `lang`, **meta description**, **Open Graph**, **Twitter Card**, **`canonical`** por idioma y **`hreflang`** (URLs absolutas con `site` en `astro.config.mjs`).
- **Fuentes:** `preconnect` a Google Fonts + hoja de estilos de fuentes en carga no bloqueante (`preload` + `onload`).
- **CSS:** hoja **crítica** enlazada al inicio; **`below-fold.css`** enlazada con `media="print"` y `onload` para no bloquear el primer render (mejor en móvil).

Antes de desplegar, sustituye `site` en `astro.config.mjs` por la URL pública real (canonical, `og:url` e imágenes sociales dependen de ella).

## Rendimiento / Performance

- Imágenes Unsplash con **`fm=webp`** (y `auto=format` / `fit=crop` donde aplica).
- Islas Svelte: **`LangSwitcher`** con `client:load`; **`AirportSearch`** con `client:visible` (ajustable si priorizas hidratar antes el buscador).

Vuelve a medir con **Lighthouse (móvil)** tras cada despliegue; la puntuación depende de red, CPU simulada y caché.

## Disclaimer

Este proyecto es **educativo**. Las marcas y el nombre “Aena” se usan solo como referencia visual y de contenido para el ejercicio de diseño. Las imágenes de héroe y secciones provienen de **Unsplash** (terceros), servidas en WebP cuando el CDN lo permite.

## Licencia / License

ISC (según `package.json`).

## Repositorio / Repository

Código en GitHub: [RuthDanielaAguirre/aena-redesign](https://github.com/RuthDanielaAguirre/aena-redesign)
