<script>
    import { onMount } from "svelte";

    const ref = "coolify.io";

    const sponsors = [
        {
            name: "23M",
            url: "https://23m.com",
            description:
                "Your experts for high-availability hosting solutions!",
            imageKey: "23mlogo.svg",
        },
        {
            name: "CubePath",
            url: "https://cubepath.com",
            description: "Dedicated Servers & Instant Deploy",
            imageKey: "cubepath.png",
        },
        {
            name: "Macarne",
            url: "https://macarne.com",
            description:
                "Best IP Transit & Carrier Ethernet Solutions for Simplified Network Connectivity",
            imageKey: "macarne.svg",
        },
        {
            name: "Gozunga",
            url: "https://gozunga.com",
            description: "Seriously Simple Cloud Infrastructure",
            imageKey: "gozunga.png",
        },
        {
            name: "Hetzner",
            url: "http://htznr.li/CoolifyXHetzner",
            description: "Server, cloud, hosting, and data center solutions",
            imageKey: "hetzner.jpg",
        },
        {
            name: "Logto",
            url: "https://logto.io",
            description: "The better identity infrastructure for developers",
            imageKey: "logto.webp",
        },
        {
            name: "Supadata",
            url: "https://supadata.ai/",
            description:
                "Scrape YouTube, web, and files. Get AI-ready, clean data for your next project. ",
            imageKey: "supadata.svg",
        },
        // {
        //     name: "WZ-IT",
        //     url: "https://wz-it.com/",
        //     description:
        //         "German agency for customised cloud solutions, migration, managed services and open source hosting, specialising in consulting and implementation of tailor-made cloud infrastructures for SMEs.",
        //     imageKey: "wzit.png",
        // },
        {
            name: "Formbricks",
            url: "https://formbricks.com",
            description: "The open source feedback platform",
            imageKey: "formbricks.svg",
        },
        {
            name: "Tolgee",
            url: "https://tolgee.io",
            description: "The open source localization platform",
            imageKey: "tolgee.svg",
            additionalContent: "Tolgee",
        },
        {
            name: "Best Consultant",
            url: "https://bc.direct",
            description: "Your trusted technology consulting partner",
            imageKey: "bc.png",
        },
        // {
        //     name: "QuantCDN",
        //     url: "https://www.quantcdn.io",
        //     description: "Enterprise-grade content delivery network",
        //     imageKey: "quant.svg",
        // },
        {
            name: "ArcJet",
            url: "https://arcjet.com",
            description: "Advanced web security and performance solutions",
            imageKey: "arcjet.svg",
        },
        {
            name: "SupaGuide",
            url: "https://supa.guide",
            description: "Your comprehensive guide to Supabase",
            imageKey: "supaguide.png",
        },
        {
            name: "CodeRabbit",
            url: "https://coderabbit.ai",
            description: "Cut Code Review Time & Bugs in Half",
            imageKey: "coderabbit.svg",
        },
        {
            name: "Convex",
            url: "https://convex.link/coolify.io",
            description:
                "Convex is the open-source reactive database for web app developers.",
            imageKey: "convex.svg",
        },
        {
            name: "GoldenVM",
            url: "https://billing.goldenvm.com",
            description: "Premium virtual machine hosting solutions",
            imageKey: "goldenvm.png",
        },
        {
            name: "Comit International",
            url: "https://comit.international",
            description: "New York Times award–winning contractor!",
            imageKey: "comit.svg",
        },
        // {
        //     name: "This could be you",
        //     url: "https://github.com/sponsors/coollabsio/sponsorships?tier_id=334953&preview=false",
        //     description: "Become a sponsor",
        //     isSpecial: false,
        //     tier: "special",
        // },
        {
            name: "Compai",
            url: "https://www.trycomp.ai",
            description:
                "The open source compliance automation platform that does everything you need to get compliant, fast. Open source alternative to Drata & Vanta.",
            imageKey: "compai.svg",
        },
        {
            name: "Tigris",
            url: "https://www.tigrisdata.com",
            description: "Modern S3 Alternative",
            imageKey: "tigris.svg",
        },
        // {
        //     name: "Cloudify",
        //     url: "https://cloudify.ro",
        //     description: "Cloud hosting solutions",
        //     imageKey: "cloudify.svg",
        // },
        // {
        //     name: "Trieve",
        //     url: "https://trieve.ai",
        //     description: "AI-powered search and analytics",
        //     imageKey: "trieve-logo.png",

        //     additionalContent: "Trieve",
        // },
        {
            name: "Blacksmith",
            url: "https://blacksmith.sh",
            description: "Infrastructure automation platform",
            imageKey: "blacksmith.svg",
        },
        {
            name: "Syntax.fm",
            url: "https://syntax.fm",
            description: "Podcast for web developers",
            imageKey: "syntax.svg",
        },
        {
            name: "JobsCollider",
            url: "https://jobscollider.com/remote-jobs",
            description: "30,000+ remote jobs for developers",
            imageKey: "jobscollider.svg",
        },
        {
            name: "Darweb",
            url: "https://darweb.nl/?ref=coolify.io&utm_source=coolify.io",
            description:
                "Design. Develop. Deliver. Specialized in 3D CPQ Solutions for eCommerce.",
            imageKey: "darweb.svg",
        },
        {
            name: "Hostinger",
            url: "https://www.hostinger.com/vps/coolify-hosting",
            description: "Web hosting and VPS solutions",
            imageKey: "hostinger.svg",
        },
        {
            name: "Mobb",
            url: "https://vibe.mobb.ai/",
            description:
                "Secure Your AI-Generated Code to Unlock Dev Productivity",
            imageKey: "mobb.svg",
        },
        // {
        //     name: "GlueOps",
        //     url: "https://www.glueops.dev",
        //     description: "DevOps automation and infrastructure management",
        //     imageKey: "glueops.webp",
        //     additionalContent: "GlueOps",
        // },
        // {
        //     name: "How long is this???",
        //     url: "https://github.com/sponsors/coollabsio/sponsorships?tier_id=334953&preview=false",
        //     description: "Become a sponsor",
        //     isSpecial: true,
        //     tier: "special",
        // },
        {
            name: "Ubicloud",
            url: "https://www.ubicloud.com",
            description: "Open source cloud infrastructure platform",
            imageKey: "ubicloud.svg",
        },
        {
            name: "PFGLabs",
            url: "https://pfglabs.com",
            description: "Build Real Projects with Golang",
            imageKey: "pfglabs.svg",
            additionalContent: "PFGLabs",
        },
        {
            name: "JuxtDigital",
            url: "https://juxtdigital.com",
            description: "Digital PR & AI Authority Building Agency",
            imageKey: "juxtdigital.png",
        },
        {
            name: "SaasyKit",
            url: "https://saasykit.com",
            description: "Complete SaaS starter kit for developers",
            imageKey: "saasykit.webp",
        },
        // {
        //     name: "MassiveGrid",
        //     url: "https://massivegrid.com",
        //     description: "Enterprise cloud hosting solutions",
        //     imageKey: "massivegrid.svg",
        // },
        {
            name: "American Cloud",
            url: "https://americancloud.com",
            description: "US-based cloud infrastructure services",
            imageKey: "americancloud.svg",
        },
        {
            name: "Algora",
            url: "https://algora.io",
            description: "Open source contribution platform",
            imageKey: "algora.svg",
        },
        {
            name: "LiquidWeb",
            url: "https://liquidweb.com",
            description: "Premium managed hosting solutions",
            imageKey: "liquid.svg",
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
    let sponsorsGridElement;

    onMount(() => {
        // Add staggered animation to sponsor items
        const sponsorItems =
            sponsorsGridElement.querySelectorAll(".sponsor-card");
        sponsorItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 50}ms`;
            item.classList.add("animate-in");
        });
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
    <p bind:this={descriptionText} class="text-white text-xl font-medium"></p>
</div>

<div class="pt-10">
    <div class="sponsors-header">
        <h2 class="sponsors-title">Our Amazing Sponsors</h2>
        <p class="sponsors-subtitle text-neutral-400">
            Supporting the future of open source infrastructure
        </p>
        <div class="text-warning">
            <a
                class="hover:underline"
                href="https://github.com/sponsors/coollabsio"
                >Become a sponsor
                <p class="text-xs opacity-70">~170k visitors/m</p></a
            >
        </div>
    </div>

    <div bind:this={sponsorsGridElement} class="sponsors-grid pb-10">
        {#each sponsorsWithRef as sponsor, index}
            <a
                class="sponsor-card {sponsor.tier ||
                    ''} plausible-event-name=big-sponsor-clicks"
                href={sponsor.url}
                on:mouseenter={() => handleMouseEnter(sponsor.description)}
                on:mouseleave={handleMouseLeave}
            >
                <div>
                    {#if sponsor.isSpecial}
                        <div class="bg-red-500">
                            <div class="special-icon">✨</div>
                            <span class="sponsor-label">{sponsor.name}</span>
                        </div>
                    {:else}
                        <div class="sponsor-image-container">
                            <img
                                src={`/images/${sponsor.imageKey}`}
                                loading="eager"
                                alt={sponsor.description}
                                class="sponsor-image {sponsor.imageKey ===
                                '23mlogo.svg'
                                    ? 'logo-23m'
                                    : ''}"
                            />
                            {#if sponsor.additionalContent}
                                <div class="sponsor-label">
                                    {sponsor.additionalContent}
                                </div>
                            {/if}
                        </div>
                    {/if}
                </div>
            </a>
        {/each}
    </div>
</div>

<style>
    .description-container {
        height: 0;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background: linear-gradient(
            135deg,
            rgba(23, 23, 23, 0.95),
            rgba(45, 45, 45, 0.95)
        );
        backdrop-filter: blur(10px);
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
        pointer-events: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    }

    .description-container.active {
        height: 120px;
    }

    .sponsors-header {
        text-align: center;
        margin-bottom: 3rem;
    }

    .sponsors-title {
        font-size: 2.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.5rem;
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

    .sponsor-card:hover::before {
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
        min-height: 120px;
        position: relative;
        z-index: 1;
    }

    .sponsor-image-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        width: 100%;
    }

    .sponsor-image {
        max-width: 100%;
        max-height: 60px;
        width: auto;
        height: auto;
        object-fit: contain;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        filter: brightness(0.9) contrast(1.1);
    }

    .logo-23m {
        max-height: 38px;
    }

    .sponsor-card:hover .sponsor-image {
        transform: scale(1.1);
        filter: brightness(1) contrast(1.2);
    }

    .sponsor-label {
        margin-top: 0.75rem;
        margin-left: 0.5rem;
        font-size: 1.3rem;
        font-weight: 600;
        color: #e5e7eb;
        text-transform: capitalize;
        letter-spacing: 0.05em;
        text-align: center;
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

    /* Responsive adjustments */
    @media (max-width: 640px) {
        .sponsors-title {
            font-size: 2rem;
        }

        .sponsors-subtitle {
            font-size: 1rem;
        }

        .sponsor-card {
            padding: 1rem;
        }

        .sponsor-content {
            min-height: 100px;
        }

        .sponsor-image {
            max-height: 60px;
        }
        .sponsor-label {
            display: none;
        }
    }
</style>
