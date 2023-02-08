<script lang="ts">
  export let local = false;
  export let overview = false;
</script>

<!-- * Smaller screen sizes -->
<li class="nav-item d-xl-none">
  <a class="nav-link" href="/">Observations</a>
</li>

<!-- * Bigger screen sizes  -->
<!-- * Includes a dropdown and a lint to the Overviews page  -->
<li class="nav-item dropdown d-xl-block d-none">
  <a
    class="nav-link dropdown-toggle"
    data-bs-toggle="dropdown"
    role="button"
    aria-expanded="false"
    href="/">Observations</a
  >
  <div class="dropdown-menu">
    <a class="dropdown-item text-offline" class:active={local} href="/observations">Local</a>
    <a class="dropdown-item text-primary" class:active={overview} href="/observations/overview">
      Overview</a
    >
  </div>
</li>
