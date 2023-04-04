<script lang="ts">
  import { scale } from 'svelte/transition';
  import { toSnakeCase } from '$lib/shared/app';
  import type { RecordType } from '$lib/types';
  import { createEventDispatcher } from 'svelte';

  import MultiselectButton from './MultiselectButton.svelte';

  export let record: RecordType;
  export let key: string;
  export let disabled = false;
  let maintenance: { value: boolean; title: string }[];

  const dispatch = createEventDispatcher<{
    select: { value: string[]; key: string; previous: boolean };
  }>();

  $: maintenance = [
    { value: record.maintenance.includes('cut_total'), title: 'Cut total' },
    { value: record.maintenance.includes('cut_partly'), title: 'Cut partly' },
    { value: record.maintenance.includes('covered_natural'), title: 'Covered natural' },
    { value: record.maintenance.includes('covered_artificial'), title: 'Covered artificial' },
    { value: record.maintenance.includes('transplanted'), title: 'Transplanted' },
    { value: record.maintenance.includes('removed'), title: 'Removed' }
  ];

  const handleToggle = (e: CustomEvent<{ value: boolean; title: string }>) => {
    const { value, title } = e.detail;
    const index = maintenance.findIndex((item) => item.title === title);
    maintenance[index].value = index !== -1 ? value : maintenance[index].value;

    dispatch('select', {
      value: maintenance.filter((item) => item.value).map((item) => toSnakeCase(item.title)),
      key,
      previous: false
    });
  };
</script>

<div
  class="lg:col-span-2 md:col-span-3 flex flex-wrap gap-2 items-center"
  transition:scale={{ duration: 300 }}
>
  {#each maintenance as { value, title } (title)}
    <MultiselectButton {disabled} {value} {title} on:toggle={handleToggle} />
  {/each}
</div>
