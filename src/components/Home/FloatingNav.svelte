<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  import IconFeatures from "../Icons/IconFeatures.svelte";
  import IconServices from "../Icons/IconServices.svelte";
  import IconSponsorUs from "../Icons/IconSponsorUs.svelte";

  const navItems = [
    { id: "features", label: "Features", icon: IconFeatures },
    { id: "services", label: "Services", icon: IconServices },
    { id: "sponsors", label: "Sponsors", icon: IconSponsorUs },
  ];

  let active = "";
  let prefersReducedMotion = false;
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const navItemsLocal = navItems;
        for (const item of navItemsLocal) {
          const el = document.getElementById(item.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              active = item.id;
              ticking = false;
              return;
            }
          }
        }
        active = "";
        ticking = false;
      });
      ticking = true;
    }
  }

  onMount(() => {
    const isHomepage = window.location.pathname === "/" || window.location.pathname === "";
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion = mq.matches;

    if (isHomepage) {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  });

  onDestroy(() => {
    window.removeEventListener("scroll", onScroll);
  });

  function handleNavClick(id: string) {
    const isHome = window.location.pathname === "/" || window.location.pathname === "";
    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      }
    } else {
      window.location.href = `/#${id}`;
    }
  }
</script>

<div class="floating-nav" role="navigation" aria-label="Page sections">
  {#each navItems as item}
    <button
      type="button"
      class="nav-item"
      class:active={item.id === active}
      on:click={() => handleNavClick(item.id)}
      aria-label={item.label}
    >
      <svelte:component this={item.icon} class="nav-icon" />
      <span class="tooltip">{item.label}</span>
    </button>
  {/each}
</div>

<style>
  .floating-nav {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 60;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .nav-item {
    position: relative;
    padding: 14px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--color-coollabs), var(--color-coollabs-100));
    border: none;
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(107, 22, 237, 0.3);
    transition: transform 200ms ease, box-shadow 200ms ease;
  }

  .nav-item:hover {
    box-shadow: 0 6px 24px rgba(107, 22, 237, 0.45);
    transform: scale(1.08);
  }

  .nav-item:active {
    transform: scale(0.92);
  }

  .nav-item.active {
    box-shadow: 0 6px 24px rgba(107, 22, 237, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.15);
  }

  :global(.nav-icon) {
    width: 18px;
    height: 18px;
    display: block;
    color: white;
  }

  .tooltip {
    position: absolute;
    right: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%);
    padding: 0.3rem 0.6rem;
    border-radius: 0.6rem;
    background: rgba(16, 16, 16, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: white;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 160ms ease, transform 160ms ease;
  }

  .nav-item:hover .tooltip {
    opacity: 1;
  }

  @media (min-width: 768px) {
    .floating-nav {
      bottom: 2rem;
      right: 2rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-item {
      transition: none;
    }
  }
</style>
