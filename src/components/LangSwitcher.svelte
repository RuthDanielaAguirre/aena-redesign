<script>
  import 'flag-icons/css/flag-icons.min.css';
  let { currentLang = 'es', navLabel = 'Cambiar idioma / Change language' } = $props();

  const langs = [
    { code: 'es', countryCode: 'es', label: 'Español', path: '/' },
    { code: 'en', countryCode: 'gb', label: 'English', path: '/en/' },
  ];
</script>

<div class="switcher" role="navigation" aria-label={navLabel}>
  {#each langs as lang}
    <a
      href={lang.path}
      class="lang-btn"
      class:active={currentLang === lang.code}
      aria-label={lang.label}
      aria-current={currentLang === lang.code ? 'page' : undefined}
      hreflang={lang.code}
    >
      <span class={`fi fi-${lang.countryCode}`} aria-hidden="true"></span>
      <span class="code">{lang.code.toUpperCase()}</span>
    </a>
  {/each}
</div>

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
    color: #d9e1ea;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.55);
    font-size: 0.75rem;
    font-weight: 600;
    transition: all 0.2s;
    letter-spacing: 0.05em;
  }

  .lang-btn:hover { color: #fff; background: rgba(255,255,255,0.08); }

  .lang-btn.active {
    background: var(--color-primary);
    color: #111d27;
  }

  .fi {
    width: 1.2em;
    height: 0.9em;
    border-radius: 2px;
  }

  .code { line-height: 1; }
</style>