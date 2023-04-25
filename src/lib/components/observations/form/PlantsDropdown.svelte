<script lang="ts">
  import { SortAlphaDown, SortNumericDown, ChevronDown } from 'svelte-bootstrap-icons';

  import type { RecordType } from '$lib/types';
  import Modal from '$lib/components/Modal.svelte';
  import collectionsStore from '$lib/shared/collections';
  import Alert from '$lib/components/Alert.svelte';

  export let record: RecordType | undefined;
  export let records: RecordType[];
  export let previousRecord: RecordType | null;
  export let previousRecords: RecordType[] | null;

  let select: HTMLSelectElement;
  let sortNumeric = false;
  let selectedPlantName: string = '';
  let selectedPlantIndex: number;
  let selectedPlant: number;
  let modalHidden = true;
  let alertHidden = true;
  let alertMessage: string;

  const markDone = () => {
    if (record !== undefined) {
      record.done = true;
      collectionsStore.editRecord(record);
      modalHidden = true;
    }
  };

  const raiseAlert = (message: string) => {
    alertMessage = message;
    alertHidden = false;
  };

  const changeHandler = (e: Event) => {
    if (record?.no_observation && record?.remarks.length === 0) {
      raiseAlert('noObservation');
      select.selectedIndex = selectedPlantIndex;
      return;
    } else if (
      (record?.flowers_open === 'y' && record.flowering_intensity === null) ||
      (record?.senescence === 'y' && record.senescence_intensity === null)
    ) {
      raiseAlert('intensity');
      select.selectedIndex = selectedPlantIndex;
      return;
    } else if (
      record !== undefined &&
      record !== null &&
      !record.done &&
      selectedPlantIndex !== -1
    ) {
      modalHidden = false;
      select.selectedIndex = selectedPlantIndex;
      return;
    }
    selectedPlantIndex = select.selectedIndex;
    selectedPlant = parseInt(select.value);

    record = records.find((item) => item.id === selectedPlant);
    previousRecord = previousRecords
      ? previousRecords.find((item) => item.id === selectedPlant) ?? null
      : null;
  };

  const getSorted = () => {
    let sortedRecords;

    if (sortNumeric) {
      sortedRecords = records.sort((a, b) => a.order - b.order);
      selectedPlantIndex = sortedRecords.findIndex((item) => item.id === selectedPlant);
    } else {
      sortedRecords = records.sort((a, b) => a.plant_name.localeCompare(b.plant_name));
      selectedPlantIndex = sortedRecords.findIndex((item) => item.id === selectedPlant);
    }

    return sortedRecords;
  };

  $: sorted = records && getSorted();
  $: selectedPlantName = record !== undefined ? ((record.done ? '✓ ' : '') + record.plant_name) : '';
  $: if (selectedPlantIndex === -1) {
    if (select) {
      select.selectedIndex = 0;
    }
    selectedPlantName = '';
    selectedPlant = -1;
  }
</script>

<div class="xl:col-span-2 md:col-span-3 gap-1 flex">
  <div
    class="tooltip tooltip-primary"
    data-tip={`Switch to sorting by ${sortNumeric ? 'name' : 'order'}`}
  >
    <button
      class="btn btn-warning btn-outline btn-square border-2"
      on:click|preventDefault={() => {
        sortNumeric = !sortNumeric;
        sorted = getSorted();
      }}
    >
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
      <div class="flex items-center justify-center gap-3">
        <p
          class="font-semibold truncate whitespace-nowrap overflow-hidden break-all text-black text-xl px-10"
        >
          {selectedPlantName}
        </p>
      </div>

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
      bind:this={select}
      on:change={changeHandler}
    >
      <option disabled selected value />
      {#each sorted as { id, plant_name, done } (id)}
        <option class="flex gap-1 h-20" value={id}>
          {done ? '✓' : ''}
          {plant_name}
        </option>
      {/each}
    </select>
  </div>
</div>

<Modal bind:hidden={modalHidden} on:click={markDone}
  >You have not changed any default value. Are you sure you want to move on?</Modal
>

<Alert bind:hidden={alertHidden} on:click={() => (alertHidden = true)}>
  {#if alertMessage === 'noObservation'}
    Please fill in the <span class="italic font-bold">Remarks</span> field before moving on.
  {:else if alertMessage === 'intensity'}
    Please fill in the marked <span class="italic font-bold">intensity</span> fields before moving on.
  {/if}
</Alert>
