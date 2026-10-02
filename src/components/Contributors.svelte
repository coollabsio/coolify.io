<script>
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";
  import Plus from "reicon/icons/Plus";

  let coolifyContributors = [];
  let docsContributors = [];
  let coolifyTopContributors = [];
  let docsTopContributors = [];
  let coolifyTotalContributions = 0;
  let docsTotalContributions = 0;

  async function fetchContributorsData() {
    try {
      const response = await fetch('/contributors.json');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      
      // Process Coolify contributors
      if (data.coolify) {
        coolifyTotalContributions = data.coolify.reduce((sum, c) => sum + c.contributions, 0);
        coolifyTopContributors = data.coolify.slice(0, 3);
        const coolifyTopLogins = new Set(coolifyTopContributors.map((c) => c.login));
        coolifyContributors = data.coolify.filter((c) => !coolifyTopLogins.has(c.login));
      }
      
      // Process Docs contributors
      if (data.docs) {
        docsTotalContributions = data.docs.reduce((sum, c) => sum + c.contributions, 0);
        docsTopContributors = data.docs.slice(0, 3);
        const docsTopLogins = new Set(docsTopContributors.map((c) => c.login));
        docsContributors = data.docs.filter((c) => !docsTopLogins.has(c.login));
      }
      
    } catch (e) {
      console.error('Error loading contributors data:', e);
    }
  }

  onMount(fetchContributorsData);

  $: sections = [
    {
      key: "coolify",
      label: "Coolify",
      topTitle: "Top Coolify contributors",
      topSummary: "Leading contributors to the main Coolify project.",
      allTitle: "All Coolify contributors",
      allSummary: "Everyone improving the main Coolify project.",
      top: coolifyTopContributors,
      rest: coolifyContributors,
      total: coolifyTotalContributions,
    },
    {
      key: "docs",
      label: "Docs",
      topTitle: "Top documentation contributors",
      topSummary: "Leading contributors to Coolify documentation.",
      allTitle: "All documentation contributors",
      allSummary: "Everyone improving Coolify documentation.",
      top: docsTopContributors,
      rest: docsContributors,
      total: docsTotalContributions,
    },
  ];
</script>

<div class="mx-auto max-w-6xl px-4 py-4">
  {#each sections as section (section.key)}
    <section class="mt-16 first:mt-8">
      <div class="flex flex-wrap justify-center gap-2">
        <span class="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-xs text-fg-dim ring-1 ring-hairline">
          {section.label} contributors: <span class="text-fg">{section.top.length + section.rest.length}</span>
        </span>
        <span class="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-xs text-fg-dim ring-1 ring-hairline">
          {section.label} contributions: <span class="text-fg">{section.total}</span>
        </span>
      </div>

      <div class="mt-12">
        <h2 class="text-2xl font-semibold tracking-tight text-fg md:text-3xl">{section.topTitle}</h2>
        <p class="mx-auto mt-3 max-w-xl text-sm text-fg-faint">{section.topSummary}</p>
      </div>

      <div class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
        {#each section.top as c}
          <a
            href={c.html_url}
            target="_blank"
            rel="noopener noreferrer"
            class="card flex flex-col items-center p-6 text-center transition-colors hover:bg-white/[0.07] hover:ring-white/15 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-warning"
          >
            <img
              src={c.avatar_url}
              alt={c.login}
              class="size-16 rounded-full ring-1 ring-hairline"
              loading="lazy"
            />
            <div class="mt-3 max-w-full truncate text-sm font-medium text-fg">{c.login}</div>
            <div class="mt-0.5 text-xs text-fg-faint">{c.contributions} contributions</div>
          </a>
        {/each}
      </div>

      <div class="mt-16">
        <h3 class="text-xl font-semibold tracking-tight text-fg">{section.allTitle}</h3>
        <p class="mx-auto mt-2 max-w-xl text-sm text-fg-faint">{section.allSummary}</p>
      </div>

      <div class="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {#each section.rest as c}
          <a
            href={c.html_url}
            target="_blank"
            rel="noopener noreferrer"
            title="{c.login}: {c.contributions} contributions"
            class="flex min-w-0 items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors hover:bg-white/[0.05] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-warning"
          >
            <img
              src={c.avatar_url}
              alt={c.login}
              class="size-10 shrink-0 rounded-full ring-1 ring-hairline"
              loading="lazy"
            />
            <div class="min-w-0">
              <div class="truncate text-xs font-medium text-fg">{c.login}</div>
              <div class="truncate text-xs text-fg-faint">{c.contributions} contributions</div>
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/each}

  <div class="mt-20 flex flex-col justify-center gap-3 sm:flex-row">
    <a href="https://github.com/coollabsio/coolify" target="_blank" rel="noopener noreferrer" class="btn btn-neutral btn-lg">
      <Icon icon={Plus} class="size-4" />
      Contribute to Coolify
    </a>
    <a href="https://github.com/coollabsio/coolify-docs" target="_blank" rel="noopener noreferrer" class="btn btn-neutral btn-lg">
      <Icon icon={Plus} class="size-4" />
      Contribute to Docs
    </a>
  </div>
</div>
