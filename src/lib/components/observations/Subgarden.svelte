<script lang="ts">
  let selectedSubgardenName: string = '';
  let selectedSubgarden: number;

  const changeHandler = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    selectedSubgardenName = target.selectedOptions[0].innerText;
    selectedSubgarden = parseInt(target.value);
  };
</script>

<button
  class="w-full btn btn-secondary btn-outline flex gap-2 xl:gap-5 lg:py-14 py-10 content-center justify-center text-xl relative"
>
  <div class="grid grid-flow-col gap-2 xl:gap-5 font-bold items-center">
    Garden
    <p class="font-normal truncate whitespace-nowrap overflow-hidden break-all">
      {selectedSubgardenName}
    </p>
    <svg
      class="fill-current"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      ><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
    >
  </div>
  <select
    name="subgardens"
    id="subgardens"
    class="absolute bottom-0 w-full h-full opacity-0"
    on:change={changeHandler}
  >
    <option disabled selected value />
    <option value="3" class="">Ökologie</option>
    <option value="4" class="">Wasser/Goethe/Sand/Haus</option>
    <option value="5" class="">Ökologie</option>
    <option value="6" class="">Ökologie</option>
  </select></button
>
