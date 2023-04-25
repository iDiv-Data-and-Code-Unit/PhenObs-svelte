<script lang="ts">
  import { ListNested, ChevronDown } from 'svelte-bootstrap-icons';

  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';

  export let status = true;
  let toggleDropdown = false;
</script>

<div
  class="navbar rounded-lg grid grid-flow-row auto-rows-max p-1 dark:bg-white dark:bg-opacity-10 shadow-lg"
>
  <div class="p-1">
    <div class="justify-between flex w-full">
      <div class="dropdown md:hidden">
        <label
          tabindex="0"
          class="btn btn-ghost md:hidden"
          on:click={() => (toggleDropdown = !toggleDropdown)}
        >
          <ListNested width={24} height={24} class="h-5 w-5 stroke-current" />
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
              <a href="/observations">Observations</a>
            </li>
            <li class="hidden lg:flex z-30">
              <div
                class="w-40 justify-center"
                class:active={$page.url.pathname.includes('/observations')}
              >
                Observations
                <ChevronDown width={12} height={12} class="stroke-current" />
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
            <a class:active={$page.url.pathname === '/logout'} href="/logout">Sign Out</a>
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
          <a class:active={$page.url.pathname === '/logout'} href="/logout">Sign Out</a>
        </li>
      </ul>
    {/if}
  </div>
</div>
