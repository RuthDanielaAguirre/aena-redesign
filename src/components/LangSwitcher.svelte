<script lang="ts">
  import esFlag from 'flag-icons/flags/1x1/es.svg?url';
  import gbFlag from 'flag-icons/flags/1x1/gb.svg?url';

  let { currentLang = 'es', navLabel = 'Change language' } = $props();

  const flagSrc: Record<string, string> = {
    es: esFlag,
    gb: gbFlag,
  };

  const langs = [
    { code: 'es', countryCode: 'es', label: 'Español', path: '/' },
    { code: 'en', countryCode: 'gb', label: 'English', path: '/en/' },
  ];
</script>

<nav class="switcher" aria-label={navLabel}>
  {#each langs as lang}
    <a
      href={lang.path}
      class="lang-btn"
      class:active={currentLang === lang.code}
      aria-label={lang.label}
      aria-current={currentLang === lang.code ? 'page' : undefined}
      hreflang={lang.code}
    >
      <img
        class="lang-flag"
        src={flagSrc[lang.countryCode]}
        alt=""
        width="18"
        height="14"
        loading="eager"
        decoding="async"
        fetchpriority="low"
      />
      <span class="code">{lang.code.toUpperCase()}</span>
    </a>
  {/each}
</nav>

<style>
  .switcher {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: rgba(255,255,255,0.06);
    border-radius: 8px;
    padding: 0.25rem;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .lang-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    text-decoration: none;
    color: rgba(255,255,255,0.5);
    font-size: 0.75rem;
    font-weight: 600;
    transition: all 0.2s;
    letter-spacing: 0.05em;
  }

  .lang-btn:hover { color: #fff; background: rgba(255,255,255,0.08); }
  .lang-btn:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 3px; border-radius: 6px; }

  .lang-btn.active {
    background: var(--color-primary);
    color: #111d27;
  }

  .lang-flag {
    width: 1.15em;
    height: 0.86em;
    object-fit: cover;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .code { line-height: 1; }
</style>
