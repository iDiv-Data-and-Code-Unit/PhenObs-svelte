<script lang="ts">
  import type { RecordType } from '$lib/types';
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';

  export let record: RecordType;

  export let key: string;
  export let step: number = 5;
  export let disabled = false;
  let value: number | null;

  const dispatch = createEventDispatcher<{
    change: { value: number | null; key: string; previous: boolean };
  }>();

  const changeHandler = (e: Event) => {
    const targetValue = (e.target as HTMLInputElement).value;
    const parsedValue = parseInt(targetValue.slice(0, -1));
    value = parsedValue;
  };

  $: dispatch('change', {
    value,
    key,
    previous: false
  });

  $: value = record[key] as number | null;
</script>

<div
  class="xl:col-span-2  md:col-span-3 flex gap-2 items-center"
  transition:scale={{ duration: 300 }}
>
  <div
    class="flex justify-between text-xs mb-2 sm:mb-0 w-full rounded-lg"
    class:btn-disabled={disabled}
  >
    <select
      class="select select-warning w-full mr-8 text-center border-2 text-xl"
      class:select-error={(!disabled && value === 0) || value === null}
      required={!disabled}
      on:change={changeHandler}
      {disabled}
    >
      <option disabled selected={value === null} />
      {#each Array.from({ length: 20 }, (_, i) => (i + 1) * step) as choice, index (index)}
        <option selected={choice === value}>{choice}%</option>
      {/each}
    </select>
  </div>
</div>
