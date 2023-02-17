<script lang="ts">
  import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table';
  import { addSortBy, addPagination, addExpandedRows } from 'svelte-headless-table/plugins';
  import { BodyRow } from 'svelte-headless-table';
  import collections from '$lib/data';
  import Status from './Status.svelte';
  import Actions from './Actions.svelte';

  const table = createTable(collections, {
    sort: addSortBy({ disableMultiSort: true }),
    expand: addExpandedRows()
  });

  const columns = table.createColumns([
    table.column({
      header: 'Date',
      accessor: 'date',
      plugins: {
        sort: { invert: true }
      }
    }),
    table.column({
      header: 'Creator',
      accessor: 'creator',
      plugins: {
        sort: { invert: true }
      }
    }),
    table.column({
      header: 'Subgarden',
      accessor: 'garden-name',
      plugins: {
        sort: { invert: true }
      }
    }),
    table.display({
      id: 'status',
      header: 'Status',
      cell: ({ row }, _) => {
        return createRender(Status, {
          row: row.original
        });
      }
    }),
    table.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }, _) => {
        return createRender(Actions, {
          row: row.original
        });
      }
    })
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);
</script>

<div class="overflow-x-auto mt-5">
<table {...$tableAttrs} class="table w-full">
  <thead>
    {#each $headerRows as headerRow (headerRow.id)}
      <Subscribe
        rowAttrs={headerRow.attrs()}
        let:rowAttrs
        rowProps={headerRow.props()}
        let:rowProps
      >
        <tr {...rowAttrs}>
          {#each headerRow.cells as cell (cell.id)}
            <Subscribe attrs={cell.attrs()} props={cell.props()} let:props let:attrs>
              <th scope="col" {...attrs}>
                <div class="flex justify-between items-center">
                  <div>
                    <span on:click={props.sort.toggle} on:keydown={props.sort.toggle}>
                      {cell.render()}
                    </span>
                    {#if props.sort.order === 'asc'}
                      ▾
                    {:else if props.sort.order === 'desc'}
                      ▴
                    {/if}
                  </div>
                </div>
              </th>
            </Subscribe>
          {/each}
        </tr>
      </Subscribe>
    {/each}
  </thead>

  <tbody class="table-group-divider" {...$tableBodyAttrs}>
    {#each $pageRows as row (row.id)}
      <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
        <tr {...rowAttrs}>
          {#each row.cells as cell (cell?.id)}
            <Subscribe attrs={cell.attrs()} let:attrs>
              <td {...attrs}>
                
                  <Render of={cell.render()} />
                
              </td>
            </Subscribe>
          {/each}
        </tr>
      </Subscribe>
    {/each}
  </tbody>
</table>
</div>