<script lang="ts">
  import Table from '$lib/components/observations/Table.svelte';
  import TableHeader from '$lib/components/observations/TableHeader.svelte';
</script>

<div class="container rounded-lg mt-5 shadow-lg md:p-10 p-5 dark:bg-slate-800">
  <!-- TODO: Garden name as prop -->
  <TableHeader />
  <h1 class="text-3xl mt-10 font-semibold">Not saved</h1>
  <Table name="notsaved" />
  <h1 class="text-3xl font-semibold">Saved</h1>
  <Table name="saved" />
</div>
