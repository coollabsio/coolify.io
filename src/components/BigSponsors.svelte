<script>
    import EmblaCarousel from "embla-carousel";
    import AutoScroll from "embla-carousel-auto-scroll";
    import { onMount } from "svelte";

    const ref = "coolify.io";

    function getImageExtension(imageKey) {
        const extensionMap = {
            logto: "webp",
            hetzner: "jpg",
            quant: "svg",
            arcjet: "svg",
            bc: "png",
            supaguide: "png",
            tigris: "svg",
            goldenvm: "png",
            trieve: "png",
            blacksmith: "svg",
            jobscollider: "svg",
            hostinger: "svg",
            glueops: "webp",
            ubicloud: "svg",
            juxtdigital: "png",
            massivegrid: "svg",
            americancloud: "svg",
            algora: "svg",
            liquid: "svg",
            tolgee: "svg",
            syntax: "svg",
            pfglabs: "svg",
            cloudify: "svg",
            comit: "svg",
            stream: "svg",
            convex: "svg",
            coderabbit: "svg",
            compai: "svg",
        };
        return extensionMap[imageKey] || "png"; // default to png if not found
    }

    const sponsors = [
        {
            name: "Hetzner",
            url: "http://htznr.li/CoolifyXHetzner",
            description: "Server, cloud, hosting, and data center solutions",
            imageKey: "hetzner",
            width: 180,
            height: 180,
        },
        {
            name: "Logto",
            url: "https://logto.io",
            description: "The better identity infrastructure for developers",
            imageKey: "logto",
            width: 180,
            height: 180,
        },
        {
            name: "Tolgee",
            url: "https://tolgee.io",
            description: "The open source localization platform",
            imageKey: "tolgee",
            width: 50,
            height: 50,
            customStyle: "flex justify-center items-center",
            additionalContent:
                '<div class="text-left font-bold text-white text-3xl">Tolgee</div>',
        },
        {
            name: "Best Consultant",
            url: "https://bc.direct",
            description: "Your trusted technology consulting partner",
            imageKey: "bc",
            width: 180,
            height: 180,
        },
        {
            name: "QuantCDN",
            url: "https://www.quantcdn.io",
            description: "Enterprise-grade content delivery network",
            imageKey: "quant",
            width: 160,
            height: 160,
        },
        {
            name: "ArcJet",
            url: "https://arcjet.com",
            description: "Advanced web security and performance solutions",
            imageKey: "arcjet",
            width: 200,
            height: 200,
        },
        {
            name: "SupaGuide",
            url: "https://supa.guide",
            description: "Your comprehensive guide to Supabase",
            imageKey: "supaguide",
            width: 200,
            height: 200,
        },
        {
            name: "CodeRabbit",
            url: "https://coderabbit.ai",
            description: "Cut Code Review Time & Bugs in Half",
            imageKey: "coderabbit",
            width: 200,
            height: 200,
        },
        {
            name: "Convex",
            url: "https://convex.link/coolify.io",
            description:
                "Convex is the open-source reactive database for web app developers.",
            imageKey: "convex",
            width: 200,
            height: 200,
        },
        {
            name: "Stream",
            url: "https://getstream.io/?utm_source=opensource&utm_medium=referral&utm_content=&utm_campaign=coolifyq12025",
            description:
                "APIs and SDKs to Build In-App Chat, Video, & Feeds Faster.",
            imageKey: "stream",
            width: 180,
            height: 180,
        },
        {
            name: "GoldenVM",
            url: "https://billing.goldenvm.com",
            description: "Premium virtual machine hosting solutions",
            imageKey: "goldenvm",
            width: 180,
            height: 180,
        },
        {
            name: "Comit International",
            url: "https://comit.international",
            description: "New York Times award–winning contractor!",
            imageKey: "comit",
            width: 80,
            height: 80,
            customStyle: "flex justify-center flex-col items-center",
        },
        {
            name: "This could be you",
            url: "https://github.com/sponsors/coollabsio/sponsorships?tier_id=334953&preview=false",
            description: "Become a sponsor",
            isSpecial: true,
            customStyle: "rainbow-border",
        },
        {
            name: "Compai",
            url: "https://www.trycomp.ai",
            description:
                "The open source compliance automation platform that does everything you need to get compliant, fast. Open source alternative to Drata & Vanta.",
            imageKey: "compai",
            width: 130,
            height: 130,
        },
        {
            name: "Tigris",
            url: "https://www.tigrisdata.com",
            description: "Modern developer data platform",
            imageKey: "tigris",
            width: 130,
            height: 130,
        },

        {
            name: "Cloudify",
            url: "https://cloudify.ro",
            description: "Cloud hosting solutions",
            imageKey: "cloudify",
            width: 180,
            height: 180,
        },

        {
            name: "Trieve",
            url: "https://trieve.ai",
            description: "AI-powered search and analytics",
            imageKey: "trieve-logo",
            width: 180,
            height: 180,
            customStyle: "p-2 mb-5",
            additionalContent:
                '<div class="text-left font-bold text-white text-3xl">Trieve</div>',
        },
        {
            name: "Blacksmith",
            url: "https://blacksmith.sh",
            description: "Infrastructure automation platform",
            imageKey: "blacksmith",
            width: 250,
            height: 250,
        },
        {
            name: "Syntax.fm",
            url: "https://syntax.fm",
            description: "Podcast for web developers",
            imageKey: "syntax",
            width: 10,
            height: 10,
        },
        {
            name: "JobsCollider",
            url: "https://jobscollider.com/remote-jobs",
            description: "30,000+ remote jobs for developers",
            imageKey: "jobscollider",
            width: 180,
            height: 180,
        },
        {
            name: "Hostinger",
            url: "https://www.hostinger.com/vps/coolify-hosting",
            description: "Web hosting and VPS solutions",
            imageKey: "hostinger",
            width: 180,
            height: 180,
        },
        {
            name: "GlueOps",
            url: "https://www.glueops.dev",
            description: "DevOps automation and infrastructure management",
            imageKey: "glueops",
            width: 50,
            height: 50,
            customStyle: "flex justify-center items-center",
            additionalContent:
                '<div class="text-left text-xl font-bold text-white px-2 uppercase tracking-wider">GlueOps</div>',
        },
        {
            name: "How long is this???",
            url: "https://github.com/sponsors/coollabsio/sponsorships?tier_id=334953&preview=false",
            description: "Become a sponsor",
            isSpecial: true,
            customStyle: "rainbow-border",
        },
        {
            name: "Ubicloud",
            url: "https://www.ubicloud.com",
            description: "Open source cloud infrastructure platform",
            imageKey: "ubicloud",
            width: 200,
            height: 200,
        },
        {
            name: "PFGLabs",
            url: "https://pfglabs.com",
            description: "Build Real Projects with Golang",
            imageKey: "pfglabs",
            width: 50,
            height: 50,
            customStyle: "flex justify-center items-center",
            additionalContent:
                '<div class="text-left text-xl font-bold text-white px-2 uppercase tracking-wider">PFGLabs</div>',
        },
        {
            name: "JuxtDigital",
            url: "https://juxtdigital.com",
            description: "Digital transformation and web solutions",
            imageKey: "juxtdigital",
            width: 160,
            height: 160,
        },
        {
            name: "SaasyKit",
            url: "https://saasykit.com",
            description: "Complete SaaS starter kit for developers",
            imageKey: "/saasykit.webp", // Using absolute path for public directory
            width: 180,
            height: 180,
            isPublicImage: true,
        },
        {
            name: "MassiveGrid",
            url: "https://massivegrid.com",
            description: "Enterprise cloud hosting solutions",
            imageKey: "massivegrid",
            width: 220,
            height: 220,
        },
        {
            name: "American Cloud",
            url: "https://americancloud.com",
            description: "US-based cloud infrastructure services",
            imageKey: "americancloud",
            width: 240,
            height: 240,
        },
        {
            name: "Algora",
            url: "https://algora.io",
            description: "Open source contribution platform",
            imageKey: "algora",
            width: 240,
            height: 240,
            customStyle: "flex justify-center items-center",
        },
        {
            name: "LiquidWeb",
            url: "https://liquidweb.com",
            description: "Premium managed hosting solutions",
            imageKey: "liquid",
            width: 240,
            height: 240,
            customStyle: "flex justify-center items-center",
        },
    ];

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    const sponsorsWithRef = shuffleArray(
        sponsors.map((sponsor) => ({
            ...sponsor,
            url: sponsor.url.includes("?")
                ? `${sponsor.url}&ref=${ref}&utm_source=${ref}`
                : `${sponsor.url}?ref=${ref}&utm_source=${ref}`,
        })),
    );

    let descriptionContainer;
    let descriptionText;
    let emblaNode;

    onMount(() => {
        const options = {
            loop: true,
            containScroll: "trimSnaps",
            slidesToScroll: 1,
            skipSnaps: false,
            align: "start",
            watchDrag: true,
        };

        const autoScrollOptions = {
            speed: 1,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            playOnInit: false,
        };

        const emblaApi = EmblaCarousel(emblaNode, options, [
            AutoScroll(autoScrollOptions),
        ]);

        emblaApi.plugins().autoScroll.play();

        return () => {
            emblaApi.destroy();
        };
    });

    function handleMouseEnter(description) {
        if (description) {
            descriptionText.textContent = description;
            descriptionContainer.classList.add("active");
        }
    }

    function handleMouseLeave() {
        descriptionContainer.classList.remove("active");
    }
