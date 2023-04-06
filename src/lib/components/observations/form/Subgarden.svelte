<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ChevronDown } from 'svelte-bootstrap-icons';
  import gardensStore from '$lib/shared/gardens';
  import type { GardenType } from '$lib/types';

  let selectedSubgardenName: string = '';
  let selectedSubgarden: number;
  let subgardens: GardenType[] = $gardensStore !== null ? $gardensStore.subgardens : [];

  const dispatch = createEventDispatcher<{change: number}>();

  const changeHandler = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    selectedSubgardenName = target.selectedOptions[0].innerText;
    selectedSubgarden = parseInt(target.value);

    dispatch('change', selectedSubgarden);
  };
</script>

<button
  class="no-animation w-full btn btn-secondary  btn-outline flex gap-2 xl:gap-5 lg:py-14 py-10 content-center justify-center text-xl relative"
>
  <div class="grid grid-flow-col gap-2 xl:gap-5 font-bold items-center">
    Garden
    <p class="font-normal truncate whitespace-nowrap overflow-hidden break-all">
      {selectedSubgardenName}
    </p>
    <ChevronDown width={12} height={12} class="stroke-current" />
  </div>
  <select
    name="subgardens"
    id="subgardens"
    class="absolute bottom-0 w-full h-full opacity-0 text-secondary bg-white"
    on:change={changeHandler}
  >
    <option disabled selected value />
    {#each subgardens as { id, name } (name)}
      <option value={id} class="">{name}</option>
    {/each}
  </select></button
>
