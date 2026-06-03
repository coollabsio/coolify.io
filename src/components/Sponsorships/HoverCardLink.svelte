<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";

  import IconExternalLink from "../Icons/IconExternalLink.svelte";
  import IconGitHub from "../Icons/IconGitHub.svelte";

  export type TwitterCard = {
    kind: "twitter";
    name: string;
    username: string;
    bio: string;
    website?: string;
    joined?: string;
    avatarUrl?: string;
    followers?: number;
    following?: number;
  };

  export type GitHubRepoCard = {
    kind: "github";
    repo: string; // owner/name
    descriptionFallback: string;
  };

  export type GitHubSponsorCard = {
    kind: "github-sponsor";
    name: string;
    username: string;
    bio: string;
    sponsorCount?: number;
    imageUrl?: string;
  };

  export type SponsorCard = {
    kind: "sponsor";
    tierName: string;
    amount: number;
    description: string;
  };

  export type HoverCard = TwitterCard | GitHubRepoCard | GitHubSponsorCard | SponsorCard;

  export let href: string;
  export let label: string;
  export let card: HoverCard;
  export let showExternalIcon = false;
  export let newTab = false;
  export let warning = false;

  let prefersReducedMotion = false;
  let canHover = false;

  let anchorEl: HTMLAnchorElement | null = null;
  let cardEl: HTMLDivElement | null = null;
  let open = false;
  let visible = false;
  let isAbove = false;

  let openTimeout: number | null = null;
  let closeTimeout: number | null = null;

  const tooltipId = `hovercard-${Math.random().toString(36).slice(2)}`;

  // GitHub card dynamic fields
  let ghStars: number | null = null;
  let ghForks: number | null = null;
  let ghDescription: string | null = null;
  let ghName: string | null = null;

  // Twitter card dynamic fields
  let twFollowers: number | null = null;
  let twFollowing: number | null = null;

  // Animated display values for count-up
  let displayFollowers = 0;
  let displayFollowing = 0;
  let displayStars = 0;
  let displayForks = 0;
  let displayAmount = 0;
  let countAnimId: number | null = null;

  // Cursor tracking for springy card movement
  let cursorOffsetX = 0;
  let cursorTargetX = 0;
  let cursorAnimFrame: number | null = null;
  let baseCardLeft = 0;

  function cleanupTimers() {
    if (openTimeout) window.clearTimeout(openTimeout);
    if (closeTimeout) window.clearTimeout(closeTimeout);
    openTimeout = null;
    closeTimeout = null;
  }

  function formatCompact(n: number) {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 10_000) return `${Math.round(n / 1000)}k`;
    if (n >= 1_000) return `${(n / 1000).toFixed(1)}k`;
    return `${n}`;
  }

  function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
  }

  function animateCount(from: number, to: number, setter: (v: number) => void) {
    if (prefersReducedMotion) {
      setter(to);
      return;
    }
    const duration = 500;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setter(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        countAnimId = requestAnimationFrame(tick);
      }
    }

    countAnimId = requestAnimationFrame(tick);
  }

  function onPointerMove(e: PointerEvent) {
    if (!anchorEl || !cardEl || !open || !visible || !canHover) return;
    const rect = anchorEl.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    cursorTargetX = (relX - 0.5) * 10;
    if (!cursorAnimFrame) {
      cursorAnimFrame = requestAnimationFrame(tickCursor);
    }
  }

  function tickCursor() {
    cursorAnimFrame = null;
    const diff = cursorTargetX - cursorOffsetX;
    if (Math.abs(diff) < 0.02) {
      cursorOffsetX = cursorTargetX;
    } else {
      cursorOffsetX += diff * 0.14;
      cursorAnimFrame = requestAnimationFrame(tickCursor);
    }
    if (cardEl) {
      cardEl.style.left = `${baseCardLeft + cursorOffsetX}px`;
    }
  }

  function startCountAnimations() {
    if (card.kind === "twitter") {
      if (twFollowers !== null) animateCount(0, twFollowers, (v) => displayFollowers = v);
      if (twFollowing !== null) animateCount(0, twFollowing, (v) => displayFollowing = v);
    } else if (card.kind === "sponsor") {
      animateCount(0, card.amount, (v) => displayAmount = v);
    } else {
      if (ghStars !== null) animateCount(0, ghStars, (v) => displayStars = v);
      if (ghForks !== null) animateCount(0, ghForks, (v) => displayForks = v);
    }
  }

  async function positionCard() {
    if (!anchorEl || !cardEl) return;

    const rect = anchorEl.getBoundingClientRect();

    cardEl.style.left = "0px";
    cardEl.style.top = "0px";

    await tick();

    const c = cardEl.getBoundingClientRect();

    const gap = 8;
    const padding = 10;

    const preferredTop = rect.bottom + gap;
    const canFitBelow = preferredTop + c.height <= window.innerHeight - padding;

    isAbove = !canFitBelow;

    const top = canFitBelow
      ? preferredTop
      : rect.top - gap - c.height;

    const center = rect.left + rect.width / 2;
    const left = clamp(center - c.width / 2, padding, window.innerWidth - c.width - padding);

    baseCardLeft = left;
    cardEl.style.left = `${left}px`;
    cardEl.style.top = `${Math.max(padding, top)}px`;
    cardEl.style.setProperty("--origin", isAbove ? "bottom center" : "top center");
  }

  async function openNow() {
    cleanupTimers();
    if (open) return;

    if (countAnimId) cancelAnimationFrame(countAnimId);
    displayFollowers = 0;
    displayFollowing = 0;
    displayStars = 0;
    displayForks = 0;
    displayAmount = 0;

    open = true;
    await tick();
    await positionCard();
    await tick();
    visible = true;

    startCountAnimations();

    if (card.kind === "github") {
      fetchGitHubRepo(card.repo);
    } else if (card.kind === "twitter") {
      fetchTwitterUser(card.username);
    }
  }

  function closeNow() {
    cleanupTimers();
    if (!open) return;
    if (countAnimId) cancelAnimationFrame(countAnimId);
    if (cursorAnimFrame) cancelAnimationFrame(cursorAnimFrame);
    cursorOffsetX = 0;
    cursorTargetX = 0;
    visible = false;
    window.setTimeout(() => {
      open = false;
    }, 120);
  }

  function scheduleOpen() {
    cleanupTimers();
    openTimeout = window.setTimeout(() => {
      openNow();
    }, 80);
  }

  function scheduleClose() {
    cleanupTimers();
    closeTimeout = window.setTimeout(() => {
      closeNow();
    }, 140);
  }

  function onPointerEnter() {
    if (!canHover) return;
    scheduleOpen();
  }

  function onPointerLeave() {
    if (!canHover) return;
    scheduleClose();
  }

  function onFocus() {
    openNow();
  }

  function onBlur() {
    scheduleClose();
  }

  function onCardEnter() {
    if (!canHover) return;
    cleanupTimers();
  }

  function onCardLeave() {
    if (!canHover) return;
    scheduleClose();
  }

  async function fetchGitHubRepo(repo: string) {
    if (ghName || ghDescription || ghStars || ghForks) return;

    try {
      const res = await fetch(`https://api.github.com/repos/${repo}`);
      if (!res.ok) return;
      const data = await res.json();

      ghName = typeof data?.full_name === "string" ? data.full_name : repo;
      ghDescription = typeof data?.description === "string" ? data.description : null;
      ghStars = typeof data?.stargazers_count === "number" ? data.stargazers_count : null;
      ghForks = typeof data?.forks_count === "number" ? data.forks_count : null;

      if (open) {
        if (ghStars !== null) animateCount(0, ghStars, (v) => displayStars = v);
        if (ghForks !== null) animateCount(0, ghForks, (v) => displayForks = v);
      }
    } catch {
      // ignore
    }
  }

  async function fetchTwitterUser(username: string) {
    if (twFollowers !== null) return;

    try {
      const res = await fetch(`https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${username}`);
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        twFollowers = typeof data[0]?.followers_count === "number" ? data[0].followers_count : null;
        twFollowing = typeof data[0]?.friends_count === "number" ? data[0].friends_count : null;

        if (open) {
          if (twFollowers !== null) animateCount(0, twFollowers, (v) => displayFollowers = v);
          if (twFollowing !== null) animateCount(0, twFollowing, (v) => displayFollowing = v);
        }
      }
    } catch {
      // ignore
    }
  }

  function onWindowMove() {
    if (!open) return;
    positionCard();
  }

  onMount(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion = mq.matches;

    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    canHover = hoverMq.matches;

    const onMotionChange = (e: MediaQueryListEvent) => (prefersReducedMotion = e.matches);
    const onHoverChange = (e: MediaQueryListEvent) => (canHover = e.matches);

    mq.addEventListener?.("change", onMotionChange);
    hoverMq.addEventListener?.("change", onHoverChange);

    window.addEventListener("scroll", onWindowMove, { passive: true });
    window.addEventListener("resize", onWindowMove, { passive: true });

    return () => {
      mq.removeEventListener?.("change", onMotionChange);
      hoverMq.removeEventListener?.("change", onHoverChange);
      window.removeEventListener("scroll", onWindowMove);
      window.removeEventListener("resize", onWindowMove);
      cleanupTimers();
    };
  });

  onDestroy(() => {
    cleanupTimers();
  });
