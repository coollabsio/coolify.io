<script>
  import { onMount } from "svelte";
  let url = "https://undead.coolify.io";
  let instances = "load..";
  onMount(async () => {
    const { count } = await (
      await fetch(`${url}/instances`, {
        headers: { "cool-api-key": "coolify" },
      })
    ).json();
    instances = count + "+";
  });
</script>

<span
  class="px-4 text-neutral-400 sm:text-base text-xs sm:flex-row flex flex-col gap-1  pt-2 sm:justify-center"
  ><span class="text-warning font-bold font-mono">{instances}</span> self-hosted
  instances.
</span>
