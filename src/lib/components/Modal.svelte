<script lang="ts">
    export let hidden = false;
</script>

<div class="modal" class:modal-open={!hidden}>
  <div class="modal-box bg-base-100 w-96">
    <p class="prose font-semibold text-center">
      <slot />
    </p>
    <div class="modal-action justify-center mt-2">
      <button class="btn btn-sm btn-primary" on:click>Yes</button>
      <button class="btn btn-sm btn-secondary" on:click={() => (hidden = true)}>No</button>
    </div>
  </div>
</div>
