<script>
  import Instances from "../Instances.svelte";
</script>

<div class="mx-auto">
  <div class="mx-auto flex-shrink-0 py-8 pb-10">
    <h1
      class="mt-8 md:mt-20 text-2xl font-bold tracking-tight text-white md:text-6xl"
    >
      Self-hosting with superpowers.
    </h1>
    <p class="mt-2 text-base md:text-xl">
      An open-source & self-hostable Heroku / Netlify / Vercel alternative.
    </p>
    <p class="mt-2 text-sm md:text-sm max-w-2xl">
      Easily connect to any server through SSH and deploy your applications (with Git integration), databases (with backup), or open-source services. Enjoy automatic SSL, monitoring, automations, notifications, and much more.
    </p>
    <div class="py-10 flex items-center gap-x-6">
      <a
        href="https://app.coolify.io/register"
        class="text-base font-semibold rounded p-4 px-10 text-white bg-coollabs hover:bg-coollabs-100"
        >Get Started in the Cloud</a
      >
    </div>
    <div>
      <h2 class="font-bold text-xl">Self-hosted version</h2>
      <div class="text-xs pb-2">
        Install <span class="text-warning">the self-hosted version</span> on
        your server in under a minute - always free, with all functionalities. <Instances
          client:load
        /> instances already running.
      </div>
      <div
        class="tracking-tight text-white font-mono border border-warning bg-coolgray-400 px-4 py-2 rounded text-xs md:text-sm text-left"
      >
        curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
      </div>
    </div>
    <div class="text-xs pt-2">
      Looking for version 3?
      <a class="text-warning" href="https://old.coolify.io">Here you go</a>.
    </div>
  </div>
</div>
