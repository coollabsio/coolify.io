<script>
  import Icon from "./Icon.svelte";
  import Search from "reicon/icons/Search";
  import ChevronDown from "reicon/icons/ChevronDown";

  export let services = [];

  let search = "";
  let selectedCategory = "all";

  const categoryLabels = {
    RSS: "RSS",
    ai: "AI",
    analytics: "Analytics",
    api: "API",
    auth: "Authentication",
    automation: "Automation",
    backend: "Backend",
    ci: "CI/CD",
    cms: "CMS",
    communication: "Communication",
    database: "Database",
    development: "Development",
    devtools: "Dev Tools",
    documentation: "Documentation",
    email: "Email",
    family: "Family",
    finance: "Finance",
    games: "Games",
    git: "Git",
    health: "Health",
    helpdesk: "Helpdesk",
    mcp: "MCP",
    media: "Media",
    messaging: "Messaging",
    monitoring: "Monitoring",
    networking: "Networking",
    other: "Other",
    productivity: "Productivity",
    proxy: "Proxy",
    search: "Search",
    security: "Security",
    storage: "Storage",
    vpn: "VPN",
  };

  function getCategoryLabel(cat) {
    return categoryLabels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
  }

  function matchesSearch(service, query) {
    return [service.name, service.slogan, service.category, ...(service.tags || [])]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
  }

  function handleImgError(event) {
    event.currentTarget.style.display = "none";
  }

  $: categories = [...new Set(services.map((service) => service.category).filter(Boolean))]
    .sort((a, b) => getCategoryLabel(a).localeCompare(getCategoryLabel(b)));

  $: normalizedSearch = search.toLowerCase().trim();

  $: filtered = services.filter((service) => {
    if (selectedCategory !== "all" && service.category !== selectedCategory) {
      return false;
    }

    if (normalizedSearch && !matchesSearch(service, normalizedSearch)) {
      return false;
    }

    return true;
  });
</script>

<div class="w-full px-4">
  <div class="mx-auto mb-6 flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
    <div class="relative flex-1">
      <span class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-fg-faint">
        <Icon icon={Search} class="size-4" />
      </span>
      <input
        type="text"
        bind:value={search}
        placeholder="Search services..."
        aria-label="Search services"
        class="h-9 w-full rounded-md bg-white/[0.04] pr-3 pl-9 text-sm text-fg ring-1 ring-hairline outline-none transition-colors placeholder:text-fg-faint focus:ring-warning/60"
      />
    </div>
    <div class="relative sm:min-w-60">
      <select
        bind:value={selectedCategory}
        aria-label="Filter by category"
        class="h-9 w-full cursor-pointer appearance-none rounded-md bg-white/[0.04] pr-9 pl-3 text-sm text-fg ring-1 ring-hairline outline-none transition-colors focus:ring-warning/60"
      >
        <option value="all" class="bg-panel">All categories</option>
        {#each categories as category}
          <option value={category} class="bg-panel">{getCategoryLabel(category)}</option>
        {/each}
      </select>
      <span class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-fg-faint">
        <Icon icon={ChevronDown} class="size-4" />
      </span>
    </div>
  </div>

  <p class="mb-6 text-xs text-fg-faint">
    Showing {filtered.length} of {services.length} services
    {#if selectedCategory !== "all"}
      in <span class="text-warning">{getCategoryLabel(selectedCategory)}</span>
    {/if}
  </p>

  {#if filtered.length > 0}
    <div class="grid grid-cols-2 gap-2 text-left sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {#each filtered as service (service.id)}
        <a
          href={service.documentation}
          target="_blank"
          rel="noopener noreferrer"
          class="card flex flex-col gap-2 p-3 transition-colors hover:bg-white/[0.07] hover:ring-white/15 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-warning"
        >
          <div class="flex items-center gap-2.5">
            <div class="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white/[0.06] ring-1 ring-hairline">
              {#if service.logo}
                <img
                  src={service.logo}
                  alt={service.name}
                  class="size-6 object-contain"
                  loading="lazy"
                  on:error={handleImgError}
                />
              {:else}
                <span class="text-sm font-semibold text-fg-faint">
                  {service.name.charAt(0)}
                </span>
              {/if}
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="truncate text-sm font-medium text-fg">{service.name}</h3>
              <p class="truncate text-[11px] text-fg-faint">{getCategoryLabel(service.category)}</p>
            </div>
          </div>
          {#if service.slogan}
            <p class="line-clamp-2 text-xs text-fg-faint">{service.slogan}</p>
          {/if}
        </a>
      {/each}
    </div>
  {:else}
    <div class="card mx-auto max-w-md px-4 py-12 text-center">
      <p class="text-sm font-medium text-fg">No services found.</p>
      <p class="mt-1 text-xs text-fg-faint">Try a different search term or category.</p>
    </div>
  {/if}
</div>
