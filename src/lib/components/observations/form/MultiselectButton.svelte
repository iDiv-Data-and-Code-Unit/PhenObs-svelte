<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let disabled = false;
  export let value: boolean = false;
  export let title: string;

  const dispatch = createEventDispatcher<{ toggle: { value: boolean; title: string } }>();
</script>

<button
  class={`btn ${!value ? 'bg-warning/20 hover:bg-warning/40 btn-ghost' : 'btn-warning'}`}
  on:click|preventDefault={() => {
    value = !value;
    dispatch('toggle', { value, title });
  }}
  {disabled}
  >{title}
</button>
