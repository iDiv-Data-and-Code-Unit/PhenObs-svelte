<script lang="ts">
  import { ArrowUp } from 'svelte-bootstrap-icons';

  import { onMount } from 'svelte';
  import Calendar from '$lib/components/observations/form/Calendar.svelte';
  import ObservationForm from '$lib/components/observations/form/ObservationForm.svelte';
  import Subgarden from '$lib/components/observations/form/Subgarden.svelte';

  let height: number;
  let y: number;
  let showBackToTop = false;

  $: showBackToTop = y > height * 0.6;

  const scrollToTop = () => {
    document.body.scrollIntoView({ behavior: 'smooth' });
  };

  onMount(() => (height = document.body.scrollHeight));
</script>

<svelte:window bind:scrollY={y} />

<div class="container rounded-lg mt-5 shadow-lg md:p-10 p-5 dark:bg-white dark:bg-opacity-10">
  <h1 class="text-4xl font-semibold">Add collection</h1>
  <!-- TODO: Add functionality to the calendar and garden selector -->
  <div class="grid lg:grid-cols-4 lg:gap-4 gap-2 mt-5">
    <!-- ! Don't allow empty date -->
    <Calendar />

    <div class="lg:col-span-2"><Subgarden /></div>

    <button
      class="btn btn-disabled grid grid-flow-col gap-2 xl:gap-5 items-center text-xl w-full lg:py-14 py-10 content-center"
    >
      <p class="font-bold">Creator</p>
      <span class="truncate">admin</span>
    </button>
  </div>
  <h1 class="text-3xl font-semibold my-5">Add observation</h1>
  <!-- <ObservationForm /> -->

  <button
    on:click|preventDefault={scrollToTop}
    class="btn btn-warning btn-circle bottom-5 right-5 fixed shadow-xl"
    class:hidden={!showBackToTop}
  >
    <ArrowUp width={20} height={20} />
  </button>
</div>

<svelte:head>
  <title>PhenObs | Add</title>
</svelte:head>
