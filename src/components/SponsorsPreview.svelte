<script>
    import { onMount } from "svelte";

    let data = null;
    let error = null;

    onMount(async () => {
        try {
            const res = await fetch("/sponsors.json");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            data = await res.json();
        } catch (e) {
            error = e.message;
        }
    });

    const tiers = [
        { key: "huge", label: "HUGE ($500+/m)", color: "#a78bfa" },
        { key: "big", label: "BIG ($200–499/m)", color: "#60a5fa" },
        { key: "small", label: "SMALL ($40–199/m)", color: "#fcd34d" },
    ];
</script>

<div class="preview-wrapper">
    <div class="preview-banner">
        <span class="badge">DEV PREVIEW</span>
        <span class="banner-text">
            Diff only — sponsors NOT yet on the landing page. Dev mode only.
        </span>
    </div>

    {#if error}
        <div class="error">⚠ Failed to load <code>/sponsors.json</code>: {error}</div>
    {:else if !data}
        <div class="loading">Loading sponsors data…</div>
    {:else}
        <div class="meta">
            <span class="source source-github">GH</span>
            <a
                href={`https://github.com/sponsors/${data.sources?.github ?? data.org}`}
                target="_blank"
                rel="noopener"
                class="meta-link"
            >
                github.com/sponsors/{data.sources?.github ?? data.org}
            </a>
            <span class="dot">·</span>
            <span class="source source-opencollective">OC</span>
            <a
                href={`https://opencollective.com/${data.sources?.opencollective ?? "coollabsio"}`}
                target="_blank"
                rel="noopener"
                class="meta-link"
            >
                opencollective.com/{data.sources?.opencollective ?? "coollabsio"}
            </a>
            <span class="dot">·</span>
            <span>last updated: <code>{data.lastUpdated}</code></span>
        </div>
        {#each tiers as tier}
            <section class="tier">
                <h4 class="tier-heading" style="color: {tier.color}">
                    {tier.label} — {data[tier.key].length}
                </h4>
                {#if data[tier.key].length === 0}
                    <p class="empty">no sponsors in this tier</p>
                {:else}
                    <ul class="sponsor-list">
                        {#each data[tier.key] as s}
                            <li class="sponsor-row">
                                <img
                                    src={s.avatarUrl}
                                    alt={s.login || s.slug}
                                    class="avatar"
                                    width="32"
                                    height="32"
                                    loading="lazy"
                                />
                                <span class="source source-{s.source}">
                                    {s.source === 'opencollective' ? 'OC' : 'GH'}
                                </span>
                                <a
                                    href={s.source === 'opencollective'
                                        ? `https://opencollective.com/${s.slug}`
                                        : `https://github.com/${s.login}`}
                                    target="_blank"
                                    rel="noopener"
                                    class="login"
                                >
                                    @{s.login || s.slug}
                                </a>
                                <span class="name">{s.name}</span>
                                <span class="price">
                                    ${s.monthlyPriceInDollars}/m
                                    {#if s.monthlyPriceOriginal && s.monthlyPriceOriginal.currency !== 'USD'}
                                        <span class="orig">
                                            ({s.monthlyPriceOriginal.value} {s.monthlyPriceOriginal.currency})
                                        </span>
                                    {/if}
                                </span>
                                {#if s.websiteUrl}
                                    <a href={s.websiteUrl} target="_blank" rel="noopener" class="site">
                                        {s.websiteUrl}
                                    </a>
                                {/if}
                            </li>
                        {/each}
                    </ul>
                {/if}
            </section>
        {/each}

        {#if data.expiredOffPlatform && data.expiredOffPlatform.length > 0}
            <section class="tier expired">
                <h4 class="tier-heading expired-heading">
                    🔴 EXPIRED OFF-PLATFORM — {data.expiredOffPlatform.length}
                </h4>
                <p class="stale-hint">
                    Off-platform sponsorships past their <code>// off-platform: ... until YYYY-MM-DD</code> date. Renew the contract or remove from landing page.
                </p>
                <ul class="stale-list">
                    {#each data.expiredOffPlatform as e}
                        <li class="stale-row expired-row">
                            <a
                                href={`https://github.com/${e.login}`}
                                target="_blank"
                                rel="noopener"
                                class="stale-login"
                            >
                                @{e.login}
                            </a>
                            <span class="expired-date">ended {e.expiredOn}</span>
                        </li>
                    {/each}
                </ul>
            </section>
        {/if}

        {#if data.staleSponsors && data.staleSponsors.length > 0}
            <section class="tier stale">
                <h4 class="tier-heading stale-heading">
                    ⚠ POSSIBLY STALE — {data.staleSponsors.length}
                </h4>
                <p class="stale-hint">
                    On landing page but NOT in active GitHub or Open Collective fetch. Possible causes: cancelled, downgraded below $40/m, switched to one-time, or set sponsorship to private. Verify before removing.
                </p>
                <ul class="stale-list">
                    {#each data.staleSponsors as login}
                        <li class="stale-row">
                            <a
                                href={`https://github.com/${login}`}
                                target="_blank"
                                rel="noopener"
                                class="stale-login"
                            >
                                @{login}
                            </a>
                            <a
                                href={`https://github.com/${login}?tab=sponsoring`}
                                target="_blank"
                                rel="noopener"
                                class="stale-check"
                                title="Check sponsoring tab"
                            >
                                ?
                            </a>
                        </li>
                    {/each}
                </ul>
            </section>
        {/if}
    {/if}
</div>

<style>
    .preview-wrapper {
        max-width: 1100px;
        margin: 3rem auto 1rem;
        padding: 1.5rem;
        border: 2px dashed #fcd34d;
        border-radius: 0.5rem;
        background: rgba(252, 211, 77, 0.04);
    }

    .preview-banner {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }

    .badge {
        background: #fcd34d;
        color: #000;
        font-weight: 700;
        font-size: 0.7rem;
        padding: 0.2rem 0.5rem;
        border-radius: 0.25rem;
        letter-spacing: 0.1em;
    }

    .banner-text {
        color: #d1d5db;
        font-size: 0.85rem;
    }

    .meta {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        font-size: 0.75rem;
        color: #9ca3af;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }

    .meta code {
        color: #e5e7eb;
        background: rgba(255, 255, 255, 0.05);
        padding: 0.1rem 0.35rem;
        border-radius: 0.2rem;
    }

    .meta-link {
        color: #d1d5db;
        text-decoration: none;
        font-family: ui-monospace, monospace;
    }

    .meta-link:hover {
        color: #fff;
        text-decoration: underline;
    }

    .dot {
        color: #4b5563;
    }

    .tier {
        margin-top: 1.25rem;
    }

    .tier-heading {
        font-size: 0.95rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        margin: 0 0 0.5rem 0;
        text-transform: uppercase;
    }

    .empty {
        color: #6b7280;
        font-style: italic;
        font-size: 0.85rem;
        margin: 0 0 0 0.5rem;
    }

    .sponsor-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
        gap: 0.5rem;
    }

    .sponsor-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.6rem;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 0.3rem;
        font-size: 0.8rem;
        color: #e5e7eb;
        flex-wrap: wrap;
    }

    .avatar {
        border-radius: 50%;
        flex-shrink: 0;
    }

    .source {
        font-size: 0.65rem;
        font-weight: 700;
        padding: 0.1rem 0.3rem;
        border-radius: 0.2rem;
        font-family: ui-monospace, monospace;
        letter-spacing: 0.05em;
    }

    .source-github {
        background: rgba(96, 165, 250, 0.2);
        color: #60a5fa;
    }

    .source-opencollective {
        background: rgba(74, 222, 128, 0.2);
        color: #4ade80;
    }

    .orig {
        color: #6b7280;
        font-size: 0.7rem;
        margin-left: 0.25rem;
    }

    .login {
        color: #60a5fa;
        font-family: ui-monospace, monospace;
        text-decoration: none;
        font-weight: 600;
    }

    .login:hover {
        text-decoration: underline;
    }

    .name {
        color: #d1d5db;
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .price {
        color: #fcd34d;
        font-weight: 600;
        font-family: ui-monospace, monospace;
    }

    .site {
        color: #9ca3af;
        font-size: 0.7rem;
        text-decoration: none;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .site:hover {
        color: #d1d5db;
        text-decoration: underline;
    }

    .error {
        color: #f87171;
        font-family: ui-monospace, monospace;
        font-size: 0.85rem;
    }

    .loading {
        color: #9ca3af;
        font-style: italic;
    }

    .stale {
        margin-top: 2rem;
        padding-top: 1.25rem;
        border-top: 1px dashed rgba(248, 113, 113, 0.3);
    }

    .stale-heading {
        color: #f87171 !important;
    }

    .stale-hint {
        color: #9ca3af;
        font-size: 0.75rem;
        margin: 0 0 0.75rem 0;
        line-height: 1.4;
    }

    .stale-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
    }

    .stale-row {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.5rem;
        background: rgba(248, 113, 113, 0.08);
        border: 1px solid rgba(248, 113, 113, 0.2);
        border-radius: 0.25rem;
        font-size: 0.75rem;
    }

    .stale-login {
        color: #fca5a5;
        font-family: ui-monospace, monospace;
        text-decoration: none;
    }

    .stale-login:hover {
        color: #fff;
        text-decoration: underline;
    }

    .stale-check {
        color: #6b7280;
        font-size: 0.7rem;
        text-decoration: none;
        background: rgba(255, 255, 255, 0.05);
        width: 1.1rem;
        height: 1.1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-weight: 700;
    }

    .stale-check:hover {
        background: rgba(255, 255, 255, 0.15);
        color: #fff;
    }

    .expired-heading {
        color: #fb923c !important;
    }

    .expired-row {
        background: rgba(251, 146, 60, 0.08);
        border-color: rgba(251, 146, 60, 0.3);
    }

    .expired-date {
        color: #fb923c;
        font-size: 0.7rem;
        font-family: ui-monospace, monospace;
    }
</style>
