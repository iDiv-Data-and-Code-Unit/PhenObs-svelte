<script lang="ts">
  import { writable } from 'svelte/store';
  import type { CollectionType, StoredCollectionType } from '$lib/types';
  import Table from '$lib/components/observations/table/Table.svelte';
  import TableHeader from '$lib/components/observations/table/TableHeader.svelte';
  import CollapseHeader from '$lib/components/observations/table/CollapseHeader.svelte';
  import collectionsStore from '$lib/shared/collections';
  import gardensStore from '$lib/shared/gardens';

  let loading = false;
  const gardens = $gardensStore?.subgardens?.map((val) => val.id);

  let saved = writable<StoredCollectionType[] | CollectionType[]>(
    $collectionsStore.filter(
      (item) => gardens?.includes(item.garden) && item.uploaded && !item.edited
    )
  );
  let notsaved = writable<StoredCollectionType[]>(
    $collectionsStore.filter(
      (item) => (gardens?.includes(item.garden) && !item.uploaded) || !item.finished
    )
  );

  collectionsStore.subscribe((items) => {
    notsaved.update((vals) =>
      vals.filter((item) => items.findIndex((val) => val.id === item.id) !== -1)
    );

    saved.update((vals) =>
      vals.filter((item) => {
        return (
          items.findIndex((val) => val.id === item.id) !== -1 &&
          'edited' in item &&
          'uploaded' in item &&
          item.uploaded &&
          !item.edited &&
          item.finished
        );
      })
    );
  });

  const getCollections = async () => {
    loading = true;

    const request = await fetch('http://127.0.0.1:8000/observations/?thin', {
      credentials: 'include'
    });
    const data = await request.json();
    const results = collectionsStore.getAndUpdateCollections(data);

    saved.set(results.database);
    notsaved.set(results.local);

    for (let collection of $notsaved) {
      if (collection.uploaded && !collection.edited) {
        saved.update((items) => {
          const index = items.findIndex((item) => item.id === collection.id);
          if (index !== -1) {
            items.splice(index, 1);
          }

          return [collection, ...items];
        });
        notsaved.update((items) => items.filter((item) => item.id !== collection.id));
      }
    }

    loading = false;
  };
</script>

<div class="container rounded-lg mt-5 shadow-lg md:p-10 p-5 dark:bg-slate-800">
  <TableHeader on:click={getCollections} bind:loading />
  <div class="md:mt-10 sm:mt-5" />
  <CollapseHeader title="Not saved"><Table name="notsaved" store={notsaved} /></CollapseHeader>
  <CollapseHeader title="Saved"><Table name="saved" store={saved} /></CollapseHeader>
</div>

<svelte:head>
  <title>PhenObs | Observations</title>
</svelte:head>
