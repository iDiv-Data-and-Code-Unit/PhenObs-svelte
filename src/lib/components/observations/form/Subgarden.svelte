<script lang="ts">
  import { ChevronDown } from 'svelte-bootstrap-icons';

  let selectedSubgardenName: string = '';
  let selectedSubgarden: number;

  const changeHandler = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    selectedSubgardenName = target.selectedOptions[0].innerText;
    selectedSubgarden = parseInt(target.value);
  };
</script>

<button
  class="no-animation w-full btn btn-secondary  btn-outline flex gap-2 xl:gap-5 lg:py-14 py-10 content-center justify-center text-xl relative"
>
  <!-- <span class="badge badge-secondary border-0 content-center absolute bottom-2 right-2 ">Online</span> -->
  <div class="grid grid-flow-col gap-2 xl:gap-5 font-bold items-center">
    Garden
    <p class="font-normal truncate whitespace-nowrap overflow-hidden break-all">
      {selectedSubgardenName}
    </p>
    <ChevronDown width={12} height={12} class="stroke-current" />
  </div>
  <select
    name="subgardens"
    id="subgardens"
    class="absolute bottom-0 w-full h-full opacity-0 text-secondary bg-white"
    on:change={changeHandler}
  >
    <option disabled selected value />
    <option value="3" class="">Ökologie</option>
    <option value="4" class="">Wasser/Goethe/Sand/Haus</option>
    <option value="5" class="">Ökologie</option>
    <option value="6" class="">Ökologie</option>
  </select></button
>