</script>

<a
  bind:this={anchorEl}
  href={href}
  class="hovercard-link"
  class:warning
  on:pointerenter={onPointerEnter}
  on:pointerleave={onPointerLeave}
  on:pointermove={onPointerMove}
  on:focus={onFocus}
  on:blur={onBlur}
  aria-describedby={open ? tooltipId : undefined}
  target={newTab ? "_blank" : undefined}
  rel={newTab ? "noopener noreferrer" : undefined}
>
  <span class="label">{label}</span>
  {#if showExternalIcon}
    <IconExternalLink class="w-3 h-3 -mt-1 ml-1" />
  {/if}
</a>

{#if open}
  <div
    bind:this={cardEl}
    id={tooltipId}
    class="hovercard"
    class:visible
    class:card-centered={card.kind === "sponsor"}
    role="tooltip"
    on:pointerenter={onCardEnter}
    on:pointerleave={onCardLeave}
    on:pointermove={onPointerMove}
  >
    {#if card.kind === "twitter"}
      <div class="card-head">
        {#if card.avatarUrl}
          <img class="avatar-img" src={card.avatarUrl} alt="" aria-hidden="true" />
        {:else}
          <div class="avatar" aria-hidden="true">{card.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}</div>
        {/if}
        <div>
          <div class="title-row">
            <span class="name">{card.name}</span>
            <span class="pill">X</span>
          </div>
          <div class="sub">@{card.username}</div>
        </div>
      </div>
      <div class="bio">{card.bio}</div>
      {#if card.website}
        <div class="website-row">{card.website}</div>
      {/if}
      {#if card.joined}
        <div class="joined-row">{card.joined}</div>
      {/if}
      <div class="meta">
        <span class="meta-item">
          <span class="meta-number tabular-nums">{twFollowers !== null ? formatCompact(displayFollowers) : (card.followers !== undefined ? formatCompact(card.followers) : "—")}</span>
          <span class="meta-label">Followers</span>
        </span>
        <span class="meta-item">
          <span class="meta-number tabular-nums">{twFollowing !== null ? formatCompact(displayFollowing) : (card.following !== undefined ? formatCompact(card.following) : "—")}</span>
          <span class="meta-label">Following</span>
        </span>
      </div>

    {:else if card.kind === "github"}
      <div class="card-head">
        <div class="icon" aria-hidden="true"><IconGitHub class="w-5 h-5" /></div>
        <div>
          <div class="name">{ghName ?? card.repo}</div>
          <div class="sub">GitHub</div>
        </div>
      </div>

      <div class="bio">{ghDescription ?? card.descriptionFallback}</div>

      <div class="meta">
        <span class="meta-item">
          <span class="meta-number tabular-nums">{ghStars ? formatCompact(displayStars) : "—"}</span>
          <span class="meta-label">Stars</span>
        </span>
        <span class="meta-item">
          <span class="meta-number tabular-nums">{ghForks ? formatCompact(displayForks) : "—"}</span>
          <span class="meta-label">Forks</span>
        </span>
      </div>

    {:else if card.kind === "github-sponsor"}
      <div class="card-head">
        {#if card.imageUrl}
          <img class="avatar-img" src={card.imageUrl} alt="" aria-hidden="true" />
        {:else}
          <div class="icon sponsor-icon" aria-hidden="true"><IconGitHub class="w-5 h-5" /></div>
        {/if}
        <div>
          <div class="name">{card.name}</div>
          <div class="sub">@{card.username} &middot; GitHub</div>
        </div>
      </div>
      <div class="bio">{card.bio}</div>
      {#if card.sponsorCount}
        <div class="meta">
          <span class="meta-item">
            <span class="meta-number tabular-nums">{card.sponsorCount}</span>
            <span class="meta-label">Current sponsors</span>
          </span>
        </div>
      {/if}

    {:else}
      <div class="card-head">
        <div class="icon sponsor-icon" aria-hidden="true">
          <IconGitHub class="w-5 h-5" />
        </div>
        <div>
          <div class="name">{card.tierName}</div>
          <div class="sub">GitHub Sponsors</div>
        </div>
      </div>

      <div class="amount-row">
        <span class="amount-currency">$</span>
        <span class="amount-value tabular-nums">{displayAmount}</span>
        <span class="amount-period">/month</span>
      </div>

      <div class="bio">{card.description}</div>
    {/if}
  </div>
{/if}

<style>
  .hovercard-link {
    display: inline-flex;
    align-items: center;
    color: white;
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: rgba(255, 255, 255, 0.35);
    text-underline-offset: 4px;
    transition: text-decoration-color 160ms ease, transform 160ms ease;
  }

  .hovercard-link:hover {
    text-decoration-color: rgba(255, 255, 255, 0.7);
  }

  .hovercard-link.warning {
    color: var(--color-warning, #facc15);
    text-decoration-color: color-mix(in srgb, var(--color-warning, #facc15) 40%, transparent);
  }

  .hovercard-link.warning:hover {
    text-decoration-color: color-mix(in srgb, var(--color-warning, #facc15) 75%, transparent);
  }

  .hovercard-link:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-coollabs) 60%, transparent);
    border-radius: 6px;
  }

  .hovercard {
    position: fixed;
    z-index: 70;
    width: min(320px, calc(100vw - 20px));
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(16, 16, 16, 0.9);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    padding: 0.65rem 0.75rem;
    color: white;
    opacity: 0;
    transform: translateY(6px) scale(0.96);
    transform-origin: var(--origin, top center);
    transition: opacity 150ms cubic-bezier(0.23, 1, 0.32, 1),
                transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    will-change: transform, opacity;
  }

  .hovercard::before {
    content: "";
    position: absolute;
    left: 50%;
    width: 8px;
    height: 8px;
    background: rgba(16, 16, 16, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transform: translateX(-50%) rotate(45deg);
    z-index: -1;
  }

  .hovercard[style*="--origin: top center"]::before {
    top: -5px;
    border-right: none;
    border-bottom: none;
  }

  .hovercard[style*="--origin: bottom center"]::before {
    bottom: -5px;
    border-left: none;
    border-top: none;
  }

  .hovercard.visible {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }

  @media (prefers-reduced-motion: reduce) {
    .hovercard {
      transition: opacity 100ms ease;
    }

    .hovercard .bio {
      transition: opacity 100ms ease;
    }

    .hovercard.visible {
      transform: none;
    }
  }

  .card-centered {
    text-align: center;
  }

  .card-centered .card-head {
    justify-content: center;
  }

  .card-centered .amount-row {
    justify-content: center;
  }

  .card-head {
    display: flex;
    gap: 0.55rem;
    align-items: center;
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    font-weight: 800;
    font-size: 0.85rem;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--color-coollabs) 35%, transparent),
      color-mix(in srgb, var(--color-warning) 25%, transparent)
    );
    border: 1px solid rgba(255, 255, 255, 0.08);
    flex-shrink: 0;
  }

  .icon {
    width: 36px;
    height: 36px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    flex-shrink: 0;
  }

  .avatar-img {
    width: 36px;
    height: 36px;
    border-radius: 999px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .sponsor-icon {
    background: rgba(250, 204, 21, 0.1);
    border-color: rgba(250, 204, 21, 0.2);
  }

  .sponsor-icon :global(svg) {
    color: #facc15;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .name {
    font-weight: 800;
    letter-spacing: -0.01em;
    font-size: 0.92rem;
  }

  .sub {
    margin-top: 0.05rem;
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.6);
  }

  .pill {
    font-size: 0.65rem;
    padding: 0.08rem 0.38rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.7);
  }

  .bio {
    margin-top: 0.45rem;
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.85rem;
    line-height: 1.35;
    opacity: 0;
    filter: blur(6px);
    transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 80ms,
                filter 300ms cubic-bezier(0.23, 1, 0.32, 1) 80ms;
  }

  .hovercard.visible .bio {
    opacity: 1;
    filter: blur(0px);
  }

  .website-row,
  .joined-row {
    margin-top: 0.3rem;
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.35;
    opacity: 0;
    filter: blur(6px);
    transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 80ms,
                filter 300ms cubic-bezier(0.23, 1, 0.32, 1) 80ms;
    word-break: break-word;
  }

  .hovercard.visible .website-row,
  .hovercard.visible .joined-row {
    opacity: 1;
    filter: blur(0px);
  }

  .amount-row {
    margin-top: 0.5rem;
    display: flex;
    align-items: baseline;
    gap: 0;
  }

  .amount-currency {
    font-size: 1.2rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.85);
  }

  .amount-value {
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: 1;
    color: white;
  }

  .amount-period {
    margin-left: 0.25rem;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
  }

  .meta {
    margin-top: 0.45rem;
    display: flex;
    gap: 0.85rem;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
  }

  .meta-number {
    font-weight: 800;
    font-size: 0.92rem;
  }

  .meta-label {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.55);
  }
</style>