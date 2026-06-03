import IconApi from "../components/Icons/IconApi.svelte";
import IconAutomations from "../components/Icons/IconAutomations.svelte";
import IconCli from "../components/Icons/IconCli.svelte";
import IconCode from "../components/Icons/IconCode.svelte";
import IconDatabaseBackup from "../components/Icons/IconDatabaseBackup.svelte";
import IconLockCheck from "../components/Icons/IconLockCheck.svelte";
import IconMonitoring from "../components/Icons/IconMonitoring.svelte";
import IconNoLockIn from "../components/Icons/IconNoLockIn.svelte";
import IconNotifications from "../components/Icons/IconNotifications.svelte";
import IconPullRequest from "../components/Icons/IconPullRequest.svelte";
import IconServerFeature from "../components/Icons/IconServerFeature.svelte";
import IconServiceFeature from "../components/Icons/IconServiceFeature.svelte";
import IconTerminalWindow from "../components/Icons/IconTerminalWindow.svelte";
import IconUseCase from "../components/Icons/IconUseCase.svelte";
import IconUsers from "../components/Icons/IconUsers.svelte";
import IconWebhooks from "../components/Icons/IconWebhooks.svelte";

export type HomeFeature = {
  title: string;
  description: string;
  Icon: any;
  titleHref?: string;
  descriptionLink?: {
    href: string;
    text: string;
    before?: string;
    after?: string;
  };
};

export const homeFeatures: HomeFeature[] = [
  {
    title: "Any Language",
    Icon: IconCode,
    description:
      "Coolify is compatible with a wide range of programming languages and frameworks, enabling you to launch static websites, APIs, backends, databases, services, and other types of applications.",
  },
  {
    title: "Any Server",
    Icon: IconServerFeature,
    description:
      "You can deploy your resources to any server, including your own servers, VPS, Raspberry Pi, EC2, DigitalOcean, Linode, Hetzner, and more. All you need is an SSH connection.",
  },
  {
    title: "Any Use-Case",
    Icon: IconUseCase,
    description:
      "You can deploy your resources (apps, databases, services) to a single server or multiple servers according to your requirements.",
  },
  {
    title: "Any Service",
    Icon: IconServiceFeature,
    description:
      "You can deploy any service you want that is compatible with Docker. Also there are lots of one-click services available to deploy.",
    descriptionLink: {
      href: "https://coolify.io/docs/services/overview?utm_source=coolify.io",
      text: "here",
      before: "See the full list ",
      after: ".",
    },
  },
  {
    title: "Push to deploy",
    Icon: IconServiceFeature,
    description:
      "Nowadays, Git integration is considered the norm. We provide integration with both hosted and self-hosted platforms like GitHub, GitLab, Bitbucket, Gitea, and others.",
  },
  {
    title: "Free SSL Certificates",
    Icon: IconLockCheck,
    description:
      "Coolify takes care of automatically setting up and renewing Let's Encrypt SSL certificates for your custom domains, so you can relax and not have to deal with it.",
  },
  {
    title: "No vendor lock-in",
    Icon: IconNoLockIn,
    description:
      "You have complete control over your data. All settings are saved on your own servers, giving you the ability to oversee everything even if you decide to stop using Coolify (oh nooo).",
  },
  {
    title: "Automatic DB Backups",
    Icon: IconDatabaseBackup,
    description:
      "Your data is automatically backed up to any S3 compatible solution, allowing you to easily restore it with just a few clicks if any problems occur.",
  },
  {
    title: "Webhooks",
    Icon: IconWebhooks,
    description:
      "Integrate into your CI/CD pipelines or create custom integrations using Github Actions, Gitlab CI, Bitbucket Pipelines, or any other CI/CD tool of your choice.",
  },
  {
    title: "Powerful API",
    Icon: IconApi,
    description:
      "Coolify offers a robust API that enables you to automate deployments, manage resources, and integrate with your current tools, providing limitless possibilities.",
  },
  {
    title: "Command Line Tool",
    Icon: IconCli,
    titleHref: "https://github.com/coollabsio/coolify-cli",
    description:
      "Control Coolify from your terminal or integrate with AI assistants like Claude to debug deployments and manage infrastructure with natural language.",
  },
  {
    title: "Real-time Terminal",
    Icon: IconTerminalWindow,
    description:
      "You do not need to leave your browser to manage your servers. Coolify's real-time terminal allows you to run commands on your servers directly from your browser.",
  },
  {
    title: "Collaborative",
    Icon: IconUsers,
    description:
      "Share your projects with your team members and work together on them. You can also control permissions and roles for each member.",
  },
  {
    title: "Pull Request Deployments",
    Icon: IconPullRequest,
    description:
      "Automagically deploy new commits and pull requests separately to quickly review contributions and speed up your teamwork!",
  },
  {
    title: "Server Automations",
    Icon: IconAutomations,
    description:
      "Once your server is connected, Coolify will handle numerous tasks automatically, allowing you to concentrate on your code.",
  },
  {
    title: "Monitoring",
    Icon: IconMonitoring,
    description:
      "Coolify will keep an eye on your deployments, servers, disk usage, and other aspects, and notify you if any issues arise.",
  },
  {
    title: "Notifications",
    Icon: IconNotifications,
    description:
      "Coolify will notify you through your chosen channels like Discord, Telegram, and email in case of any events on your server or with your deployments.",
  },
];
