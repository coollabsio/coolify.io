<script>
    import { onMount } from "svelte";
    import sponsorsData from "../data/sponsors.json";

    const ref = "coolify.io";

    let hugeSponsorsWithRef = [];

    function shuffleArray(array) {
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

    onMount(async () => {
        try {
            const realHuge = (sponsorsData.tiers?.huge ?? []).map(addRef);
            hugeSponsorsWithRef = shuffleArray(realHuge);
        } catch (error) {
            console.error("Failed to load huge sponsors", error);
        }
    });
</script>

{#if hugeSponsorsWithRef.length > 0}
    <div class="pt-4">
        <h3 class="tier-title tier-title-huge">Huge Sponsors</h3>
        <div class="huge-sponsors-grid pb-6">
            {#each hugeSponsorsWithRef as sponsor (sponsor.name)}
                <div class="tooltip tooltip-top" data-tip={sponsor.description}>
                    <div class="sponsor-card huge" style={sponsor.hugeCardStyle}>
                        <div class="sponsor-image-container">
                            <img
                                src={sponsor.imageUrl ?? `/images/${sponsor.imageKey}`}
                                loading="eager"
                                alt={sponsor.description}
                                class="sponsor-image huge-image"
                                style={sponsor.hugeImageStyle}
                            />
                        </div>
                    </div>
                    <a
                        class="sponsor-link-overlay plausible-event-name=big-sponsor-clicks"
                        href={sponsor.url}
                        aria-label={sponsor.name}
                    ></a>
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    .tier-title {
        text-align: center;
        font-size: 1.125rem;
        font-weight: 600;
        color: #9ca3af;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin: 1.5rem 0 1rem 0;
    }

    .tier-title-huge {
        color: #a78bfa;
    }

    .huge-sponsors-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .huge-sponsors-grid .tooltip {
        flex: 1 1 280px;
        max-width: 312px;
    }

    .sponsor-card {
        position: relative;
        border: 1px dotted transparent;
        border-radius: 0.3rem;
        padding: 1.5rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        overflow: hidden;
        backdrop-filter: blur(10px);
        animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
        justify-content: center;
        align-items: center;
        display: flex;
        width: 100%;
        min-height: 118px;
    }

    .sponsor-card.huge {
        box-sizing: border-box;
        padding: 2.25rem 2rem;
        width: 100%;
        height: 200px;
        border: 1px solid rgba(107, 22, 237, 0.35);
        background: linear-gradient(
            135deg,
            rgba(96, 165, 250, 0.06) 0%,
            rgba(167, 139, 250, 0.06) 50%,
            rgba(244, 114, 182, 0.06) 100%
        );
    }

    .sponsor-card.huge:hover {
        transform: translateY(-8px) scale(1.02);
        border-color: #a78bfa;
        border-style: solid;
        box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.3),
            0 10px 10px -5px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(167, 139, 250, 0.35);
    }

    .tooltip:hover .sponsor-card.huge,
    .tooltip:has(.sponsor-link-overlay:focus-visible) .sponsor-card.huge {
        transform: translateY(-8px) scale(1.02);
        border-color: #a78bfa;
        border-style: solid;
        box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.3),
            0 10px 10px -5px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(167, 139, 250, 0.35);
    }

    .sponsor-card.huge::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            135deg,
            rgba(96, 165, 250, 0.1) 0%,
            rgba(167, 139, 250, 0.1) 50%,
            rgba(244, 114, 182, 0.1) 100%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 1px;
    }

    .sponsor-card.huge:hover::before {
        opacity: 1;
    }

    .tooltip:hover .sponsor-card.huge::before,
    .tooltip:has(.sponsor-link-overlay:focus-visible) .sponsor-card.huge::before {
        opacity: 1;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .huge-image {
        width: 100%;
        max-height: 160px;
        object-fit: contain;
    }

    .sponsor-image-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        width: 100%;
        min-height: 56px;
    }

    .sponsor-image {
        max-width: 100%;
        max-height: 44px;
        width: auto;
        height: auto;
        object-fit: contain;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        filter: brightness(0.9) contrast(1.1);
    }

    .sponsor-card:hover .sponsor-image {
        transform: scale(1.1);
        filter: brightness(1) contrast(1.2);
    }

    .tooltip:hover .sponsor-image,
    .tooltip:has(.sponsor-link-overlay:focus-visible) .sponsor-image {
        transform: scale(1.1);
        filter: brightness(1) contrast(1.2);
    }

    .sponsor-link-overlay {
        position: absolute;
        inset: 0;
        z-index: 10;
        border-radius: 0.3rem;
    }

    .sponsor-link-overlay:focus-visible {
        outline: 2px solid #a78bfa;
        outline-offset: 3px;
    }

    .tooltip {
        position: relative;
        display: block;
        height: 100%;
    }

    .tooltip::before {
        content: attr(data-tip);
        position: absolute;
        bottom: calc(100% + 0.5rem);
        left: 50%;
        transform: translateX(-50%);
        background-color: #242424;
        color: #e5e7eb;
        font-size: 0.875rem;
        line-height: 1.25;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        white-space: normal;
        max-width: 20rem;
        width: max-content;
        text-align: center;
        opacity: 0;
        pointer-events: none;
        z-index: 50;
        transition: opacity 0.2s ease;
    }

    .tooltip::after {
        content: "";
        position: absolute;
        bottom: calc(100% + 0.25rem);
        left: 50%;
        transform: translateX(-50%);
        border-width: 4px;
        border-style: solid;
        border-color: #242424 transparent transparent transparent;
        opacity: 0;
        pointer-events: none;
        z-index: 50;
        transition: opacity 0.2s ease;
    }

    .tooltip:hover::before,
    .tooltip:hover::after {
        opacity: 1;
    }

    @media (max-width: 1024px) {
        .huge-sponsors-grid .tooltip {
            max-width: calc(50% - 0.75rem);
        }
    }

    @media (max-width: 640px) {
        .huge-sponsors-grid {
            padding-inline: 1rem;
        }

        .huge-sponsors-grid .tooltip {
            max-width: 100%;
        }

        .sponsor-card {
            padding: 1rem;
        }

        .sponsor-card.huge {
            height: 140px;
            padding: 1.75rem 1.5rem;
        }

        .huge-image {
            max-height: 70px !important;
            width: auto !important;
            max-width: 75% !important;
            height: auto !important;
            transform: none !important;
        }

        .sponsor-image {
            max-height: 40px;
        }
    }
</style>
