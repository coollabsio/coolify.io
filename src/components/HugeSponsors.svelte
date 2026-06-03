<script>
    import { onMount } from "svelte";
    import sponsorsData from "../data/sponsors.js";

    const ref = "coolify.io";

    let hugeSponsorsWithRef = [];

    function shuffleArray(array) {
        const shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(
                Math.random() * (i + 1)
            );

            [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];
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

    <h3 class="tier-title tier-title-diamond">
        <span class="tier-icon">&#9670;</span> Diamond Sponsors
    </h3>

    <div class="huge-sponsors-grid pb-6">

        {#each hugeSponsorsWithRef as sponsor (sponsor.name)}

        <div class="sponsor-tooltip-wrapper">
            <div class="sponsor-card" style={sponsor.hugeCardStyle || ''}>
                <span class="card-sweep" aria-hidden="true"></span>

                <div class="sponsor-image-container">
                    <div class="image-glow"></div>
                    <img
                        src={sponsor.image?.url}
                        loading="eager"
                        alt={sponsor.description}
                        class="sponsor-image"
                        style={sponsor.hugeImageStyle || ''}
                    />
                </div>

                <div class="description-overlay">
                    <h4>
                        {sponsor.name}
                    </h4>
                    <p>
                        {sponsor.description}
                    </p>
                </div>
            </div>
            <span class="sponsor-tooltip" role="tooltip">
                {sponsor.name}
                <span class="tooltip-line" aria-hidden="true"></span>
            </span>
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

.tier-title{
    text-align:center;
    font-size:1rem;
    font-weight:600;
    color:#9ca3af;
    letter-spacing:.08em;
    text-transform:uppercase;
    margin:1rem 0;
}

.tier-title-diamond {
    color: #a78bfa;
    font-size: 1.05rem;
}

.tier-icon {
    font-size: 0.7rem;
    vertical-align: middle;
    margin-right: 0.3rem;
}

.huge-sponsors-grid{
    display:grid;
    grid-template-columns:1fr;
    gap:1rem;
}

@media(min-width:640px){
    .huge-sponsors-grid{
        grid-template-columns:repeat(2,minmax(0,1fr));
    }
}

@media(min-width:1024px){
    .huge-sponsors-grid{
        grid-template-columns:repeat(4,minmax(0,1fr));
    }
}

.sponsor-card{
    position:relative;
    display:flex;
    flex-direction:column;
    height:100%;
    overflow:hidden;
    border-radius:16px;
    border:1px solid rgba(252, 211, 77, 0.12);
    background:linear-gradient(135deg, rgba(252, 211, 77, 0.04), rgba(252, 211, 77, 0.01));
    backdrop-filter:blur(16px);
    box-shadow:
        inset 0 1px 0 rgba(252, 211, 77, 0.06),
        inset 0 -1px 0 rgba(252, 211, 77, 0.03);
    transition:
        border-color .35s ease,
        box-shadow .35s ease;
}

.sponsor-card:hover{
    border-color:rgba(252, 211, 77, 0.35);
    background:linear-gradient(135deg, rgba(252, 211, 77, 0.07), rgba(252, 211, 77, 0.02));
    box-shadow:
        inset 0 1px 0 rgba(252, 211, 77, 0.1),
        inset 0 -1px 0 rgba(252, 211, 77, 0.05),
        0 12px 32px rgba(0, 0, 0, 0.15),
        0 0 24px rgba(252, 211, 77, 0.04);
}

.card-sweep {
    position:absolute;
    inset:-40% -60%;
    background:linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,.06),
        transparent
    );
    transform:translateX(-50%) rotate(12deg);
    transition:transform .5s ease;
    pointer-events:none;
    z-index:3;
}

.sponsor-card:hover .card-sweep {
    transform:translateX(50%) rotate(12deg);
}

.sponsor-image-container{
    position:relative;
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    flex-grow:1;
    padding:1rem;
    overflow:hidden;
}

.image-glow{
    position:absolute;
    width:180px;
    height:180px;
    border-radius:999px;
    background:radial-gradient(
        rgba(252, 211, 77, 0.12),
        transparent 70%
    );
    filter:blur(30px);
}

.sponsor-image{
    position:relative;
    max-width:100%;
    max-height:100%;
    width:auto;
    height:auto;
    object-fit:contain;
    z-index:2;
}

.description-overlay{
    width:100%;
    height:100px;
    padding:1rem;
    border-top:1px solid rgba(252, 211, 77, 0.08);
    background:
        linear-gradient(
            to bottom,
            rgba(252, 211, 77, 0.02),
            rgba(252, 211, 77, 0.04)
        );
    display:flex;
    flex-direction:column;
}

.description-overlay h4{
    font-size:1rem;
    font-weight:600;
    margin-bottom:.45rem;
}

.description-overlay p{
    font-size:.88rem;
    line-height:1.5;
    opacity:.75;
    display:-webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient:vertical;
    overflow:hidden;
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

@media(max-width:768px){
    .sponsor-card {
        margin:0;
    }
    .sponsor-image-container{
        height:120px;
    }
    .description-overlay{
        min-height:95px;
        padding:.85rem;
    }
    .description-overlay h4{
        font-size:.95rem;
    }
    .description-overlay p{
        font-size:.82rem;
    }
}

.sponsor-tooltip-wrapper {
    position: relative;
}

.sponsor-tooltip {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 12px);
    transform: translateX(-50%) translateY(6px);
    padding: 0.4rem 0.65rem 0.55rem;
    border-radius: 0.6rem;
    background: rgba(16, 16, 16, 0.94);
    border: 1px solid rgba(252, 211, 77, 0.15);
    color: white;
    font-size: 0.72rem;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 180ms ease, transform 180ms ease;
    z-index: 50;
    letter-spacing: 0.02em;
    text-align: center;
}

.sponsor-tooltip-wrapper:hover .sponsor-tooltip {
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
