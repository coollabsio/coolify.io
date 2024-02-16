<script>
  import { register } from "swiper/element/bundle";
  register();
  const imageNames = [
    "resources",
    "dashboard",
    // "server",
    "projects",
    "environments",
    "command_center",
    "api_tokens",
    "instance_settings",
    "execute_command",
    // "application_configuration",
    "application_logs",
    // "application_deployments",
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
    // "database_configurations",
    "database_backups",
    "database_backup_executions",
  ];
  const images = imageNames.map((name, index) => ({
    url: `https://coolcdn.b-cdn.net/assets/coolify/v4/${name}.jpeg`,
    description: name,
  }));
</script>

<div class="pt-10">
  <swiper-container
    speed={500}
    navigation="true"
    loop="true"
    centered-slides={true}
  >
    {#each images as src}
      <swiper-slide>
        <img src={src.url} alt={src.description} />
      </swiper-slide>
    {/each}
  </swiper-container>
</div>
