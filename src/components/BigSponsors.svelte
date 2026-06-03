<script>
    import { onMount } from "svelte";
    import sponsorsData from "../data/sponsors.js";

    const ref = "coolify.io";

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
            const sponsors = sponsorsData.tiers?.big ?? [];
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
    <h3 class="tier-title tier-title-gold">&#9679; Gold Sponsors</h3>

    <div bind:this={sponsorsGridElement} class="sponsors-grid pb-10">
        {#each sponsorsWithRef as sponsor (sponsor.name)}

            <div class="sponsor-tooltip-wrapper">

                <div class="sponsor-card" class:animate-in={false}>

                    <div class="sponsor-content">

                        <div class="sponsor-image-container">

                            <img
                                src={sponsor.image?.url}
                                loading="lazy"
                                alt={sponsor.name}
                                class="sponsor-image"
                                style={sponsor.imageStyle}
                            />

                            {#if sponsor.additionalContent}
                                <div class="sponsor-label">
                                    {sponsor.additionalContent}
                                </div>
                            {/if}

                        </div>

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

<style>

/* ---------- title ---------- */

.tier-title{
    text-align:center;
    font-size:1rem;
    font-weight:600;
    color:#9ca3af;

    letter-spacing:.08em;
    text-transform:uppercase;

    margin:1rem 0;
}

.tier-title-gold {
    color: #fbbf24;
    font-size: 1.05rem;
}


/* ---------- grid ---------- */

.sponsors-grid{

    display:grid;

    gap:.7rem;
}


/* desktop = 6 */

@media(min-width:1024px){

.sponsors-grid{
grid-template-columns:
repeat(6,minmax(0,1fr));
}

}

/* tablet = 4 */

@media(min-width:640px) and (max-width:1023px){

.sponsors-grid{
grid-template-columns:
repeat(4,minmax(0,1fr));
}

}

/* mobile = 3 */

@media(max-width:639px){

.sponsors-grid{
grid-template-columns:
repeat(3,minmax(0,1fr));
}

}



/* ---------- card ---------- */

.sponsor-card{

position:relative;

display:flex;
align-items:center;
justify-content:center;

height:82px;

padding:.55rem;

overflow:hidden;

border-radius:14px;

background:
rgba(255,255,255,.03);

border:
1px solid
rgba(255,255,255,.06);

backdrop-filter:
blur(14px);

box-shadow:
inset 0 1px 0 rgba(255,255,255,.04),
inset 0 -1px 0 rgba(255,255,255,.02);

transition:
all .35s ease;
}


.sponsor-card.animate-in{
animation:
fadeUp .5s forwards;
}


@keyframes fadeUp{

from{

opacity:0;
transform:
translateY(20px);

}

to{

opacity:1;
transform:
translateY(0);

}

}


.sponsor-card::before{
    content:'';
    position:absolute;
    inset:0;
    border-radius:inherit;
    background:radial-gradient(circle at center, rgba(252, 211, 77, 0.03), transparent 70%);
    opacity:0;
    transition:opacity .35s ease;
    pointer-events:none;
}

.sponsor-card:hover{

    border-color:
    rgba(252, 211, 77, 0.25);

    background:
    rgba(255,255,255,.05);

    box-shadow:
    inset 0 1px 0 rgba(252, 211, 77, 0.08),
    inset 0 -1px 0 rgba(252, 211, 77, 0.04),
    0 6px 20px rgba(0, 0, 0, 0.15);

}

.sponsor-card:hover::before{
    opacity:1;
}


/* ---------- content ---------- */

.sponsor-content{

display:flex;
align-items:center;
justify-content:center;

width:100%;
height:100%;
}


.sponsor-image-container{

display:flex;
align-items:center;
justify-content:center;

width:100%;
height:100%;
}


.sponsor-image{

max-width:90%;
max-height:42px;

width:auto;
height:auto;

object-fit:contain;

transition:
transform .4s ease,
filter .4s ease;
}


.sponsor-card:hover .sponsor-image{

transform:
scale(1.07);

filter:
brightness(1.1);

}


.sponsor-label{

font-size:.7rem;

margin-top:.3rem;

color:#d4d4d8;
}


.sponsor-link-overlay{

position:absolute;
inset:0;

z-index:20;
border-radius:inherit;
}


/* mobile scaling */

@media(max-width:639px){

.sponsor-card{

height:70px;
padding:.4rem;

}

.sponsor-image{

max-height:30px;

}

}


@media(min-width:640px)
and (max-width:1023px){

.sponsor-card{

height:76px;

}

    .sponsor-image{

        max-height:36px;

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
