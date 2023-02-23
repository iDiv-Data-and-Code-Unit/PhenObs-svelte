<script lang="ts">
  import PlantsDropdown from './PlantsDropdown.svelte';
  import ObservationFormRow from './ObservationFormRow.svelte';
  import OlderDataButton from './OlderDataButton.svelte';
  import ButtonGroup from './ButtonGroup.svelte';
  import Intensity from './Intensity.svelte';

  const choices = ['yes', 'unsure', 'missed', 'no'];
</script>

<form class="text-lg">
  <ObservationFormRow label="Plant">
    <!-- TODO: Add functionality -->
    <PlantsDropdown />
    <OlderDataButton
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-files"
        viewBox="0 0 16 16"
      >
        <path
          d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"
        />
      </svg>
      <p class="text-xl">Feb 22, 2023</p></OlderDataButton
    >
  </ObservationFormRow>

  <ObservationFormRow label="Initial vegetative growth">
    <ButtonGroup {choices} />
    <OlderDataButton />
  </ObservationFormRow>

  <ObservationFormRow label="Young leaves unfolding">
    <ButtonGroup {choices} />
    <OlderDataButton />
  </ObservationFormRow>

  <ObservationFormRow label="Flowers opening">
    <ButtonGroup {choices} />
    <OlderDataButton />
  </ObservationFormRow>

  <ObservationFormRow label="Peak flowering">
    <ButtonGroup {choices} />
    <OlderDataButton />
  </ObservationFormRow>

  <ObservationFormRow label="Flowering intensity">
    <Intensity />
    <OlderDataButton />
  </ObservationFormRow>

  <ObservationFormRow label="Ripe fruits">
    <ButtonGroup {choices} />
    <OlderDataButton />
  </ObservationFormRow>

  <ObservationFormRow label="Senescence">
    <ButtonGroup {choices} />
    <OlderDataButton />
  </ObservationFormRow>

  <ObservationFormRow label="Senescence intensity">
    <Intensity />
    <OlderDataButton />
  </ObservationFormRow>
</form>
