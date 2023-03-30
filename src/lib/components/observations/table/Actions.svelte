<script lang="ts">
  import { DatabaseFillUp, PencilFill, TrashFill } from 'svelte-bootstrap-icons';

  import Modal from '$lib/components/Modal.svelte';
  import collectionsStore from '$lib/shared/collections';
  import type { CollectionType } from '$lib/types';

  export let row: CollectionType | null;
  const { finished } = row as CollectionType;
  let displayModal = false;
  let local = false;

  if (row !== null && 'edited' in row && 'uploaded' in row) {
    local = true;
  }

  const deleteStoredCollection = () => {
    collectionsStore.remove(row?.id as number);
    displayModal = false;
  };
</script>

<div class="flex gap-2">
  {#if local}
    {#if finished}
      <button class="btn btn-secondary btn-outline border-0">
        <DatabaseFillUp width={20} height={20} />
      </button>
    {/if}
    <button class="btn btn-warning btn-outline border-0" on:click={() => (displayModal = true)}>
      <TrashFill width={20} height={20} />
    </button>
  {/if}
  <a class="btn btn-secondary btn-outline border-0" href={`/observations/edit/${row?.id}`}>
    <PencilFill width={20} height={20} />
  </a>
</div>

<Modal hidden={!displayModal} on:click={deleteStoredCollection}
  >Are you sure about deleting this collection?</Modal
>
