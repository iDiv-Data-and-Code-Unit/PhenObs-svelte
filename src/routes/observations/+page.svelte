<script lang="ts">
  import { writable } from 'svelte/store';
  import Table from '$lib/components/observations/table/Table.svelte';
  import TableHeader from '$lib/components/observations/table/TableHeader.svelte';
  import collectionsStore from '$lib/shared/collections';
  import type { CollectionType, StoredCollectionType } from '$lib/types';

  let saved = writable<CollectionType[]>([]);
  let notsaved = writable<StoredCollectionType[]>(JSON.parse($collectionsStore));

  const getCollections = async () => {
    const request = await fetch('http://127.0.0.1:8000/observations/?thin', {
      credentials: 'include'
    });
    const data = await request.json();
    const results = collectionsStore.getAndUpdateCollections(data);

    saved.set(results.database);
    notsaved.set(results.local);

    for (let collection of $notsaved) {
      if (collection.uploaded && !collection.edited) {
        saved.update((items) => [collection, ...items]);
        notsaved.update((items) => items.filter((item) => item.id !== collection.id));
      }
    }
  };
</script>

<div class="container rounded-lg mt-5 shadow-lg md:p-10 p-5 dark:bg-slate-800">
  <!-- TODO: Garden name as prop -->
  <TableHeader on:click={getCollections} />
  <h1 class="text-3xl mt-10 font-semibold">Not saved</h1>
  <Table name="notsaved" store={notsaved} />
  <h1 class="text-3xl font-semibold">Saved</h1>
  <Table name="saved" store={saved} />
</div>

<svelte:head>
  <title>PhenObs | Observations</title>
</svelte:head>
