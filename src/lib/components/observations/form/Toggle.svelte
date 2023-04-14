<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let checked: boolean;
  export let key: string;

  const dispatch = createEventDispatcher<{
    toggle: { value: boolean; key: string; previous: boolean };
  }>();

  $: dispatch('toggle', {
    value: checked,
    key,
    previous: false
  });
</script>

<div class="grid grid-cols-4 lg:gap-4 gap-2 mt-5 w- items-center justify-between">
  <label for="noobservation" class="md:text-xl col-span-3 md:col-span-2 xl:col-span-1"
    >No observation possible</label
  ><input
    id="noobservation"
    type="checkbox"
    bind:checked
    class="toggle toggle-lg border-2 place-self-end xl:place-self-auto "
    class:border-warning={checked}
  />
</div>
