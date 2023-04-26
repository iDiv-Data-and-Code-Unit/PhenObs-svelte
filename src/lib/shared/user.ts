import { browser } from '$app/environment';
import { writable } from 'svelte/store';

import type { UserType } from '$lib/types';

const defaultValue: UserType | null = null;
const initialValue = browser
  ? JSON.parse(window.localStorage.getItem('user') || 'null') ?? defaultValue
  : defaultValue;

const user = writable<UserType | null>(initialValue);

const userStore = {
  subscribe: user.subscribe,
  set: (data: UserType | null) => {
    user.set(data);
    window.localStorage.setItem('user', JSON.stringify(data));
  },
  update: user.update,
  logout: () => {
    user.set(null);
    window.localStorage.removeItem('user');
  }
};

export default userStore;
