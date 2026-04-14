<script>
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
  <div
    class="flex flex-col sm:flex-row gap-4 mb-8 max-w-3xl mx-auto items-stretch sm:items-center"
  >
    <div class="relative flex-1">
      <svg
        class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        bind:value={search}
        placeholder="Search services..."
        class="h-14 w-full pl-10 pr-4 bg-coolgray-200 border border-coolgray-400 rounded-lg text-base text-white placeholder-neutral-500 focus:outline-none focus:border-coollabs transition-colors"
      />
    </div>
    <div class="relative sm:min-w-72">
      <select
        bind:value={selectedCategory}
        class="h-14 w-full appearance-none pl-4 pr-12 bg-coolgray-200 border border-coolgray-400 rounded-lg text-base text-white focus:outline-none focus:border-coollabs transition-colors cursor-pointer"
      >
        <option value="all">All Categories</option>
        {#each categories as category}
          <option value={category}>{getCategoryLabel(category)}</option>
        {/each}
      </select>
      <svg
        class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m6 9 6 6 6-6"
        />
      </svg>
    </div>
  </div>

  <p class="text-neutral-400 mb-6 text-sm">
    Showing {filtered.length} of {services.length} services
    {#if selectedCategory !== "all"}
      in <span class="text-warning">{getCategoryLabel(selectedCategory)}</span>
    {/if}
  </p>

  {#if filtered.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
      {#each filtered as service (service.id)}
        <a
          href={service.documentation}
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-start gap-4 p-4 bg-coolgray-200 border border-coolgray-400 rounded-xl hover:border-coollabs transition-colors"
        >
          <div
            class="w-12 h-12 flex-shrink-0 rounded-lg bg-coolgray-300 flex items-center justify-center overflow-hidden"
          >
            {#if service.logo}
              <img
                src={service.logo}
                alt={service.name}
                class="w-8 h-8 object-contain"
                loading="lazy"
                on:error={handleImgError}
              />
            {:else}
              <span class="text-neutral-500 font-semibold text-lg">
                {service.name.charAt(0)}
              </span>
            {/if}
          </div>
          <div class="min-w-0 flex-1">
            <h3
              class="text-white font-semibold text-sm transition-colors truncate"
            >
              {service.name}
            </h3>
            <p class="text-neutral-400 text-xs mt-1 line-clamp-2">
              {service.slogan}
            </p>
            <span
              class="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-coolgray-300 text-neutral-400"
            >
              {getCategoryLabel(service.category)}
            </span>
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <div class="py-20 text-center">
      <p class="text-neutral-400 text-lg">No services found.</p>
      <p class="text-neutral-500 text-sm mt-2">
        Try a different search term or category.
      </p>
    </div>
  {/if}
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
