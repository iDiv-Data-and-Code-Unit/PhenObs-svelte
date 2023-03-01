<script lang="ts">
  let sortNumeric = false;
  let selectedPlantName: string = '';
  let selectedPlant: number;

  const changeHandler = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    selectedPlantName = target.selectedOptions[0].innerText;
    selectedPlant = parseInt(target.value);
  };
</script>

<div class="lg:col-span-2 md:col-span-3 gap-1 flex">
  <button class="btn btn-warning" on:click|preventDefault={() => (sortNumeric = !sortNumeric)}>
    {#if sortNumeric}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-sort-alpha-down"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"
        />
        <path
          d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"
        />
      </svg>
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-sort-numeric-down"
        viewBox="0 0 16 16"
      >
        <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z" />
        <path
          fill-rule="evenodd"
          d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"
        />
        <path
          d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"
        />
      </svg>
    {/if}
  </button>
  <div class="btn p-0 text-xl btn-warning gap-1 relative grow no-animation">
    <div class="grid grid-flow-col gap-2 xl:gap-5 font-bold items-center w-full">
      <p
        class="font-semibold truncate whitespace-nowrap overflow-hidden break-all relative text-black text-xl"
      >
        {selectedPlantName}
      </p>
      <svg
        class="items-center absolute right-5"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        ><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
      >
    </div>
    <select
      id="plant"
      class="col-span-2 w-full h-full opacity-1 absolute bottom-0 opacity-0 text-black"
      on:change={changeHandler}
    >
      <option disabled selected value />
      <option value="1">Plant 1</option>
      <option value="2">Plant 2</option>
      <option value="3">Plant 3</option>
      <option value="4">Plant 4</option>
      <option value="5">Plant 5</option>
      <option value="6">Plant 6</option>
    </select>
  </div>
</div>
