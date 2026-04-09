<script>
  import { onMount } from "svelte";

  let services = $state([]);
  let search = $state("");
  let selectedCategory = $state("all");
  let categories = $state([]);
  let loading = $state(true);

  const categoryLabels = {
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
    mattermost: "Mattermost",
    mcp: "MCP",
    media: "Media",
    messaging: "Messaging",
    monitoring: "Monitoring",
    networking: "Networking",
    other: "Other",
    productivity: "Productivity",
    proxy: "Proxy",
    RSS: "RSS",
    search: "Search",
    security: "Security",
    storage: "Storage",
    vpn: "VPN",
  };

  onMount(async () => {
    const res = await fetch("/services.json");
    services = await res.json();

    const cats = [...new Set(services.map((s) => s.category))].sort();
    categories = cats;
    loading = false;
  });

  let filtered = $derived.by(() => {
    let result = services;

    if (selectedCategory !== "all") {
      result = result.filter((s) => s.category === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.slogan.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q),
      );
    }

    return result;
  });

  function getCategoryLabel(cat) {
    return categoryLabels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
  }

  function handleImgError(e) {
    e.target.style.display = "none";
  }
</script>

<div class="w-full px-4">
  <!-- Search and Filter Bar -->
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
        class="w-full pl-10 pr-4 py-3 bg-coolgray-200 border border-coolgray-400 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-coollabs transition-colors"
      />
    </div>
    <select
      bind:value={selectedCategory}
      class="px-4 py-3 bg-coolgray-200 border border-coolgray-400 rounded-lg text-white focus:outline-none focus:border-coollabs transition-colors cursor-pointer"
    >
      <option value="all">All Categories</option>
      {#each categories as cat}
        <option value={cat}>{getCategoryLabel(cat)}</option>
      {/each}
    </select>
  </div>

  <!-- Count -->
  <p class="text-neutral-400 mb-6 text-sm">
    {#if loading}
      Loading services...
    {:else}
      Showing {filtered.length} of {services.length} services
      {#if selectedCategory !== "all"}
        in <span class="text-warning"
          >{getCategoryLabel(selectedCategory)}</span
        >
      {/if}
    {/if}
  </p>

  <!-- Service Grid -->
  {#if !loading}
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left"
    >
      {#each filtered as service (service.id)}
        <a
          href={service.documentation || "#"}
          target={service.documentation ? "_blank" : undefined}
          rel={service.documentation
            ? "noopener noreferrer"
            : undefined}
          class="group flex items-start gap-4 p-4 bg-coolgray-200 border border-coolgray-400 rounded-xl hover:border-coollabs transition-colors"
        >
          <div
            class="w-12 h-12 flex-shrink-0 rounded-lg bg-coolgray-300 flex items-center justify-center overflow-hidden"
          >
            <img
              src={service.logo}
              alt={service.name}
              class="w-8 h-8 object-contain"
              loading="lazy"
              onerror={handleImgError}
            />
          </div>
          <div class="min-w-0 flex-1">
            <h3
              class="text-white font-semibold text-sm group-hover:text-coollabs-100 transition-colors truncate"
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

    {#if filtered.length === 0}
      <div class="py-20 text-center">
        <p class="text-neutral-400 text-lg">No services found.</p>
        <p class="text-neutral-500 text-sm mt-2">
          Try a different search term or category.
        </p>
      </div>
    {/if}
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
