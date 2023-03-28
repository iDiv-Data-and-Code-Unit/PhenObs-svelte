<script lang="ts">
  import ObservationFormRow from './ObservationFormRow.svelte';
  import OlderDataButton from './OlderDataButton.svelte';
  import ButtonGroup from './ButtonGroup.svelte';
  import Intensity from './Intensity.svelte';
  import Multiselect from './Multiselect.svelte';
  import Toggle from './Toggle.svelte';
  import { toCamelCase, toSnakeCase } from '$lib/shared/app';
  import type { RecordType, StoredCollectionType } from '$lib/types';
  import collectionsStore from '$lib/shared/collections';

  export let record: RecordType;

  const choices = ['yes', 'unsure', 'missed', 'no'];
  const fields = [
    {
      type: 'group',
      name: 'Initial vegetative growth'
    },
    {
      type: 'group',
      name: 'Young leaves unfolding'
    },
    {
      type: 'group',
      name: 'Flowers opening',
      key: 'flowers_open'
    },
    {
      type: 'group',
      name: 'Peak flowering'
    },
    {
      type: 'intensity',
      name: 'Flowering intensity',
      related: 'flowers_open'
    },
    {
      type: 'group',
      name: 'Ripe fruits'
    },
    {
      type: 'group',
      name: 'Senescence'
    },
    {
      type: 'intensity',
      name: 'Senescence intensity',
      related: 'senescence'
    },
    {
      type: 'multiselect',
      name: 'Maintenance'
    },
    {
      type: 'textarea',
      name: 'Remarks'
    }
  ];

  const updateRecord = (e: CustomEvent<{ value: string|string[]|number|null|boolean; key: string }>) => {
    const {value, key} = e.detail;
    record[key] = value;
    collectionsStore.editRecord(record);
  };

  $: noObservation = record?.no_observation
</script>

{#if record === undefined}
  <p class="flex w-full h-full justify-center my-10">...</p>
{:else}
  {#each fields as { type, name, key=toSnakeCase(name), related='' } (toCamelCase(name))}
    <ObservationFormRow label={name}>
      {#if type === 'group'}
        <ButtonGroup
          {record}
          {choices}
          on:choice={updateRecord}
          {key}
          disabled={noObservation}
        />

        <!-- <OlderDataButton id={toCamelCase(type)} title={name}> -->
          <!-- <ButtonGroup {choices} /> -->
        <!-- </OlderDataButton> -->
      {:else if type === 'intensity'}
        <Intensity {key} on:change={updateRecord} disabled={record[related] !== 'y' || noObservation} record={record} />

        <!-- <OlderDataButton id={toCamelCase(type)} title={name}> -->
          <!-- <Intensity /> -->
        <!-- </OlderDataButton> -->
      {:else if type === 'multiselect'}
        <Multiselect {key} on:select={updateRecord} {record}/>

        <!-- <OlderDataButton id={toCamelCase(type)} title={name}> -->
          <!-- <Multiselect /> -->
        <!-- </OlderDataButton> -->
      {:else}
        <textarea
          required={noObservation}
          placeholder="..."
          class={`bg-warning/20 ${
            record !== undefined && 'hover:bg-warning/30'
          } lg:col-span-2  md:col-span-3 flex grow textarea textarea-lg w-full text-xl`}
        />
        <!-- <OlderDataButton id={toCamelCase(type)} title={name}>
          <textarea
            placeholder="..."
            class="bg-warning/20 hover:bg-warning/30 textarea textarea-lg w-full text-xl"
          />
        </OlderDataButton> -->
      {/if}
    </ObservationFormRow>
  {/each}
  <Toggle checked={noObservation} key={'no_observation'} on:toggle={updateRecord} />

  <div class="flex justify-end gap-3 mt-5">
    <button class="btn btn-error md:text-xl lg:text-2xl md:p-12  text-lg py-8 content-center"
      >Cancel</button
    >
    <button
      class="btn btn-secondary btn-disabled md:text-xl lg:text-2xl md:p-12 text-lg p-6 py-8 content-center w-max grow md:grow-0"
      >Done 20/320</button
    >
  </div>
{/if}