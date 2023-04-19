<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowUp } from 'svelte-bootstrap-icons';
  import Calendar from '$lib/components/observations/form/Calendar.svelte';
  import ObservationForm from '$lib/components/observations/form/ObservationForm.svelte';
  import Subgarden from '$lib/components/observations/form/Subgarden.svelte';

  import userStore from '$lib/shared/user';
  import collectionsStore from '$lib/shared/collections';
  import { dateChangeHandler, getCollection } from '$lib/shared/app';
  import type { StoredCollectionType } from '$lib/types';

  let height: number;
  let y: number;
  let showBackToTop = false;
  let date: Date;
  let collections: StoredCollectionType[] = [];
  let collection: StoredCollectionType | null = null;
  let previousCollection: StoredCollectionType | null = null;

  $: showBackToTop = y > height * 0.6;

  const scrollToTop = () => {
    document.body.scrollIntoView({ behavior: 'smooth' });
  };

  const createCollection = async (garden: number) => {
    const data = new FormData();
    data.append('garden', garden.toString());
    data.append('creator', $userStore ? $userStore.id.toString() : '');

    const res = await fetch(`/observations/add`, {
      method: 'POST',
      body: data
    });

    if (res.ok) {
      const json = await res.json();
      const col = JSON.parse(JSON.parse(json.data)[0]);
      const id = col['id'];

      collectionsStore.add(col);
      collection = collectionsStore.exists(id);

      if (collection !== null) {
        collections.push(collection);
      }
    } else {
      console.log('Error', res);
    }

    if (collection && collection['prev_collection'] !== null) {
      previousCollection = await getCollection(collection['prev_collection']);
    }
  };

  const dateChangeHandlerMiddleware = async (e: CustomEvent<Date>) => {
    [collection, previousCollection] = await dateChangeHandler(e, collection, previousCollection);
  };

  const gardenChangeHandler = async (e: CustomEvent<number>) => {
    const garden = e.detail;

    const index = collections.findIndex((item) => item.garden === garden);

    console.log(garden, index);

    if (index !== -1) {
      collection = collections[index];
    } else {
      await createCollection(garden);
    }

    date = collection !== null ? new Date((collection as StoredCollectionType).date) : new Date();
  };

  onMount(() => (height = document.body.scrollHeight));
</script>

<svelte:window bind:scrollY={y} />

<div class="container rounded-lg mt-5 shadow-lg md:p-10 p-5 dark:bg-white dark:bg-opacity-10">
  <h1 class="text-4xl font-semibold">Add collection</h1>
  <div class="grid lg:grid-cols-4 lg:gap-4 gap-2 mt-5">
    <Calendar {date} on:change={dateChangeHandlerMiddleware} />

    <div class="lg:col-span-2"><Subgarden on:change={gardenChangeHandler} /></div>

    <button
      class="btn btn-disabled grid grid-flow-col gap-2 xl:gap-5 items-center text-xl w-full lg:py-14 py-10 content-center"
    >
      <p class="font-bold">Creator</p>
      <span class="truncate">admin</span>
    </button>
  </div>
  <h1 class="text-3xl font-semibold my-5">Add observation</h1>

  {#if collection !== null}
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
  <title>PhenObs | Add</title>
</svelte:head>
