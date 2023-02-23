<script lang="ts">
  import Calendar from '$lib/components/observations/Calendar.svelte';
  import ObservationForm from '$lib/components/observations/ObservationForm.svelte';
  import Subgarden from '$lib/components/observations/Subgarden.svelte';
</script>

<div class="container rounded-lg mt-5 shadow-lg md:p-10 p-5 dark:bg-slate-800">
  <h1 class="text-4xl font-semibold">Add collection</h1>
  <!-- TODO: Add functionality to the calendar and garden selector -->
  <div class="grid lg:grid-cols-4 lg:gap-4 gap-2 mt-5">
    <!-- ! Don't allow empty date -->
    <Calendar />

    <div class="lg:col-span-2"><Subgarden /></div>

    <button class="btn btn-disabled grid grid-flow-col gap-2 xl:gap-5 items-center text-xl w-full lg:py-14 py-10 content-center">
      <p class="font-bold">Creator</p>
      <span class="truncate">admin</span>
    </button>
  </div>
  <h1 class="text-3xl font-semibold my-5">Add observation</h1>
  <ObservationForm />
</div>
