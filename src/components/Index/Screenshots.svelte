<script>
  import Carousel from "svelte-carousel";
  const imageNames = [
    "resources",
    "dashboard",
    "server",
    "projects",
    "environments",
    "command_center",
    "api_tokens",
    "instance_settings",
    "execute_command",
    "application_configuration",
    "application_logs",
    "application_deployments",
    "application_envs",
    "application_git_sources",
    "application_hcs",
    "application_advanced_settings",
    "private_keys",
    "team_members",
    "team_storages",
    "team_shared_variables",
    "project_shared_variables",
    "environment_shared_variables",
    "webhooks",
    "service_configurations",
    "database_configurations",
    "database_backups",
    "database_backup_executions",
  ];

  const images = imageNames.map((name, index) => ({
    url: `https://coolcdn.b-cdn.net/assets/coolify/v4/${name}.jpeg`,
    description: name,
  }));
  let carousel;
  function goToNextPage() {
    carousel.goToNext({ animated: true });
  }
  function goToPrevPage() {
    carousel.goToPrev({ animated: true });
  }
</script>

<div class="flex gap-2 justify-center py-2">
  <button class="bg-coolgray-300 hover:bg-coolgray-400" on:click={goToPrevPage}
    ><svg
      class="w-8 h-8"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M168.49 199.51a12 12 0 0 1-17 17l-80-80a12 12 0 0 1 0-17l80-80a12 12 0 0 1 17 17L97 128Z"
      />
    </svg></button
  >
  <button class="bg-coolgray-300 hover:bg-coolgray-400" on:click={goToNextPage}
    ><svg
      class="w-8 h-8"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="m184.49 136.49l-80 80a12 12 0 0 1-17-17L159 128L87.51 56.49a12 12 0 1 1 17-17l80 80a12 12 0 0 1-.02 17"
      />
    </svg></button
  >
</div>
<Carousel
  bind:this={carousel}
  arrows={false}
  dots={false}
  let:loaded
>
  {#each images as src, imageIndex (src)}
    <div class="img-container">
      {#if loaded.includes(imageIndex)}
        <img
          src={src.url}
          alt={src.description}
        />
      {/if}
    </div>
  {/each}
</Carousel>
