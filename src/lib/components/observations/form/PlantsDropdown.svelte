<script lang="ts">
  import { SortAlphaDown, SortNumericDown, ChevronDown } from 'svelte-bootstrap-icons';

  import type { RecordType } from '$lib/types';
  import Modal from '$lib/components/Modal.svelte';
  import collectionsStore from '$lib/shared/collections';
  import Alert from '$lib/components/Alert.svelte';
  import { onMount } from 'svelte';

  export let record: RecordType | undefined;
  export let records: RecordType[];
  export let previousRecord: RecordType | null | undefined;
  export let previousRecords: RecordType[] | null;
  export let noObservation: boolean;

  let sortNumeric = false;
  let selectedPlantName: string = '';
  let selectedPlantIndex: number;
  let selectedPlant: number;
  let sortedRecords = records;
  let modalHidden = true;
  let alertHidden = true;

  const markDone = () => {
    if (record !== undefined) {
      record.done = true;
      collectionsStore.editRecord(record);
      modalHidden = true;
    }
  };

  const changeHandler = (e: Event) => {
    const target = e.target as HTMLSelectElement;

    if (record !== undefined && !record.done) {
      modalHidden = false;
      target.selectedIndex = selectedPlantIndex;
      return;
    } else if (noObservation && record?.remarks.length === 0) {
      alertHidden = false;
      target.selectedIndex = selectedPlantIndex;
      return;
    }

    selectedPlantIndex = target.selectedIndex;
    selectedPlantName = target.selectedOptions[0].innerText;
    selectedPlant = parseInt(target.value);

    record = records.find((item) => item.plant === selectedPlant);
    previousRecord = previousRecords
      ? previousRecords.find((item) => item.plant === selectedPlant)
      : null;
  };

  const switchSorting = () => {
    sortNumeric = !sortNumeric;

    if (sortNumeric) {
      sortedRecords = records.sort((a, b) => a.plant - b.plant);
      selectedPlantIndex = sortedRecords.findIndex((item) => item.plant === selectedPlant);
    } else {
      sortedRecords = records.sort((a, b) => a.plant_name.localeCompare(b.plant_name));
      selectedPlantIndex = sortedRecords.findIndex((item) => item.plant === selectedPlant);
    }
  };

  onMount(() => {
    sortNumeric = true;
    switchSorting();
  });
</script>

<div class="xl:col-span-2 md:col-span-3 gap-1 flex">
  <div
    class="tooltip tooltip-primary"
    data-tip={`Switch to sorting by ${sortNumeric ? 'name' : 'order'}`}
  >
    <button class="btn btn-warning btn-outline border-2" on:click|preventDefault={switchSorting}>
      {#if sortNumeric}
        <SortAlphaDown width={24} height={24} color="black" />
      {:else}
        <SortNumericDown width={24} height={24} color="black" />
      {/if}
    </button>
  </div>
  <div
    class="btn p-0 text-xl btn-warning btn-outline border-2 gap-1 relative grow no-animation w-min"
  >
    <div class="grid grid-cols-1 gap-2 xl:gap-5 font-bold items-center w-full">
      <p
        class="font-semibold truncate whitespace-nowrap overflow-hidden break-all text-black text-xl px-10"
      >
        {selectedPlantName}
      </p>
      <ChevronDown
        width={12}
        height={12}
        class="items-center absolute right-5 stroke-current"
        color="black"
      />
    </div>
    <select
      id="plant"
      class="col-span-2 w-full h-full absolute bottom-0 opacity-0 text-black bg-white"
      on:change={changeHandler}
    >
      <option disabled selected value />
      {#each sortedRecords as { plant, plant_name } (plant)}
        <option value={plant}>{plant_name}</option>
      {/each}
    </select>
  </div>
</div>

<Modal bind:hidden={modalHidden} on:click={markDone}
  >You have not changed any default value. Are you sure you want to move on?</Modal
>

<Alert bind:hidden={alertHidden} on:click={() => (alertHidden = true)}
  >Please fill in the <span class="italic font-bold">Remarks</span> field before moving on.</Alert
>
