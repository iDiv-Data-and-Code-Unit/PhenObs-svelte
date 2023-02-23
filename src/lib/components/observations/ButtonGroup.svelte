<script lang="ts">
  export let choices: Array<string>;
  let value = 'no';
</script>

<div class="lg:col-span-2 bg-warning/20 rounded-xl">
  <div class={`btn-group w-full text-black flex `}>
    {#each choices as choice, index (index)}
      <button
        class="btn btn-warning grow"
        on:click|preventDefault={() => (value = choice)}
        class:btn-ghost={value !== choice}
        ><p class:font-bold={value === choice}>{choice}</p></button
      >
    {/each}
  </div>
</div>
