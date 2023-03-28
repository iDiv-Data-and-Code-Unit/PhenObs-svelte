<script lang="ts">
  import {
    HddFill,
    DatabaseFillCheck,
    ExclamationCircleFill,
    DatabaseFill
  } from 'svelte-bootstrap-icons';

  export let row;
  const { finished, uploaded, edited } = row;

  let local = true;

  if (uploaded === undefined && edited === undefined) {
    local = false;
  }
</script>

<div class="flex gap-2">
  {#if local}
    <HddFill
      width={20}
      height={20}
      class={`${uploaded && !edited && finished ? 'text-success' : ''}`}
    />
    {#if uploaded}
      <DatabaseFillCheck width={20} height={20} class="text-success" />
    {/if}
    {#if !finished}
      <ExclamationCircleFill width={20} height={20} class="text-error" />
    {/if}
  {:else if finished}
    <DatabaseFillCheck width={20} height={20} class="text-success" />
  {:else}
    <DatabaseFill width={20} height={20} />
    <ExclamationCircleFill width={20} height={20} class="text-error" />
  {/if}
</div>
