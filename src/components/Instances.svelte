<script>
  import { onMount } from "svelte";
  let url = "https://undead.coolify.io";
  let instances = "loading.";
  onMount(async () => {
    const { count } = await (
      await fetch(`${url}/instances`)
    ).json();
    instances = count.toLocaleString() + "+";
  });
</script>

<span class="hero-stats-instances"
  ><span class="text-warning font-bold tabular-nums">{instances}</span>
  self-hosted instances.
</span>

<style>
  .hero-stats-instances {
    margin-top: 0.5rem;
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.5);
  }
</style>
