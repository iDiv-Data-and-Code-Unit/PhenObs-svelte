<script lang="ts">
  export let title: string;
  let checked: boolean = true;
</script>

<div class="collapse p-0 items-center h-min">
  <input type="checkbox" class="m-0" bind:checked />
  <div class="collapse-title p-0 flex items-center gap-5">
    <h1 class="text-3xl font-semibold my-auto">{title}</h1>
    <label class="swap swap-rotate items-center justify-center">
      <input type="checkbox" {checked} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="swap-off fill-current w-4 h-4 stroke-1 stroke-current"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="swap-on fill-current w-4 h-4 stroke-1 stroke-current"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
        />
      </svg>
    </label>
  </div>
  <div class="collapse-content p-0">
    <slot />
  </div>
</div>
