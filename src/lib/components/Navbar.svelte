<script lang="ts">
  import NavbarBrand from './nav/NavbarBrand.svelte';
  import ObservationsDropdown from './nav/ObservationsDropdown.svelte';

  export let homeActive = true;
</script>

<nav class="navbar navbar-expand-md navbar-light bg-light nav-shadow">
  <div class="container">
    <!-- TODO: Add store for status Online or Offline -->
    <NavbarBrand />

    <div class="collapse navbar-collapse justify-content-between" id="navbarContent">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" class:active={homeActive} aria-current="page" href="/">Home</a>
        </li>
        <ObservationsDropdown />
        <!-- TODO: Check and display if admin -->
        <li class="nav-item">
          <a class="nav-link" id="admin" href="/admin">Administration</a>
        </li>
      </ul>

      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" id="help" href="/help">Help</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" id="signout" href="/">Sign Out</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
