<script lang="ts">
  import { ListCheck, PlusCircleFill } from 'svelte-bootstrap-icons';

  import { formatDate } from '../lib/shared/app';
</script>

<div
  class="card mt-5 dark:bg-white dark:bg-opacity-10 dark:text-base xl:p-8 lg:p-6 md:p-5 sm:p-4 z-0"
>
  <div class="card-body">
    <h1 class="card-title xl:text-7xl md:text-6xl text-4xl flex-wrap">
      <!-- TODO: dynamically get Garden: Subgarden name -->
      <strong>Jena:</strong> Ökologie
    </h1>
    <h2 class="xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl">
      {formatDate(new Date())}
    </h2>
    <div class="card-actions justify-end">
      <!-- TODO: dynamically get logged in user's username -->
      <h3 class="xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl">admin</h3>
    </div>
  </div>
</div>

<div
  class="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-none md:grid-flow-col md:auto-cols-min gap-3"
>
  <a
    class="btn btn-lg btn-outline btn-warning lg:w-96 md:w-80 py-14 content-center gap-2 dark:border-0 dark:bg-white dark:bg-opacity-10"
    href="/observations"
  >
    <ListCheck width={18} height={18} />
    Local obserations
  </a>
  <a
    class="btn btn-lg btn-outline btn-secondary lg:w-96 md:w-80 py-14 content-center gap-2 dark:border-0 dark:bg-white dark:bg-opacity-10"
    href="/observations/add"
  >
    <PlusCircleFill width={18} height={18} />
    Add collection
  </a>
</div>

<svelte:head>
  <title>PhenObs | Home</title>
</svelte:head>
