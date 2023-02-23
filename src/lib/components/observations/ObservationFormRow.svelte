<script lang="ts">
  export let label: string;
</script>

<div class="grid grid-cols-none lg:grid-cols-4 lg:gap-4 gap-2 mt-5 w-full items-center">
  <label for="plant" class="md:text-xl">{label}</label>
  <slot />
</div>
