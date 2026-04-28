<script>
  const airports = [
    { name: "A Coruña", code: "LCG" },
    { name: "Adolfo Suárez Madrid-Barajas", code: "MAD" },
    { name: "Alicante-Elche Miguel Hernández", code: "ALC" },
    { name: "Almería", code: "LEI" },
    { name: "Asturias", code: "OVD" },
    { name: "Bilbao", code: "BIO" },
    { name: "César Manrique-Lanzarote", code: "ACE" },
    { name: "Fuerteventura", code: "FUE" },
    { name: "Girona-Costa Brava", code: "GRO" },
    { name: "Gran Canaria", code: "LPA" },
    { name: "Ibiza", code: "IBZ" },
    { name: "Josep Tarradellas Barcelona-El Prat", code: "BCN" },
    { name: "Jerez", code: "XRY" },
    { name: "La Palma", code: "SPC" },
    { name: "Málaga-Costa del Sol", code: "AGP" },
    { name: "Menorca", code: "MAH" },
    { name: "Palma de Mallorca", code: "PMI" },
    { name: "Pamplona", code: "PNA" },
    { name: "Santiago-Rosalía de Castro", code: "SCQ" },
    { name: "Sevilla", code: "SVQ" },
    { name: "Tenerife Norte", code: "TFN" },
    { name: "Tenerife Sur", code: "TFS" },
    { name: "Valencia", code: "VLC" },
    { name: "Valladolid", code: "VLL" },
    { name: "Vigo", code: "VGO" },
    { name: "Zaragoza", code: "ZAZ" },
  ];

  /** @type {{ inputLabel: string; placeholder: string; noResults: string; goBtn: string; goBtnAria: string; listLabel: string; selectAirportAria: string }} */
  let { labels } = $props();

  const inputId = "airport-search-input";
  const popupId = "airport-search-popup";

  let query = $state("");
  let showDropdown = $state(false);
  let selected = $state(null);

  let filtered = $derived(
    query.length === 0
      ? []
      : airports.filter(
          (a) =>
            a.name.toLowerCase().includes(query.toLowerCase()) ||
            a.code.toLowerCase().includes(query.toLowerCase())
        )
  );

  let popupOpen = $derived(showDropdown && query.length > 0);

  function fill(template, vars) {
    return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
  }

  function selectAirport(airport) {
    selected = airport;
    query = airport.name;
    showDropdown = false;
  }

  function handleInput() {
    selected = null;
    showDropdown = true;
  }

  function handleBlur() {
    setTimeout(() => (showDropdown = false), 150);
  }

  function selectAria(airport) {
    return fill(labels.selectAirportAria, {
      name: airport.name,
      code: airport.code,
    });
  }

  function goBtnAriaLabel() {
    if (!selected) return "";
    return fill(labels.goBtnAria, {
      name: selected.name,
      code: selected.code,
    });
  }
</script>

<div class="search-wrapper">
  <label class="sr-only" for={inputId}>{labels.inputLabel}</label>
  <div class="search-box">
    <span class="search-icon" aria-hidden="true">✈</span>
    <input
      id={inputId}
      type="text"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={popupOpen}
      aria-controls={popupOpen ? popupId : undefined}
      aria-haspopup="listbox"
      placeholder={labels.placeholder}
      bind:value={query}
      oninput={handleInput}
      onblur={handleBlur}
      onfocus={() => query.length > 0 && (showDropdown = true)}
    />
    {#if selected}
      <span class="badge" aria-hidden="true">{selected.code}</span>
    {/if}
  </div>

  {#if popupOpen}
    <div
      id={popupId}
      class="search-popup"
      role="region"
      aria-label={labels.listLabel}
    >
      {#if filtered.length > 0}
        <ul class="dropdown" role="listbox">
          {#each filtered as airport}
            <li role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={selected?.code === airport.code}
                aria-label={selectAria(airport)}
                onclick={() => selectAirport(airport)}
              >
                <span class="airport-name">{airport.name}</span>
                <span class="airport-code" aria-hidden="true">{airport.code}</span>
              </button>
            </li>
          {/each}
        </ul>
      {:else}
        <div class="no-results" role="status" aria-live="polite">
          {labels.noResults}
        </div>
      {/if}
    </div>
  {/if}

  {#if selected}
    <button type="button" class="go-btn" aria-label={goBtnAriaLabel()}>
      {fill(labels.goBtn, { name: selected.name })}
    </button>
  {/if}
</div>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .search-wrapper {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  .search-box {
    display: flex;
    align-items: center;
    background: var(--color-bg-card);
    border: 2px solid var(--color-primary);
    border-radius: 12px;
    padding: 0 1.2rem;
    gap: 0.75rem;
  }

  .search-icon {
    font-size: 1.2rem;
    color: var(--color-primary);
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 1.1rem 0;
    font-size: 1rem;
    font-family: inherit;
    color: #fff;
    background: transparent;
  }

  input::placeholder {
    color: var(--color-text-soft, #c2ceda);
  }

  .badge {
    background: var(--color-primary);
    color: var(--color-bg);
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    letter-spacing: 0.05em;
  }

  .search-popup {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    z-index: 100;
  }

  .dropdown {
    position: relative;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    background: var(--color-bg-card);
    border: 1px solid rgba(150, 206, 0, 0.3);
    border-radius: 12px;
    list-style: none;
    margin: 0;
    padding: 0.5rem;
    z-index: 100;
    max-height: 280px;
    overflow-y: auto;
  }

  .dropdown li button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 8px;
    font-family: inherit;
    transition: background 0.15s;
    color: inherit;
    text-align: inherit;
  }

  .dropdown li button:hover {
    background: rgba(150, 206, 0, 0.1);
  }

  .dropdown li button:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .airport-name {
    font-size: 0.95rem;
    color: #fff;
    text-align: left;
  }

  .airport-code {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--color-primary);
    background: var(--color-border);
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
  }

  .no-results {
    background: var(--color-bg-card);
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
    color: var(--color-text-soft, #c2ceda);
    margin-top: 8px;
    border: 1px solid rgba(150, 206, 0, 0.2);
  }

  .go-btn {
    display: inline-block;
    margin-top: 1rem;
    background: var(--color-primary);
    color: #111d27;
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-weight: 700;
    font-size: 0.95rem;
    transition: background 0.2s;
  }

  .go-btn:hover {
    background: #a8e000;
  }
  .go-btn:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 3px;
  }
</style>
