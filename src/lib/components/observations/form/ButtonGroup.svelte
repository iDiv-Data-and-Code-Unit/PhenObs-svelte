<script lang="ts">
  import type { RecordType } from '$lib/types';
  import { createEventDispatcher } from 'svelte';

  export let record: RecordType;
  export let choices: Array<string>;
  export let disabled = false;
  export let key: string;

  const dispatch = createEventDispatcher<{ choice: { value: string; key: string } }>();
  const mapped: { [key: string]: string } = {
    no: 'no',
    yes: 'y',
    unsure: 'u',
    missed: 'm',
    m: 'missed',
    u: 'unsure',
    y: 'yes'
  };

  let value: string;
  
  $: dispatch('choice', {
    value: mapped[value],
    key
  });

  $: value = mapped[record[key] as string];
</script>

<div class="lg:col-span-2 md:col-span-3">
  <div class={`btn-group w-full flex`}>
    {#each choices as choice, index (index)}
      <button
        class={`btn grow ${value !== choice ? 'btn-ghost hover:bg-warning/30 bg-warning/20' : ''}`}
        on:click|preventDefault={() => (value = choice)}
        class:btn-warning={value === choice}
        {disabled}><p class:font-bold={value === choice}>{choice}</p></button
      >
    {/each}
  </div>
</div>
