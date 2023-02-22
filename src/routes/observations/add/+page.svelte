<script lang="ts">
  import Calendar from '$lib/components/observations/Calendar.svelte';
  import Subgarden from '$lib/components/observations/Subgarden.svelte';
</script>

<div class="container rounded-lg mt-5 shadow-lg md:p-10 p-5 dark:bg-slate-800">
  <h1 class="text-4xl font-semibold">Add collection</h1>
  <!-- TODO: Add functionality to the calendar and garden selector -->
  <div class="grid lg:grid-cols-4 lg:gap-4 gap-2 mt-5">
    <Calendar />

    <div class="lg:col-span-2"><Subgarden /></div>

    <button class="btn btn-disabled flex gap-3 text-xl w-full lg:py-14 py-10 content-center">
      <p class="font-bold">Creator</p>
      <span>admin</span>
    </button>
  </div>
</div>
