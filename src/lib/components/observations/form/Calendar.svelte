<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Calendar2Fill } from 'svelte-bootstrap-icons';
  import { formatDate } from '$lib/shared/app';

  export let date: Date = new Date();

  const dispatch = createEventDispatcher();

  const handleChange = (e: any) => {
    const target = e.target;
    const value = (target as HTMLInputElement).value;

    date = value === '' ? new Date() : new Date(value);

    dispatch('change', new Date(value));
  };

  $: dateStr = date.toISOString().split('T')[0];
  $: dateStrFormatted = formatDate(date);
</script>

<button
  class="btn btn-secondary btn-outline flex xl:gap-10 gap-5 lg:py-14 py-10 content-center justify-center text-xl relative border-2"
>
  <p>{dateStrFormatted}</p>
  <Calendar2Fill width={24} height={24} />
  <input
    type="date"
    class="w-full absolute bottom-0 h-full opacity-0"
    value={dateStr}
    on:change={handleChange}
    required
  /></button
>
