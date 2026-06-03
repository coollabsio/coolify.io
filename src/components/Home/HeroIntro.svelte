<script lang="ts">
  import { onMount } from "svelte";

  import IconGitHub from "../Icons/IconGitHub.svelte";
  import IconPhilosophy from "../Icons/IconPhilosophy.svelte";
  import IconCloud from "../Icons/IconCloud.svelte";
  import IconRobot from "../Icons/IconRobot.svelte";

  import Instances from "../Instances.svelte";

  export type Contributor = {
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
  };

  export type Sponsor = {
    name: string;
    image: { url: string };
    url: string;
  };

  export let cloudUsers = 3641;
  export let contributorsCount = 650;
  export let topContributors: Contributor[] = [];

  let prefersReducedMotion = false;
  let contributorCountAnimated = 0;
  let sponsorCountAnimated = 0;
  let servicesCountAnimated = 0;
  let topSponsors: Sponsor[] = [];
  let totalSponsors = 0;
  let countsTriggered = false;
  let heroEl: HTMLDivElement;
  let contribAnimated: number[] = [];
  let contribTriggered: boolean[] = [];

  const providers = ["Vercel", "Heroku", "Netlify", "Railway"];
  const serviceTypes = ["websites", "databases", "web applications"];

  function countUp(
    setter: (v: number) => void,
    to: number,
    durationMs: number
  ) {
    if (prefersReducedMotion) {
      setter(to);
      return;
    }
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setter(Math.round(from + (to - from) * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function triggerSponsorCount() {
    if (totalSponsors > 0) {
      countUp((v) => (sponsorCountAnimated = v), totalSponsors, 2000);
    }
  }

  function animateContrib(index: number, to: number) {
    if (contribTriggered[index] || prefersReducedMotion) {
      if (prefersReducedMotion) contribAnimated[index] = to;
      return;
    }
    contribTriggered[index] = true;
    countUp((v) => (contribAnimated[index] = v), to, 800);
  }

  function setupObserver(el: HTMLDivElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!prefersReducedMotion) {
              el.classList.add("animate-fade-up");
            }
            countsTriggered = true;
            countUp(
              (v) => (contributorCountAnimated = v),
              contributorsCount,
              2000
            );
            triggerSponsorCount();
            countUp((v) => (servicesCountAnimated = v), 280, 2000);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }

  onMount(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mq.addEventListener?.("change", onChange);
    contributorCountAnimated = prefersReducedMotion ? contributorsCount : 0;
    servicesCountAnimated = prefersReducedMotion ? 280 : 0;

    fetch("https://raw.githubusercontent.com/coollabsio/coollabs-cdn/main/json/sponsors.json")
      .then((r) => r.json())
      .then((data) => {
        topSponsors = (data.tiers?.huge ?? []).slice(0, 4);
        const huge = data.tiers?.huge?.length ?? 0;
        const big = data.tiers?.big?.length ?? 0;
        const small = data.tiers?.small?.length ?? 0;
        totalSponsors = huge + big + small;
        if (prefersReducedMotion) {
          sponsorCountAnimated = totalSponsors;
        } else if (countsTriggered) {
          triggerSponsorCount();
        }
      })
      .catch((err) => console.error("Failed to load sponsors count", err));
    return () => {
      mq.removeEventListener?.("change", onChange);
    };
  });
</script>

<div bind:this={heroEl} class="max-w-5xl mx-auto text-center px-4 relative" use:setupObserver>
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="hero-bg hero-bg-2" aria-hidden="true"></div>
  <!-- badges -->
  <div class="flex justify-center gap-2 overflow-x-auto scrollbar-none -mx-4 px-4">
    <a
      href="https://github.com/coollabsio/coolify"
      target="_blank"
      rel="noopener noreferrer"
      class="badge-card group"
    >
      <IconGitHub class="size-4 shrink-0" />
      <span class="truncate">Open Source</span>
    </a>

    <a
      href="/philosophy"
      class="badge-card group"
    >
      <IconPhilosophy class="size-4 text-warning shrink-0" />
      <span class="truncate">Backed by CoolLabs Philosophy</span>
    </a>
  </div>

  <h1
    class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-5 max-w-4xl mx-auto leading-[1.15] bg-gradient-to-b from-white via-white to-neutral-300 bg-clip-text text-transparent"
  >
    Self-host with superpowers<span class="text-warning">.</span>
  </h1>

  <p class="mt-4 text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
    An open-source & self-hostable alternative to
  </p>

  <div class="flex flex-wrap gap-1.5 justify-center mt-1.5">
    {#each providers as p}
      <span class="pill">{p}</span>
    {/each}
  </div>

  <p class="mt-2 text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
    for easily deploying
  </p>

  <div class="flex flex-wrap gap-1.5 justify-center mt-1.5">
    {#each serviceTypes as s}
      <span class="pill">{s}</span>
    {/each}
  </div>

  <p class="mt-2 text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
    and <span class="tabular-nums font-semibold text-warning">{servicesCountAnimated}+</span> one-click services to your own server<span class="text-warning">.</span>
  </p>

  <!-- CTA -->
  <div class="mt-6 flex flex-row flex-wrap gap-2 sm:gap-3 justify-center w-full">
    <div class="flex flex-col items-center">
      <a href="/cloud" class="hero-button-primary group">
        <IconCloud class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span>Try Cloud</span>
        <span class="sweep" aria-hidden="true"></span>
      </a>
      <div class="hero-stats">
        <span class="text-warning font-bold tabular-nums">{cloudUsers}+</span>
        developers on Cloud
      </div>
    </div>

    <div class="flex flex-col items-center">
      <a href="/self-hosted" class="hero-button-secondary">
        <IconRobot class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span>Self-host</span>
      </a>
      <Instances />
    </div>
  </div>

  <div class="mt-4 flex items-center justify-center gap-3 sm:gap-5">
    <div class="flex items-center gap-1.5">
      <div class="contrib-avatar-stack">
        {#each topContributors.slice(0, 3) as c, i (c.login)}
          <a
            href={c.html_url}
            target="_blank"
            rel="noopener noreferrer"
            class="contrib-avatar group"
            aria-label={`Contributor ${c.login}`}
            onmouseenter={() => animateContrib(i, c.contributions)}
            onfocus={() => animateContrib(i, c.contributions)}
          >
            <span class="contrib-avatar-img">
              <img src={c.avatar_url} alt={c.login} loading="lazy" />
            </span>
            <span class="sponsor-tooltip" role="tooltip">
              <span class="contrib-tooltip-name">{c.login}</span>
              <span class="contrib-tooltip-count">{contribAnimated[i] || 0}+<span class="contrib-tooltip-label"> contributions</span></span>
              <span class="tooltip-line" aria-hidden="true"></span>
            </span>
          </a>
        {/each}
      </div>
      <div class="text-xs text-neutral-500">
        <span class="tabular-nums font-semibold text-white/90">{contributorCountAnimated}+</span>
        Contributors
      </div>
    </div>
    <div class="flex items-center gap-1.5">
      <div class="sponsor-avatar-stack">
        {#each topSponsors as s (s.name)}
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            class="sponsor-avatar group"
            aria-label={s.name}
          >
            <span class="sponsor-avatar-img">
              <img src={s.image?.url} alt={s.name} loading="lazy" />
            </span>
            <span class="sponsor-tooltip" role="tooltip">
              {s.name}
              <span class="tooltip-line" aria-hidden="true"></span>
            </span>
          </a>
        {/each}
      </div>
      <div class="text-xs text-neutral-500">
        <span class="tabular-nums font-semibold text-white/90">{sponsorCountAnimated}+</span>
        Sponsors
      </div>
    </div>
  </div>

  <span class="sr-only">
    Alternative to Vercel, Heroku, Netlify and Railway for deploying websites, databases and applications.
  </span>
</div>

<style>
  .scrollbar-none {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }

  .hero-bg {
    position: absolute;
    inset: -40% -20%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.35;
  }

  .hero-bg {
    background: radial-gradient(ellipse 60% 50% at 30% 20%, rgba(107, 22, 237, 0.08), transparent 60%),
                radial-gradient(ellipse 50% 40% at 70% 80%, rgba(107, 22, 237, 0.05), transparent 50%);
    animation: heroBgDrift 12s ease-in-out infinite alternate;
  }

  .hero-bg-2 {
    background: radial-gradient(ellipse 40% 30% at 80% 30%, rgba(252, 211, 77, 0.04), transparent 50%),
                radial-gradient(ellipse 50% 40% at 20% 70%, rgba(107, 22, 237, 0.06), transparent 50%);
    animation: heroBgDrift2 16s ease-in-out infinite alternate;
  }

  @keyframes heroBgDrift {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(2%, -1%) scale(1.05); }
  }

  @keyframes heroBgDrift2 {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(-1.5%, 1.5%) scale(1.08); }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-bg,
    .hero-bg-2 {
      animation: none;
    }
  }

  .badge-card {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 0.65rem;
    border-radius: 0.8rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.8rem;
    backdrop-filter: blur(10px);
    transition: border-color 200ms ease, background-color 200ms ease, transform 250ms ease;
    white-space: nowrap;
    height: 2rem;
  }

  .badge-card:hover {
    border-color: rgba(252, 211, 77, 0.35);
    background: rgba(252, 211, 77, 0.06);
  }

  .badge-card:active {
    transform: scale(0.98);
  }

  .pill {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.82);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: border-color 200ms ease, background-color 200ms ease;
  }



  .hero-button-primary,
  .hero-button-secondary {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.8rem 1.8rem;
    border-radius: 14px;
    font-weight: 650;
    font-size: 0.9rem;
    transition: box-shadow 250ms ease;
    overflow: hidden;
    min-width: 140px;
  }

  @media (max-width: 639px) {
    .hero-button-primary,
    .hero-button-secondary {
      padding: 0.6rem 1rem;
      min-width: 120px;
      font-size: 0.82rem;
      gap: 0.35rem;
    }
  }

  .hero-button-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.06;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
    mix-blend-mode: overlay;
  }

  .hero-button-primary:active,
  .hero-button-secondary:active {
    transform: scale(0.98);
  }

  .hero-button-primary:hover {
    box-shadow: 0 12px 32px rgba(107, 22, 237, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .hero-button-secondary:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.14);
  }

  .hero-button-primary {
    background: linear-gradient(135deg, var(--color-coollabs), var(--color-coollabs-100));
    box-shadow: 0 8px 24px rgba(107, 22, 237, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .hero-button-secondary {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.85);
  }

  .sweep {
    position: absolute;
    inset: -40% -60%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-45%) rotate(12deg);
    transition: transform 350ms ease;
    pointer-events: none;
  }

  .hero-button-primary:hover .sweep {
    transform: translateX(45%) rotate(12deg);
  }

  .hero-stats {
    margin-top: 0.5rem;
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.5);
  }

  .contrib-avatar-stack {
    display: flex;
  }

  .contrib-avatar-stack > * + * {
    margin-left: -8px;
  }

  .contrib-avatar {
    position: relative;
    display: inline-flex;
    width: 32px;
    height: 32px;
    transition: transform 180ms ease;
  }

  .contrib-avatar:hover {
    transform: scale(1.08);
  }

  .contrib-avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 999px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.06);
    border: 2px solid rgba(16, 16, 16, 0.8);
    transition: border-color 180ms ease;
  }

  .contrib-avatar:hover .contrib-avatar-img {
    border-color: rgba(107, 22, 237, 0.55);
  }

  .contrib-avatar:hover .sponsor-tooltip,
  .contrib-avatar:focus-visible .sponsor-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .contrib-avatar-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .sponsor-avatar-stack {
    display: flex;
  }

  .sponsor-avatar-stack > * + * {
    margin-left: -10px;
  }

  .sponsor-avatar {
    position: relative;
    display: inline-flex;
    width: 38px;
    height: 38px;
    transition: transform 180ms ease;
  }

  .sponsor-avatar:hover {
    transform: scale(1.08);
  }

  .sponsor-avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 999px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.06);
    border: 2px solid rgba(107, 22, 237, 0.5);
    transition: border-color 180ms ease;
  }

  .sponsor-avatar:hover .sponsor-avatar-img {
    border-color: rgba(252, 211, 77, 0.7);
  }

  .sponsor-avatar-img img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 3px;
    display: block;
  }

  .sponsor-tooltip {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 12px);
    transform: translateX(-50%) translateY(6px);
    padding: 0.45rem 0.7rem 0.6rem;
    border-radius: 0.7rem;
    background: rgba(16, 16, 16, 0.94);
    border: 1px solid rgba(252, 211, 77, 0.15);
    color: white;
    font-size: 0.72rem;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 180ms ease, transform 180ms ease;
    z-index: 30;
    letter-spacing: 0.02em;
    text-align: center;
  }

  .contrib-tooltip-name {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    color: #fff;
    line-height: 1.3;
  }

  .contrib-tooltip-count {
    display: block;
    font-size: 0.85rem;
    font-weight: 700;
    color: #fcd34d;
    line-height: 1.4;
  }

  .contrib-tooltip-label {
    font-size: 0.65rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
  }

  .sponsor-avatar:hover .sponsor-tooltip,
  .sponsor-avatar:focus-visible .sponsor-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .tooltip-line {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(252, 211, 77, 0.3) 15%,
      rgba(252, 211, 77, 0.8) 50%,
      rgba(252, 211, 77, 0.3) 85%,
      transparent 100%
    );
    pointer-events: none;
  }
</style>
