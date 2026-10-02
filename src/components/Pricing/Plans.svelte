<script>
  import { onMount } from "svelte";
  import Icon from "../Icon.svelte";
  import Check from "reicon/icons/Check";
  import ChevronDown from "reicon/icons/ChevronDown";
  import Cloud from "reicon/icons/Cloud";
  import HardDrive from "reicon/icons/HardDrive";
  import InfoCircle from "reicon/icons/InfoCircle";

  let freq = "monthly";
  let openFAQ = null;
  let communityMembers = "20k+";

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
    fetch("https://cdn.coollabs.io/business.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.discord) {
          communityMembers = `${(data.discord / 1000).toFixed(0)}k+`;
        }
      })
      .catch(() => {});
  });

  const selfHostedFeatures = [
    "Full access to all features",
    "Need your own infrastructure for Coolify",
    "No limitation or restrictions",
    null, // community support, rendered with live member count
    "Automated or self-managed updates",
    "Includes all upcoming features",
  ];

  const cloudFeatures = [
    "Connect unlimited servers",
    "Unlimited deployments per server",
    "Free email alerts for Coolify events",
    "Community + limited email support",
    "Founder-tested updates",
  ];

  const segment =
    "cursor-pointer rounded px-3 py-1 text-xs font-medium transition-colors sm:text-sm has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-warning";
  const td = "px-4 py-3";
  const tdDim = "px-4 py-3 text-fg-dim";
  const tip =
    "underline decoration-fg-faint decoration-dotted underline-offset-4 cursor-help relative group";
  const tipBox =
    "absolute bottom-full z-10 mb-2 w-max max-w-xs rounded-md bg-raised px-3 py-2 text-xs font-normal whitespace-normal text-fg-dim ring-1 ring-hairline opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible";
</script>

