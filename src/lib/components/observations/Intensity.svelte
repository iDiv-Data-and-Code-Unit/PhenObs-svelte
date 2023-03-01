<script lang="ts">
  export let step: number = 5;
  export let disabled = false;
  let value = 0;
</script>

<div class="lg:col-span-2  md:col-span-3 flex gap-2 items-center ">
  <div class="w-min flex justify-between text-xs px-2 ">
    <span class="text-xl text-center font-bold">{value}%</span>
  </div>
  <input
    type="range"
    min="0"
    max="100"
    bind:value
    class={`range grow range-warning ${disabled ? '' : 'bg-warning/20'}`}
    disabled={disabled}
    {step}
  />
</div>
