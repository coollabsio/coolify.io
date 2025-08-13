<script>
  import { onMount } from "svelte";

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
</script>

<div class="text-white max-w-6xl mx-auto py-4 px-4">
  <!-- Coolify Repository Section -->
    <div class="mb-20">
      <!-- Chips Section -->
      <div class="flex flex-wrap justify-center gap-4 mb-10">
        <div class="bg-coolgray-300/60 text-sm px-4 py-2 rounded">
          Coolify Contributors: {coolifyTopContributors.length + coolifyContributors.length}
        </div>
        <div class="bg-coolgray-300/60 text-sm px-4 py-2 rounded">
          Coolify Contributions: {coolifyTotalContributions}
        </div>
      </div>

      <!-- Top Coolify Contributors -->
      <h2 class="text-2xl font-semibold mt-20 mb-2 text-center">
        Top Coolify Contributors
      </h2>
      <p class="text-neutral-400 text-center mb-10">
        Leading contributors to the main Coolify project
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {#each coolifyTopContributors as c}
          <a
            href={c.html_url}
            target="_blank"
            class="bg-coolgray-200/70 rounded p-6 flex flex-col items-center justify-center hover:bg-coolgray-300 transition h-56 text-center"
          >
            <img
              src={c.avatar_url}
              alt={c.login}
              class="w-20 h-20 rounded-full mb-3"
            />
            <div class="font-normal mt-1 text-lg">{c.login}</div>
            <div class="text-md mt-1 text-neutral-400">
              {c.contributions} contributions
            </div>
          </a>
        {/each}
      </div>

      <!-- All Coolify Contributors -->
      <h2 class="text-xl font-semibold mt-24 mb-2 text-center">
        All Coolify Contributors
      </h2>
      <p class="text-neutral-400 text-center mb-10">Everyone improving the main Coolify project</p>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
      >
        {#each coolifyContributors as c}
          <a
            href={c.html_url}
            target="_blank"
            class="bg-coolgray-200/70 rounded p-4 flex flex-col items-center hover:bg-coolgray-300 transition text-center"
          >
            <img
              src={c.avatar_url}
              alt={c.login}
              class="w-16 h-16 rounded-full mb-2"
            />
            <div class="font-semibold mt-1 text-sm truncate">{c.login}</div>
            <div class="text-xs mt-1 text-neutral-400">
              {c.contributions} contributions
            </div>
          </a>
        {/each}
      </div>
    </div>

    <!-- Docs Repository Section -->
    <div class="mb-20">
      <!-- Docs Chips Section -->
      <div class="flex flex-wrap justify-center gap-4 mb-10">
        <div class="bg-coolgray-300/60 text-sm px-4 py-2 rounded">
          Docs Contributors: {docsTopContributors.length + docsContributors.length}
        </div>
        <div class="bg-coolgray-300/60 text-sm px-4 py-2 rounded">
          Docs Contributions: {docsTotalContributions}
        </div>
      </div>

      <!-- Top Docs Contributors -->
      <h2 class="text-2xl font-semibold mt-20 mb-2 text-center">
        Top Documentation Contributors
      </h2>
      <p class="text-neutral-400 text-center mb-10">
        Leading contributors to Coolify documentation
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {#each docsTopContributors as c}
          <a
            href={c.html_url}
            target="_blank"
            class="bg-coolgray-200/70 rounded p-6 flex flex-col items-center justify-center hover:bg-coolgray-300 transition h-56 text-center"
          >
            <img
              src={c.avatar_url}
              alt={c.login}
              class="w-20 h-20 rounded-full mb-3"
            />
            <div class="font-normal mt-1 text-lg">{c.login}</div>
            <div class="text-md mt-1 text-neutral-400">
              {c.contributions} contributions
            </div>
          </a>
        {/each}
      </div>

      <!-- All Docs Contributors -->
      <h2 class="text-xl font-semibold mt-24 mb-2 text-center">
        All Documentation Contributors
      </h2>
      <p class="text-neutral-400 text-center mb-10">Everyone improving Coolify documentation</p>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
      >
        {#each docsContributors as c}
          <a
            href={c.html_url}
            target="_blank"
            class="bg-coolgray-200/70 rounded p-4 flex flex-col items-center hover:bg-coolgray-300 transition text-center"
          >
            <img
              src={c.avatar_url}
              alt={c.login}
              class="w-16 h-16 rounded-full mb-2"
            />
            <div class="font-semibold mt-1 text-sm truncate">{c.login}</div>
            <div class="text-xs mt-1 text-neutral-400">
              {c.contributions} contributions
            </div>
          </a>
        {/each}
      </div>
    </div>

    <!-- Call to Action -->
    <div class="mt-12 text-center">
      <div class="flex justify-center gap-4 flex-col sm:flex-row">
        <a
          href="https://github.com/coollabsio/coolify"
          target="_blank"
          class="text-base font-medium rounded p-4 px-10 text-white bg-coolgray-300 hover:bg-coolgray-400 flex items-center justify-center gap-2"
        >
          <svg
            class="icon hidden sm:block"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M12 5v14m7-7H5" />
            </g>
          </svg>
          Contribute to Coolify
        </a>
        <a
          href="https://github.com/coollabsio/coolify-docs"
          target="_blank"
          class="text-base font-medium rounded p-4 px-10 text-white bg-coolgray-300 hover:bg-coolgray-400 flex items-center justify-center gap-2"
        >
          <svg
            class="icon hidden sm:block"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M12 5v14m7-7H5" />
            </g>
          </svg>
          Contribute to Docs
        </a>
      </div>
    </div>
</div>
