<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ChevronDown } from 'svelte-bootstrap-icons';
  import gardensStore from '$lib/shared/gardens';
  import type { GardenType, StoredCollectionType } from '$lib/types';

  export let collections: StoredCollectionType[];
  let offlineCollections: number[] = [];
  let selectedSubgardenName: string = '';
  let selectedSubgarden: number;
  let subgardens: GardenType[] = $gardensStore !== null ? $gardensStore.subgardens : [];

  const dispatch = createEventDispatcher<{ change: number }>();

  const clickHandler = (e: Event, name: string, id: number) => {
    (e.target as HTMLButtonElement).blur();
    selectedSubgardenName = name;
    selectedSubgarden = id;
    dispatch('change', selectedSubgarden);
  };

  $: offlineCollections = collections.map((col) => col.garden);
</script>

<div class="dropdown w-full">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <label
    tabindex="0"
    class={`no-animation w-full btn btn-outline flex gap-2 xl:gap-5 lg:py-14 py-10 content-center justify-center text-xl relative border-2
      ${subgardens.length === offlineCollections.length ? 'btn-warning' : 'btn-secondary'}
    `}
  >
    <div class="grid grid-flow-col gap-2 xl:gap-5 font-bold items-center">
      Garden
      <p class="font-normal truncate whitespace-nowrap overflow-hidden break-all">
        {selectedSubgardenName}
      </p>
      <ChevronDown width={12} height={12} class="stroke-current" />
    </div>
  </label>

  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full gap-1">
    {#each subgardens as { id, name } (name)}
      <li>
        <button
          class={`btn ${offlineCollections.includes(id) ? 'btn-warning' : 'btn-ghost'}`}
          on:click={(e) => clickHandler(e, name, id)}>{name}</button
        >
      </li>
    {/each}
  </ul>
</div>
