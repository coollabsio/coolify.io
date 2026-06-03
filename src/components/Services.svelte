<script>
    import IconSearch from "./Icons/IconSearch.svelte";
    import IconChevronDown from "./Icons/IconChevronDown.svelte";

    export let services = [];

    let search = "";
    let selectedCategory = "all";
    let dropdownOpen = false;

    const categoryLabels = {
        RSS: "RSS",
        ai: "AI",
        analytics: "Analytics",
        api: "API",
        auth: "Authentication",
        automation: "Automation",
        backend: "Backend",
        ci: "CI/CD",
        cms: "CMS",
        communication: "Communication",
        database: "Database",
        development: "Development",
        devtools: "Dev Tools",
        documentation: "Documentation",
        email: "Email",
        family: "Family",
        finance: "Finance",
        games: "Games",
        git: "Git",
        health: "Health",
        helpdesk: "Helpdesk",
        mcp: "MCP",
        media: "Media",
        messaging: "Messaging",
        monitoring: "Monitoring",
        networking: "Networking",
        other: "Other",
        productivity: "Productivity",
        proxy: "Proxy",
        search: "Search",
        security: "Security",
        storage: "Storage",
        vpn: "VPN"
    };

    function getCategoryLabel(cat) {
        return (
            categoryLabels[cat] ||
            cat.charAt(0).toUpperCase() +
            cat.slice(1)
        );
    }

    function selectCategory(category) {
        selectedCategory = category;
        dropdownOpen = false;
    }

    function matchesSearch(service, query) {
        return [
            service.name,
            service.slogan,
            service.category,
            ...(service.tags || [])
        ]
            .filter(Boolean)
            .some((v) =>
                v.toLowerCase().includes(query)
            );
    }

    function handleImgError(event) {
        event.currentTarget.style.display = "none";
    }

    $: categories = [
        ...new Set(
            services
                .map((s) => s.category)
                .filter(Boolean)
        )
    ].sort();

    $: normalizedSearch =
        search.toLowerCase().trim();

    $: filtered =
        services.filter((service) => {

            if (
                selectedCategory !== "all" &&
                service.category !== selectedCategory
            ) {
                return false;
            }

            if (
                normalizedSearch &&
                !matchesSearch(
                    service,
                    normalizedSearch
                )
            ) {
                return false;
            }

            return true;
        });
</script>

