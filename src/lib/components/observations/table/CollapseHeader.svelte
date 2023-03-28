<script lang="ts">
  import { ChevronUp, ChevronDown } from 'svelte-bootstrap-icons';

  export let title: string;
  let checked: boolean = true;
</script>

<div class="collapse p-0 items-center h-min">
  <input type="checkbox" class="m-0" bind:checked />
  <div class="collapse-title p-0 flex items-center gap-5">
    <h1 class="text-3xl font-semibold my-auto">{title}</h1>
    <label class="swap swap-rotate items-center justify-center">
      <input type="checkbox" {checked} />
      <ChevronDown class="stroke-current swap-off" />
      <ChevronUp class="stroke-current swap-on" />
    </label>
  </div>
  <div class="collapse-content p-0">
    <slot />
  </div>
</div>
