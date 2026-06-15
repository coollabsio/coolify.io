<script>
  import { onMount } from "svelte";

  let freq = "monthly";
  let openFAQ = null;
  let communityMembers = "19+";

  const faqs = [
    {
      question: "Do I get any Cloud‑only features?",
      answer:
        "No, Coolify Cloud and self‑hosted share the same features. Cloud adds conveniences like auto‑backups, email alerts, scaling, and update testing.",
    },
    {
      question: "Does Coolify Cloud back up my application data?",
      answer:
        "No, only Coolify’s dashboard database is backed up. You’re responsible for backing up your app databases and storage.",
    },
    {
      question: "Can I import self‑hosted configs into Coolify Cloud?",
      answer: "No, you can’t migrate Coolify settings.",
    },
    {
      question: "How often is Coolify Cloud backed up?",
      answer: "Every 24 hours.",
    },
    {
      question: "Is Coolify Cloud based on the open‑source version?",
      answer:
        "Yes, both use the same open‑source code. Cloud is simply a managed service.",
    },
    {
      question: "What happens if I cancel my subscription?",
      answer:
        "You’ll lose access to Cloud at the end of your billing period, but your servers and apps stay running normally. Automations & integrations will be disabled, so new deployments through Coolify Cloud will not be possible.",
    },
    {
      question: "What if I miss a payment?",
      answer:
        "Access to Cloud is paused until payment is resolved, but your apps and servers remain unaffected.",
    },
    {
      question: "Are there IPs to whitelist for Coolify Cloud?",
      answer:
        "Yes, Cloud requires access to your SSH port via specific IPs (listed in our docs).",
    },
    {
      question: "Do I need to bring my own servers?",
      answer:
        "Yes, Coolify Cloud requires your own servers (VPS, Pi, EC2, etc.) to deploy applications.",
    },
    {
      question: "Why pay if I provide my own servers?",
      answer:
        "The fee covers the Coolify hosted by us — we manage, monitor, and update it on our infrastructure, which has its own costs.",
    },
    {
      question: "What happens if I exceed my server limit?",
      answer: "You’ll need to upgrade your plan before adding more servers.",
    },
    {
      question: "Is there a trial for Coolify Cloud?",
      answer:
        "No trial currently, but the $5/month Cloud plan supports up to two servers. You can self‑host to test everything for free.",
    },
    { question: "Are discounts available?", answer: "No" },
    {
      question: "Am I locked into Coolify Cloud?",
      answer:
        "Not really, you retain full control. If you stop paying, your apps keep running without any issues. Also we are working on a way to migrate your data to self-hosting and vice versa.",
    },
    {
      question: "Can I use my own domain for the Cloud dashboard?",
      answer:
        "No, the Cloud dashboard is only available at https://app.coolify.io. Using your own domain requires self‑hosting.",
    },
  ];

  onMount(() => {
    fetch("https://raw.githubusercontent.com/coollabsio/coollabs-cdn/main/json/business.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.discord) {
          communityMembers = `(${(data.discord / 1000).toFixed(0)}k+)`;
        }
      })
      .catch(() => {});
  });

  function checkmark() {
    return `
      <i class="ph-duotone ph-check-circle mt-0 flex-none text-warning text-2xl" aria-hidden="true"></i>
    `;
  }
</script>

