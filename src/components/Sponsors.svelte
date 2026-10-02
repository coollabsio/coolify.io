<script>
    import sponsorsData from "../data/sponsors.js";
    import Icon from "./Icon.svelte";
    import ArrowUpRight from "reicon/icons/ArrowUpRight";
    import Plus from "reicon/icons/Plus";

    const ref = "coolify.io";

    function shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    const addRef = (sponsor) => ({
        ...sponsor,
        url: sponsor.url.includes("?")
            ? `${sponsor.url}&ref=${ref}&utm_source=${ref}`
            : `${sponsor.url}?ref=${ref}&utm_source=${ref}`,
    });

    const tiers = sponsorsData.tiers ?? {};
    const huge = shuffle((tiers.huge ?? []).map(addRef));
    const bigAll = (tiers.big ?? []).map(addRef);
    const big = [
        ...shuffle(bigAll.filter((s) => s.pinned)),
        ...shuffle(bigAll.filter((s) => !s.pinned)),
    ];
    const small = shuffle(tiers.small ?? []);
</script>

<div class="space-y-14">
    {#if huge.length > 0}
        <div>
            <h3 class="tier-heading">
                Huge sponsors
                <span class="text-fg-faint">{huge.length}</span>
            </h3>
            <div class="grid gap-px overflow-hidden rounded-lg bg-hairline ring-1 ring-hairline sm:grid-cols-2 lg:grid-cols-3">
                {#each huge as sponsor (sponsor.name)}
                    <a
                        href={sponsor.url}
                        aria-label={sponsor.name}
                        class="group flex flex-col bg-app text-left transition-colors hover:bg-surface focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-warning plausible-event-name=big-sponsor-clicks"
                    >
                        <div
                            class="flex h-36 items-center justify-center overflow-hidden px-8 py-6"
                            style={sponsor.hugeCardStyle}
                        >
                            <img
                                src={sponsor.image?.url}
                                alt=""
                                loading="eager"
                                class="max-h-full max-w-full object-contain"
                                style={sponsor.hugeImageStyle}
                            />
                        </div>
                        <div
                            class="flex items-start justify-between gap-3 px-4 pb-4"
                        >
                            <div class="min-w-0">
                                <div class="text-sm font-medium text-fg">
                                    {sponsor.name}
                                </div>
                                <div class="truncate text-xs text-fg-faint">
                                    {sponsor.description}
                                </div>
                            </div>
                            <Icon icon={ArrowUpRight} class="mt-0.5 size-4 shrink-0 text-fg-faint transition-colors group-hover:text-fg" />
                        </div>
                    </a>
                {/each}
            </div>
        </div>
    {/if}

    {#if big.length > 0}
        <div>
            <h3 class="tier-heading">
                Big sponsors
                <span class="text-fg-faint">{big.length}</span>
            </h3>
            <div class="grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-3 lg:grid-cols-5">
                {#each big as sponsor (sponsor.name)}
                    <a
                        href={sponsor.url}
                        aria-label={sponsor.name}
                        class="group relative flex h-20 items-center justify-center gap-2 rounded-lg px-5 opacity-75 transition-[opacity,background-color] hover:bg-white/[0.04] hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-warning plausible-event-name=big-sponsor-clicks"
                    >
                        <img
                            src={sponsor.image?.url}
                            alt=""
                            loading="eager"
                            class="max-h-10 max-w-full object-contain"
                            style={sponsor.imageStyle}
                        />
                        {#if sponsor.additionalContent}
                            <span class="text-sm font-medium text-fg">
                                {sponsor.additionalContent}
                            </span>
                        {/if}
                        {#if sponsor.description}
                            <span role="tooltip" class="tooltip">
                                {sponsor.description}
                            </span>
                        {/if}
                    </a>
                {/each}
            </div>
        </div>
    {/if}

    {#if small.length > 0}
        <div>
            <h3 class="tier-heading">
                Small sponsors
                <span class="text-fg-faint">{small.length}</span>
            </h3>
            <div class="flex flex-wrap justify-center gap-x-1 gap-y-1.5">
                {#each small as sponsor (sponsor.name)}
                    <a
                        href={sponsor.url}
                        class="group inline-flex h-9 items-center gap-2 rounded-full py-1 pr-3.5 pl-1 text-[13px] transition-colors hover:bg-white/[0.05] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-warning plausible-event-name=small-sponsor-clicks {sponsor.isSpecial && sponsor.image?.url === 'question'
                            ? 'text-fg-dim border border-dashed border-white/20 hover:text-fg'
                            : sponsor.newest
                              ? 'text-fg'
                              : 'text-fg-dim hover:text-fg'}"
                    >
                        <span
                            class="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/[0.06] {sponsor.newest
                                ? 'ring-2 ring-warning/70'
                                : ''}"
                        >
                            {#if sponsor.isSpecial && sponsor.image?.url === "question"}
                                <Icon icon={Plus} class="size-3.5" />
                            {:else}
                                <img
                                    src={sponsor.image?.url}
                                    alt=""
                                    width="28"
                                    height="28"
                                    loading="lazy"
                                    class={sponsor.isPublicImage
                                        ? "size-full object-contain p-1"
                                        : "size-full object-cover"}
                                />
                            {/if}
                        </span>
                        {sponsor.name}
                    </a>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    @reference "../styles/global.css";

    .tier-heading {
        @apply mb-4 flex items-center justify-center gap-2 text-xs font-medium tracking-wide text-fg-dim uppercase;
    }

    .tooltip {
        @apply pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-60 -translate-x-1/2 rounded-md bg-selected px-2 py-1 text-xs text-fg opacity-0 shadow-lg ring-1 ring-hairline transition-opacity duration-150;
    }

    a:hover .tooltip,
    a:focus-visible .tooltip {
        opacity: 1;
    }
</style>
