<script lang="ts">
  import { DatabaseFill, PlusCircleFill } from 'svelte-bootstrap-icons';

  export let loading = false;
</script>

<div class="flex flex-wrap justify-between items-center gap-2">
  <h1 class="text-4xl font-semibold my-2"><span class="break-all">Jena</span> collections</h1>
  <div class="flex gap-3 my-2">
    <button class="btn btn-secondary btn-outline gap-2" class:loading on:click|preventDefault>
      <DatabaseFill class={`${loading ? 'hidden' : ''}`} />
      <span class="hidden md:block ">{loading ? 'Loading' : 'Get collections'}</span></button
    >
    <a class="btn btn-secondary btn-outline gap-2" href="/observations/add">
      <PlusCircleFill />
      <span class="hidden md:block">Add collection</span></a
    >
  </div>
</div>
