<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  import Calendar from '$lib/components/observations/Calendar.svelte';
  import ObservationForm from '$lib/components/observations/ObservationForm.svelte';

  import collectionsStore from '$lib/shared/collections';
  import type { StoredCollectionType } from '$lib/types';

  export let data: PageData;
  const id = data.id;
  let collection: StoredCollectionType | null = null;

  let height: number;
  let y: number;
  let showBackToTop = false;

  $: showBackToTop = y > height * 0.6;

  const scrollToTop = () => {
    document.body.scrollIntoView({ behavior: 'smooth' });
  };

  onMount(async () => {
    height = document.body.scrollHeight;
    let col: StoredCollectionType | null = collectionsStore.exists(id);

    if (!col) {
      const res = await fetch(`http://127.0.0.1:8000/observations/${id}/`, {
        credentials: 'include'
      });

      if (res.ok) {
        const json = await res.json();
        collectionsStore.add(json);
      }
    }

    collection = collectionsStore.exists(id);
  });
</script>

<svelte:window bind:scrollY={y} />

<div class="container rounded-lg mt-5 shadow-lg md:p-10 p-5 dark:bg-white dark:bg-opacity-10">
  <h1 class="text-4xl font-semibold">Edit collection</h1>
  <!-- TODO: Add functionality to the calendar and garden selector -->
  <div class="grid lg:grid-cols-4 lg:gap-4 gap-2 mt-5">
    <!-- ! Don't allow empty date -->
    <Calendar />

    <div class="lg:col-span-2">
      <button
        class="no-animation w-full btn btn-disabled  flex gap-2 xl:gap-5 lg:py-14 py-10 content-center justify-center text-xl relative"
      >
        <!-- <span class="badge badge-secondary border-0 content-center absolute bottom-2 right-2 ">Online</span> -->
        <div class="grid grid-flow-col gap-2 xl:gap-5 font-bold items-center">
          Garden
          <p class="font-normal truncate whitespace-nowrap overflow-hidden break-all">Ökologie</p>
        </div></button
      >
    </div>

    <button
      class="btn btn-disabled grid grid-flow-col gap-2 xl:gap-5 items-center text-xl w-full lg:py-14 py-10 content-center"
    >
      <p class="font-bold">Creator</p>
      <span class="truncate">admin</span>
    </button>
  </div>
  <h1 class="text-3xl font-semibold my-5">Edit observation</h1>
  <ObservationForm />

  <button
    on:click|preventDefault={scrollToTop}
    class="btn btn-warning btn-circle bottom-5 right-5 fixed shadow-xl"
    class:hidden={!showBackToTop}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      class="bi bi-arrow-up"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
      />
    </svg></button
  >
</div>

<svelte:head>
  <title>PhenObs | Edit</title>
</svelte:head>
