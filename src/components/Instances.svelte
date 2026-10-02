<script>
  import { onMount } from "svelte";
  let url = "https://undead.coolify.io";
  let instances = "…";
  onMount(async () => {
    const { count } = await (
      await fetch(`${url}/instances`)
    ).json();
    instances = count.toLocaleString() + "+";
  });
</script>

<span class="font-mono text-fg tabular-nums">{instances}</span>
