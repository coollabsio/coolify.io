// Shared, sourced comparison data for the self-hosted PaaS pages.
// Cell text is drafted from each project's public docs. `src` codes map to `sources`.

export const lastVerified = "2026-10-19";
export const correctionsUrl = "https://github.com/coollabsio/coolify.io/issues";

export const tools = [
  { name: "Coolify", url: "https://coolify.io/" },
  { name: "Dokploy", url: "https://dokploy.com/" },
  { name: "CapRover", url: "https://caprover.com/" },
  { name: "Dokku", url: "https://dokku.com/" },
  { name: "Kamal", url: "https://kamal-deploy.org/" },
];

export const YES = "yes";
export const PARTIAL = "partial";
export const NO = "no";
export const UNDOCUMENTED = "nd";

export const status = {
  [YES]: { icon: "✅", word: "Built in" },
  [PARTIAL]: { icon: "◐", word: "Partial" },
  [NO]: { icon: "❌", word: "Not available" },
  [UNDOCUMENTED]: { icon: "", word: "Not documented" },
};

// One cell per tool, in `tools` order. `short` is the drafted in-cell text (shown as a tooltip and in the notes),
// `note` the drafted footnote, `src` the source codes backing it.
export const cell = (s, short = "", note = "", src = []) => ({ s, short, note, src });
// Rows whose value is a name: `value` is shown in the table, `full` (the drafted cell) in the notes.
export const val = (value, full = "", note = "", src = []) => ({ s: "value", value, full: full || value, note, src });

export const groups = ["Deploying", "Infrastructure", "Data", "Team & license"];

