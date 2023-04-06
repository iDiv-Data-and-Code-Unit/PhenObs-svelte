<script lang="ts">
  import { toCamelCase } from '$lib/shared/app';
  export let label: string;
</script>

<div class="grid grid-cols-none md:grid-cols-4 gap-2 md:gap-3 lg:gap-5 mt-5 items-center">
  <label for={toCamelCase(label)} class="md:text-xl md:col-span-4 lg:col-span-1 font-medium">{label}</label>
  <slot />
</div>

