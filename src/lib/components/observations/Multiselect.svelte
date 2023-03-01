<script lang="ts">
  import MultiselectButton from './MultiselectButton.svelte';

  export let disabled = false;
  export let maintenance = {
    cut_total: false,
    cut_partly: false,
    covered_natural: false,
    covered_artificial: false,
    transplanted: false,
    removed: false
  };
</script>

<div class="lg:col-span-2  md:col-span-3 flex flex-wrap gap-2 items-center">
  <MultiselectButton {disabled} title="Cut total" bind:value={maintenance['cut_total']} />
  <MultiselectButton {disabled} title="Cut partly" bind:value={maintenance['cut_partly']} />
  <MultiselectButton {disabled} title="Covered natural" bind:value={maintenance['covered_natural']} />
  <MultiselectButton {disabled} title="Covered artificial" bind:value={maintenance['covered_artificial']} />
  <MultiselectButton {disabled} title="Transplanted" bind:value={maintenance['transplanted']} />
  <MultiselectButton {disabled} title="Removed" bind:value={maintenance['removed']} />
</div>
