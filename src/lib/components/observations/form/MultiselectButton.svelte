<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Square, CheckSquareFill } from 'svelte-bootstrap-icons';

  export let disabled = false;
  export let value: boolean = false;
  export let title: string;

  const dispatch = createEventDispatcher<{ toggle: { value: boolean; title: string } }>();
</script>

<button
  class={`btn flex shrink gap-3 hover:bg-warning/20  btn-ghost justify-start ${
    !value ? 'text-black/50' : 'border-2 text-black font-medium border-warning'
  }`}
  on:click|preventDefault={() => {
    value = !value;
    dispatch('toggle', { value, title });
  }}
  {disabled}
>
  {#if !value}
    <Square width={20} height={20} />
  {:else}
    <CheckSquareFill width={20} height={20} />
  {/if}
  {title}
</button>