</script>

<div
    bind:this={descriptionContainer}
    id="description"
    class="description-container"
>
    <p bind:this={descriptionText} class="text-white text-xl"></p>
</div>

<div bind:this={emblaNode} class="embla">
    <div class="embla__container">
        {#each sponsorsWithRef as sponsor}
            <div class="embla__slide">
                <a
                    class={sponsor.isSpecial
                        ? "hover:bg-coolgray-200 p-4 rounded flex justify-center flex-col items-center rainbow-border text-white font-bold text-xl col-span-1"
                        : `sponsor-item hover:bg-coolgray-200 rounded ${sponsor.customStyle || "p-4"}`}
                    href={sponsor.url}
                    on:mouseenter={() => handleMouseEnter(sponsor.description)}
                    on:mouseleave={handleMouseLeave}
                >
                    {#if sponsor.isSpecial}
                        <span
                            class="bg-base-100 w-full h-full flex justify-center items-center"
                        >
                            {sponsor.name}
                        </span>
                    {:else if sponsor.isPublicImage}
                        <img
                            src={sponsor.imageKey}
                            width={sponsor.width || 180}
                            height={sponsor.height || 180}
                            loading="eager"
                            alt={sponsor.description}
                            class="rounded"
                        />
                    {:else}
                        <img
                            src={`/src/images/${sponsor.imageKey}.${getImageExtension(sponsor.imageKey)}`}
                            width={sponsor.width || 180}
                            height={sponsor.height || 180}
                            loading="eager"
                            alt={sponsor.description}
                            class="rounded"
                        />
                    {/if}
                    {#if sponsor.additionalContent}
                        {@html sponsor.additionalContent}
                    {/if}
                </a>
            </div>
        {/each}
    </div>
</div>
<hr class="mb-2 border-coolgray-200" />

<style>
    .description-container {
        height: 0;
        overflow: hidden;
        transition: height 0.3s ease-out;
        background: rgba(23, 23, 23, 0.9);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0 2rem;
    }

    .description-container.active {
        height: 120px;
    }

    .embla {
        overflow: hidden;
        max-width: 1400px;
        margin: 0 auto;
        position: relative;
    }

    .embla__container {
        display: flex;
        backface-visibility: hidden;
        will-change: transform;
        touch-action: pan-y;
    }

    .embla__slide {
        flex: 0 0 20%;
        min-width: 0;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 16/9;
        padding: 0.5rem;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
    }

    @media (max-width: 1024px) {
        .embla__slide {
            flex: 0 0 33.33%;
        }
    }

    @media (max-width: 640px) {
        .embla__slide {
            flex: 0 0 50%;
        }
    }

    @media (max-width: 480px) {
        .embla__slide {
            flex: 0 0 100%;
        }
    }

    .sponsor-item {
        position: relative;
        aspect-ratio: 16/9;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 200px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        transition: transform 0.2s ease;
    }

    .sponsor-item img {
        width: auto;
        height: auto;
        object-fit: contain;
        min-width: 60px;
        min-height: 50px;
        max-width: 160px;
        max-height: 80px;
        transition: transform 0.2s ease;
    }

    .sponsor-item img[src*="cloudify.svg"] {
        max-width: 160px;
        max-height: 80px;
        min-height: 80px;
    }

    .sponsor-item img[src*="syntax.svg"] {
        max-width: 190px;
        max-height: 120px;
        min-height: 80px;
    }

    .sponsor-item img[src*="arcjet.svg"],
    .sponsor-item img[src*="algora.svg"],
    .sponsor-item img[src*="liquid.svg"],
    .sponsor-item img[src*="massivegrid.svg"] {
        max-width: 190px;
        max-height: 120px;
        min-height: 80px;
    }

    .sponsor-item img[src*="pfglabs.svg"] {
        min-width: 10px;
        min-height: 35px;
        max-width: 100px;
        max-height: 35px;
    }

    .sponsor-item img[src*="tigris.svg"],
    .sponsor-item img[src*="tolgee.svg"],
    .sponsor-item img[src*="hostinger.svg"],
    .sponsor-item img[src*="ubicloud.svg"],
    .sponsor-item img[src*="blacksmith.svg"],
    .sponsor-item img[src*="jobscollider.svg"],
    .sponsor-item img[src*="americancloud.svg"] {
        max-width: 160px;
        max-height: 50px;
        min-height: 50px;
    }

    .sponsor-item:hover {
        transform: scale(1.1);
        z-index: 1;
    }

    .rainbow-border {
        position: relative;
        border-radius: 6px;
        padding: 0.2rem;
        background: linear-gradient(
            124deg,
            #ff2400,
            #e81d1d,
            #e8b71d,
            #e3e81d,
            #1de840,
            #1ddde8,
            #2b1de8,
            #dd00f3,
            #dd00f3
        );
        background-size: 200% 100%;
        animation: rainbow 2s ease infinite;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes rainbow {
        0% {
            background-position: 0% 82%;
        }
        50% {
            background-position: 100% 19%;
        }
        100% {
            background-position: 0% 82%;
        }
    }
</style>
