<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import ButtonGroup from './ButtonGroup.svelte';
  import Intensity from './Intensity.svelte';
  import Multiselect from './Multiselect.svelte';
  import Remarks from './Remarks.svelte';

  import { formatDate, getButtonValue } from '$lib/shared/app';
  import type { RecordType } from '$lib/types';

  export let record: RecordType;
  export let key: string;
  export let name: string;
  export let type: string;
  export let disabled: boolean;
  let value: string | number | string[] | null = record[key] as string | number;
  let display = false;

  const dispatch = createEventDispatcher<{
    save: { value: string | number | string[] | null; key: string; previous: boolean };
  }>();

  const updateValue = (
    e: CustomEvent<{ value: string | number | string[] | null; key: string; previous: boolean }>
  ) => {
    value = getButtonValue(e.detail.value, type);
  };

  const updateRecord = () => {
    dispatch('save', { value: getButtonValue(value, type), key, previous: true });
    title = value;
    display = !display;
  };

  $: title =
    value === record[key]
      ? getButtonValue(value, type)
      : getButtonValue(record[key] as string, type);
</script>

<button
  class={`btn text-lg h-full btn-outline border-dashed border-2 border-gray-300 text-black/50 ${
    key === 'maintenance' && 'flex gap-2 justify-start p-2'
  }`}
  {disabled}
  on:click|preventDefault={() => (display = !display)}
  >{#if type !== 'multiselect'}
    {title}
  {:else if key === 'maintenance'}
    {#each record[key].map((item) => item.replace('_', ' ')) as item}
      <div class="text-xs text-start p-2 h-max">{item}</div>
    {/each}
  {/if}</button
>

<div class="modal cursor-pointer" class:modal-open={display}>
  <div class="modal-box relative">
    <button
      class="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
      on:click|preventDefault={() => (display = !display)}>✕</button
    >
    <div class="sm:flex my-5 items-center justify-between">
      <h3 class="text-xl font-bold">{name}</h3>
      <div class="badge badge-primary">{formatDate(new Date(record.timestamp_edit))}</div>
    </div>

    {#if display}
      {#if type === 'group'}
        <ButtonGroup {key} on:choice={updateValue} {disabled} {record} />
      {:else if type === 'intensity'}
        <Intensity {key} on:change={updateValue} {disabled} {record} />
      {:else if type === 'multiselect'}
        <Multiselect {key} on:select={updateValue} {disabled} {record} />
      {:else}
        <Remarks {record} {key} {disabled} on:change={updateValue} />
      {/if}
    {/if}

    <div class="modal-action">
      <button class="btn text-white" on:click|preventDefault={() => (display = !display)}
        >Close</button
      >
      <button on:click|preventDefault={updateRecord} class="btn btn-success text-white">
        Save changes
      </button>
    </div>
  </div>
</div>
