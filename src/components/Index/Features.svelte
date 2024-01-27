<script>
  import Feature from "./Feature.svelte";
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-10 gap-y-28 pt-20 lg:px-10">  
  <Feature
    title="Bring Your Own Servers"
    details="Bring your own server from any cloud providers, or even your own server at home! All you need is SSH access. You will have full control over your server, and you can even use it for other purposes."
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
    <div slot="main-text">
      Once you connected your server, Coolify will start managing it and do a
      lot of administrative tasks for you. You can also write your own scripts
      to automate your server<span class="text-warning">*</span>.
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
      You own your own data. All configurations saved on your own servers, so if
      you decide to stop using Coolify, you can still continue to manage your
      deployed resources.
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
      Coolify will automatically monitor your configured servers and deployed
      resources. Notifies you if something goes wrong on your favourite
      channels, like Discord, Telegram, via Email and more...
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
      We automatically backup your databases to any S3 compatible solution. If
      something goes wrong, you can easily restore your data with a few clicks.
    </div>
  </Feature>
  <Feature title="Powerful API">
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
      Programatically deploy, query, and manage your servers & resources.
      Integrate to your CI/CD pipelines, or build your own custom integrations. <span
        class="text-warning">*</span
      >
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
      Git integration is default today. We support hosted (github.com,
      gitlab.com<span class="text-warning">*</span>) or self-hosted<span
        class="text-warning">*</span
      > (Github Enterprise, Gitlab) Git repositories.
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
<div class="pt-20 text-xs px-10">
  <span class="text-warning">*</span> Some features are work in progress and will
  be available soon.
</div>

