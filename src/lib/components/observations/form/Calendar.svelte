<script lang="ts">
  import { Calendar2Fill } from 'svelte-bootstrap-icons';
  import { formatDate } from '$lib/shared/app';

  let todayStr = new Date().toISOString().split('T')[0];
  let dateStr: string = todayStr;
  $: dateStrFormatted = formatDate(new Date(dateStr));

  const handleChange = (e: any) => {
    const target = e.target;
    const value = (target as HTMLInputElement).value;
    if (value === '') {
      dateStr = todayStr;
    }
  };
</script>

<button
  class="btn btn-secondary btn-outline flex xl:gap-10 gap-5 lg:py-14 py-10 content-center justify-center text-xl relative"
>
  <p>{dateStrFormatted}</p>
  <Calendar2Fill width={24} height={24} />
  <input
    type="date"
    class="w-full absolute bottom-0 h-full opacity-0"
    bind:value={dateStr}
    on:change={handleChange}
    required
  /></button
>
