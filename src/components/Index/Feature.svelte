<script>
  export let title = "Title HERE";
  export let details = "Details HERE";
</script>

<div>
  <div class="flex items-center gap-4 mb-4">
    <div class="flex h-10 w-10 items-center justify-center rounded-lg text-white bg-coolgray-500">
      <slot name="icon" />
    </div>
    <div class="text-2xl font-semibold text-white">{title}</div>
  </div>
  <div class="mt-1 flex flex-auto flex-col text-base leading-7 px-3 max-w-lg text-gray-300">
    <slot name="main-text">
      {details}
    </slot>
  </div>
</div>
