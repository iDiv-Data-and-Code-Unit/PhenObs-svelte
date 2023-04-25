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
    <div class="tooltip tooltip-primary" data-tip="Stored on device">
      <HddFill
        width={20}
        height={20}
        class={`${uploaded && !edited && finished ? 'text-success' : ''}`}
      />
    </div>
    {#if uploaded}
      <div class="tooltip tooltip-primary" data-tip="Finished and stored in database">
        <DatabaseFillCheck width={20} height={20} class="text-success" />
      </div>
    {/if}
    {#if !finished}
      <div class="tooltip tooltip-primary" data-tip="Not finished">
        <ExclamationCircleFill width={20} height={20} class="text-error" />
      </div>
    {/if}
  {:else if finished}
    <div class="tooltip tooltip-primary" data-tip="Stored in database">
      <DatabaseFillCheck width={20} height={20} class="text-success" />
    </div>
  {:else}
    <div class="tooltip tooltip-primary" data-tip="Stored in database">
      <DatabaseFill width={20} height={20} />
    </div>
    <div class="tooltip tooltip-primary" data-tip="Not finished">
      <ExclamationCircleFill width={20} height={20} class="text-error" />
    </div>
  {/if}
</div>
