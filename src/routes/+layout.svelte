<script lang="ts">
  import { page } from '$app/stores';

  import '$lib/global.css';
  import { loading } from '$lib/shared/app';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data;

  let status: boolean;
</script>

<svelte:window bind:online={status} />
{#if $loading}
  <div class="flex w-screen h-screen justify-center items-center bg-white/90 fixed z-50">
    <progress class="progress w-56" />
  </div>
{/if}

<div class="container mx-auto h-screen flex flex-col items-center">
  <div class="sm:p-5 p-2.5 grow w-full">
    {#if data.user.isAuthenticated}
      <Navbar {status} />
    {/if}
    <slot />
  </div>
  {#if $page.url.pathname !== '/imprint'}
    <div class="justify-center flex py-10"><a href="/imprint">Imprint</a></div>
  {/if}
</div>

<svelte:head>
  <title>PhenObs</title>
</svelte:head>
