<script>
  let freq = "monthly";
</script>

<div>
  <div class="bg-coolgray-400 p-4 rounded">
    <h2
      id="tier-hobby"
      class="text-4xl font-bold tracking-tight flex items-start gap-4"
    >
      Unlimited Trial
      <a href="https://github.com/coollabsio/coolify" class="button"
        >Open GitHub</a
      >
    </h2>
    <p class="mt-4 text-sm leading-6">
      Start self-hosting <span class="text-warning">without limits</span> with our
      OSS version. Same features as the paid version, but you have to manage by yourself.
    </p>
  </div>
  <div class="flex justify-center py-10">
    <a
      href="https://app.coolify.io/register"
      class="text-base font-semibold leading-6 rounded p-4 px-10 text-white bg-coollabs hover:bg-coollabs-100"
      >Get Started in the Cloud</a
    >
  </div>
  <div class=" flex gap-4 justify-center">
    <fieldset class="flex gap-4 text-center text-xl font-semibold items-center">
      <legend class="sr-only">Payment frequency</legend>
      <label
        class="cursor-pointer transition-all p-2 border-b-2"
        class:border-warning={freq === "monthly"}
        class:border-transparent={freq !== "monthly"}
      >
        <input
          type="radio"
          name="frequency"
          value="monthly"
          class="sr-only"
          on:click={() => (freq = "monthly")}
        />
        <span>Monthly</span>
      </label>
      <label
        class="cursor-pointer transition-all p-2 border-b-2"
        class:border-warning={freq === "yearly"}
        class:border-transparent={freq !== "yearly"}
      >
        <input
          type="radio"
          name="frequency"
          value="annually"
          class="sr-only"
          on:click={() => (freq = "yearly")}
        />
        <span>Annually <span class="text-xs">(save 1 month)</span></span>
      </label>
    </fieldset>
  </div>

  <!--<div class=" pt-10 pb-2 text-center">
    <span class="font-bold text-warning">Trial period</span> included on all plans,
    without credit card details.
  </div> -->

  <div class="flex">
    <div class="grid grid-cols-1 xl:grid-cols-3">
      <div class="p-8">
        <h2 id="tier-hobby" class="text-3xl font-bold tracking-tight">Basic</h2>
        <p class="mt-4 text-sm leading-6">
          Start self-hosting in the cloud with a single server.
        </p>
        <p class="mt-6 flex items-baseline gap-x-1">
          <span class="text-4xl font-bold tracking-tight">
            {freq === "monthly" ? "$5" : "$4"}</span
          >
          <span class="text-sm font-semibold leading-6"> / month + VAT</span>
        </p>
        <div>
          billed
          {freq === "monthly" ? "monthly" : "annually"}
        </div>

        <ul role="list" class="mt-8 space-y-3 text-sm leading-6">
          <li class="flex gap-x-3">
            <svg
              class="flex-none w-5 h-6 text-warning"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
            2 servers (Bring Your Own Server)
          </li>
          <li class="flex gap-x-3">
            <svg
              class="flex-none w-5 h-6 text-warning"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
            Included Email System
          </li>
          <li class="flex gap-x-3">
            <svg
              class="flex-none w-5 h-6 text-warning"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
            Email Support
          </li>
          <li class="flex font-bold text-white gap-x-3">
            <svg
              width="512"
              height="512"
              class="flex-none w-5 h-6 text-green-600"
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
                  d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3-5a9 9 0 0 0 6-8a3 3 0 0 0-3-3a9 9 0 0 0-8 6a6 6 0 0 0-5 3"
                />
                <path
                  d="M7 14a6 6 0 0 0-3 6a6 6 0 0 0 6-3m4-8a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
                />
              </g>
            </svg>
            + All upcoming features
          </li>
        </ul>
      </div>
      <div class="p-8">
        <h2 id="tier-pro" class="text-3xl font-bold tracking-tight">Pro</h2>
        <p class="mt-4 text-sm leading-6">
          Scale your business or self-hosting environment.
        </p>
        <p class="mt-6 flex items-baseline gap-x-1">
          <span class="text-4xl font-bold tracking-tight">
            {freq === "monthly" ? "$30" : "$27"}</span
          >
          <span class="text-sm font-semibold leading-6"> / month + VAT</span>
        </p>
        <div>
          billed
          {freq === "monthly" ? "monthly" : "annually"}
        </div>
        <ul role="list" class="mt-8 space-y-3 text-sm leading-6">
          <li class="flex gap-x-3">
            <svg
              class="flex-none w-5 h-6 text-warning"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
            10 servers (Bring Your Own Server)
          </li>

          <li class="flex gap-x-3">
            <svg
              class="flex-none w-5 h-6 text-warning"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
            Included Email System
          </li>
          <li class="flex gap-x-3">
            <svg
              class="flex-none w-5 h-6 text-warning"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
            Priority Email Support
          </li>
          <li class="flex font-bold text-white gap-x-3">
            <svg
              width="512"
              height="512"
              class="flex-none w-5 h-6 text-green-600"
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
                  d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3-5a9 9 0 0 0 6-8a3 3 0 0 0-3-3a9 9 0 0 0-8 6a6 6 0 0 0-5 3"
                />
                <path
                  d="M7 14a6 6 0 0 0-3 6a6 6 0 0 0 6-3m4-8a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
                />
              </g>
            </svg>
            + All upcoming features
          </li>
        </ul>
      </div>
      <div class="p-8">
        <h2 id="tier-hobby" class="text-3xl font-bold tracking-tight">
          Ultimate
        </h2>
        <p class="mt-4 text-sm leading-6">
          Deploy complex infrastuctures and manage them easily in one place.
        </p>
        <p class="mt-6 flex items-baseline gap-x-1">
          <span class="text-4xl font-bold tracking-tight">
            <button class="button rounded">
              <a
                class="font-bold text-white hover:no-underline"
                href="https://coolify.io/docs/contact">Contact Us</a
              >
            </button></span
          >
        </p>
        <ul role="list" class="mt-8 space-y-3 text-sm leading-6">
          <li class="flex gap-x-3">
            <svg
              class="flex-none w-5 h-6 text-warning"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
            ? servers (Bring Your Own Server)
          </li>
          <li class="flex gap-x-3">
            <svg
              class="flex-none w-5 h-6 text-warning"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
            Included Email System
          </li>
          <li class="flex gap-x-3">
            <svg
              class="flex-none w-5 h-6 text-warning"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
            Priority (Email/Chat) Support
          </li>
          <li class="flex font-bold text-white gap-x-3">
            <svg
              width="512"
              height="512"
              class="flex-none w-5 h-6 text-green-600"
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
                  d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3-5a9 9 0 0 0 6-8a3 3 0 0 0-3-3a9 9 0 0 0-8 6a6 6 0 0 0-5 3"
                />
                <path
                  d="M7 14a6 6 0 0 0-3 6a6 6 0 0 0 6-3m4-8a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
                />
              </g>
            </svg>
            + All upcoming features
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="p-4 mt-10 rounded">
    <div class="flex items-start gap-4 text-xl tracking-tight">
      Need official support for your self-hosted instance?
      <button class="button rounded">
        <a
          class="font-bold text-white hover:no-underline"
          href="https://coolify.io/docs/contact">Contact Us</a
        >
      </button>
    </div>
  </div>
  <div class="pb-8" />
</div>
