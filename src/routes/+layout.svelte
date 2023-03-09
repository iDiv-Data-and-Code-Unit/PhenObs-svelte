<script lang="ts">
  import '$lib/global.css';
  import { page } from '$app/stores';

  import Navbar from '$lib/components/Navbar.svelte';

  let status: boolean;
</script>

<svelte:window bind:online={status} />
<div class="container mx-auto h-screen">
  <div class="sm:p-5 p-2.5">
    <!-- TODO: Check and display only if authenticated -->
    <Navbar {status} />
    <slot />
  </div>
  {#if $page.url.pathname !== '/imprint'}
    <div class="justify-center flex py-10"><a href="/imprint">Imprint</a></div>
  {/if}
</div>
