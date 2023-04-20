<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { Circle, RecordCircle } from 'svelte-bootstrap-icons';
  import { choices, mapped } from '$lib/shared/app';
  import type { RecordType } from '$lib/types';

  export let record: RecordType;
  export let disabled = false;
  export let key: string;

  let value: string;

  const dispatch = createEventDispatcher<{
    choice: { value: string; key: string; previous: boolean };
  }>();

  $: value = mapped[record[key] as string];
</script>

<div class="xl:col-span-2 md:col-span-3" transition:scale={{ duration: 300 }}>
  <div class={`w-full sm:flex grid grid-cols-2 gap-2 text-black/70`}>
    {#each choices as choice, index (index)}
      <button
        class={`btn grow justify-start sm:justify-center px-2 btn-ghost hover:bg-warning/20 ${
          value !== choice ? ' text-black/50' : 'border-2 border-warning'
        }`}
        on:click|preventDefault={() => {
          value = choice;
          dispatch('choice', {
            value: mapped[value],
            key,
            previous: false
          });
        }}
        {disabled}
        ><p class:font-bold={value === choice} class="flex gap-3 items-center">
          {#if value !== choice}
            <Circle width={20} height={20} />
          {:else}
            <RecordCircle width={20} height={20} />
          {/if}
          {choice}
        </p></button
      >
    {/each}
  </div>
</div>
