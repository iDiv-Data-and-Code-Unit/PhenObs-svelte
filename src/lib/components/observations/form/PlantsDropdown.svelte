<script lang="ts">
  import { SortAlphaDown, SortNumericDown, ChevronDown } from 'svelte-bootstrap-icons';

  import type { RecordType } from '$lib/types';

  export let record: RecordType | undefined;
  export let records: RecordType[];

  let sortNumeric = false;
  let selectedPlantName: string = '';
  let selectedPlant: number;

  const changeHandler = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    selectedPlantName = target.selectedOptions[0].innerText;
    selectedPlant = parseInt(target.value);
    record = records.find((item) => item.plant === selectedPlant);
  };
</script>

<div class="lg:col-span-2 md:col-span-3 gap-1 flex">
  <button class="btn btn-warning" on:click|preventDefault={() => (sortNumeric = !sortNumeric)}>
    {#if sortNumeric}
      <SortAlphaDown width={24} height={24} />
    {:else}
      <SortNumericDown width={24} height={24} />
    {/if}
  </button>
  <div class="btn p-0 text-xl btn-warning gap-1 relative grow no-animation w-min">
    <div class="grid grid-cols-1 gap-2 xl:gap-5 font-bold items-center w-full">
      <p
        class="font-semibold truncate whitespace-nowrap overflow-hidden break-all text-black text-xl px-10"
      >
        {selectedPlantName}
      </p>
      <ChevronDown width={12} height={12} class="items-center absolute right-5 stroke-current" />
    </div>
    <select
      id="plant"
      class="col-span-2 w-full h-full absolute bottom-0 opacity-0 text-black bg-white"
      on:change={changeHandler}
    >
      <option disabled selected value />
      {#each records as { plant, plant_name } (plant)}
        <option value={plant}>{plant_name}</option>
      {/each}
    </select>
  </div>
</div>