export const rows = [
  {
    feature: "Web UI",
    group: "Deploying",
    cells: [
      cell(YES, "", "", ["C1"]),
      cell(YES, "", "", ["D1"]),
      cell(YES, "", "", ["R1"]),
      cell(PARTIAL, "paid Dokku Pro", "Dokku Pro is a paid add-on ($849 lifetime license at time of writing; 1 production + 2 pre-production servers). It adds a web UI, a JSON:API REST API, HTTP(S) git push and team management, and runs on your own server. It is not hosted.", ["DK14", "DK15"]),
      cell(NO, "CLI only", "Kamal is installed on your machine (Ruby gem or Docker) and drives servers over SSH.", ["KM2"]),
    ],
  },
  {
    feature: "Docker Compose deployments",
    group: "Deploying",
    cells: [
      cell(YES, "", "", ["C3"]),
      cell(YES, "", "", ["D1"]),
      cell(PARTIAL, "experimental subset", "CapRover deploys \"a supported subset of Docker Compose\" from the dashboard. The docs call it \"still experimental\". Fields like `build`, `networks`, `secrets` and `deploy` are ignored.", ["R3"]),
      cell(UNDOCUMENTED, "", "Dokku's deployment methods are git push, `git:sync`, archives and images. We found no Compose deployment method in its docs.", ["DK6", "DK17"]),
      cell(NO, "", "Kamal deploys one app image per service. Supporting containers (databases, caches) are \"accessories\" defined in `deploy.yml`.", ["KM5"]),
    ],
  },
  {
    feature: "Git providers",
    hint: "GitHub, GitLab, Bitbucket, Gitea",
    group: "Deploying",
    cells: [
      cell(YES, "GitHub, GitLab, Bitbucket and Gitea integrations", "", ["C11"]),
      cell(YES, "GitHub, GitLab, Bitbucket and Gitea integrations", "", ["D7"]),
      cell(PARTIAL, "webhook + repo credentials (GitHub); webhook (GitLab, Bitbucket); generic webhook (Gitea)", "CapRover auto-deploys by storing repo credentials or an SSH key and giving you a webhook URL. Its docs show GitHub and Bitbucket, and say \"GitLab and Others\" work the same way if they send a POST webhook. There is no OAuth/app-style integration.", ["R5"]),
      cell(PARTIAL, "generic Git (all four)", "Dokku accepts `git push` from anywhere and can pull from any repo with `git:sync` (plus `git:auth` for private servers). There is no provider-specific integration.", ["DK6"]),
      cell(NO, "deploys from your checkout (all four)", "Kamal builds the version you have checked out and pushes it through a registry. It doesn't connect to Git hosts. Use your CI to run it on push.", ["KM2"]),
    ],
  },
  {
    feature: "Preview deployments",
    hint: "per PR",
    group: "Deploying",
    cells: [
      cell(YES, "GitHub, GitLab, Bitbucket, Gitea", "", ["C12"]),
      cell(YES, "GitHub", "Dokploy's docs describe previews as \"specifically designed for applications with GitHub integration\".", ["D8"]),
      cell(UNDOCUMENTED),
      cell(PARTIAL, "via official GitHub Action", "Dokku's official GitHub Action has `review-apps:create` / `review-apps:destroy`. GitHub only.", ["DK12"]),
      cell(UNDOCUMENTED),
    ],
  },
  {
    feature: "Rollbacks",
    group: "Deploying",
    cells: [
      cell(YES, "to retained images", "A Coolify rollback redeploys an older image still retained on the server. It doesn't undo database migrations.", ["C13"]),
      cell(YES, "Swarm auto-rollback + registry-based", "", ["D9"]),
      cell(YES, "one click from history", "CapRover's rollback rebuilds and deploys the selected version's image. It doesn't revert environment variables or other app config.", ["R5"]),
      cell(PARTIAL, "no rollback command; keep old images", "We found no rollback command in Dokku's docs. They mention keeping prior images \"for manual rollback\" by disabling image cleanup. The k3s scheduler has a `rollback-on-failure` setting.", ["DK7", "DK3"]),
      cell(YES, "`kamal rollback`", "", ["KM4"]),
    ],
  },
  {
    feature: "One-click services / templates",
    group: "Deploying",
    cells: [
      cell(YES, "360+", "363 templates in Coolify's one-click service catalog (`templates/service-templates.json`) on 2026-10-19. Browse them on coolify.io/services.", ["C16"]),
      cell(YES, "count not published", "Dokploy offers \"open-source templates (Plausible, Pocketbase, Calcom, etc.) with a single click\". We couldn't find a published total.", ["D2"]),
      cell(YES, "\"dozens\"", "CapRover's homepage says \"dozens of popular services\". A community-maintained directory is also available.", ["R1", "R7"]),
      cell(NO, "no catalog (plugins instead)", "", ["DK10"]),
      cell(NO),
    ],
  },
  {
    feature: "Multi-node clustering",
    hint: "one app across nodes",
    group: "Infrastructure",
    cells: [
      cell(PARTIAL, "same image to several servers, your own load balancer", "Coolify deploys the same image to several standalone servers. You put your own load balancer in front. Compose apps and apps with persistent storage can't use this yet. Docker Swarm support was experimental, is deprecated, and will be removed in Coolify v5 in favor of Compose replicas and Coolify's own scaling.", ["C6", "C7", "C8"]),
      cell(YES, "Docker Swarm", "", ["D4"]),
      cell(YES, "Docker Swarm", "", ["R4"]),
      cell(PARTIAL, "optional k3s scheduler", "Dokku's default scheduler runs on one host. The k3s scheduler adds worker and server nodes and needs 2 GB RAM on every node.", ["DK2", "DK3"]),
      cell(YES, "multiple hosts, you add the load balancer", "Kamal deploys to every host listed. With more than one server, \"you need to put a load balancer in front of them\".", ["KM2"]),
    ],
  },
  {
    feature: "Reverse proxy",
    group: "Infrastructure",
    cells: [
      val("Traefik or Caddy", "", "", ["C9"]),
      val("Traefik", "", "", ["D2"]),
      val("NGINX", "", "", ["R1", "R12"]),
      val("NGINX (switchable)", "NGINX by default; Caddy, HAProxy, OpenResty or Traefik", "\"The default proxy shipped with Dokku is nginx\". It can be switched with `proxy:set`.", ["DK4"]),
      val("kamal-proxy", "", "", ["KM6"]),
    ],
  },
  {
    feature: "Automatic Let's Encrypt HTTPS",
    group: "Infrastructure",
    cells: [
      cell(YES, "", "", ["C1", "C9"]),
      cell(YES, "", "", ["D2"]),
      cell(YES, "", "", ["R1"]),
      cell(PARTIAL, "official plugin", "Certificates can be imported with the built-in ssl plugin. Automatic Let's Encrypt uses the optional `dokku-letsencrypt` plugin.", ["DK5"]),
      cell(PARTIAL, "single-server deploys", "kamal-proxy's automatic HTTPS \"requires that we are deploying to one server\" with the `host` option set.", ["KM6"]),
    ],
  },
  {
    feature: "Documented minimum server",
    group: "Infrastructure",
    cells: [
      val("2 GB RAM", "2 cores, 2 GB RAM, 10 GB disk", "", ["C2"]),
      val("2 GB RAM", "2 GB RAM, 30 GB disk", "", ["D3"]),
      val("1 GB RAM", "", "CapRover: \"512MB RAM might not be enough\" because builds can use a lot of memory. Most providers offer 1 GB at the low end. CapRover's own comparison page states a 1 GB minimum.", ["R2", "R13"]),
      val("1 GB RAM", "1 GB RAM (Docker scheduler); 2 GB per node (k3s)", "", ["DK2"]),
      val("None stated", "none stated (runs from your machine)", "", ["KM2"]),
    ],
  },
  {
    feature: "Managed cloud option",
    group: "Infrastructure",
    cells: [
      cell(YES, "Coolify Cloud", "$5/month for 2 servers, +$3/month per extra server. Same features as self-hosted. Apps run on your servers.", ["C26"]),
      cell(YES, "Dokploy Cloud", "Hobby plan: $4.50/month per server (1 user, 1 organization, 2 environments, some limits). Startup plan from $15/month. Enterprise on request.", ["D18", "D21"]),
      cell(NO, "paid Pro plan, self-hosted", "CapRover Pro (paid plans) adds \"build status notifications\", login alerts and two-factor auth. We found no managed hosting offering.", ["R9"]),
      cell(NO, "Pro is a self-hosted lifetime license", "\"Dokku Pro isn't a hosted service.\"", ["DK14"]),
      cell(NO, "none found"),
    ],
  },
  {
    feature: "Databases",
    group: "Data",
    cells: [
      cell(YES, "8 engines, one click", "PostgreSQL, MySQL, MariaDB, MongoDB, Redis, KeyDB, Dragonfly, ClickHouse.", ["C1"]),
      cell(YES, "6 engines", "MySQL, PostgreSQL, MongoDB, MariaDB, libsql, Redis.", ["D2"]),
      cell(PARTIAL, "via one-click apps", "", ["R7"]),
      cell(PARTIAL, "official datastore plugins", "Official Dokku datastore plugins include Postgres, MySQL, MariaDB, Mongo, Redis and others.", ["DK10"]),
      cell(PARTIAL, "\"accessories\" you configure", "Kamal accessories are containers you define (image, host, volumes). They aren't updated on deploy and get no zero-downtime deploys.", ["KM5"]),
    ],
  },
  {
    feature: "Scheduled database backups to S3",
    group: "Data",
    cells: [
      cell(YES, "", "", ["C14"]),
      cell(YES, "", "", ["D1"]),
      cell(NO, "", "CapRover's backup covers the CapRover instance \"except images and volumes\". For volumes \"you have to use a custom solution\". The docs call the feature experimental.", ["R6"]),
      cell(PARTIAL, "plugin commands", "Done with plugin commands. For example, `postgres:backup-auth` sets up S3 credentials, `postgres:backup <service> <bucket>` uploads a backup, and `postgres:backup-schedule` schedules one.", ["DK11"]),
      cell(UNDOCUMENTED),
    ],
  },
  {
    feature: "Volume backups",
    group: "Data",
    cells: [
      cell(YES, "since v4.3.0", "Scheduled backups of volume and directory mounts, stored locally or on S3-compatible storage, with retention controls. Added in v4.3.0.", ["C15"]),
      cell(YES, "named volumes", "Docker named volumes only, not bind mounts. Stored on S3 destinations. The Hobby Cloud plan allows 1 volume backup per application.", ["D10", "D18"]),
      cell(NO, "", "CapRover's backup covers the CapRover instance \"except images and volumes\". For volumes \"you have to use a custom solution\". The docs call the feature experimental.", ["R6"]),
      cell(UNDOCUMENTED),
      cell(UNDOCUMENTED),
    ],
  },
  {
    feature: "Role-based permissions",
    group: "Team & license",
    cells: [
      cell(PARTIAL, "Owner/Admin/Member, team-wide", "Owner, Admin and Member (Member is read-only), applied per team. There are no project-level permissions.", ["C10"]),
      cell(YES, "per-member permissions; custom roles in Enterprise", "Free edition: Owner, Admin and Member, where Members get specific permissions (create/delete projects, services, environments, Docker/Traefik/API access and more). Enterprise adds custom roles.", ["D5", "D6"]),
      cell(UNDOCUMENTED),
      cell(UNDOCUMENTED),
      cell(NO),
    ],
  },
  {
    feature: "License",
    group: "Team & license",
    cells: [
      val("Apache-2.0", "", "", ["C27"]),
      val("Apache-2.0 + source-available", "Apache-2.0, except `/proprietary` (source-available)", "Code outside `/proprietary` is Apache-2.0. Code under `/proprietary` is under the Dokploy Source Available License, which requires a commercial agreement for production use.", ["D19"]),
      val("Apache-2.0", "", "", ["R11"]),
      val("MIT", "", "", ["DK16"]),
      val("MIT", "", "", ["KM12"]),
    ],
  },
  {
    feature: "API / CLI",
    cells: [
      cell(YES, "API + CLI", "", ["C4", "C5"]),
      cell(YES, "API + CLI", "", ["D2"]),
      cell(YES, "CLI", "`caprover deploy` from your project directory, plus dashboard upload and webhooks. CapRover's docs also show its HTTP API being scripted for backups.", ["R5", "R6"]),
      cell(YES, "CLI over SSH; HTTP API in Pro", "Dokku Pro is a paid add-on ($849 lifetime license at time of writing; 1 production + 2 pre-production servers). It adds a web UI, a JSON:API REST API, HTTP(S) git push and team management, and runs on your own server. It is not hosted.", ["DK1", "DK14", "DK15"]),
      cell(YES, "CLI", "", ["KM2"]),
    ],
  },
  {
    feature: "Manage multiple separate servers from one place",
    cells: [
      cell(YES, "", "", ["C28"]),
      cell(YES, "remote servers", "", ["D2"]),
      cell(PARTIAL, "Swarm nodes only", "CapRover scales by adding nodes to its Docker Swarm cluster, managed from the main CapRover instance.", ["R4"]),
      cell(PARTIAL, "via k3s cluster", "Dokku's default scheduler runs on one host. The k3s scheduler adds worker and server nodes and needs 2 GB RAM on every node.", ["DK2", "DK3"]),
      cell(YES, "hosts listed in `deploy.yml`", "", ["KM2"]),
    ],
  },
  {
    feature: "Built-in monitoring",
    cells: [
      cell(YES, "server + container metrics", "Sentinel reports server and container health. Metrics add CPU and memory history. Threshold alerts and long-term retention need an external tool.", ["C17"]),
      cell(YES, "", "", ["D15"]),
      cell(YES, "via NetData", "\"You can enable NetData which is a server monitoring tool\".", ["R8"]),
      cell(UNDOCUMENTED, "community plugins", "", ["DK10"]),
      cell(UNDOCUMENTED),
    ],
  },
  {
    feature: "Notifications",
    cells: [
      cell(YES, "", "", ["C18"]),
      cell(YES, "", "", ["D2"]),
      cell(PARTIAL, "paid Pro plan", "CapRover Pro (paid plans) adds \"build status notifications\", login alerts and two-factor auth. We found no managed hosting offering.", ["R9"]),
      cell(PARTIAL, "community plugins", "The community plugin list includes Slack and Telegram notification plugins.", ["DK10"]),
      cell(PARTIAL, "via hooks", "Kamal hooks (`pre-deploy`, `post-deploy` and others) run your own scripts, which you can use to send notifications.", ["KM9"]),
    ],
  },
  {
    feature: "Terminal access",
    cells: [
      cell(YES, "browser terminal", "", ["C19"]),
      cell(YES, "browser terminal", "", ["D1"]),
      cell(UNDOCUMENTED),
      cell(PARTIAL, "CLI `dokku enter`", "", ["DK13"]),
      cell(PARTIAL, "CLI `kamal app exec`", "", ["KM10"]),
    ],
  },
  {
    feature: "Scheduled jobs (cron)",
    cells: [
      cell(YES, "", "", ["C20"]),
      cell(YES, "", "", ["D11"]),
      cell(UNDOCUMENTED),
      cell(YES, "", "", ["DK8"]),
      cell(PARTIAL, "cron in a dedicated container", "Kamal's docs show cron running in a dedicated server role whose container runs `cron -f`.", ["KM8"]),
    ],
  },
  {
    feature: "Shared environment variables",
    cells: [
      cell(YES, "team/project/environment/server", "", ["C21"]),
      cell(YES, "project/environment", "", ["D12"]),
      cell(UNDOCUMENTED),
      cell(PARTIAL, "global config", "`dokku config:set --global` sets variables for all apps.", ["DK9"]),
      cell(PARTIAL, "in config files", "Kamal sets `env` in `deploy.yml`. `.kamal/secrets-common` is shared across destinations.", ["KM3", "KM11"]),
    ],
  },
  {
    feature: "Environments (staging/production)",
    cells: [
      cell(YES, "", "", ["C1"]),
      cell(YES, "", "", ["D16"]),
      cell(UNDOCUMENTED),
      cell(UNDOCUMENTED),
      cell(PARTIAL, "\"destinations\"", "`kamal deploy -d staging` merges `config/deploy.staging.yml` with the base config.", ["KM3"]),
    ],
  },
  {
    feature: "Separate build server",
    cells: [
      cell(YES, "", "", ["C23"]),
      cell(PARTIAL, "apps only, not Compose", "\"Build servers are currently only available for Applications. This feature is not supported for Docker Compose deployments.\"", ["D14"]),
      cell(PARTIAL, "build in CI, deploy the image", "CapRover's docs recommend building images in CI (GitHub/GitLab) and deploying the built image to the server.", ["R10"]),
      cell(UNDOCUMENTED),
      cell(YES, "remote builder", "", ["KM7"]),
    ],
  },
  {
    feature: "Cloudflare Tunnels guide",
    cells: [
      cell(YES, "", "", ["C22"]),
      cell(YES, "", "", ["D13"]),
      cell(UNDOCUMENTED),
      cell(UNDOCUMENTED),
      cell(UNDOCUMENTED),
    ],
  },
  {
    feature: "Teams / multiple users",
    cells: [
      cell(YES, "", "", ["C10"]),
      cell(YES, "organizations + users", "", ["D16"]),
      cell(UNDOCUMENTED),
      cell(PARTIAL, "paid Dokku Pro", "", ["DK14"]),
      cell(NO, "CLI tool", "", ["KM2"]),
    ],
  },
  {
    feature: "Audit log",
    cells: [
      cell(YES, "90 days", "Team audit log covering UI, API, MCP and webhooks. Events are pruned after 90 days.", ["C24"]),
      cell(PARTIAL, "Enterprise", "Audit logs are listed as an Enterprise feature.", ["D6", "D18"]),
      cell(UNDOCUMENTED),
      cell(UNDOCUMENTED),
      cell(PARTIAL, "`kamal audit` shows recent commands per server", "`kamal audit` shows \"the latest commands that have been run on each server\".", ["KM13"]),
    ],
  },
  {
    feature: "Official MCP server (AI agents)",
    note: "Community projects exist and are labeled unofficial or early-stage: `ivan-saorin/caprover-mcp` (\"Unofficial CapRover MCP Integration\") and `dokku-mcp/dokku-mcp` (\"not recommended for production use\"). We found no official MCP server on caprover.com, dokku.com or kamal-deploy.org.",
    cells: [
      cell(YES, "built in", "Built-in MCP endpoint at `https://<your-coolify>/mcp`. It uses team-scoped API tokens.", ["C25", "C1"]),
      cell(YES, "official package", "`Dokploy/mcp`, \"The Official MCP package for Dokploy\".", ["D17"]),
      cell(NO, "community only", "", ["X1"]),
      cell(NO, "community only", "", ["X2"]),
      cell(NO, "none found"),
    ],
  },
];

