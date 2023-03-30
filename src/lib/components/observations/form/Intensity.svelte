<script lang="ts">
  import type { RecordType } from '$lib/types';
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';

  export let record: RecordType;

  export let key: string;
  export let step: number = 5;
  export let disabled = false;
  let initial: number | null;
  let value: number;

  const dispatch = createEventDispatcher<{
    change: { value: number; key: string; previous: boolean };
  }>();

  $: dispatch('change', {
    value,
    key,
    previous: false
  });

  $: initial = record[key] as number | null;
  $: value = initial === null ? 0 : (initial as number);
</script>

<div
  class="lg:col-span-2  md:col-span-3 flex gap-2 items-center"
  transition:scale={{ duration: 300 }}
>
  <div class="w-min flex justify-between text-xs px-2 ">
    <span class="text-xl text-center font-bold">{value}%</span>
  </div>
  <input
    type="range"
    min="0"
    max="100"
    bind:value
    class={`range grow ${disabled ? 'range-primary' : 'range-warning bg-warning/20'}`}
    {disabled}
    {step}
  />
</div>
