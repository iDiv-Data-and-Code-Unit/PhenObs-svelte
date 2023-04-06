<script lang="ts">
  import type { RecordType } from '$lib/types';
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { choices, mapped } from '$lib/shared/app';

  export let record: RecordType;
  export let disabled = false;
  export let key: string;

  const dispatch = createEventDispatcher<{
    choice: { value: string; key: string; previous: boolean };
  }>();

  let value: string;

  $: dispatch('choice', {
    value: mapped[value],
    key,
    previous: false
  });

  $: value = mapped[record[key] as string];
</script>

<div class="lg:col-span-2 md:col-span-3" transition:scale={{ duration: 300 }}>
  <div class={`btn-group w-full flex text-black/70 `}>
    {#each choices as choice, index (index)}
      <button
        class={`btn grow ${value !== choice ? 'btn-ghost bg-warning/5 hover:bg-warning/20 text-black/50' : ''}`}
        on:click|preventDefault={() => (value = choice)}
        class:btn-warning={value === choice}
        {disabled}><p class:font-bold={value === choice}>{choice}</p></button
      >
    {/each}
  </div>
</div>
