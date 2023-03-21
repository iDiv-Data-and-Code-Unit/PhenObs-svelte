import { writable } from 'svelte/store';

import { browser } from '$app/environment';
import type { CollectionType, StoredCollectionType } from '$lib/types';

const defaultValue = '[]';
const initialValue = browser
  ? window.localStorage.getItem('collections') ?? defaultValue
  : defaultValue;

const collections = writable<string>(initialValue);

const collectionsStore = {
  subscribe: collections.subscribe,
  set: (data: CollectionType[]) => {
    const stringValue = JSON.stringify(data);
    collections.set(stringValue);
    window.localStorage.setItem('collections', stringValue);
  },
  update: collections.update,
  edit: (data: StoredCollectionType) => {
    let storedCollections: StoredCollectionType[] = [];

    collections.update((values) => {
      storedCollections = JSON.parse(values);
      const index = storedCollections.findIndex((item) => item.id === data.id);
      storedCollections[index] = data;

      const updatedCollections = JSON.stringify(storedCollections);
      window.localStorage.setItem('collections', updatedCollections);
      return updatedCollections;
    });

    return storedCollections;
  },
  add: (data: CollectionType) => {
    let storedCollections: StoredCollectionType[] = [];

    collections.update((values) => {
      storedCollections = JSON.parse(values);
      const updatedCollections = JSON.stringify([
        ...storedCollections,
        { data, edited: false, uploaded: true }
      ]);
      window.localStorage.setItem('collections', updatedCollections);
      return updatedCollections;
    });

    return storedCollections;
  },
  remove: (data: StoredCollectionType) => {
    let storedCollections: StoredCollectionType[] = [];

    collections.update((values) => {
      storedCollections = JSON.parse(values);
      const filteredCollections = storedCollections.filter((item) => item.id !== data.id);
      const updatedCollections = JSON.stringify(filteredCollections);
      window.localStorage.setItem('collections', updatedCollections);
      return updatedCollections;
    });

    return storedCollections;
  },
  getAndUpdateCollections: (data: StoredCollectionType[]) => {
    let storedCollections: StoredCollectionType[] = [];

    collections.update((values) => {
      let storedCollections = JSON.parse(values);

      for (let i = 0; i < data.length; i++) {
        const collection = data[i];

        const index = storedCollections.findIndex(
          (item: StoredCollectionType) => item.id === collection.id
        );

        // Update stored collections which are unifinished or finished but not edited
        if (
          index !== -1 &&
          (!storedCollections[index].edited || !storedCollections[index].finished)
        ) {
          storedCollections[index] = { ...collection, edited: false, uploaded: true };
          data.splice(i, 1);
        }
      }

      const updatedCollections = JSON.stringify(storedCollections);
      window.localStorage.setItem('collections', updatedCollections);
      return updatedCollections;
    });

    return {
      local: storedCollections,
      database: data
    };
  }
};

export default collectionsStore;