<div class="text-white max-w-6xl mx-auto py-12 px-4">
  <!-- Cards -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Free Plan -->
    <div
      class="bg-coolgray-200/70 p-6 rounded-lg flex flex-col justify-between"
    >
      <div>
        <h2 class="text-2xl font-medium mb-4 text-left">Self-hosted</h2>
        <p class="text-3xl font-medium mb-6 text-left">
          Free Forever <span class="text-sm font-semibold text-neutral-400"
          ></span>
        </p>
        <p class="text-sm leading-6 text-neutral-400 mb-4 pt-4 text-left">
          Deploy Coolify on your infrastructure without any restrictions on
          features.
        </p>
        <ul class="space-y-4 text-sm leading-6 pt-2 text-white text-left">
          <li class="flex items-start">
            {@html checkmark()}Full access to all features
          </li>
          <li class="flex items-start">
            {@html checkmark()}Need your own infrastructure for Coolify
          </li>
          <li class="flex items-start">
            {@html checkmark()}No limitation or restrictions
          </li>
          <li class="flex items-start">
            {@html checkmark()}Community support ({communityMembers} members)
          </li>
          <li class="flex items-start">
            {@html checkmark()}Automated or Self-managed updates
          </li>
          <li class="flex items-start">
            {@html checkmark()}Includes all upcoming features
          </li>
        </ul>
      </div>
      <div class="mt-6">
        <a
          href="https://coolify.io/docs/get-started/installation"
          class="text-base font-medium rounded p-4 px-10 text-white bg-coolgray-300 hover:bg-coolgray-400 flex justify-center items-center gap-2"
        >
          <i class="ph-duotone ph-rocket-launch text-warning text-xl" aria-hidden="true"></i>
          Start Self‑hosting
        </a>
      </div>
    </div>

    <!-- Cloud Plan -->
    <div
      class="bg-coolgray-200/70 p-6 rounded-lg flex flex-col justify-between"
    >
      <div>
        <!-- Always inline on mobile+desktop -->
        <div class="flex items-center justify-between mb-4 gap-4">
          <h2 class="text-2xl font-medium text-left">Cloud</h2>
          <fieldset
            class="inline-flex gap-1 p-1 bg-coolgray-100 rounded whitespace-nowrap"
          >
            <label
              class="cursor-pointer px-3 py-1 text-xs sm:text-sm font-semibold rounded"
              class:bg-coollabs-100={freq === "monthly"}
              class:text-white={freq === "monthly"}
            >
              <input
                type="radio"
                name="freq"
                bind:group={freq}
                value="monthly"
                class="sr-only"
              />
              Monthly
            </label>
            <label
              class="cursor-pointer px-3 py-1 text-xs sm:text-sm font-semibold rounded"
              class:bg-coollabs-100={freq === "yearly"}
              class:text-white={freq === "yearly"}
            >
              <input
                type="radio"
                name="freq"
                bind:group={freq}
                value="yearly"
                class="sr-only"
              />
              Annually <span class="text-xs text-warning">(save 20%)</span>
            </label>
          </fieldset>
        </div>

        <p class="text-3xl font-medium text-left">
          {freq === "monthly" ? "$5" : "$4"}
          <span class="text-sm font-semibold text-neutral-400"
            >/month Base price (connect 2 servers)</span
          >
        </p>
        <p class="text-sm text-warning font-semibold mb-4 text-left">
          + {freq === "monthly" ? "$3" : "$2.70"} /month per additional server
        </p>

        <p class="text-sm leading-6 text-neutral-400 mb-6 text-left">
          Just connect your servers, Coolify runs on our managed infrastructure.
        </p>
        <ul class="space-y-4 text-sm leading-6 text-white text-left">
          <li class="flex items-start">
            {@html checkmark()}Connect unlimited servers
          </li>
          <li class="flex items-start">
            {@html checkmark()}Unlimited deployments per server
          </li>
          <li class="flex items-start">
            {@html checkmark()}Free email alerts for Coolify events
          </li>
          <li class="flex items-start">
            {@html checkmark()}Community + limited email support
          </li>
          <li class="flex items-start">
            {@html checkmark()}Founder-tested updates
          </li>
        </ul>
        <div class="mt-4 flex items-center text-warning text-sm">
          <i class="ph-duotone ph-info mr-3 ml-1 text-warning text-base" aria-hidden="true"></i>
          <div class="relative group">
            <span
              class="underline decoration-dotted decoration-1 underline-offset-4 cursor-help"
            >
              You need to bring your own servers
            </span>
            <div
              class="absolute top-full left-0 mt-0 w-[336px] p-5 rounded-lg bg-black/90 text-white text-sm text-left opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10 pointer-events-auto"
            >
              You need to bring your own servers from any cloud provider (such
              as
              <a
                href="https://coolify.io/hetzner"
                class="underline text-white hover:text-warning">Hetzner</a
              >, DigitalOcean, AWS, etc.).
              <br /><br />
              Your apps will be deployed on the server you connect to the cloud,
              while Coolify runs on our managed server.
              <br /><br />
              (You can connect your RPi, old laptop, or any other device that runs
              the
              <a
                href="https://coolify.io/docs/get-started/installation#_2-supported-operating-systems"
                class="underline text-white hover:text-warning"
                >supported operating systems</a
              >.)
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6">
        <a
          href="https://app.coolify.io/register"
          class="text-base font-medium rounded p-4 px-10 text-white bg-coolgray-300 hover:bg-coolgray-400 flex justify-center items-center gap-2"
        >
          <!-- Cloud Icon -->
          <i class="ph-duotone ph-rocket-launch text-warning text-xl" aria-hidden="true"></i>
          Get Started in the Cloud
        </a>
      </div>
    </div>
  </div>

  <!-- Feature Table -->
  <div class="mt-16 overflow-x-auto">
    <table class="w-full table-pin-auto text-left">
      <thead>
        <tr class="bg-coolgray-100">
          <th class="px-6 py-3 font-medium w-1/2">Feature</th>
          <th class="px-6 py-3 font-medium min-w-[120px] whitespace-nowrap"
            >Self-hosted</th
          >
          <th class="px-6 py-3 font-medium min-w-[80px] whitespace-nowrap"
            >Cloud</th
          >
        </tr>
      </thead>
      <tbody class="divide-y divide-coolgray-300">
        <tr>
          <td class="px-6 py-4">Application Deployments</td>
          <td class="px-6 py-4">{@html checkmark()}</td>
          <td class="px-6 py-4">{@html checkmark()}</td>
        </tr>
        <tr>
          <td class="px-6 py-4">Database Deployments</td>
          <td class="px-6 py-4">{@html checkmark()}</td>
          <td class="px-6 py-4">{@html checkmark()}</td>
        </tr>
        <tr>
          <td class="px-6 py-4">Service/One-click Deployments</td>
          <td class="px-6 py-4">{@html checkmark()}</td>
          <td class="px-6 py-4">{@html checkmark()}</td>
        </tr>
        <tr>
          <td class="px-6 py-4">API Access</td>
          <td class="px-6 py-4">{@html checkmark()}</td>
          <td class="px-6 py-4">{@html checkmark()}</td>
        </tr>
        <tr>
          <td class="px-6 py-4">Codebase</td>
          <td class="px-6 py-4 text-neutral-400">Open source</td>
          <td class="px-6 py-4 text-neutral-400">Open source</td>
        </tr>
        <tr>
          <td class="px-6 py-4">Coolify Hosting</td>
          <td class="px-6 py-4 text-neutral-400">Self-managed</td>
          <td class="px-6 py-4 text-neutral-400">Managed</td>
        </tr>
        <tr>
          <td class="px-6 py-4">Coolify Dashboard Domain</td>
          <td class="px-6 py-4 text-neutral-400">Custom Domain</td>
          <td class="px-6 py-4 text-neutral-400">app.coolify.io</td>
        </tr>
        <tr>
          <td class="px-6 py-4">Coolify Setup</td>
          <td class="px-6 py-4 text-neutral-400">Manual</td>
          <td class="px-6 py-4 text-neutral-400">Managed</td>
        </tr>
        <tr>
          <td class="px-6 py-4">Coolify Backups</td>
          <td class="px-6 py-4 text-neutral-400"
            >Self-managed (but automated)</td
          >
          <td class="px-6 py-4 text-neutral-400">Managed</td>
        </tr>
        <tr>
          <td class="px-6 py-4">
            <span
              class="underline decoration-dotted underline-offset-4 cursor-help relative group"
            >
              Updates *
              <span
                class="absolute bottom-full left-0 mb-2 min-w-max max-w-sm rounded bg-black text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap"
              >
                Limited to Coolify updates, does not include changes to deployed
                resources.
              </span>
            </span>
          </td>
          <td class="px-6 py-4 text-neutral-400">Manual (but automated)</td>
          <td class="px-6 py-4 text-neutral-400">Managed</td>
        </tr>

        <tr>
          <td class="px-6 py-4">
            <span
              class="underline decoration-dotted underline-offset-4 cursor-help relative group"
            >
              Email Alerts *
              <span
                class="absolute bottom-full left-0 mb-2 min-w-max max-w-sm rounded bg-black text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap"
              >
                Other alerts (Discord, Telegram, etc.) are also supported, but
                those needs to be configured manually on each type, self-hosted
                or cloud.
              </span>
            </span>
          </td>
          <td class="px-6 py-4 text-neutral-400"
            >Manual (requires SMTP/Resend)</td
          >
          <td class="px-6 py-4 text-neutral-400">Managed</td>
        </tr>
        <tr>
          <td class="px-6 py-4">Teams</td>
          <td class="px-6 py-4 text-neutral-400">Unlimited</td>
          <td class="px-6 py-4 text-neutral-400">
            <span
              class="underline decoration-dotted underline-offset-4 cursor-help relative group"
            >
              Unlimited *
              <span
                class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs rounded bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"
              >
                Requires an additional subscription per team.
              </span>
            </span>
          </td>
        </tr>

        <tr>
          <td class="px-6 py-4">Team Members</td>
          <td class="px-6 py-4 text-neutral-400">Unlimited</td>
          <td class="px-6 py-4 text-neutral-400">Unlimited</td>
        </tr>
        <tr>
          <td class="px-6 py-4">Connected Servers</td>
          <td class="px-6 py-4 text-neutral-400">Unlimited</td>
          <td class="px-6 py-4 text-neutral-400">Unlimited</td>
        </tr>
        <tr>
          <td class="px-6 py-4">Any Other Upcoming Features</td>
          <td class="px-6 py-4 text-neutral-400">Unlimited & Free Forever</td>
          <td class="px-6 py-4 text-neutral-400">Included In The Price</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- FAQ -->
  <div class="mt-16 max-w-3xl mx-auto">
    <h2 class="text-2xl font-medium mb-6">Frequently Asked Questions</h2>
    <div class="divide-y divide-coolgray-300 border-y border-coolgray-300">
      {#each faqs as { question, answer }, i}
        <div class="py-4">
          <button
            on:click={() => (openFAQ = openFAQ === i ? null : i)}
            class="w-full text-left text-sm font-medium flex justify-between items-center"
          >
            <span>{question}</span>
            <i class="ph-duotone ph-caret-down text-xl transition-transform duration-200" aria-hidden="true"></i>
          </button>
          {#if openFAQ === i}
            <p class="mt-2 text-sm text-neutral-300 text-left">{answer}</p>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>
