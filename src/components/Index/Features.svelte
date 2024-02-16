<script>
  import Feature from "./Feature.svelte";
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-10 gap-y-28 pt-20 lg:px-10">
  <Feature
    title="Bring Your Own Servers"
    details="You can use your own server from any cloud provider or even set up your own server at home as long as you have SSH access."
  >
    <div slot="icon">
      <svg
        width="512"
        height="512"
        class="icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm12 13H6a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h12M7 8v.01M7 16v.01M20 15l-2 3h3l-2 3"
        />
      </svg>
    </div>
  </Feature>
  <Feature title="Push to Deploy">
    <div slot="icon">
      <svg
        width="512"
        height="512"
        class="icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path
            d="M4 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0M4 6a2 2 0 1 0 4 0a2 2 0 1 0-4 0m12 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0M6 8v8"
          />
          <path d="M11 6h5a2 2 0 0 1 2 2v8" />
          <path d="m14 9l-3-3l3-3" />
        </g>
      </svg>
    </div>
    <div slot="main-text">
      Today, Git integration is the standard. <br /><br />We offer integration
      with hosted platforms such as GitHub, GitLab, Bitbucket, Gitea and more (even
      self-hosted).
    </div>
  </Feature>
  <Feature title="No Vendor Lock-in">
    <div slot="icon">
      <svg
        width="512"
        height="512"
        viewBox="0 0 24 24"
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path
            d="M15 11h2a2 2 0 0 1 2 2v2m0 4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h4"
          />
          <path
            d="M11 16a1 1 0 1 0 2 0a1 1 0 1 0-2 0m-3-5V8m.347-3.631A4 4 0 0 1 16 6M3 3l18 18"
          />
        </g>
      </svg>
    </div>
    <div slot="main-text">
      You have full ownership of your data.<br /><br />All configurations are
      stored on your own servers, allowing you to manage your deployed resources
      even if you choose to stop using Coolify (oh nooo).
    </div>
  </Feature>
  <Feature title="Server Automations">
    <div slot="icon">
      <svg
        width="512"
        height="512"
        class="icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path
            d="M7 7h10a2 2 0 0 1 2 2v1l1 1v3l-1 1v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3l-1-1v-3l1-1V9a2 2 0 0 1 2-2zm3 9h4"
          />
          <circle cx="8.5" cy="11.5" r=".5" fill="#000000" />
          <circle cx="15.5" cy="11.5" r=".5" fill="#000000" />
          <path d="M9 7L8 3m7 4l1-4" />
        </g>
      </svg>
    </div>
    <div slot="main-text" class="">
      After connecting your server, Coolify will take over management and handle
      various administrative tasks for you.
    </div>
  </Feature>
 
  <Feature title="Monitoring">
    <div slot="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <rect x="3" y="4" width="18" height="12" rx="1" />
        <path d="M7 20h10" />
        <path d="M9 16v4" />
        <path d="M15 16v4" />
        <path d="M7 10h2l2 3l2 -6l1 3h3" />
      </svg>
    </div>
    <div slot="main-text">
      Coolify will monitor your set servers and deployed resources
      automatically.<br /><br />It will alert you through your preferred
      channels such as Discord, Telegram, and email.
    </div>
  </Feature>
  <Feature title="Multiple Deployment Endpoints">
    <div slot="icon">
      <svg class="icon" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M103.77 185.94C103.38 187.49 93.63 224 40 224a8 8 0 0 1-8-8c0-53.63 36.51-63.38 38.06-63.77a8 8 0 0 1 3.88 15.53c-.9.25-22.42 6.54-25.56 39.86C81.7 204.48 88 183 88.26 182a8 8 0 0 1 15.51 4Zm93-67.4l-4.77 4.77v58.33a15.91 15.91 0 0 1-4.68 11.36L153 227.3a15.91 15.91 0 0 1-11.3 4.7a16.11 16.11 0 0 1-5.1-.83a15.94 15.94 0 0 1-10.78-12.92l-5.37-38.49l-44.21-44.21l-38.47-5.37A16 16 0 0 1 28.7 103L63 68.68A15.91 15.91 0 0 1 74.36 64h58.33l4.77-4.77c26.68-26.67 58.83-27.82 71.41-27.07a16 16 0 0 1 15 15c.73 12.55-.42 44.7-27.09 71.38ZM40 114.34l37.15 5.18L116.69 80H74.36ZM91.32 128L128 164.68l57.45-57.45a76.46 76.46 0 0 0 22.42-59.16a76.65 76.65 0 0 0-59.11 22.47ZM176 139.31l-39.53 39.53l5.2 37.16L176 181.64Z"/>
    </svg>
    </div>
    <div slot="main-text">
      You can deploy your resources to a single server, multiple servers, or Docker Swarm clusters seamlessly, based on your needs. <br><br>(Kubernetes support is coming soon!)
    </div>
  </Feature>
  <Feature title="Automatic Backups">
    <div slot="icon">
      <svg
        width="512"
        height="512"
        class="icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path
            d="M6 4h10l4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"
          />
          <path d="M10 14a2 2 0 1 0 4 0a2 2 0 1 0-4 0m4-10v4H8V4" />
        </g>
      </svg>
    </div>
    <div slot="main-text">
      Your databases are automatically backed up to any S3 compatible solution.
      <br /><br />If an issue arises, you can effortlessly restore your data
      with just a few clicks.
    </div>
  </Feature>
  <Feature title="Powerful API / Webhooks">
    <div slot="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <polyline points="5 7 10 12 5 17" />
        <line x1="13" y1="17" x2="19" y2="17" />
      </svg>
    </div>
    <div slot="main-text">
      Programmatically deploy, query, and manage your servers and resources.
      <br /><br />Integrate with your CI/CD pipelines or build your own custom
      integrations, with Github Actions, Gitlab CI, Bitbucket Pipelines, or basically any CI/CD tool.
    </div>
  </Feature>
 
  <Feature title="Pull Request Deployments">
    <div slot="icon">
      <svg
        width="512"
        height="512"
        class="icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0-4 0m-2 8v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1M15 5a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2 5h2a2 2 0 0 1 2 2v1M5 5a2 2 0 1 0 4 0a2 2 0 0 0-4 0m-2 8v-1a2 2 0 0 1 2-2h2"
        />
      </svg>
    </div>
    <div slot="main-text">
      Automagically deploy new commits and pull requests separately to quickly
      review contributions and speed up your teamwork!
    </div>
  </Feature>
</div>