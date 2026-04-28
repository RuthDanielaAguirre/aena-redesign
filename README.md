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
- Hero con carrusel de imágenes y CTA
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
  pages/
    index.astro   ES (/)
    en/index.astro EN (/en/)
public/
  ai.txt          Contexto para humanos e IA (no oficial)
```

## SEO

El `<head>` incluye `lang`, **meta description**, **Open Graph**, **Twitter Card**, **`link rel="canonical"`** por idioma y **`hreflang`** con URLs absolutas cuando `site` está definido en `astro.config.mjs`.

Antes de desplegar, sustituye `site` en `astro.config.mjs` por la URL pública real (canonical, `og:url` e imágenes sociales dependen de ella).

## Disclaimer

Este proyecto es **educativo**. Las marcas y el nombre “Aena” se usan solo como referencia visual y de contenido para el ejercicio de diseño. Las imágenes de héroe y secciones provienen de **Unsplash** (terceros).

## Licencia / License

ISC (según `package.json`).

## Repositorio / Repository

Sustituye este enlace por el remoto cuando exista: `https://github.com/TU_USUARIO/aena-redesign`
