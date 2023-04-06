<script lang="ts">
  import type { RecordType } from '$lib/types';
  import { createEventDispatcher } from 'svelte';

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
</script>

<textarea
  required={disabled}
  placeholder="..."
  {value}
  on:keyup={handleKeyup}
  class:bg-warning={value.length}
  class={`bg-warning/5 font-medium ${
    record !== undefined && !value.length && 'hover:bg-warning/20'
  } lg:col-span-2 md:col-span-3 flex grow textarea textarea-lg w-full text-xl`}
/>
