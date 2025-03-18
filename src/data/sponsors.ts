interface Sponsor {
    name: string;
    url: string;
    description: string;
    imageKey?: string;  // Made optional for special cases
    width?: number;
    height?: number;
    customStyle?: string;
    additionalContent?: string;
    isPublicImage?: boolean;
    isSpecial?: boolean;  // For special cases like "This could be you"
}

export const sponsors: Sponsor[] = [
    {
        name: "Hetzner",
        url: "http://htznr.li/CoolifyXHetzner",
        description: "Server, cloud, hosting, and data center solutions",
        imageKey: "hetzner",
        width: 180,
        height: 180
    },
    {
        name: "Logto",
        url: "https://logto.io",
        description: "The better identity infrastructure for developers",
        imageKey: "logto",
        width: 180,
        height: 180
    },
    {
        name: "Tolgee",
        url: "https://tolgee.io",
        description: "The open source localization platform",
        imageKey: "tolgee",
        width: 50,
        height: 50,
        customStyle: "flex justify-center items-center",
        additionalContent: '<div class="text-left font-bold text-white text-3xl">Tolgee</div>'
    },
    {
        name: "Best Consultant",
        url: "https://bc.direct",
        description: "Your trusted technology consulting partner",
        imageKey: "bc",
        width: 180,
        height: 180
    },
    {
        name: "QuantCDN",
        url: "https://www.quantcdn.io",
        description: "Enterprise-grade content delivery network",
        imageKey: "quant",
        width: 160,
        height: 160
    },
    {
        name: "ArcJet",
        url: "https://arcjet.com",
        description: "Advanced web security and performance solutions",
        imageKey: "arcjet",
        width: 200,
        height: 200
    },
    {
        name: "SupaGuide",
        url: "https://supa.guide",
        description: "Your comprehensive guide to Supabase",
        imageKey: "supaguide",
        width: 200,
        height: 200
    },
    {
        name: "CodeRabbit",
        url: "https://coderabbit.ai",
        description: "Cut Code Review Time & Bugs in Half",
        imageKey: "coderabbit",
        width: 200,
        height: 200
    },
    {
        name: "Convex",
        url: "https://convex.link/coolify.io",
        description: "Convex is the open-source reactive database for web app developers.",
        imageKey: "convex",
        width: 200,
        height: 200
    },
    {
        name: "Stream",
        url: "https://getstream.io/?utm_source=opensource&utm_medium=referral&utm_content=&utm_campaign=coolifyq12025",
        description: "APIs and SDKs to Build In-App Chat, Video, & Feeds Faster.",
        imageKey: "stream",
        width: 180,
        height: 180
    },
    {
        name: "GoldenVM",
        url: "https://billing.goldenvm.com",
        description: "Premium virtual machine hosting solutions",
        imageKey: "goldenvm",
        width: 180,
        height: 180
    },
    {
        name: "Comit International",
        url: "https://comit.international",
        description: "New York Times award–winning contractor!",
        imageKey: "comit",
        width: 80,
        height: 80,
        customStyle: "flex justify-center flex-col items-center"
    },
    {
        name: "This could be you",
        url: "https://github.com/sponsors/coollabsio/sponsorships?tier_id=334953&preview=false",
        description: "Become a sponsor",
        isSpecial: true,
        customStyle: "rainbow-border"
    },
    {
        name: "Compai",
        url: "https://www.trycomp.ai",
        description: "The open source compliance automation platform that does everything you need to get compliant, fast. Open source alternative to Drata & Vanta.",
        imageKey: "compai",
        width: 130,
        height: 130
    },
    {
        name: "Tigris",
        url: "https://www.tigrisdata.com",
        description: "Modern developer data platform",
        imageKey: "tigris",
        width: 130,
        height: 130
    },

    {
        name: "Cloudify",
        url: "https://cloudify.ro",
        description: "Cloud hosting solutions",
        imageKey: "cloudify",
        width: 180,
        height: 180
    },

    {
        name: "Trieve",
        url: "https://trieve.ai",
        description: "AI-powered search and analytics",
        imageKey: "trieve",
        width: 180,
        height: 180,
        customStyle: "p-2 mb-5",
        additionalContent: '<div class="text-left font-bold text-white text-3xl">Trieve</div>'
    },
    {
        name: "Blacksmith",
        url: "https://blacksmith.sh",
        description: "Infrastructure automation platform",
        imageKey: "blacksmith",
        width: 250,
        height: 250
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
        height: 180
    },
    {
        name: "GlueOps",
        url: "https://www.glueops.dev",
        description: "DevOps automation and infrastructure management",
        imageKey: "glueops",
        width: 50,
        height: 50,
        customStyle: "flex justify-center items-center",
        additionalContent: '<div class="text-left text-xl font-bold text-white px-2 uppercase tracking-wider">GlueOps</div>'
    },
    {
        name: "How long is this???",
        url: "https://github.com/sponsors/coollabsio/sponsorships?tier_id=334953&preview=false",
        description: "Become a sponsor",
        isSpecial: true,
        customStyle: "rainbow-border"
    },
    {
        name: "Ubicloud",
        url: "https://www.ubicloud.com",
        description: "Open source cloud infrastructure platform",
        imageKey: "ubicloud",
        width: 200,
        height: 200
    },
    {
        name: "PFGLabs",
        url: "https://pfglabs.com",
        description: "Build Real Projects with Golang",
        imageKey: "pfglabs",
        width: 50,
        height: 50,
        customStyle: "flex justify-center items-center",
        additionalContent: '<div class="text-left text-xl font-bold text-white px-2 uppercase tracking-wider">PFGLabs</div>'
    },
    {
        name: "JuxtDigital",
        url: "https://juxtdigital.com",
        description: "Digital transformation and web solutions",
        imageKey: "juxtdigital",
        width: 160,
        height: 160
    },
    {
        name: "SaasyKit",
        url: "https://saasykit.com",
        description: "Complete SaaS starter kit for developers",
        imageKey: "/saasykit.webp",  // Using absolute path for public directory
        width: 180,
        height: 180,
        isPublicImage: true
    },
    {
        name: "MassiveGrid",
        url: "https://massivegrid.com",
        description: "Enterprise cloud hosting solutions",
        imageKey: "massivegrid",
        width: 220,
        height: 220
    },
    {
        name: "American Cloud",
        url: "https://americancloud.com",
        description: "US-based cloud infrastructure services",
        imageKey: "americancloud",
        width: 240,
        height: 240
    },
    {
        name: "Algora",
        url: "https://algora.io",
        description: "Open source contribution platform",
        imageKey: "algora",
        width: 240,
        height: 240,
        customStyle: "flex justify-center items-center"
    },
    {
        name: "LiquidWeb",
        url: "https://liquidweb.com",
        description: "Premium managed hosting solutions",
        imageKey: "liquid",
        width: 240,
        height: 240,
        customStyle: "flex justify-center items-center"
    }
]; 