<script lang="ts">
  import ObservationFormRow from './ObservationFormRow.svelte';
  import OlderDataButton from './OlderDataButton.svelte';
  import ButtonGroup from './ButtonGroup.svelte';
  import Intensity from './Intensity.svelte';
  import Multiselect from './Multiselect.svelte';
  import Toggle from './Toggle.svelte';
  import { isDone, toCamelCase } from '$lib/shared/app';
  import type { RecordType } from '$lib/types';
  import collectionsStore from '$lib/shared/collections';
  import { fields } from '$lib/shared/app';
  import Remarks from './Remarks.svelte';

  export let done: number;
  export let count: number;
  export let record: RecordType;
  export let previousRecord: RecordType | null;

  const updateRecord = (
    e: CustomEvent<{
      value: string | string[] | number | null | boolean;
      key: string;
      previous: boolean;
    }>
  ) => {
    const { value, key, previous } = e.detail;

    if (previous && previousRecord) {
      previousRecord[key] = value;
      collectionsStore.editRecord(previousRecord);
    } else {
      record[key] = value;
      record.done = isDone(record);

      collectionsStore.editRecord(record);
    }
  };

  $: noObservation = record.no_observation;
  $: previousRecordNoObservation = previousRecord !== null ? previousRecord.no_observation : false;
</script>

{#each fields as { type, name, key, related } (toCamelCase(name))}
  <ObservationFormRow label={name}>
    {#if type === 'group'}
      <ButtonGroup {record} {key} disabled={noObservation} on:choice={updateRecord} />
    {:else if type === 'intensity'}
      <Intensity
        {record}
        {key}
        disabled={record[related] !== 'y' || noObservation}
        on:change={updateRecord}
      />
    {:else if type === 'multiselect'}
      <Multiselect {record} {key} on:select={updateRecord} />
    {:else}
      <Remarks {record} {key} disabled={noObservation} on:change={updateRecord} />
    {/if}
    {#if previousRecord !== null}
      <OlderDataButton
        {name}
        {key}
        {type}
        record={previousRecord}
        disabled={(related.length && previousRecord[related] !== 'y') ||
          previousRecordNoObservation}
        on:save={updateRecord}
      />
    {/if}
  </ObservationFormRow>
{/each}

<Toggle key={'no_observation'} checked={noObservation} on:toggle={updateRecord} />

<div class="flex justify-end gap-3 mt-5">
  <button class="btn btn-error md:text-xl lg:text-2xl md:p-12  text-lg py-8 content-center"
    >Cancel</button
  >
  <button
    class="btn btn-secondary md:text-xl lg:text-2xl md:p-12 text-lg p-6 py-8 content-center w-max grow md:grow-0"
    class:btn-disabled={done !== count}>Done {done}/{count}</button
  >
</div>
