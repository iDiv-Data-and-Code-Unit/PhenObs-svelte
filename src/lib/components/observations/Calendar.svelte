<script lang="ts">
  import { formatDate } from '$lib/app';
  let dateStr: string = new Date().toISOString().split('T')[0];
  $: dateStrFormatted = formatDate(new Date(dateStr));
</script>

<button class="btn btn-secondary btn-outline flex md:gap-10 gap-5 lg:py-14 py-10 content-center justify-center text-xl relative">
  <!-- <span class="badge badge-secondary border-0 content-center absolute bottom-2 right-2 ">Online</span> -->
  <p>{dateStrFormatted}</p>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    class="bi bi-calendar2-fill"
    viewBox="0 0 16 16"
  >
    <path
      d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM2.545 3h10.91c.3 0 .545.224.545.5v1c0 .276-.244.5-.546.5H2.545C2.245 5 2 4.776 2 4.5v-1c0-.276.244-.5.545-.5z"
    />
  </svg>
  <input
    type="date"
    class="w-full absolute bottom-0 h-full opacity-0"
    bind:value={dateStr}
    required
  /></button
>
