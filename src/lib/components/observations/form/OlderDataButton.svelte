<script lang="ts">
  import ButtonGroup from '$lib/components/observations/form/ButtonGroup.svelte';
  import { createEventDispatcher } from 'svelte';
  import type { RecordType } from '$lib/types';
  import Intensity from './Intensity.svelte';
  import { mapped } from '$lib/shared/app';
  import Multiselect from './Multiselect.svelte';

  export let record: RecordType;
  export let key: string;
  export let name: string;
  export let type: string;
  export let disabled: boolean;
  let value: string | number = record[key] as string | number;

  const dispatch = createEventDispatcher<{
    save: { value: string | number; key: string; previous: boolean };
  }>();

  const getButtonValue = (value: string | number, type: string) => {
    return type === 'group' ? mapped[value] : value;
  };

  const updateValue = (
    e: CustomEvent<{ value: string | number; key: string; previous: boolean }>
  ) => {
    value = getButtonValue(e.detail.value, type);
  };

  const updateRecord = () => {
    dispatch('save', { value: getButtonValue(value, type), key, previous: true });
    title = value;
    display = !display;
  };

  console.log(value);
  // $: value = record[key] as string | number | string[];
  $: title =
    value === record[key]
      ? getButtonValue(value, type)
      : getButtonValue(record[key] as string, type);
  let display = false;
</script>

<button
  class={`btn text-lg btn-outline ${key === 'maintenance' && 'flex gap-2 h-max justify-start p-2'}`}
  class:btn-disabled={disabled}
  on:click|preventDefault={() => (display = !display)}
  >{#if type !== 'multiselect'}
    {title}
  {:else if key === 'maintenance'}
    {#each record[key].map((item) => item.replace('_', ' ')) as item}
      <div class="text-xs p-2 rounded-lg bg-primary/40 h-max">{item}</div>
    {/each}
  {/if}</button
>

<div class="modal cursor-pointer" class:modal-open={display}>
  <div class="modal-box relative">
    <button
      class="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
      on:click|preventDefault={() => (display = !display)}>✕</button
    >
    <h3 class="text-xl font-bold mb-5">{name}</h3>

    {#if display}
      {#if type === 'group'}
        <ButtonGroup {record} {key} {disabled} on:choice={updateValue} />
      {:else if type === 'intensity'}
        <Intensity {key} on:change={updateValue} {disabled} {record} />
      {:else if type === 'multiselect'}
        <Multiselect {key} on:change={updateValue} {disabled} {record} />
      {:else}
        <textarea
          required={disabled}
          placeholder="..."
          class={`bg-warning/20 ${
            record !== undefined && 'hover:bg-warning/30'
          } lg:col-span-2  md:col-span-3 flex grow textarea textarea-lg w-full text-xl`}
          >{value}</textarea
        >
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
