<script lang="ts">
  import { Files } from 'svelte-bootstrap-icons';

  import type { RecordType, StoredCollectionType } from '$lib/types';
  import PlantsDropdown from './PlantsDropdown.svelte';
  import ObservationFormRow from './ObservationFormRow.svelte';
  import ObservationInputs from './ObservationInputs.svelte';

  export let collection: StoredCollectionType;
  let record: RecordType;
</script>

<form class="text-lg">
  <ObservationFormRow label="Plant">
    <PlantsDropdown records={collection.records} bind:record />
    <button
      class="btn flex lg:gap-5 gap-3 content-center btn-outline"
      disabled={record === undefined}
      on:click|preventDefault
    >
      <Files width={20} height={20} />
      <p class="lg:text-xl sm:text-sm text-lg">Feb 22, 2023</p>
    </button>
  </ObservationFormRow>

  <ObservationInputs {record} />
</form>
