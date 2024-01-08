<script>
  import { onMount } from "svelte";
  let url = "https://get.coollabs.io";
  let instances = 0;
  onMount(async () => {
    const { count } = await (
      await fetch(`${url}/instances`, {
        headers: { "cool-api-key": "coolify" },
      })
    ).json();
    instances = count + "+";
  });
</script>

<span class="text-warning font-bold">{instances} </span>
