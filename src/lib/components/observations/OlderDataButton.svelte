<script lang="ts">
  export let id: string;
  export let title: string;
</script>

<label for={id} class="btn btn-outline text-lg"><slot name="button" /></label>

<input type="checkbox" {id} class="modal-toggle" />
<label for={id} class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <label for={id} class="btn btn-sm btn-ghost btn-circle absolute right-2 top-2">✕</label>
    <h3 class="text-xl font-bold mb-5">{title}</h3>

    <slot />

    <div class="modal-action">
      <slot name="actions">
        <label for={id} class="btn text-white">Close</label>
        <label for={id} class="btn btn-success text-white">Save changes</label>
      </slot>
    </div>
  </label>
</label>
