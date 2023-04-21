<script lang="ts">
  import { Files } from 'svelte-bootstrap-icons';

  import type { RecordType, StoredCollectionType } from '$lib/types';
  import PlantsDropdown from './PlantsDropdown.svelte';
  import ObservationFormRow from './ObservationFormRow.svelte';
  import ObservationInputs from './ObservationInputs.svelte';
  import { formatDate } from '$lib/shared/app';
  import collectionsStore from '$lib/shared/collections';

  export let collection: StoredCollectionType;
  export let previousCollection: StoredCollectionType | null;
  let record: RecordType | undefined;
  let previousRecord: RecordType | null;
  let noObservation: boolean;
  let done = 0;
  let count = 0;

  function copyFromPreviousCollection() {
    if (record !== undefined && record !== null && previousRecord !== null) {
      record = {
        ...previousRecord,
        collection: record.collection,
        editor: record.editor,
        id: record.id,
        timestamp_edit: record.timestamp_edit,
        timestamp_entry: record.timestamp_entry,
        remarks: record.remarks,
        no_observation: record.no_observation,
        maintenance: record.maintenance,
        done: record.done
      };
    }
  }

  $: collectionsStore.subscribe((collections) => {
    collection = collections.find((item) => item.id === collection.id) ?? collection;
    previousCollection = collection.prev_collection
      ? collections.find((item) => item.id === collection.prev_collection) ?? null
      : null;
    record = collection.records.find((item) => item.plant === record?.plant);
    previousRecord =
      previousCollection === null
        ? null
        : previousCollection.records.find((item) => item.plant === record?.plant) ?? null;
    done = collection.records.filter((item) => item.done).length;
    count = collection.records.length;
    noObservation = record?.no_observation ?? noObservation;
  });

  $: if (count === done) {
    collection.finished = true;
    collectionsStore.edit(collection);
  }
</script>

<form class="text-lg">
  <ObservationFormRow label="Plant">
    <PlantsDropdown
      records={collection.records}
      previousRecords={previousCollection?.records ?? null}
      bind:record
      bind:previousRecord
    />
    {#if previousCollection !== null}
      <button
        class="btn flex lg:gap-5 gap-3 content-center btn-outline border-dashed border-2 border-gray-300 text-black/50"
        disabled={record === undefined}
        on:click|preventDefault={copyFromPreviousCollection}
      >
        <Files width={20} height={20} />
        <p class="lg:text-xl sm:text-sm text-lg">
          {formatDate(new Date(previousCollection.date), true)}
        </p>
      </button>
    {/if}
  </ObservationFormRow>

  {#if record !== undefined}
    <ObservationInputs {record} {previousRecord} {done} {count} />
  {:else}
    <p class="flex w-full h-full justify-center my-10">...</p>
  {/if}
</form>