export const sources = {
  C1: ["https://coolify.io/"],
  C2: ["https://coolify.io/docs/start-with-self-hosted"],
  C3: ["https://coolify.io/docs/applications/builds/docker-compose"],
  C4: ["https://coolify.io/docs/cli/what-is-the-coolify-cli", "https://coolify.io/docs/cli/deploy-applications"],
  C5: ["https://coolify.io/docs/api/authorization"],
  C6: ["https://coolify.io/docs/core/infrastructure/scaling/overview"],
  C7: ["https://coolify.io/docs/core/infrastructure/scaling/docker-swarm"],
  C8: ["https://coolify.io/docs/core/infrastructure/scaling/multi-server-deployments"],
  C9: ["https://coolify.io/docs/core/networking/proxy/overview"],
  C10: ["https://coolify.io/docs/core/team/roles-and-permissions"],
  C11: ["https://coolify.io/docs/applications/sources/github/overview", "https://coolify.io/docs/applications/sources/gitlab", "https://coolify.io/docs/applications/sources/bitbucket", "https://coolify.io/docs/applications/sources/gitea"],
  C12: ["https://coolify.io/docs/applications/deployments/preview-deployments"],
  C13: ["https://coolify.io/docs/applications/deployments/rollbacks"],
  C14: ["https://coolify.io/docs/databases/backups"],
  C15: ["https://coolify.io/docs/core/persistent-storage/storage-mounts/backups", "https://github.com/coollabsio/coolify/releases/tag/v4.3.0"],
  C16: ["https://coolify.io/services", "https://github.com/coollabsio/coolify/blob/main/templates/service-templates.json"],
  C17: ["https://coolify.io/docs/core/observability/monitoring/overview"],
  C18: ["https://coolify.io/docs/core/notifications/overview"],
  C19: ["https://coolify.io/docs/core/infrastructure/servers/web-terminal"],
  C20: ["https://coolify.io/docs/core/automation/scheduled-tasks/overview"],
  C21: ["https://coolify.io/docs/core/team/shared-variables"],
  C22: ["https://coolify.io/docs/integrations/networking/cloudflare/tunnels"],
  C23: ["https://coolify.io/docs/core/infrastructure/servers/build-servers"],
  C24: ["https://coolify.io/docs/core/team/audit-log"],
  C25: ["https://coolify.io/docs/mcp/overview"],
  C26: ["https://coolify.io/pricing"],
  C27: ["https://github.com/coollabsio/coolify/blob/main/LICENSE"],
  C28: ["https://coolify.io/docs/core/infrastructure/servers/add-server"],
  D1: ["https://docs.dokploy.com/docs/core/features"],
  D2: ["https://github.com/dokploy/dokploy"],
  D3: ["https://docs.dokploy.com/docs/core/installation"],
  D4: ["https://docs.dokploy.com/docs/core/cluster"],
  D5: ["https://docs.dokploy.com/docs/core/permissions"],
  D6: ["https://docs.dokploy.com/docs/core/enterprise", "https://docs.dokploy.com/docs/core/enterprise/custom-roles"],
  D7: ["https://docs.dokploy.com/docs/core/providers"],
  D8: ["https://docs.dokploy.com/docs/core/applications/preview-deployments"],
  D9: ["https://docs.dokploy.com/docs/core/applications/rollbacks"],
  D10: ["https://docs.dokploy.com/docs/core/volume-backups"],
  D11: ["https://docs.dokploy.com/docs/core/schedule-jobs"],
  D12: ["https://docs.dokploy.com/docs/core/variables"],
  D13: ["https://docs.dokploy.com/docs/core/guides/cloudflare-tunnels"],
  D14: ["https://docs.dokploy.com/docs/core/remote-servers/build-server"],
  D15: ["https://docs.dokploy.com/docs/core/monitoring"],
  D16: ["https://docs.dokploy.com/docs/core/multi-tenancy"],
  D17: ["https://github.com/Dokploy/mcp"],
  D18: ["https://dokploy.com/pricing"],
  D19: ["https://github.com/Dokploy/dokploy/blob/canary/LICENSE.MD"],
  D21: ["https://docs.dokploy.com/docs/core/cloud"],
  R1: ["https://caprover.com/"],
  R2: ["https://caprover.com/docs/get-started"],
  R3: ["https://caprover.com/docs/docker-compose"],
  R4: ["https://caprover.com/docs/app-scaling-and-cluster"],
  R5: ["https://caprover.com/docs/deployment-methods"],
  R6: ["https://caprover.com/docs/backup-and-restore"],
  R7: ["https://caprover.com/docs/one-click-apps"],
  R8: ["https://caprover.com/docs/resource-monitoring"],
  R9: ["https://caprover.com/docs/troubleshooting-pro"],
  R10: ["https://caprover.com/docs/ci-cd-integration"],
  R11: ["https://github.com/caprover/caprover/blob/master/LICENSE"],
  R12: ["https://caprover.com/docs/nginx-customization"],
  R13: ["https://caprover.com/compare/"],
  DK1: ["https://dokku.com/"],
  DK2: ["https://dokku.com/docs/getting-started/installation/"],
  DK3: ["https://dokku.com/docs/deployment/schedulers/k3s/"],
  DK4: ["https://dokku.com/docs/networking/proxy-management/"],
  DK5: ["https://dokku.com/docs/deployment/application-deployment/"],
  DK6: ["https://dokku.com/docs/deployment/methods/git/"],
  DK7: ["https://dokku.com/docs/deployment/builders/builder-management/"],
  DK8: ["https://dokku.com/docs/processes/scheduled-cron-tasks/"],
  DK9: ["https://dokku.com/docs/configuration/environment-variables/"],
  DK10: ["https://dokku.com/docs/community/plugins/"],
  DK11: ["https://github.com/dokku/dokku-postgres"],
  DK12: ["https://github.com/dokku/github-action"],
  DK13: ["https://dokku.com/docs/processes/entering-containers/"],
  DK14: ["https://pro.dokku.com/"],
  DK15: ["https://dokku.com/docs/enterprise/pro/"],
  DK16: ["https://github.com/dokku/dokku"],
  DK17: ["https://dokku.com/docs/deployment/methods/image/"],
  KM2: ["https://kamal-deploy.org/docs/installation/"],
  KM3: ["https://kamal-deploy.org/docs/configuration/overview/"],
  KM4: ["https://kamal-deploy.org/docs/commands/rollback/"],
  KM5: ["https://kamal-deploy.org/docs/configuration/accessories/"],
  KM6: ["https://kamal-deploy.org/docs/configuration/proxy/"],
  KM7: ["https://kamal-deploy.org/docs/configuration/builders/"],
  KM8: ["https://kamal-deploy.org/docs/configuration/cron/"],
  KM9: ["https://kamal-deploy.org/docs/hooks/overview/"],
  KM10: ["https://kamal-deploy.org/docs/commands/app/"],
  KM11: ["https://kamal-deploy.org/docs/configuration/environment-variables/"],
  KM12: ["https://github.com/basecamp/kamal"],
  KM13: ["https://kamal-deploy.org/docs/commands/audit/"],
  X1: ["https://github.com/ivan-saorin/caprover-mcp"],
  X2: ["https://github.com/dokku-mcp/dokku-mcp"],
};

