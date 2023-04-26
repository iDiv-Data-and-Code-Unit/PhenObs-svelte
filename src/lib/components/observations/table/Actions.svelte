<script lang="ts">
  import { DatabaseFillUp, PencilFill, TrashFill } from 'svelte-bootstrap-icons';

  import Modal from '$lib/components/Modal.svelte';
  import collectionsStore from '$lib/shared/collections';

  import { uploadCollection } from '$lib/shared/app';
  import type { CollectionType } from '$lib/types';

  export let row: CollectionType | null;
  const { finished } = row as CollectionType;
  let displayModal = false;
  let local = false;
  let edited = false;

  if (row !== null && 'edited' in row && 'uploaded' in row) {
    local = true;
    edited = row.edited as boolean;
  }

  const deleteStoredCollection = () => {
    collectionsStore.remove(row?.id as number);
    displayModal = false;
  };

  const uploadStoredCollection = () => {
    uploadCollection(row as CollectionType);
  };
</script>

<div class="flex gap-2">
  <div class="btn-square">
    <div class="tooltip tooltip-primary" data-tip="Edit">
      <a
        class="btn btn-secondary btn-outline border-0 btn-square"
        href={`/observations/edit/${row?.id}`}
      >
        <PencilFill width={20} height={20} />
      </a>
    </div>
  </div>
  <div class="btn-square">
    {#if local}
      <div class="tooltip tooltip-primary" data-tip="Delete from device">
        <button
          class="btn btn-warning btn-outline border-0 btn-square"
          on:click={() => (displayModal = true)}
        >
          <TrashFill width={20} height={20} />
        </button>
      </div>
    {/if}
  </div>
  <div class="btn-square">
    {#if local && finished && edited}
      <div class="tooltip tooltip-primary" data-tip="Upload">
        <button
          class="btn btn-secondary btn-outline border-0 btn-square"
          on:click={uploadStoredCollection}
        >
          <DatabaseFillUp width={20} height={20} />
        </button>
      </div>
    {/if}
  </div>
</div>

<Modal hidden={!displayModal} on:click={deleteStoredCollection}
  >Are you sure about deleting this collection?</Modal
>
