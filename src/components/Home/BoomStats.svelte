<script lang="ts">
  import { onMount, tick } from "svelte";

  type StatFormat = "currency" | "number" | "compactK";

  type Stat = {
    key: string;
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    format: StatFormat;
  };

  const stats: Stat[] = [
    { key: "mrr", value: 17_000, label: "MRR", prefix: "$", suffix: "+", format: "currency" },
    {
      key: "github",
      value: 4_500,
      label: "GitHub Sponsors / month",
      prefix: "$",
      suffix: "+",
      format: "currency"
    },
    {
      key: "opencollective",
      value: 1_200,
      label: "Open Collective / month",
      prefix: "$",
      suffix: "+",
      format: "currency"
    },
    { key: "cloud", value: 3_641, label: "Cloud Users", suffix: "+", format: "number" },
    { key: "contributors", value: 650, label: "Contributors", suffix: "+", format: "number" },
    { key: "stars", value: 55_000, label: "Stars", suffix: "+", format: "compactK" }
  ];

  let prefersReducedMotion = false;
  let hasAnimated = false;

  let confettiRoot: HTMLDivElement | null = null;
  let sectionEl: HTMLElement;

  let displayed: Record<string, number> = Object.fromEntries(stats.map((s) => [s.key, 0]));

  const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

  function formatValue(stat: Stat, value: number) {
    if (stat.format === "currency") return `${stat.prefix ?? ""}${nf.format(value)}${stat.suffix ?? ""}`;
    if (stat.format === "compactK") {
      if (value >= 1000) return `${Math.round(value / 1000)}k${stat.suffix ?? ""}`;
      return `${value}${stat.suffix ?? ""}`;
    }
    return `${stat.prefix ?? ""}${nf.format(value)}${stat.suffix ?? ""}`;
  }

  function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  function countUp(key: string, to: number, durationMs: number, delayMs: number) {
    return new Promise<void>((resolve) => {
      if (prefersReducedMotion) {
        displayed[key] = to;
        resolve();
        return;
      }

      window.setTimeout(() => {
        const start = performance.now();
        const from = 0;

        const tickFrame = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = easeOutCubic(t);
          displayed[key] = Math.round(from + (to - from) * eased);
          if (t < 1) requestAnimationFrame(tickFrame);
          else resolve();
        };

        requestAnimationFrame(tickFrame);
      }, delayMs);
    });
  }

  function burstConfetti() {
    if (prefersReducedMotion || !confettiRoot) return;

    const root = confettiRoot;
    root.innerHTML = "";

    const colors = ["#6B16ED", "#FCD34D", "#ffffff", "#a855f7"];
    const pieces = 22;

    for (let i = 0; i < pieces; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";

      const angle = (Math.PI * 2 * i) / pieces + (Math.random() - 0.5) * 0.35;
      const distance = 60 + Math.random() * 90;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - 16;
      const rot = (Math.random() - 0.5) * 540;
      const scale = 0.9 + Math.random() * 0.7;

      const startTransform = "translate(-50%, -50%) translate(0px, 0px) rotate(0deg)";
      const endTransform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;

      piece.style.background = colors[i % colors.length];
      piece.style.transform = startTransform;
      piece.style.setProperty("--end-transform", endTransform);

      root.appendChild(piece);

      requestAnimationFrame(() => {
        piece.style.transition = "all 0.9s ease-out";
        piece.style.transitionDelay = `${i * 8}ms`;
        piece.style.opacity = "0";
        piece.style.transform = endTransform;
      });
    }

    window.setTimeout(() => {
      if (confettiRoot) confettiRoot.innerHTML = "";
    }, 1200);
  }

  async function runCountersAndConfetti() {
    if (hasAnimated) return;
    hasAnimated = true;

    displayed = Object.fromEntries(stats.map((s) => [s.key, prefersReducedMotion ? s.value : 0]));

    const promises = stats.map((s, idx) => countUp(s.key, s.value, 900, idx * 90));
    await Promise.all(promises);

    await tick();
    burstConfetti();
  }

  function setupObserver(el: HTMLElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!prefersReducedMotion) {
              const header = el.querySelector("[data-boom-header]");
              const cards = el.querySelectorAll("[data-boom-card]");
              header?.classList.add("animate-scale-in");
              cards.forEach((card, i) => {
                (card as HTMLElement).style.animationDelay = `${i * 70}ms`;
                card.classList.add("animate-scale-in");
              });
            }
            runCountersAndConfetti();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25 }
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

    displayed = Object.fromEntries(stats.map((s) => [s.key, prefersReducedMotion ? s.value : 0]));

    return () => {
      mq.removeEventListener?.("change", onChange);
    };
  });
</script>

<section bind:this={sectionEl} class="relative overflow-hidden pt-16 sm:pt-20" aria-labelledby="boom-title" use:setupObserver>
  <div class="mx-auto max-w-5xl px-4">
    <div class="text-center" data-boom-header>
      <h2 id="boom-title" class="text-3xl md:text-4xl font-bold tracking-tight text-white">
        Boom of Coolify<span class="text-warning">.</span>
      </h2>
      <p class="mt-3 text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
        Momentum is compounding — revenue, cloud adoption, and an open-source community that keeps shipping.
      </p>
    </div>

    <div
      class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {#each stats as stat (stat.key)}
        <div
          class="boom-card"
          data-boom-card
        >
          <div class="boom-card-inner">
            <div class="boom-value tabular-nums">{formatValue(stat, displayed[stat.key] ?? stat.value)}</div>
            <div class="boom-label">{stat.label}</div>
          </div>
        </div>
      {/each}
    </div>

    <div
      bind:this={confettiRoot}
      class="confetti-root"
      aria-hidden="true"
    />
  </div>
</section>

<style>
  .boom-card {
    position: relative;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(14px);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), inset 0 -1px 0 rgba(255, 255, 255, 0.02);
    transition: border-color 250ms ease, background-color 250ms ease, box-shadow 250ms ease;
  }

  .boom-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0.1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
    mix-blend-mode: overlay;
  }

  .boom-card:hover {
    border-color: rgba(252, 211, 77, 0.28);
    background: rgba(252, 211, 77, 0.04);
    box-shadow: inset 0 1px 0 rgba(252, 211, 77, 0.08), inset 0 -1px 0 rgba(252, 211, 77, 0.04), 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  .boom-card-inner {
    padding: 1.1rem 1.1rem;
  }

  .boom-value {
    font-size: 2.1rem;
    line-height: 1.1;
    font-weight: 800;
    color: white;
    letter-spacing: -0.02em;
    white-space: nowrap;
  }

  .boom-label {
    margin-top: 0.35rem;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
  }

  .confetti-root {
    pointer-events: none;
    position: absolute;
    left: 50%;
    top: 55%;
    width: 1px;
    height: 1px;
    transform: translate(-50%, -50%);
  }

  .confetti-piece {
    position: absolute;
    left: 0;
    top: 0;
    width: 10px;
    height: 14px;
    border-radius: 3px;
    will-change: transform, opacity;
  }

  @media (max-width: 640px) {
    .boom-value {
      font-size: 1.8rem;
    }
  }
</style>