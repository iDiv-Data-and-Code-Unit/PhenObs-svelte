<script lang="ts">
  import '$lib/global.css';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import Navbar from '$lib/components/Navbar.svelte';
  import Login from '$lib/components/Login.svelte';

  let loading = true;
  let status: boolean;
  let displayLogin = false;

  onMount(async () => {
    loading = true;

    try {
      const res = await fetch('http://127.0.0.1:8000/auth/user/', {
        credentials: 'include'
      });
      displayLogin = !res.ok;
    } catch (error) {
      console.log(error);
      displayLogin = true;
    }

    loading = false;
  });
</script>

<svelte:window bind:online={status} />
{#if !loading}
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
{:else}
  <div class="flex w-screen h-screen justify-center items-center">
    <progress class="progress w-56" />
  </div>
{/if}

<svelte:head>
  <title>PhenObs</title>
</svelte:head>
