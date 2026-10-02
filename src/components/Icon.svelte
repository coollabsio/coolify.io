<script>
    // Reicon outline glyph, same icon family as the Coolify app (`<x-reicon>`).
    // Usage: import Rocket from "reicon/icons/Rocket"; <Icon icon={Rocket} class="size-4" />
    let { icon, class: className = "size-4" } = $props();
</script>

{@html icon.toSvg({ className, attrs: { "aria-hidden": "true" } })}
