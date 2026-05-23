<script>
    import { onMount } from "svelte";

    const ref = "coolify.io";

    const SPONSORS_URL =
        "https://raw.githubusercontent.com/coollabsio/coollabs-cdn/main/json/sponsors.json";

    let sponsorsWithRef = [];

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

    let descriptionContainer;
    let descriptionText;
    let sponsorsGridElement;

    onMount(async () => {
        try {
            const response = await fetch(SPONSORS_URL);
            const data = await response.json();
            const sponsors = data.tiers?.big ?? [];
            const pinned = shuffleArray(sponsors.filter((s) => s.pinned).map(addRef));
            const unpinned = shuffleArray(sponsors.filter((s) => !s.pinned).map(addRef));
            sponsorsWithRef = [...pinned, ...unpinned];

            setTimeout(() => {
                const sponsorItems =
                    sponsorsGridElement.querySelectorAll(".sponsor-card");
                sponsorItems.forEach((item, index) => {
                    item.style.animationDelay = `${index * 50}ms`;
                    item.classList.add("animate-in");
                });
            });
        } catch (error) {
            console.error("Failed to load big sponsors", error);
        }
    });
</script>

<div
    bind:this={descriptionContainer}
    id="description"
    class="description-container"
>
    <p bind:this={descriptionText} class="text-white text-xl font-medium"></p>
</div>

<div class="pt-4">
    <h3 class="tier-title">Big Sponsors</h3>
    <div bind:this={sponsorsGridElement} class="sponsors-grid pb-10">
        {#each sponsorsWithRef as sponsor (sponsor.name)}
            <div class="tooltip tooltip-top" data-tip={sponsor.description}>
                <div class="sponsor-card {sponsor.tier || ''}">
                    <div class="sponsor-content">
                        {#if sponsor.isSpecial}
                            <div class="bg-red-500">
                                <div class="special-icon">✨</div>
                                <span class="sponsor-label">{sponsor.name}</span
                                >
                            </div>
                        {:else if sponsor.isAnonymous}
                            <div class="sponsor-image-container">
                                <span class="anonymous-icon">?</span>
                            </div>
                        {:else}
                            <div class="sponsor-image-container">
                                <img
                                    src={sponsor.imageUrl ?? sponsor.imagePath ?? `/images/${sponsor.imageKey}`}
                                    loading="eager"
                                    alt={sponsor.description}
                                    class="sponsor-image {sponsor.imageKey ===
                                    '23mlogo.svg'
                                        ? 'logo-23m'
                                        : ''}"
                                    style={sponsor.imageStyle}
                                />
                                {#if sponsor.additionalContent}
                                    <div class="sponsor-label">
                                        {sponsor.additionalContent}
                                    </div>
                                {/if}
                            </div>
                        {/if}
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

<style>
    .sponsors-header {
        text-align: center;
        margin-bottom: 1rem;
    }

    .tier-title {
        text-align: center;
        font-size: 1.125rem;
        font-weight: 600;
        color: #9ca3af;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin: 1.5rem 0 1rem 0;
    }

    .sponsors-title {
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: -0.025em;
    }

    .sponsors-subtitle {
        font-size: 1rem;
    }

    .sponsors-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
    }

    @media (max-width: 768px) {
        .sponsors-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
        }
    }

    /* DaisyUI v5 tooltip CSS requires Tailwind v4 nested @layer,
       which doesn't work with Tailwind v3. Manual tooltip styles: */
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

    .sponsor-card {
        position: relative;
        border: 1px dotted transparent;
        border-radius: 0.3rem;
        padding: 1.5rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        overflow: hidden;
        backdrop-filter: blur(10px);
        opacity: 0;
        transform: translateY(20px);
        justify-content: center;
        align-items: center;
        display: flex;
        width: 100%;
        min-height: 118px;
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

    .sponsor-card::before {
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

    .sponsor-card.animate-in {
        animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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

    .sponsor-card:hover {
        transform: translateY(-8px) scale(1.02);
        border-color: #6b16ed;
        border-style: solid;
        box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.3),
            0 10px 10px -5px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(96, 165, 250, 0.2);
    }

    .tooltip:hover .sponsor-card,
    .tooltip:has(.sponsor-link-overlay:focus-visible) .sponsor-card {
        transform: translateY(-8px) scale(1.02);
        border-color: #6b16ed;
        border-style: solid;
        box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.3),
            0 10px 10px -5px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(96, 165, 250, 0.2);
    }

    .sponsor-card:hover::before {
        opacity: 1;
    }

    .tooltip:hover .sponsor-card::before,
    .tooltip:has(.sponsor-link-overlay:focus-visible) .sponsor-card::before {
        opacity: 1;
    }

    .sponsor-card.large {
        grid-column: span 1;
    }

    .sponsor-card.medium {
        grid-column: span 1;
    }

    .sponsor-card.special {
        background: linear-gradient(
            135deg,
            #ff6b6b,
            #4ecdc4,
            #45b7d1,
            #96ceb4,
            #ffeaa7
        );
        background-size: 300% 300%;
        animation: gradientShift 3s ease infinite;
        border: none;
        color: white;
        font-weight: 600;
    }

    @keyframes gradientShift {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .sponsor-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-height: 72px;
        width: 100%;
        position: relative;
        z-index: 1;
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

    .anonymous-icon {
        font-size: 3rem;
        font-weight: 700;
        color: #9ca3af;
        line-height: 1;
    }

    .logo-23m {
        max-height: 34px;
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

    .sponsor-label {
        margin-top: 0.75rem;
        margin-left: 0;
        font-size: 1.3rem;
        font-weight: 600;
        color: #e5e7eb;
        text-transform: capitalize;
        letter-spacing: 0.05em;
        text-align: center;
        line-height: 1.2;
    }

    .special-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
    }

    .special-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%,
        100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }

    .special-text {
        font-size: 1rem;
        font-weight: 700;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 640px) {
        .sponsors-grid {
            padding-inline: 1rem;
        }
        .sponsors-title {
            font-size: 1.5rem;
        }

        .sponsors-subtitle {
            font-size: 1rem;
        }

        .sponsor-card {
            padding: 1rem;
        }

        .sponsor-content {
            min-height: 64px;
        }

        .sponsor-image {
            max-height: 40px;
        }
        .sponsor-label {
            display: none;
        }
    }
</style>
