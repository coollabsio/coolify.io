<script>
  import { onMount } from "svelte";

  let contributors = [];
  let topContributors = [];
  let totalContributions = 0;
  let totalContributors = 0;
  let isLoading = true;

  const repos = ["coollabsio/coolify", "coollabsio/coolify-docs"];

  function isBot(user) {
    return user.type === "Bot" || /\[bot\]$/i.test(user.login);
  }

  async function fetchAllContributors() {
    const all = new Map();

    for (const repo of repos) {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${repo}/contributors`,
        );
        const data = await res.json();

        for (const user of data) {
          if (!user.login || isBot(user)) continue;

          if (all.has(user.login)) {
            all.get(user.login).contributions += user.contributions;
          } else {
            all.set(user.login, {
              login: user.login,
              avatar_url: user.avatar_url,
              html_url: user.html_url,
              contributions: user.contributions,
            });
          }
        }
      } catch (e) {
        console.error(`Error loading contributors from ${repo}`, e);
      }
    }

    return Array.from(all.values()).sort(
      (a, b) => b.contributions - a.contributions,
    );
  }

  onMount(async () => {
    isLoading = true;

    const fullList = await fetchAllContributors();
    totalContributors = fullList.length;
    totalContributions = fullList.reduce((sum, c) => sum + c.contributions, 0);

    topContributors = fullList.slice(0, 3);
    const topLogins = new Set(topContributors.map((c) => c.login));
    contributors = fullList.filter((c) => !topLogins.has(c.login));

    isLoading = false;
  });
</script>

<div class="text-white max-w-6xl mx-auto py-4 px-4">
  {#if isLoading}
    <p class="text-neutral-400 text-center">Loading contributors…</p>
  {:else}
    <!-- Chips Section -->
    <div class="flex flex-wrap justify-center gap-4 mb-10">
      <div class="bg-coolgray-300/60 text-sm px-4 py-2 rounded">
        Total Contributors: {totalContributors}
      </div>
      <div class="bg-coolgray-300/60 text-sm px-4 py-2 rounded">
        Total Contributions: {totalContributions}
      </div>
    </div>

    <!-- Top Contributors -->
    <h2 class="text-2xl font-semibold mt-20 mb-2 text-center">
      Top Contributors
    </h2>
    <p class="text-neutral-400 text-center mb-10">
      Taking the lead in contributions
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {#each topContributors as c}
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

    <!-- All Contributors -->
    <h2 class="text-xl font-semibold mt-24 mb-2 text-center">
      All Contributors
    </h2>
    <p class="text-neutral-400 text-center mb-10">Everyone improving Coolify</p>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
    >
      {#each contributors as c}
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

    <!-- Call to Action -->
    <div class="mt-12 text-center">
      <div class="flex justify-center">
        <a
          href="https://github.com/coollabsio/coolify"
          target="_blank"
          class="text-base font-medium rounded p-4 px-10 text-white bg-coolgray-300 hover:bg-coolgray-400 flex items-center gap-2"
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
          Start Contributing
        </a>
      </div>
    </div>
  {/if}
</div>
