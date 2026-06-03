<script>
  import EmblaCarousel from "embla-carousel";
  import AutoScroll from "embla-carousel-auto-scroll";
  import { onMount } from "svelte";
  import IconRunpod from "./Icons/IconRunpod.svelte";

  const sponsors = [
    {
      name: "Vanaways",
      url: "https://vanaways.co.uk/?utm_source=coolify.io",
      imageUrl: "https://github.com/Vanaways.png",
      newest: true,
    },
    {
      name: "ParsecPH",
      url: "https://github.com/parsecph",
      imageUrl: "https://github.com/parsecph.png",
    },
    {
      name: "Netrouting",
      url: "https://www.netrouting.com/?utm_source=coolify.io",
      imageUrl: "https://github.com/netroutingcom.png",
    },
    {
      name: "MindEd Tech",
      url: "https://github.com/mindedtech",
      imageUrl: "https://github.com/mindedtech.png",
    },
    {
      name: "YouStable",
      url: "https://youstable.com/?utm_source=coolify.io",
      imageUrl: "https://github.com/youstable.png",
    },
    {
      name: "Transcript LOL",
      url: "https://transcript.lol/?utm_source=coolify.io",
      imageUrl: "https://transcript.lol/logo.png",
    },
    {
      name: "Autom",
      url: "https://www.autom.dev/?utm_source=coolify.io",
      imageUrl: "/images/autom.png",
    },
    {
      name: "HuntAPI",
      url: "https://www.huntapi.com/?utm_source=coolify.io",
      imageUrl: "/images/huntapi.png",
    },
    {
      name: "ULTRASERVERS",
      url: "https://ultraservers.com/?utm_source=coolify.io",
      imageUrl: "https://github.com/ULTRASERVERS.png",
    },
    {
      name: "VibeTone",
      url: "https://vibetone.com/?utm_source=coolify.io",
      imageUrl: "https://github.com/vibetonefm.png",
    },
    {
      name: "Piloterr",
      url: "https://www.piloterr.com/?utm_source=coolify.io",
      imageUrl: "/images/piloterr.svg",
      isPublicImage: true,
    },
    {
      name: "Alexey Panteleev",
      url: "https://yoxel.com/?utm_source=coolify.io",
      imageUrl: "https://github.com/aspantel.png",
    },
    // {
    //   name: "Cloo Solutions",
    //   url: "https://cloo-solutions.de/?utm_source=coolify.io",
    //   imageUrl: "https://github.com/Cloo-Solutions.png",
    // },
    {
      name: "SummYT - YouTube Summarizer",
      url: "https://summyt.app?utm_source=coolify.io",
      imageUrl: "https://summyt.app/logo.svg",
    },
    {
      name: "OpenElements",
      url: "https://open-elements.com/?utm_source=coolify.io",
      imageUrl: "https://github.com/OpenElements.png",
    },
    {
      name: "Xaman",
      url: "https://xaman.app/?utm_source=coolify.io",
      imageUrl: "https://github.com/XamanApp.png",
    },
    {
      name: "Monadical",
      url: "https://monadical.com/?utm_source=coolify.io",
      imageUrl: "https://github.com/Monadical-SAS.png",
    },
    {
      name: "Magic as a Service",
      url: "https://maas.engineering/?utm_source=coolify.io",
      imageUrl: "https://github.com/magicasaservice.png",
    },
    {
      name: "FiveManage",
      url: "https://fivemanage.com?utm_source=coolify.io",
      imageUrl: "/images/fivemanage.jpg",
    },
    {
      name: "Crypto Jobs List",
      url: "https://cryptojobslist.com/?utm_source=coolify.io",
      imageUrl: "https://github.com/cryptojobslist.png",
    },
    {
      name: "SerpAPI",
      url: "https://serpapi.com/?utm_source=coolify.io",
      imageUrl: "https://github.com/serpapi.png",
    },
    {
      name: "typebot",
      url: "https://typebot.io/?utm_source=coolify.io",
      imageUrl:
        "https://cdn.bsky.app/img/avatar/plain/did:plc:gwxcta3pccyim4z5vuultdqx/bafkreig23hci7e2qpdxicsshnuzujbcbcgmydxhbybkewszdezhdodv42m@jpeg",
    },
    {
      name: "360Creators",
      url: "https://360creators.com/?utm_source=coolify.io",
      imageUrl:
        "https://opencollective-production.s3.us-west-1.amazonaws.com/account-avatar/503e0953-bff7-4296-b4cc-5e36d40eecc0/icon-360creators.png",
    },
    {
      name: "Cap-go",
      url: "https://capgo.app/?utm_source=coolify.io",
      imageUrl: "https://github.com/cap-go.png",
    },

    {
      name: "Cirun",
      url: "https://cirun.io/?utm_source=coolify.io",
      imageUrl: "/images/cirun-logo.png",
    },
    // {
    //   name: "Alfred Nutile",
    //   url: "https://www.youtube.com/@AlfredNutile?utm_source=coolify.io",
    //   imageUrl: "https://github.com/alnutile.png",
    // },
    {
      name: "Become a sponsor",
      url: "https://github.com/sponsors/coollabsio/sponsorships?tier_id=61570&preview=false",
      imageUrl: "question",

      isSpecial: true,
    },
    {
      name: "Internet Garden",
      url: "https://internetgarden.co/?utm_source=coolify.io",
      imageUrl: "/images/internetgarden.ico",

      isPublicImage: true,
    },
    // {
    //   name: "TheRealJP",
    //   url: "https://github.com/therealjp?utm_source=coolify.io",
    //   imageUrl: "https://github.com/therealjp.png",
    // },
    {
      name: "Evercam",
      url: "https://evercam.io/?utm_source=coolify.io",
      imageUrl: "https://github.com/evercam.png",
    },
    {
      name: "Web3 Jobs",
      url: "https://web3.career/?utm_source=coolify.io",
      imageUrl: "/images/web3jobs.png",
    },
    {
      name: "LinkDr",
      url: "https://linkdr.com?utm_source=coolify.io",
      imageUrl: "/images/linkdr.svg",
      isPublicImage: true,
    },
    {
      name: "Arvensis Systems",
      url: "https://arvensis.systems/?utm_source=coolify.io",
      imageUrl: "/images/arvensis.png",
    },
    {
      name: "Reshot",
      url: "https://www.reshot.ai/?utm_source=coolify.io",
      imageUrl: "/images/reshotai.png",
    },
    // {
    //   name: "Devhuset",
    //   url: "https://devhuset.no?utm_source=coolify.io",
    //   imageUrl: "https://github.com/devhuset.png",
    // },
    {
      name: "RunPod",
      url: "https://www.runpod.io/?utm_source=coolify.io",
      imageUrl: "/images/runpod.svg",
      isSpecial: true,
    },
    {
      name: "Gravity Wiz",
      url: "http://gravitywiz.com/?utm_source=coolify.io",
      imageUrl: "https://github.com/gravitywiz.png",
    },
    {
      name: "UXWizz",
      url: "https://www.uxwizz.com/?utm_source=coolify.io",
      imageUrl: "https://github.com/UXWizz.png",
    },
    {
      name: "Codext",
      url: "https://codext.link/coolify-io?utm_source=coolify.io",
      imageUrl: "/images/codext.jpg",
    },
    {
      name: "InterviewPal",
      url: "https://interviewpal.com",
      imageUrl: "/images/interviewpal.svg",
    },
    {
      name: "Decidable",
      url: "https://decidable.no?utm_source=coolify.io",
      imageUrl: "https://github.com/Decidable-AS.png",
    },
    {
      name: "Host Havoc",
      url: "https://hosthavoc.com",
      imageUrl: "https://raw.githubusercontent.com/coollabsio/coollabs-cdn/main/images/sponsors/hosthavoc.png",
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

  const smallSponsors = shuffleArray(sponsors);
  let emblaSmallNode;

  onMount(() => {
    const smallOptions = {
      loop: true,
      containScroll: "trimSnaps",
      slidesToScroll: 1,
      skipSnaps: false,
      watchDrag: true,
    };

    const smallAutoScrollOptions = {
      speed: 1,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: false,
    };

    const emblaSmallApi = EmblaCarousel(emblaSmallNode, smallOptions, [
      AutoScroll(smallAutoScrollOptions),
    ]);

    setTimeout(() => {
      emblaSmallApi.plugins().autoScroll.play();
    }, 300);

    return () => {
      emblaSmallApi.destroy();
    };
  });

  function getImagePath(imageUrl) {
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
    return imageUrl;
  }
</script>

<div class="py-4 mt-4 overflow-x-hidden">
  <div class="flex flex-col items-center gap-2">
    <h3 class="tier-title-small tier-title-silver">&#9679; Silver Sponsors</h3>
    <div bind:this={emblaSmallNode} class="embla-small">
      <div class="embla-small__container">
        {#each smallSponsors as sponsor (sponsor.name)}
          <div class="embla-small__slide sponsor-tooltip-wrapper">
            {#if sponsor.isSpecial && sponsor.imageUrl === "question"}
              <div
                class="small-sponsor-visual w-12 h-12 border border-warning font-bold border-dashed hover:bg-warning hover:text-black flex justify-center text-center items-center text-3xl text-white animate-pulse rounded-full"
              >
                ?!
              </div>
            {:else if sponsor.isSpecial && sponsor.imageUrl === "runpod-svg"}
              <div class="small-sponsor-visual">
                <IconRunpod class="w-11 h-11 fill-[#824edc] bg-white rounded" />
              </div>
            {:else if sponsor.isPublicImage}
              <div class="small-sponsor-visual">
                <img
                  class={sponsor.customStyle || ""}
                  src={sponsor.imageUrl}
                  width={sponsor.width || 45}
                  height={sponsor.height || 45}
                  loading="eager"
                  alt={sponsor.name}
                />
              </div>
            {:else}
              <div
                class="small-sponsor-visual transition-all duration-100 {sponsor.newest
                  ? 'rainbow-border'
                  : ''}"
              >
                <img
                  class="rounded-full"
                  src={getImagePath(sponsor.imageUrl)}
                  width={sponsor.width || 45}
                  height={sponsor.height || 45}
                  loading="eager"
                  alt={sponsor.name}
                />
              </div>
            {/if}
            <span class="sponsor-tooltip" role="tooltip">
              {sponsor.name}
              <span class="tooltip-line" aria-hidden="true"></span>
            </span>
            <a
              href={sponsor.url}
              class="small-sponsor-link plausible-event-name=small-sponsor-clicks"
              aria-label={sponsor.name}
            ></a>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="text-center pt-4">
    <a
      class="text-warning underline text-xs hover:text-white"
      href="https://github.com/sponsors/coollabsio"
    >
      ...and many more...
    </a>
  </div>
</div>

<style>
.tier-title-small{
    text-align:center;
    font-size:1.125rem;
    font-weight:600;
    color:#9ca3af;
    letter-spacing:.08em;
    text-transform:uppercase;
    margin:0 0 1rem 0;
}

.tier-title-silver {
    color: #9ca3af;
    font-size: 1rem;
}

/* marquee container */

.embla-small{
    overflow:hidden;
    max-width:100%;
    margin:0 auto;
    position:relative;

    /* fade mask */
    mask-image:
        linear-gradient(
            to right,
            transparent,
            black 8%,
            black 92%,
            transparent
        );

    -webkit-mask-image:
        linear-gradient(
            to right,
            transparent,
            black 8%,
            black 92%,
            transparent
        );
}


/* stronger visual overlay for browsers */

.embla-small::before,
.embla-small::after{

    content:"";

    position:absolute;

    top:0;
    bottom:0;

    width:100px;

    z-index:5;

    pointer-events:none;
}

.embla-small::before{

    left:0;

    background:
    linear-gradient(
        to right,
        rgba(0,0,0,.95),
        rgba(0,0,0,.65),
        transparent
    );
}

.embla-small::after{

    right:0;

    background:
    linear-gradient(
        to left,
        rgba(0,0,0,.95),
        rgba(0,0,0,.65),
        transparent
    );
}


.embla-small__container{
    display:flex;
    backface-visibility:hidden;
    will-change:transform;
    touch-action:pan-y;
}

.embla-small__slide{

    flex:0 0 auto;
    min-width:0;

    position:relative;

    padding:0 .4rem;

    display:flex;
    align-items:center;
    justify-content:center;

    user-select:none;
    -webkit-touch-callout:none;
    -webkit-tap-highlight-color:transparent;
}


.small-sponsor-visual{

    display:flex;
    align-items:center;
    justify-content:center;

    transition:none; /* removed hover animation */
}


.small-sponsor-visual img{

    object-fit:contain;

    transition:none; /* removed image hover */
}


.small-sponsor-link{

    position:absolute;
    inset:0;

    z-index:10;
}

.small-sponsor-link:focus-visible{

    outline:2px solid #fcd34d;
    outline-offset:3px;
    border-radius:9999px;
}


/* removed hover effects completely */

.embla-small__slide:hover .small-sponsor-visual,
.embla-small__slide:hover img{
    transform:none;
}

.embla-small__slide:hover .small-sponsor-visual.border-warning{
    background:transparent;
    color:inherit;
}


/* rainbow */

.rainbow-border{
    position:relative;
}

.rainbow-border::before{

    content:"";

    position:absolute;

    top:-2px;
    left:-2px;
    right:-2px;
    bottom:-2px;

    background:
    conic-gradient(
        #ff2400,
        #e81d1d,
        #e8b71d,
        #e3e81d,
        #1de840,
        #1ddde8,
        #2b1de8,
        #dd00f3,
        #ff2400
    );

    border-radius:999px;

    z-index:-1;

    animation:
    rotate 1s linear infinite;
}

.rainbow-border::after{

    content:"";

    position:absolute;

    inset:-1px;

    background:black;

    border-radius:999px;

    z-index:-1;
}


@keyframes rotate{

from{
transform:rotate(0deg);
}

to{
transform:rotate(360deg);
}

}

.sponsor-tooltip {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 10px);
    transform: translateX(-50%) translateY(6px);
    padding: 0.4rem 0.65rem 0.55rem;
    border-radius: 0.6rem;
    background: rgba(16, 16, 16, 0.94);
    border: 1px solid rgba(252, 211, 77, 0.15);
    color: white;
    font-size: 0.68rem;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 180ms ease, transform 180ms ease;
    z-index: 50;
    letter-spacing: 0.02em;
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
