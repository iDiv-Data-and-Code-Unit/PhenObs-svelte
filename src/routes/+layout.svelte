<script lang="ts">
  import '$lib/global.css';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import Navbar from '$lib/components/Navbar.svelte';
  import Login from '$lib/components/Login.svelte';

  let status: boolean;
  let displayLogin = true;

  onMount(async () => {
    const res = await fetch('http://127.0.0.1:8000/auth/user/', {
      credentials: 'include'
    });

    displayLogin = !res.ok;
  });
</script>

<svelte:window bind:online={status} />
{#if displayLogin}
  <Login bind:displayLogin />
{:else}
  <div class="container mx-auto h-screen">
    <div class="sm:p-5 p-2.5">
      <Navbar {status} />
      <slot />
    </div>
    {#if $page.url.pathname !== '/imprint'}
      <div class="justify-center flex py-10"><a href="/imprint">Imprint</a></div>
    {/if}
  </div>
{/if}

<svelte:head>
  <title>PhenObs</title>
</svelte:head>
