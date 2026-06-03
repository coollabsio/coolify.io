<script lang="ts">
  import { onMount } from "svelte";

  type Tab = { label: string; img: string };

  const tabs: Tab[] = [
    { label: "Dashboard", img: "https://coolify.io/docs/images/resources/screenshots/2.webp" },
    { label: "Server", img: "https://coolify.io/docs/images/resources/screenshots/4.webp" },
    { label: "Resources", img: "https://coolify.io/docs/images/resources/screenshots/1.webp" },
    { label: "Configuration", img: "https://coolify.io/docs/images/resources/screenshots/3.webp" }
  ];

  let prefersReducedMotion = false;
  let entered = false;
  let active = tabs[0];
  let imgEl: HTMLImageElement | null = null;

  function setActive(tab: Tab) {
    if (tab.img === active.img) return;
    if (imgEl) {
      imgEl.style.opacity = "0";
      setTimeout(() => {
        active = tab;
        requestAnimationFrame(() => {
          if (imgEl) imgEl.style.opacity = "1";
        });
      }, prefersReducedMotion ? 0 : 100);
    } else {
      active = tab;
    }
  }

  function setupObserver(_el: HTMLDivElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entered = true;
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(_el);
    return () => observer.disconnect();
  }

  onMount(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion = mq.matches;

    const onChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mq.addEventListener?.("change", onChange);

    return () => {
      mq.removeEventListener?.("change", onChange);
    };
  });
</script>

<div
  class="hero-preview-wrapper"
  class:entered
  use:setupObserver
>
  <div class="hero-preview">
    <div class="preview-header">
      <div class="dots" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="preview-tabs" role="tablist" aria-label="Product screenshots">
        {#each tabs as tab (tab.label)}
          <button
            type="button"
            class={`tab-button ${tab.img === active.img ? "active" : ""}`}
            on:click={() => setActive(tab)}
            role="tab"
            aria-selected={tab.img === active.img}
          >
            {tab.label}
          </button>
        {/each}
      </div>
    </div>

    <div class="preview-content">
      <img
        bind:this={imgEl}
        src={active.img}
        alt="Coolify dashboard screenshot"
        loading="eager"
        decoding="async"
        style="transition: opacity 200ms ease"
      />
    </div>

    <div class="preview-glow" aria-hidden="true"></div>
  </div>
</div>

<style>
  .hero-preview-wrapper {
    margin-top: 2.5rem;
    opacity: 0;
    transform: translateY(40px) scale(0.95);
    transition: opacity 0.6s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
    will-change: transform, opacity;
  }

  .entered {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .hero-preview {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(14px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  .preview-entered .hero-preview {
    animation: heroFloat 6s ease-in-out infinite;
  }

  @keyframes heroFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-preview-wrapper {
      opacity: 1;
      transform: none;
      transition: none;
    }
    .entered .hero-preview {
      animation: none;
    }

  }
  .hero-preview::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.08;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    pointer-events: none;
    mix-blend-mode: overlay;
    z-index: 1;
  }

  .preview-glow {
    position: absolute;
    bottom: -40%;
    left: 50%;
    translate: -50% 0;
    width: 70%;
    height: 60%;
    background: radial-gradient(ellipse at center, rgba(107, 22, 237, 0.08), transparent 70%);
    filter: blur(40px);
    pointer-events: none;
    z-index: 0;
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    gap: 0.6rem;
    position: relative;
    z-index: 2;
  }

  .dots {
    display: flex;
    gap: 0.5rem;
    flex: 0 0 auto;
  }

  .dots span {
    width: 9px;
    height: 9px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.25);
  }

  .preview-tabs {
    display: flex;
    gap: 0.45rem;
    flex: 1;
    justify-content: flex-end;
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .preview-tabs::-webkit-scrollbar {
    display: none;
  }

  .tab-button {
    flex-shrink: 0;
    padding: 0.45rem 0.8rem;
    border-radius: 8px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.82);
    border: 1px solid transparent;
    transition: background-color 180ms ease, border-color 180ms ease;
  }

  .tab-button:hover {
    background: rgba(107, 22, 237, 0.12);
    border-color: rgba(107, 22, 237, 0.25);
  }

  .tab-button.active {
    background: linear-gradient(135deg, var(--color-coollabs), var(--color-coollabs-100));
    color: white;
  }

  .preview-content {
    padding: 0;
    position: relative;
    z-index: 2;
  }

  .preview-content img {
    width: 100%;
    height: 480px;
    display: block;
    object-fit: cover;
    border-radius: 0;
  }

  @media (max-width: 900px) {
    .preview-content img {
      height: 320px;
    }

    .preview-tabs {
      justify-content: flex-start;
    }
  }

  @media (max-width: 640px) {
    .tab-button {
      padding: 0.35rem 0.6rem;
      font-size: 0.72rem;
    }
  }

  @media (max-width: 500px) {
    .preview-content img {
      height: 220px;
    }
  }
</style>
