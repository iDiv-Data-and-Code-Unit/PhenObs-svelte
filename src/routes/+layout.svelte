<script lang="ts">
  import '$lib/global.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  import Navbar from '$lib/components/Navbar.svelte';

  let status = true;
  onMount(async () => {
    window.addEventListener('online', () => (status = true));
    window.addEventListener('offline', () => (status = false));
  });
</script>

<!-- TODO: Check and display only if authenticated -->
<div class="container mx-auto h-screen">
  <div class="sm:p-5 p-2.5">
    <Navbar {status} />
    <slot />
  </div>
  {#if $page.url.pathname !== '/imprint'}
    <div class="justify-center flex py-10"><a href="/imprint">Imprint</a></div>
  {/if}
</div>
