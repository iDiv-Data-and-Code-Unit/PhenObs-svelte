<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowUp } from 'svelte-bootstrap-icons';
  import type { PageData } from './$types';

  import Calendar from '$lib/components/observations/form/Calendar.svelte';
  import ObservationForm from '$lib/components/observations/form/ObservationForm.svelte';
  
  import { dateChangeHandler, getCollection } from '$lib/shared/app';
  import type { StoredCollectionType } from '$lib/types';

  export let data: PageData;

  let collection: StoredCollectionType | null = null;
  let previousCollection: StoredCollectionType | null = null;
  let date: Date;
  let height: number;
  let y: number;
  let showBackToTop = false;

  $: showBackToTop = y > height * 0.6;

  const id = data.id;

  const scrollToTop = () => {
    document.body.scrollIntoView({ behavior: 'smooth' });
  };

  const dateChangeHandlerMiddleware = async (e: CustomEvent<Date>) => {
    [collection, previousCollection] = await dateChangeHandler(e, collection, previousCollection);
  };

  onMount(async () => {
    height = document.body.scrollHeight;

    collection = await getCollection(id);
    if (collection && collection['prev_collection'] !== null) {
      previousCollection = await getCollection(collection['prev_collection']);
    }

    date = collection !== null ? new Date((collection as StoredCollectionType).date) : new Date();
  });
</script>

<svelte:window bind:scrollY={y} />

<div class="container rounded-lg mt-5 shadow-lg md:p-10 p-5 dark:bg-white dark:bg-opacity-10">
  <h1 class="text-4xl font-semibold">Edit collection</h1>
  <div class="grid lg:grid-cols-4 lg:gap-4 gap-2 mt-5">
    <Calendar {date} on:change={dateChangeHandlerMiddleware} />

    <div class="lg:col-span-2">
      <button
        class="w-full btn btn-disabled  flex gap-2 xl:gap-5 lg:py-14 py-10 content-center justify-center text-xl relative"
      >
        <div class="grid grid-flow-col gap-2 xl:gap-5 font-bold items-center">
          Garden
          <p class="font-normal truncate whitespace-nowrap overflow-hidden break-all">
            {collection?.subgarden_name}
          </p>
        </div></button
      >
    </div>

    <button
      class="btn btn-disabled grid grid-flow-col gap-2 xl:gap-5 items-center text-xl w-full lg:py-14 py-10 content-center"
    >
      <p class="font-bold">Creator</p>
      <span class="truncate">{collection?.creator_username}</span>
    </button>
  </div>
  <h1 class="text-3xl font-semibold my-5">Edit observation</h1>
  {#if collection}
    <ObservationForm {collection} {previousCollection} />
  {/if}

  <button
    on:click|preventDefault={scrollToTop}
    class="btn btn-warning btn-circle bottom-5 right-5 fixed shadow-xl"
    class:hidden={!showBackToTop}
  >
    <ArrowUp width={20} height={20} />
  </button>
</div>

<svelte:head>
  <title>PhenObs | Edit</title>
</svelte:head>
