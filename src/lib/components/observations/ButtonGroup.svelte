<script lang="ts">
  export let choices: Array<string>;
  export let disabled = false;
  let value = 'no';
</script>

<div class="lg:col-span-2 md:col-span-3" >
  <div class={`btn-group w-full flex`} >
    {#each choices as choice, index (index)}
      <button
        class={`btn grow ${value !== choice ? 'btn-ghost hover:bg-warning/30 bg-warning/20' : ''}`}
        on:click|preventDefault={() => (value = choice)}
        class:btn-warning={value === choice}
        disabled={disabled}
        ><p class:font-bold={value === choice}>{choice}</p></button
      >
    {/each}
  </div>
</div>
