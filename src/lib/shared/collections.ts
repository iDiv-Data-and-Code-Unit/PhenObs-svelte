import { writable } from 'svelte/store';

import { browser } from '$app/environment';
import type { CollectionType, RecordType, StoredCollectionType } from '$lib/types';

const defaultValue: StoredCollectionType[] = [];
const initialValue = browser
  ? JSON.parse(window.localStorage.getItem('collections') || '[]') ?? defaultValue
  : defaultValue;

const collections = writable<StoredCollectionType[]>(initialValue);

const collectionsStore = {
  subscribe: collections.subscribe,
  set: (data: StoredCollectionType[]) => {
    collections.set(data);
    window.localStorage.setItem('collections', JSON.stringify(data));
  },
  update: collections.update,
  edit: (data: StoredCollectionType) => {
    let done = false;
    collections.update((values) => {
      const index = values.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        values[index] = data;
        done = true;
      }
      window.localStorage.setItem('collections', JSON.stringify(values));
      return values;
    });

    return done;
  },
  exists: (id: number) => {
    let result: StoredCollectionType | null = null;
    collections.update((items) => {
      const index = items.findIndex((item) => item.id === id);
      if (index !== -1) {
        result = items[index];
      }
      return items;
    });
    return result;
  },
  add: (data: CollectionType) => {
    collections.update((values) => {
      values = [...values, { ...data, edited: false, uploaded: data.finished }];
      window.localStorage.setItem('collections', JSON.stringify(values));
      return values;
    });
  },
  remove: (id: number) => {
    let done = false;

    collections.update((values) => {
      const index = values.findIndex((item) => item.id === id);
      if (index !== -1) {
        values.splice(index, 1);
        done = true;
      }
      window.localStorage.setItem('collections', JSON.stringify(values));
      return values;
    });

    return done;
  },
  getAndUpdateCollections: (data: CollectionType[]) => {
    let local: StoredCollectionType[] = [];
    let database: CollectionType[] = [];

    collections.update((values) => {
      for (let i = 0; i < data.length; i++) {
        const collection = data[i];
        const index = values.findIndex((item) => item.id === collection.id);
        // Update stored collections which are unifinished or finished but not edited
        if (index !== -1 && (!values[index].edited || !values[index].finished)) {
          if (collection.finished) {
            values[index] = { ...collection, edited: false, uploaded: true };
          }
        } else {
          database.push(collection);
        }
      }
      window.localStorage.setItem('collections', JSON.stringify(values));

      local = values;
      return values;
    });

    return {
      local,
      database
    };
  },
  editRecord: (data: RecordType) => {
    collections.update((items) => {
      const collectionIndex = items.findIndex((item) => item.id === data.collection);
      const collection = items[collectionIndex];
      const recordIndex = collection?.records.findIndex((item) => item.id === data.id);
      items[collectionIndex].records[recordIndex] = data;
      items[collectionIndex].edited = true;

      window.localStorage.setItem('collections', JSON.stringify(items));
      return items;
    });
  }
};

export default collectionsStore;
