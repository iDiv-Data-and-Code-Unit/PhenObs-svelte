<script lang="ts">
  import { ListCheck, PlusCircleFill } from 'svelte-bootstrap-icons';
  import gardens from '$lib/shared/gardens';
  import user from '$lib/shared/user';
  import { formatDate } from '$lib/shared/app';
  import type { GardenType } from '$lib/types';

  let subgarden: GardenType | null = null;
  let subgardenName: string | null = null;
  let main_garden: string | null = null;

  if ($user && $gardens) {
    main_garden = $gardens.main_garden.name;
    subgarden = gardens.get($user.subgarden);
    subgardenName = subgarden !== null ? (subgarden as GardenType).name : '';
  }
</script>

<div
  class="card mt-5 dark:bg-white dark:bg-opacity-10 dark:text-base xl:p-8 lg:p-6 md:p-5 sm:p-4 z-0"
>
  <div class="card-body">
    <h1 class="card-title xl:text-7xl md:text-6xl text-4xl flex-wrap">
      <strong>{main_garden}:</strong>
      {subgardenName}
    </h1>
    <h2 class="xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl">
      {formatDate(new Date())}
    </h2>
    <div class="card-actions justify-end">
      <h3 class="xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-2xl">{$user?.username}</h3>
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
