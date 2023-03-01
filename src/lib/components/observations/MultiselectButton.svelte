<script lang="ts">
  export let disabled = false;
  export let value: boolean = false;
  export let title: string;
</script>

<button
  class={`btn ${!value ? 'bg-warning/20 hover:bg-warning/40 btn-ghost' : 'btn-warning'}`}
  on:click|preventDefault={() => (value = !value)}
  disabled={disabled}
  >{title}
</button>
