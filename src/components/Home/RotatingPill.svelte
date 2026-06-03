<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  export type RotatingPillItem = {
    label: string;
    iconText?: string;
  };

  export let items: RotatingPillItem[] = [];
  export let intervalMs = 2200;
  export let ariaLabel = "";

  let prefersReducedMotion = false;
  let el: HTMLSpanElement | null = null;
  let index = 0;
  let timer: number | null = null;
  let transitioning = false;

  $: maxLabelLen = Math.max(0, ...items.map((i) => i.label.length));
  $: pillWidthCh = Math.max(10, Math.min(18, maxLabelLen + 6));

  function current() {
    const item = items[index] ?? { label: "", iconText: "" };
    return {
      label: item.label,
      iconText: item.iconText ?? item.label.slice(0, 1)
    };
  }

  function step() {
    if (prefersReducedMotion || !el || items.length <= 1 || transitioning) return;
    transitioning = true;

    el.classList.add("pill-out");

    setTimeout(() => {
      index = (index + 1) % items.length;
      el.classList.remove("pill-out");
      el.classList.add("pill-in");
      setTimeout(() => {
        el.classList.remove("pill-in");
        transitioning = false;
      }, 280);
    }, 220);
  }

  onMount(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion = mq.matches;

    const onChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mq.addEventListener?.("change", onChange);

    if (!prefersReducedMotion && items.length > 1) {
      timer = window.setInterval(step, intervalMs);
    }

    return () => {
      mq.removeEventListener?.("change", onChange);
    };
  });

  onDestroy(() => {
    if (timer) window.clearInterval(timer);
  });
</script>

<span
  class="pill"
  style={`--pill-width: ${pillWidthCh}ch`}
  aria-label={ariaLabel}
>
  <span class="pill-inner" bind:this={el}>
    <span class="pill-icon" aria-hidden="true">{current().iconText}</span>
    <span class="pill-text">{current().label}</span>
  </span>
</span>

<style>
  .pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--pill-width);
    padding: 0.4rem 0.65rem;
    border-radius: 0.9rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(10px);
    vertical-align: middle;
  }

  .pill-inner {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .pill-out {
    animation: pillOut 0.22s ease-in forwards;
  }

  .pill-in {
    animation: pillIn 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .pill-icon {
    width: 1.35rem;
    height: 1.35rem;
    border-radius: 0.55rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: -0.02em;
    color: white;
    background: rgba(107, 22, 237, 0.22);
    border: 1px solid rgba(107, 22, 237, 0.35);
  }

  .pill-text {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.92);
    white-space: nowrap;
  }
</style>