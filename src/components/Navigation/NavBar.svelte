<script lang="ts">
  import { onMount } from "svelte";

  import IconPhilosophy from "../Icons/IconPhilosophy.svelte";
  import IconContributors from "../Icons/IconContributors.svelte";
  import IconPricing from "../Icons/IconPricing.svelte";
  import IconServices from "../Icons/IconServices.svelte";
  import IconDocs from "../Icons/IconDocs.svelte";
  import IconMerch from "../Icons/IconMerch.svelte";
  import IconSponsorUs from "../Icons/IconSponsorUs.svelte";
  import IconChangelog from "../Icons/IconChangelog.svelte";
  import IconDiscord from "../Icons/IconDiscord.svelte";
  import IconGitHub from "../Icons/IconGitHub.svelte";

  type NavLink = {
    href: string;
    label: string;
    icon: typeof IconPhilosophy;
    external?: boolean;
  };

  const navLinks: NavLink[] = [
    { href: "/philosophy", label: "Philosophy", icon: IconPhilosophy },
    { href: "/contributors", label: "Contributors", icon: IconContributors },
    { href: "/pricing", label: "Pricing", icon: IconPricing },
    { href: "/services", label: "Services", icon: IconServices },
    { href: "https://coolify.io/docs/", label: "Docs", icon: IconDocs, external: true },
    { href: "https://shop.coollabs.io?utm_source=coolify", label: "Merch", icon: IconMerch, external: true },
    { href: "/sponsorships", label: "Sponsor Us", icon: IconSponsorUs },
    { href: "/changelog", label: "Changelog", icon: IconChangelog }
  ];

  let mobileOpen = false;
  let mobilePanel: HTMLDivElement | null = null;
  let hasMounted = false;

  let prefersReducedMotion = false;

  let discordMembers: number | null = null;
  let githubStars: number | null = null;

  function formatCompact(n: number) {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 10_000) return `${Math.round(n / 1000)}k`;
    if (n >= 1_000) return `${(n / 1000).toFixed(1)}k`;
    return `${n}`;
  }

  function closeMobileMenu() {
    mobileOpen = false;
  }

  function toggleMobileMenu() {
    mobileOpen = !mobileOpen;
  }

  function animateMobilePanel(isOpen: boolean) {
    if (!hasMounted || !mobilePanel) return;

    const panel = mobilePanel;
    const targetHeight = isOpen ? panel.scrollHeight : 0;

    if (prefersReducedMotion) {
      panel.style.height = isOpen ? "auto" : "0px";
      panel.style.opacity = isOpen ? "1" : "0";
      panel.style.overflow = isOpen ? "visible" : "hidden";
      return;
    }

    panel.style.overflow = "hidden";
    panel.style.height = `${targetHeight}px`;
    panel.style.opacity = isOpen ? "1" : "0";
    panel.style.filter = isOpen ? "blur(0px)" : "blur(6px)";
  }

  $: if (hasMounted && mobilePanel) {
    if (!mobileOpen) {
      mobilePanel.style.height = "0px";
      mobilePanel.style.opacity = "0";
      mobilePanel.style.overflow = "hidden";
    } else {
      mobilePanel.style.height = "auto";
      mobilePanel.style.opacity = "1";
      mobilePanel.style.overflow = "visible";
    }
  }

  let prevMobileOpen = mobileOpen;
  $: if (hasMounted && mobileOpen !== prevMobileOpen) {
    prevMobileOpen = mobileOpen;
    animateMobilePanel(mobileOpen);
  }

  onMount(() => {
    hasMounted = true;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion = mq.matches;

    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };

    mq.addEventListener?.("change", onMotionChange);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onKeyDown);

    const onResize = () => {
      if (window.innerWidth >= 1280) closeMobileMenu();
    };
    window.addEventListener("resize", onResize);

    fetch("https://cdn-new.coollabs.io/business.json")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data?.discord === "number") discordMembers = data.discord;
      })
      .catch(() => {});

    fetch("https://api.github.com/repos/coollabsio/coolify")
      .then((r) => (r.ok ? r.json() : null))
      .then((repo) => {
        if (repo && typeof repo.stargazers_count === "number") githubStars = repo.stargazers_count;
      })
      .catch(() => {});

    return () => {
      mq.removeEventListener?.("change", onMotionChange);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  });
</script>

<header
  class="sticky top-0 z-50 border-b border-coolgray-300/40 bg-base-100/70 backdrop-blur-xl"
