<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';

  export let status = true;
  let toggleDropdown = false;
</script>

<div class="navbar rounded-lg grid grid-flow-row auto-rows-max p-1 dark:bg-slate-800 shadow-lg">
  <div class="p-1">
    <div class="justify-between flex w-full">
      <div class="dropdown md:hidden">
        <label
          tabindex="0"
          class="btn btn-ghost md:hidden"
          on:click={() => (toggleDropdown = !toggleDropdown)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            /></svg
          >
        </label>
      </div>

      <div class="flex">
        <a class="btn btn-ghost normal-case text-xl m-auto" href="/"
          >PhenObs |
          {#if status == true}
            <span class="text-secondary ml-1">Online</span>
          {:else}
            <span class="text-warning ml-1"> Offline </span>
          {/if}
        </a>
        <div class="navbar-center hidden md:flex">
          <ul class="menu menu-horizontal px-1 gap-1">
            <li><a class:active={$page.url.pathname === '/'} href="/">Home</a></li>

            <li class="lg:hidden" class:active={$page.url.pathname === '/observations'}>
              <a>Observations</a>
            </li>
            <li class="hidden lg:flex z-50">
              <div
                class="w-40 justify-center"
                class:active={$page.url.pathname.includes('/observations')}
              >
                Observations
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  ><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
                >
              </div>
              <ul class="w-40 shadow-lg dark:bg-slate-800 p-2 bg-base-100 gap-1">
                <li>
                  <a
                    class="text-warning"
                    class:active={$page.url.pathname === '/observations'}
                    href="/observations">Local</a
                  >
                </li>
                <li>
                  <a
                    class="text-secondary"
                    class:active={$page.url.pathname === '/observations/overview'}
                    href="/observations/overview">Overview</a
                  >
                </li>
              </ul>
            </li>
            <!-- TODO: Add check for admin rights -->
            <li class=""><a href="/admin">Administration</a></li>
          </ul>
        </div>
      </div>

      <div class="navbar-center hidden md:flex">
        <ul class="menu menu-horizontal px-1 gap-1">
          <li><a class:active={$page.url.pathname === '/help'} href="/help">Help</a></li>
          <li>
            <a class:active={$page.url.pathname === '/signout'} href="/signout">Sign Out</a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="md:hidden w-full p-0 m-0">
    {#if toggleDropdown}
      <ul class="menu p-1 block w-full" transition:slide|local>
        <li class=""><a class:active={$page.url.pathname === '/'} href="/">Home</a></li>
        <li class="">
          <a class:active={$page.url.pathname === '/observations'} href="/observations"
            >Observations</a
          >
        </li>
        <!-- TODO: Add check for admin rights -->
        <li class=""><a href="/admin">Administration</a></li>
        <li class=""><a class:active={$page.url.pathname === '/help'} href="/help">Help</a></li>
        <li class="">
          <a class:active={$page.url.pathname === '/signout'} href="/signout">Sign Out</a>
        </li>
      </ul>
    {/if}
  </div>
</div>
