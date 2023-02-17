<script lang="ts">
  import Table from '$lib/components/observations/Table.svelte';
  import TableHeader from '$lib/components/observations/TableHeader.svelte';
</script>

<div class="container rounded-lg border mt-5 shadow-lg md:p-10 p-5">
  <!-- TODO: Garden name as prop -->
  <TableHeader />
  <h1 class="text-3xl mt-10 font-semibold">Not saved</h1>
  <Table />
</div>