>
  <nav class="mx-auto h-16 max-w-[96rem] px-4">
    <div class="grid h-full grid-cols-[auto_1fr_auto] items-center gap-3">
      <a href="/" class="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coollabs/60 rounded-md">
        <img src="/android-launchericon-48-48.png" alt="Coolify" class="size-6" />
        <span class="text-xl block text-white font-bold tracking-tight">Coolify</span>
      </a>

      <!-- Center links (desktop) -->
      <div class="hidden xl:flex items-center justify-center">
        <div class="flex items-center gap-1">
          {#each navLinks as link (link.href)}
            <a
              href={link.href}
              class="navbar-link relative"
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              <svelte:component this={link.icon} class="size-5 text-warning" />
              {link.label}
            </a>
          {/each}
        </div>
      </div>

      <!-- Right actions -->
      <div class="flex items-center justify-end gap-2">
        <div class="hidden sm:flex items-center gap-2">
          <a
            href="https://coollabs.io/discord"
            class="social-pill group"
            aria-label="Join our community on Discord"
          >
            <IconDiscord class="size-4 text-indigo-400" />
            <span class="tabular-nums">{discordMembers ? formatCompact(discordMembers) : "20k"}</span>
            <span class="opacity-70">Members</span>
            <span class="tooltip" role="tooltip">Join our community</span>
          </a>

          <a
            href="https://github.com/coollabsio/coolify"
            class="social-pill group github-pill"
            aria-label="View Coolify on GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGitHub class="size-4" />
            <span class="tabular-nums">{githubStars ? formatCompact(githubStars) : "55k"}</span>
            <span class="opacity-70 shimmer-text">Stars</span>
            <span class="tooltip" role="tooltip">View on GitHub</span>
          </a>
        </div>

        <a
          href="https://app.coolify.io"
          class="cta-pill"
        >
          Try Cloud
        </a>

        <button
          class="xl:hidden menu-button"
          on:click={toggleMobileMenu}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span class="sr-only">Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"}
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile panel (pushes content down) -->
    <div
      id="mobile-nav-panel"
      class="xl:hidden mobile-panel"
      bind:this={mobilePanel}
    >
      <div class="flex flex-col gap-2 px-1 pb-4 pt-2">
        {#each navLinks as link (link.href)}
          <a
            href={link.href}
            class="navbar-link"
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            on:click={closeMobileMenu}
          >
            <svelte:component this={link.icon} class="size-5 text-warning" />
            {link.label}
          </a>
        {/each}

        <div class="pt-1 flex flex-col gap-2">
          <a
            href="https://coollabs.io/discord"
            class="social-pill w-full justify-center"
            on:click={closeMobileMenu}
          >
            <IconDiscord class="size-4 text-indigo-400" />
            <span class="tabular-nums">{discordMembers ? formatCompact(discordMembers) : "20k"}</span>
            <span class="opacity-70">Members</span>
          </a>

          <a
            href="https://github.com/coollabsio/coolify"
            class="social-pill w-full justify-center github-pill"
            target="_blank"
            rel="noopener noreferrer"
            on:click={closeMobileMenu}
          >
            <IconGitHub class="size-4" />
            <span class="tabular-nums">{githubStars ? formatCompact(githubStars) : "55k"}</span>
            <span class="opacity-70">Stars</span>
          </a>

          <a
            href="https://app.coolify.io"
            class="cta-pill w-full justify-center"
            on:click={closeMobileMenu}
          >
            Try Cloud
          </a>
        </div>
      </div>
    </div>
  </nav>
</header>

<style>
  @reference "../../styles/global.css";

  :global(.navbar-link) {
    gap: 0.6rem;
  }

  .menu-button {
    @apply text-white p-2 rounded-md transition-colors hover:bg-coolgray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coollabs/60;
  }

  .mobile-panel {
    overflow: hidden;
    height: 0;
    opacity: 0;
    filter: blur(6px);
    background: rgba(16, 16, 16, 0.95);
    border-radius: 0 0 12px 12px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-top: none;
    transition: height 280ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 280ms ease, filter 280ms ease;
  }

  .social-pill {
    @apply relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white;
    transition: background-color 250ms ease, border-color 250ms ease, box-shadow 250ms ease, transform 200ms ease;
    will-change: transform;
  }

  .social-pill:hover {
    @apply border-coollabs/40;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 4px rgba(107, 22, 237, 0.10);
  }

  .social-pill:active {
    transform: translateY(0px) scale(0.98);
  }

  .github-pill:hover {
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 4px rgba(252, 211, 77, 0.08);
  }

  .tooltip {
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(-4px);
    padding: 0.45rem 0.6rem;
    border-radius: 0.75rem;
    background: rgba(16, 16, 16, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: white;
    font-size: 0.75rem;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 160ms ease, transform 160ms ease;
    z-index: 40;
  }

  .group:hover .tooltip,
  .group:focus-within .tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .cta-pill {
    @apply relative inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coollabs/60;
    background: linear-gradient(135deg, var(--color-coollabs), var(--color-coollabs-100));
    box-shadow: 0 12px 30px rgba(107, 22, 237, 0.24);
    overflow: hidden;
    transition: box-shadow 200ms ease, transform 180ms ease;
  }

  .cta-pill::after {
    content: "";
    position: absolute;
    inset: -40% -60%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.25),
      transparent
    );
    transform: translateX(-45%) rotate(12deg);
    transition: transform 300ms ease;
  }

  .cta-pill:hover {
    box-shadow: 0 16px 40px rgba(107, 22, 237, 0.35);
  }

  .cta-pill:active {
    transform: translateY(0px) scale(0.98);
  }

  .cta-pill:hover::after {
    transform: translateX(45%) rotate(12deg);
  }

  .shimmer-text {
    position: relative;
  }

  .github-pill:hover .shimmer-text {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.65), var(--color-warning), rgba(255, 255, 255, 0.65));
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: shimmer 800ms ease forwards;
  }

  @keyframes shimmer {
    from {
      background-position: 0% 50%;
    }
    to {
      background-position: 100% 50%;
    }
  }
</style>