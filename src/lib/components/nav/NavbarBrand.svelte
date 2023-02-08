<script lang="ts">
  export let online = true;
</script>

<button
  class="navbar-toggler navbar-toggler-right"
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarContent"
  aria-controls="navbarContent"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span class="navbar-toggler-icon" />
</button>

<a id="brand" class="navbar-brand" href="/"
  >PhenObs |
  <span class:text-primary={online} class:text-offline={!online} id="status"
    >{online ? 'Online' : 'Offline'}</span
  ></a
>