<div class="wrapper">

    <!-- filters -->

    <div class="toolbar">

        <!-- Search -->

        <div class="search-box">

            <div class="search-icon">
                <span class="icon-size">
                    <IconSearch />
                </span>
            </div>

            <input
                bind:value={search}
                placeholder="Search services..."
            />

        </div>

        <!-- dropdown -->

        <div class="dropdown">

            <button
                class="dropdown-trigger"
                on:click={() =>
                    dropdownOpen = !dropdownOpen
                }
            >

                <span>

                    {selectedCategory === "all"
                        ? "All Categories"
                        : getCategoryLabel(
                            selectedCategory
                        )}

                </span>

                <span
                    class={`dropdown-chevron ${
                        dropdownOpen
                            ? "rotate"
                            : ""
                    }`}
                >
                    <span class="icon-size">
                        <IconChevronDown />
                    </span>
                </span>

            </button>

            {#if dropdownOpen}

            <div class="dropdown-menu">

                <div class="dropdown-scroll">

                    <button
                        on:click={() =>
                        selectCategory("all")}
                    >
                        All Categories
                    </button>

                    {#each categories as category}

                    <button
                        on:click={() =>
                        selectCategory(category)}
                    >
                        {getCategoryLabel(
                            category
                        )}
                    </button>

                    {/each}

                </div>

            </div>

            {/if}

        </div>

    </div>

    <p class="results">
        Showing {filtered.length}
        of {services.length}
        services
    </p>

    <!-- cards -->

    <div class="services-grid">

        {#each filtered as service (service.id)}

        <a
            href={service.documentation}
            target="_blank"
            rel="noopener noreferrer"
            class="service-card"
        >

            <div class="grid-texture"></div>

            <div class="service-icon">

                {#if service.logo}

                <img
                    src={service.logo}
                    alt={service.name}
                    loading="lazy"
                    on:error={handleImgError}
                />

                {:else}

                <span>
                    {service.name[0]}
                </span>

                {/if}

            </div>

            <div class="service-content">

                <h3>
                    {service.name}
                </h3>

                <p>
                    {service.slogan}
                </p>

            </div>

        </a>

        {/each}

    </div>

</div>


<style>

.wrapper{
max-width:1400px;
margin:auto;
padding:1rem;
}

/* toolbar */

.toolbar{

display:grid;

grid-template-columns:
minmax(0,1fr)
280px;

gap:1rem;

margin-bottom:2rem;
}

@media(max-width:768px){

.toolbar{

grid-template-columns:1fr;

}

}


/* search */

.search-box{

position:relative;
}

.search-box input{

width:100%;
height:58px;

padding-left:48px;
padding-right:16px;

border-radius:16px;

background:
rgba(255,255,255,.03);

border:
1px solid rgba(
255,
255,
255,
.06
);

color:white;

transition:.3s;
}

.search-box input:focus{

outline:none;

border-color:
rgba(
 250,
 191,
 47,
.4
);

box-shadow:
0 0 0 4px
rgba(
 250,
 191,
 47,
.08
);
}

.search-box input::placeholder{

color:#666;
}

.search-icon{

position:absolute;

left:16px;
top:50%;

transform:
translateY(-50%);

opacity:.5;

z-index:1;
pointer-events:none;
}


/* icon size */

.icon-size{

width:18px;
height:18px;

display:inline-flex;
}

.icon-size :global(svg){

width:100%;
height:100%;
}


/* dropdown */

.dropdown{

position:relative;
width:100%;
}

.dropdown-trigger{

width:100%;
height:58px;

padding:0 1rem;

display:flex;
justify-content:space-between;
align-items:center;

border-radius:16px;

background:
rgba(255,255,255,.03);

border:
1px solid rgba(
255,
255,
255,
.06
);

color:white;
}

.dropdown-chevron{

display:inline-flex;

transition:
transform .3s ease;
}

.rotate{

transform:
rotate(180deg);
}

.dropdown-menu{

position:absolute;

top:110%;
left:0;

width:100%;

overflow:hidden;

border-radius:18px;

background:#101010;

border:
1px solid rgba(
255,
255,
255,
.06
);

z-index:100;
}

.dropdown-scroll{

max-height:260px;

overflow-y:auto;

padding:.5rem;

scrollbar-width:none;

mask-image:
linear-gradient(
to bottom,
transparent,
black 5%,
black 95%,
transparent
);

-webkit-mask-image:
linear-gradient(
to bottom,
transparent,
black 5%,
black 95%,
transparent
);
}

.dropdown-scroll::-webkit-scrollbar{
display:none;
}

.dropdown-scroll button{

width:100%;

padding:.8rem;

text-align:left;

border-radius:12px;

transition:.2s;
}

.dropdown-scroll button:hover{

background:
rgba(
 250,
 191,
 47,
.15
);
}



/* cards */

.services-grid{

display:grid;

grid-template-columns:
repeat(
auto-fill,
minmax(
300px,
1fr
)
);

gap:1rem;
}

.service-card{

position:relative;

display:flex;
gap:1rem;

padding:1rem;

overflow:hidden;

border-radius:24px;

background:
rgba(
255,
255,
255,
.03
);

border:
1px solid rgba(
255,
255,
255,
.05
);

transition:.3s;
}

.service-card:hover{

transform:
translateY(-5px);

border-color:
rgba(
 250,
 191,
 47,
.3
);

box-shadow:
0 15px 35px
rgba(
 250,
 191,
 47,
.1
);
}

.grid-texture{

position:absolute;

top:0;
right:0;

width:120px;
height:120px;

opacity:.25;

background-image:
linear-gradient(
rgba(
 250,
 191,
 47,
.35
)
1px,
transparent 1px
),
linear-gradient(
90deg,
rgba(
 250,
 191,
 47,
.35
)
1px,
transparent 1px
);

background-size:
14px 14px;

mask-image:
radial-gradient(
circle at top right,
black,
transparent
);
}


/* icons */

.service-icon{

width:56px;
height:56px;

min-width:56px;

display:flex;
align-items:center;
justify-content:center;

border-radius:16px;

background:
rgba(
255,
255,
255,
.04
);
}

.service-icon img{

width:34px;
height:34px;

object-fit:contain;
}


/* content */

.service-content{

flex:1;
min-width:0;
}

.service-content h3{

font-size:1rem;
font-weight:600;
}

.service-content p{

font-size:.85rem;

opacity:.7;

margin-top:.4rem;

display:-webkit-box;

-webkit-line-clamp:2;
-webkit-box-orient:vertical;

overflow:hidden;
}

.results{

margin-bottom:1rem;
opacity:.7;
font-size:.9rem;
}

@media(max-width:768px){

.services-grid{
grid-template-columns:1fr;
}

}

</style>