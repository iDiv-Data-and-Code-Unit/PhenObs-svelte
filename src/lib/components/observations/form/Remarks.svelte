<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { RecordType } from '$lib/types';

  export let record: RecordType;
  export let key: string;
  export let disabled = false;
  let value: string;

  const dispatch = createEventDispatcher<{
    change: { value: string; key: string; previous: boolean };
  }>();

  const handleKeyup = (e: KeyboardEvent) => {
    value = (e.target as HTMLTextAreaElement).value;
    dispatch('change', { value, key, previous: false });
  };

  $: value = record[key] as string;
  $: console.log(value.length);
</script>

<textarea
  required={disabled}
  placeholder="..."
  {value}
  on:keyup={handleKeyup}
  class={`font-medium border-2  ${
    record !== undefined && value.length > 0
      ? 'hover:bg-warning/20 border-warning '
      : 'border-black/50'
  } xl:col-span-2 md:col-span-3 flex grow textarea textarea-lg w-full text-xl`}
/>