<div class="mx-auto max-w-5xl px-4 pt-10 pb-4 text-left">
  <!-- Plan cards -->
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <!-- Self-hosted -->
    <div class="card flex flex-col justify-between p-6">
      <div>
        <div class="flex items-center gap-3">
          <div class="flex size-8 items-center justify-center rounded-md bg-white/[0.06] ring-1 ring-hairline">
            <Icon icon={HardDrive} class="size-4 text-warning" />
          </div>
          <h2 class="text-lg font-semibold tracking-tight text-fg">Self-hosted</h2>
        </div>
        <p class="mt-5 text-3xl font-semibold tracking-tight text-fg">Free forever</p>
        <p class="mt-4 text-sm leading-6 text-fg-dim">
          Deploy Coolify on your infrastructure without any restrictions on
          features.
        </p>
        <ul class="mt-5 space-y-2.5 text-sm text-fg-dim">
          {#each selfHostedFeatures as feature}
            <li class="flex items-start gap-2.5">
              <Icon icon={Check} class="mt-0.5 size-4 flex-none text-success" />
              {#if feature}
                {feature}
              {:else}
                Community support ({communityMembers} members)
              {/if}
            </li>
          {/each}
        </ul>
      </div>
      <div class="mt-8">
        <a
          href="https://coolify.io/docs/get-started/installation"
          class="btn btn-neutral btn-lg w-full"
        >
          <Icon icon={HardDrive} class="size-4" />
          Start self-hosting
        </a>
      </div>
    </div>

    <!-- Cloud -->
    <div class="card flex flex-col justify-between p-6 ring-coollabs/40">
      <div>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="flex size-8 items-center justify-center rounded-md bg-white/[0.06] ring-1 ring-hairline">
              <Icon icon={Cloud} class="size-4 text-warning" />
            </div>
            <h2 class="text-lg font-semibold tracking-tight text-fg">Cloud</h2>
          </div>
          <fieldset
            class="inline-flex gap-0.5 rounded-md bg-white/[0.04] p-0.5 whitespace-nowrap ring-1 ring-hairline"
          >
            <legend class="sr-only">Billing period</legend>
            <label
              class="{segment} {freq === 'monthly'
                ? 'bg-selected text-fg'
                : 'text-fg-faint hover:text-fg'}"
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
              class="{segment} {freq === 'yearly'
                ? 'bg-selected text-fg'
                : 'text-fg-faint hover:text-fg'}"
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

        <p class="mt-5 text-3xl font-semibold tracking-tight text-fg">
          <span class="font-mono tabular-nums">{freq === "monthly" ? "$5" : "$4"}</span>
          <span class="text-sm font-normal tracking-normal text-fg-faint"
            >/month base price (connect 2 servers)</span
          >
        </p>
        <p class="mt-1 text-sm font-medium text-warning">
          + <span class="font-mono tabular-nums">{freq === "monthly" ? "$3" : "$2.70"}</span> /month per additional server
        </p>

        <p class="mt-4 text-sm leading-6 text-fg-dim">
          Just connect your servers, Coolify runs on our managed infrastructure.
        </p>
        <ul class="mt-5 space-y-2.5 text-sm text-fg-dim">
          {#each cloudFeatures as feature}
            <li class="flex items-start gap-2.5">
              <Icon icon={Check} class="mt-0.5 size-4 flex-none text-success" />
              {feature}
            </li>
          {/each}
        </ul>
        <div class="mt-5 flex items-center gap-2 text-sm text-warning">
          <Icon icon={InfoCircle} class="size-4 flex-none" />
          <div class="group relative">
            <span
              class="cursor-help underline decoration-warning/50 decoration-dotted underline-offset-4"
            >
              You need to bring your own servers
            </span>
            <div
              class="invisible absolute top-full left-0 z-10 mt-2 w-[min(336px,calc(100vw-5rem))] rounded-lg bg-raised p-4 text-sm leading-6 text-fg-dim opacity-0 ring-1 ring-hairline group-hover:visible group-hover:opacity-100"
            >
              You need to bring your own servers from any cloud provider (such
              as
              <a
                href="https://coolify.io/hetzner"
                class="text-fg underline decoration-fg-faint underline-offset-2 hover:decoration-fg">Hetzner</a
              >, DigitalOcean, AWS, etc.).
              <br /><br />
              Your apps will be deployed on the server you connect to the cloud,
              while Coolify runs on our managed server.
              <br /><br />
              (You can connect your RPi, old laptop, or any other device that runs
              the
              <a
                href="https://coolify.io/docs/get-started/installation#_2-supported-operating-systems"
                class="text-fg underline decoration-fg-faint underline-offset-2 hover:decoration-fg"
                >supported operating systems</a
              >.)
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <a
          href="https://app.coolify.io/register"
          class="btn btn-primary btn-lg w-full"
        >
          <Icon icon={Cloud} class="size-4" />
          Get started in the cloud
        </a>
      </div>
    </div>
  </div>

  <!-- Comparison -->
  <div class="mt-20 text-center">
    <p class="eyebrow">Compare</p>
    <h2 class="mt-2 text-2xl font-semibold tracking-tight text-fg md:text-3xl">
      Self-hosted vs Cloud
    </h2>
  </div>
  <div class="card mt-8 overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-hairline text-xs text-fg-faint">
          <th class="w-1/2 px-4 py-3 font-medium">Feature</th>
          <th class="min-w-[120px] px-4 py-3 font-medium whitespace-nowrap">Self-hosted</th>
          <th class="min-w-[80px] px-4 py-3 font-medium whitespace-nowrap">Cloud</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-hairline text-fg">
        <tr>
          <td class={td}>Application deployments</td>
          <td class={td}><Icon icon={Check} class="size-4 text-success" /></td>
          <td class={td}><Icon icon={Check} class="size-4 text-success" /></td>
        </tr>
        <tr>
          <td class={td}>Database deployments</td>
          <td class={td}><Icon icon={Check} class="size-4 text-success" /></td>
          <td class={td}><Icon icon={Check} class="size-4 text-success" /></td>
        </tr>
        <tr>
          <td class={td}>Service/one-click deployments</td>
          <td class={td}><Icon icon={Check} class="size-4 text-success" /></td>
          <td class={td}><Icon icon={Check} class="size-4 text-success" /></td>
        </tr>
        <tr>
          <td class={td}>API access</td>
          <td class={td}><Icon icon={Check} class="size-4 text-success" /></td>
          <td class={td}><Icon icon={Check} class="size-4 text-success" /></td>
        </tr>
        <tr>
          <td class={td}>Codebase</td>
          <td class={tdDim}>Open source</td>
          <td class={tdDim}>Open source</td>
        </tr>
        <tr>
          <td class={td}>Coolify hosting</td>
          <td class={tdDim}>Self-managed</td>
          <td class={tdDim}>Managed</td>
        </tr>
        <tr>
          <td class={td}>Coolify dashboard domain</td>
          <td class={tdDim}>Custom domain</td>
          <td class={tdDim}>app.coolify.io</td>
        </tr>
        <tr>
          <td class={td}>Coolify setup</td>
          <td class={tdDim}>Manual</td>
          <td class={tdDim}>Managed</td>
        </tr>
        <tr>
          <td class={td}>Coolify backups</td>
          <td class={tdDim}>Self-managed (but automated)</td>
          <td class={tdDim}>Managed</td>
        </tr>
        <tr>
          <td class={td}>
            <span class={tip}>
              Updates *
              <span class="{tipBox} left-0">
                Limited to Coolify updates, does not include changes to deployed
                resources.
              </span>
            </span>
          </td>
          <td class={tdDim}>Manual (but automated)</td>
          <td class={tdDim}>Managed</td>
        </tr>
        <tr>
          <td class={td}>
            <span class={tip}>
              Email alerts *
              <span class="{tipBox} left-0">
                Other alerts (Discord, Telegram, etc.) are also supported, but
                those needs to be configured manually on each type, self-hosted
                or cloud.
              </span>
            </span>
          </td>
          <td class={tdDim}>Manual (requires SMTP/Resend)</td>
          <td class={tdDim}>Managed</td>
        </tr>
        <tr>
          <td class={td}>Teams</td>
          <td class={tdDim}>Unlimited</td>
          <td class={tdDim}>
            <span class={tip}>
              Unlimited *
              <span class="{tipBox} right-0">
                Requires an additional subscription per team.
              </span>
            </span>
          </td>
        </tr>
        <tr>
          <td class={td}>Team members</td>
          <td class={tdDim}>Unlimited</td>
          <td class={tdDim}>Unlimited</td>
        </tr>
        <tr>
          <td class={td}>Connected servers</td>
          <td class={tdDim}>Unlimited</td>
          <td class={tdDim}>Unlimited</td>
        </tr>
        <tr>
          <td class={td}>Any other upcoming features</td>
          <td class={tdDim}>Unlimited & free forever</td>
          <td class={tdDim}>Included in the price</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- FAQ -->
  <div class="mx-auto mt-20 max-w-3xl">
    <div class="text-center">
      <p class="eyebrow">FAQ</p>
      <h2 class="mt-2 text-2xl font-semibold tracking-tight text-fg md:text-3xl">
        Frequently asked questions
      </h2>
    </div>
    <div class="card mt-8 divide-y divide-hairline">
      {#each faqs as { question, answer }, i}
        <div>
          <button
            on:click={() => (openFAQ = openFAQ === i ? null : i)}
            aria-expanded={openFAQ === i}
            class="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-fg transition-colors hover:bg-white/[0.03] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-warning"
          >
            <span>{question}</span>
            <span class="flex-none text-fg-faint" class:rotate-180={openFAQ === i}>
              <Icon icon={ChevronDown} class="size-4" />
            </span>
          </button>
          {#if openFAQ === i}
            <p class="px-4 pb-4 text-sm leading-6 text-fg-dim">{answer}</p>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>
