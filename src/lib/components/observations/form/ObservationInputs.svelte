<script lang="ts">
  import ObservationFormRow from './ObservationFormRow.svelte';
  import OlderDataButton from './OlderDataButton.svelte';
  import ButtonGroup from './ButtonGroup.svelte';
  import Intensity from './Intensity.svelte';
  import Multiselect from './Multiselect.svelte';
  import Toggle from './Toggle.svelte';
  import { toCamelCase, toSnakeCase } from '$lib/shared/app';
  import type { RecordType } from '$lib/types';
  import collectionsStore from '$lib/shared/collections';
  import { fields } from '$lib/shared/app';

  export let record: RecordType;
  export let previousRecord: RecordType | null;

  const updateRecord = (e: CustomEvent<{ value: string|string[]|number|null|boolean; key: string; previous: boolean }>) => {
    const {value, key, previous} = e.detail;

    if (previous && previousRecord) { 
      previousRecord[key] = value;
      collectionsStore.editRecord(previousRecord);
    } else {
      record[key] = value;
      collectionsStore.editRecord(record);
    }
  };

  $: noObservation = record.no_observation
  $: previousRecordNoObservation = previousRecord !== null ? previousRecord.no_observation : false
</script>


  {#each fields as { type, name, key=toSnakeCase(name), related='' } (toCamelCase(name))}
    <ObservationFormRow label={name}>
      {#if type === 'group'}
        <ButtonGroup {record} {key} disabled={noObservation} on:choice={updateRecord} />
      {:else if type === 'intensity'}
        <Intensity {record} {key} disabled={record[related] !== 'y' || noObservation} on:change={updateRecord} />
      {:else if type === 'multiselect'}
        <Multiselect {record} {key} on:select={updateRecord}/>
      {:else}
        <textarea
          required={noObservation}
          placeholder="..."
          class={`bg-warning/20 ${
            record !== undefined && 'hover:bg-warning/30'
          } lg:col-span-2  md:col-span-3 flex grow textarea textarea-lg w-full text-xl`}
        />
      {/if}
      {#if previousRecord !== null}
        <OlderDataButton
          {name}
          {key}
          {type}
          record={previousRecord}
          disabled={(related.length && previousRecord[related] !== 'y') || previousRecordNoObservation}
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
      class="btn btn-secondary btn-disabled md:text-xl lg:text-2xl md:p-12 text-lg p-6 py-8 content-center w-max grow md:grow-0"
      >Done 20/320</button
    >
  </div>