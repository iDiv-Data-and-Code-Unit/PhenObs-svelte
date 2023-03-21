import collectionsStore from '$lib/shared/collections';
import type { StoredCollectionType } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, fetch, cookies }) => {
  const id = parseInt(params.slug);
  let data: StoredCollectionType | null = null;

  //TODO: get stored collection or request from DB and insert into localStorage

  collectionsStore.update((items: string) => {
    const collections: StoredCollectionType[] = JSON.parse(items);
    const index = collections.findIndex((item) => item.id === id);

    if (index !== -1) {
      data = collections[index];
    }

    return items;
  });

  const res = await fetch(`http://127.0.0.1:8000/observations/${id}/`);

  if (res.ok) {
    const data = await res.json();
    return data;
  }

  return { success: false };
}) satisfies LayoutServerLoad;