for (const row of rows) {
  if (row.cells.length !== tools.length) throw new Error(`Row "${row.feature}" needs ${tools.length} cells`);
  for (const code of row.cells.flatMap((c) => c.src)) {
    if (!sources[code]) throw new Error(`Missing source [${code}] in "${row.feature}"`);
  }
}


export function cellSummary(cell) {
  if (cell.s === "value") return cell.full;
  if (cell.s === UNDOCUMENTED) {
    return cell.short ? `Not documented (${cell.short})` : "Not documented";
  }
  if (cell.short) {
    if (cell.short.toLowerCase() === status[cell.s].word.toLowerCase()) return status[cell.s].word;
    return `${status[cell.s].word}: ${cell.short}`;
  }
  return status[cell.s].word;
}

/** Two columns of an existing matrix row, for a head-to-head page. */
export function pairRows(leftName, rightName, features) {
  const leftIndex = tools.findIndex((tool) => tool.name === leftName);
  const rightIndex = tools.findIndex((tool) => tool.name === rightName);
  if (leftIndex < 0 || rightIndex < 0) throw new Error(`Unknown tool in pairRows(${leftName}, ${rightName})`);
  return features.map((feature) => {
    const row = rows.find((item) => item.feature === feature);
    if (!row) throw new Error(`Unknown feature: ${feature}`);
    const left = row.cells[leftIndex];
    const right = row.cells[rightIndex];
    const urls = [...new Set([...left.src, ...right.src].flatMap((code) => sources[code]))];
    return {
      feature: row.feature,
      hint: row.hint || "",
      left: cellSummary(left),
      right: cellSummary(right),
      leftNote: left.note || "",
      rightNote: right.note || "",
      sources: urls,
    };
  });
}
