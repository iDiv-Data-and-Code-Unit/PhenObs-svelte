<script lang="ts">
  import { formatDate } from '../lib/app';
</script>

<div class="card mt-5 dark:bg-slate-800 dark:text-base xl:p-8 lg:p-6 md:p-5 sm:p-4 z-0">
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
  <button
    class="btn btn-lg btn-outline btn-warning lg:w-96 md:w-80 py-14 content-center gap-2 dark:border-0 dark:bg-slate-800"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"
      />
    </svg>
    Local obserations
  </button>
  <button
    class="btn btn-lg btn-outline btn-secondary lg:w-96 md:w-80 py-14 content-center gap-2 dark:border-0 dark:bg-slate-800"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="currentColor"
      class="bi bi-plus-circle-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
      />
    </svg>
    Add collection
  </button>
</div>
