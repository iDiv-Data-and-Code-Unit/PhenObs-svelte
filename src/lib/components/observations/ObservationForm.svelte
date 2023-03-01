<script lang="ts">
  import PlantsDropdown from './PlantsDropdown.svelte';
  import ObservationFormRow from './ObservationFormRow.svelte';
  import OlderDataButton from './OlderDataButton.svelte';
  import ButtonGroup from './ButtonGroup.svelte';
  import Intensity from './Intensity.svelte';
  import Multiselect from './Multiselect.svelte';
  import { toCamelCase } from '$lib/app';

  let noObservation = false;

  const choices = ['yes', 'unsure', 'missed', 'no'];

  const fields = [
    {
      type: 'group',
      name: 'Initial vegetative growth'
    },
    {
      type: 'group',
      name: 'Young leaves unfolding'
    },
    {
      type: 'group',
      name: 'Flowers opening'
    },
    {
      type: 'group',
      name: 'Peak flowering'
    },
    {
      type: 'intensity',
      name: 'Flowering intensity'
    },
    {
      type: 'group',
      name: 'Ripe fruits'
    },
    {
      type: 'group',
      name: 'Senescence'
    },
    {
      type: 'intensity',
      name: 'Senescence intensity'
    },
    {
      type: 'multiselect',
      name: 'Maintenance'
    },
    {
      type: 'textarea',
      name: 'Remarks'
    }
  ];
</script>

<form class="text-lg">
  <ObservationFormRow label="Plant">
    <!-- TODO: Add functionality -->
    <PlantsDropdown />
    <button class="btn flex lg:gap-5 gap-3 content-center btn-outline" on:click|preventDefault>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="bi bi-files w-5"
        viewBox="0 0 16 16"
      >
        <path
          d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"
        />
      </svg>
      <p class="lg:text-xl sm:text-sm text-lg">Feb 22, 2023</p>
    </button>
  </ObservationFormRow>

  {#each fields as { type, name } (toCamelCase(name))}
    <ObservationFormRow label={name}>
      {#if type === 'group'}
        <ButtonGroup disabled={noObservation} {choices} />
        <OlderDataButton id={toCamelCase(type)} title={name}>
          <ButtonGroup {choices} />
        </OlderDataButton>
      {:else if type === 'intensity'}
        <Intensity disabled={noObservation} />
        <OlderDataButton id={toCamelCase(type)} title={name}>
          <Intensity />
        </OlderDataButton>
      {:else if type === 'multiselect'}
        <Multiselect disabled={noObservation} />
        <OlderDataButton id={toCamelCase(type)} title={name}>
          <Multiselect />
        </OlderDataButton>
      {:else}
        <textarea
          required={noObservation}
          placeholder="..."
          class="bg-warning/20 hover:bg-warning/30 lg:col-span-2  md:col-span-3 flex grow textarea textarea-lg w-full text-xl"
        />
        <OlderDataButton id={toCamelCase(type)} title={name}>
          <textarea
            placeholder="..."
            class="bg-warning/20 hover:bg-warning/30 textarea textarea-lg w-full text-xl"
          />
        </OlderDataButton>
      {/if}
    </ObservationFormRow>
  {/each}
  <div class="grid grid-cols-4 lg:gap-4 gap-2 mt-5 w- items-center justify-between">
    <label for="noobservation" class="md:text-xl col-span-3 lg:col-span-1"
      >No observation possible</label
    ><input
      id="noobservation"
      type="checkbox"
      bind:checked={noObservation}
      class="toggle toggle-lg place-self-end lg:place-self-auto"
    />
  </div>

  <div class="flex justify-end gap-3 mt-5">
    <button class="btn btn-error md:text-xl lg:text-2xl md:p-12  text-lg py-8 content-center"
      >Cancel</button
    >
    <button
      class="btn btn-secondary btn-disabled md:text-xl lg:text-2xl md:p-12 text-lg p-6 py-8 content-center w-max grow md:grow-0"
      >Done 20/320</button
    >
  </div>
</form>
