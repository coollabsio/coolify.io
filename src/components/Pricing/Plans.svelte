<script>
  let freq = "monthly";
</script>

<div class="text-white">
  <div class="bg-coolgray-200/70 p-4 rounded lg:mx-0 mx-4">
    <h2
      id="tier-hobby"
      class="text-xl lg:text-4xl font-bold tracking-tight flex items-start gap-4"
    >
      Unlimited Trial
    </h2>
    <h2 class="mt-4 text-sm leading-6 text-left text-neutral-400">
      With the OSS version you get everything <span class="text-warning"
        >without limits</span
      >. It offers the same features as the paid version, but requires
      self-management.
    </h2>
  </div>
  <div class="flex justify-center py-10">
    <a
      href="https://app.coolify.io/register"
      class="text-base font-bold rounded p-4 px-10 text-white bg-coolgray-300 hover:bg-coolgray-400 flex gap-2"
      ><svg class="icon" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="m6.854 3.854l.8-.8c.644-.645 1.775-1.092 2.898-1.253a5.342 5.342 0 0 1 1.504-.02c.443.066.714.196.84.323c.127.126.257.397.323.84c.064.427.059.95-.02 1.504c-.16 1.123-.608 2.254-1.253 2.898L7.5 11.793l-1.146-1.146a.5.5 0 1 0-.708.707l1.5 1.5a.5.5 0 0 0 .708 0l.547-.548l1.17 1.951a.5.5 0 0 0 .783.097l2-2a.5.5 0 0 0 .141-.425l-.465-3.252l.624-.623c.855-.856 1.358-2.225 1.535-3.465c.09-.627.1-1.25.019-1.794c-.08-.528-.256-1.05-.604-1.399c-.349-.348-.871-.525-1.4-.604a6.333 6.333 0 0 0-1.793.02C9.17.987 7.8 1.49 6.946 2.345l-.623.624l-3.252-.465a.5.5 0 0 0-.425.141l-2 2a.5.5 0 0 0 .097.783l1.95 1.17l-.547.547a.5.5 0 0 0 0 .708l1.5 1.5a.5.5 0 1 0 .708-.708L3.207 7.5l.647-.646zm3.245 9.34l-.97-1.617l2.017-2.016l.324 2.262zM3.423 5.87l2.016-2.016l-2.262-.324l-1.37 1.37zm-1.07 4.484a.5.5 0 1 0-.707-.708l-1 1a.5.5 0 1 0 .708.707zm1.5 1.5a.5.5 0 1 0-.707-.707l-2 2a.5.5 0 0 0 .708.707zm1.5 1.5a.5.5 0 1 0-.707-.708l-1 1a.5.5 0 1 0 .708.707zM9.5 6.749a1.249 1.249 0 1 0 0-2.498a1.249 1.249 0 0 0 0 2.498"
          clip-rule="evenodd"
        />
      </svg>Get Started in the Cloud</a
    >
  </div>
  <div class="flex gap-4 justify-center">
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

  <div class="flex text-left">
    <div class="grid grid-cols-1 xl:grid-cols-3">
      <div class="p-8">
        <h2 id="tier-basic" class="text-3xl font-bold tracking-tight">Basic</h2>
        <p class="mt-4 text-sm leading-6 text-neutral-400">
          Begin hosting your own services in the cloud.
        </p>
        <p class="mt-6 flex items-baseline gap-x-1">
          <span class="text-4xl font-bold tracking-tight">
            {freq === "monthly" ? "$5" : "$4"}</span
          >
          <span class="text-sm font-semibold leading-6"> / month + VAT</span>
        </p>
        <div class="text-neutral-400">
          billed
          {freq === "monthly" ? "monthly" : "annually"}
        </div>

        <ul role="list" class="mt-8 space-y-3 text-sm leading-6">
          <li class="flex">
            <svg
              class="flex-none w-5 h-6 text-warning mr-3"
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
            Connect <span class="px-1 font-bold text-white">2</span> servers
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
            Free Email Notifications
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
              class="flex-none w-5 h-6 text-green-500"
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
        <p class="mt-4 text-sm leading-6 text-neutral-400">
          Expand your business or set up your own hosting environment.
        </p>
        <p class="mt-6 flex items-baseline gap-x-1">
          <span class="text-4xl font-bold tracking-tight">
            {freq === "monthly" ? "$30" : "$27"}</span
          >
          <span class="text-sm font-semibold leading-6"> / month + VAT</span>
        </p>
        <div class="text-neutral-400">
          billed
          {freq === "monthly" ? "monthly" : "annually"}
        </div>
        <ul role="list" class="mt-8 space-y-3 text-sm leading-6">
          <li class="flex">
            <svg
              class="flex-none w-5 h-6 text-warning mr-3"
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
            Connect <span class="px-1 font-bold text-white">10</span> servers
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
            Free Email Notifications
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
              class="flex-none w-5 h-6 text-green-500"
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
        <h2 id="tier-ultimate" class="text-3xl font-bold tracking-tight">
          Ultimate
        </h2>
        <p class="mt-4 text-sm leading-6 text-neutral-400">
          Easily manage complex infrastructures in a single location.
        </p>
        <p class="mt-6 flex items-baseline gap-x-1">
          <span class="text-4xl font-bold tracking-tight">
            Custom</span
          >
          <!-- <span class="text-sm font-semibold leading-6"> / month + VAT</span> -->
        </p>
        <div class="text-neutral-400">
          pay-as-you-go
        </div>
        <ul role="list" class="mt-12 space-y-3 text-sm leading-6">
          <li class="flex">
            <svg
              class="flex-none w-5 h-6 text-warning mr-3"
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
            Connect <span class="px-1 font-bold text-white">10+</span> servers
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
            Free Email Notifications
          </li>
          <li class="flex gap-x-3 font-bold">
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
              class="flex-none w-5 h-6 text-green-500"
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
    <div
      class="flex lg:flex-row flex-col items-center lg:items-start gap-4 text-xl tracking-tight text-neutral-400"
    >
      Do you require official support for your self-hosted instance?
      <button class="button rounded">
        <a
          class="font-bold text-white hover:no-underline"
          href="https://coolify.io/docs/contact">Contact Us</a
        >
      </button>
    </div>
  </div>
</div>
