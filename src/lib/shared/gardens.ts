import { browser } from '$app/environment';
import { writable } from 'svelte/store';

import type { GardensType, GardenType } from '$lib/types';

const defaultValue: GardensType | null = null;
const initialValue = browser
  ? JSON.parse(window.localStorage.getItem('gardens') || 'null') ?? defaultValue
  : defaultValue;

const gardens = writable<GardensType | null>(initialValue);

const gardensStore = {
  subscribe: gardens.subscribe,
  set: (data: GardensType | null) => {
    gardens.set(data);
    window.localStorage.setItem('gardens', JSON.stringify(data));
  },
  update: gardens.update,
  get: (id: number) => {
    let result: GardenType | null = null;

    gardens.update((items) => {
      items?.subgardens.find((item) => {
        if (item.id === id) {
          result = item;
        }
      });
      return items;
    });

    return result;
  },
  logout: () => {
    gardens.set(null);
    window.localStorage.removeItem('gardens');
  }
};

export default gardensStore;