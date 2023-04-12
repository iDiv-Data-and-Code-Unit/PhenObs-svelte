<script lang="ts">
  import type { RecordType } from '$lib/types';
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { choices, mapped } from '$lib/shared/app';

  export let record: RecordType;
  export let disabled = false;
  export let key: string;
  export let previous: boolean = false;

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

<div class="xl:col-span-2 md:col-span-3" transition:scale={{ duration: 300 }}>
  <div class={`w-full sm:flex grid grid-cols-2 gap-2 text-black/70`}>
    {#each choices as choice, index (index)}
      <button
        class={`btn grow justify-start sm:justify-center px-2 ${
          value !== choice
            ? 'btn-ghost bg-warning/5 hover:bg-warning/20 text-black/50'
            : 'btn-warning'
        }`}
        on:click|preventDefault={() => (value = choice)}
        {disabled}
        ><p class:font-bold={value === choice} class="flex gap-3 items-center">
          <input type="radio" name={key + (previous ? '-old' : '')} class="radio radio-sm" checked={value === choice} {disabled} />
          {choice}
        </p></button
      >
    {/each}
  </div>
</div>
