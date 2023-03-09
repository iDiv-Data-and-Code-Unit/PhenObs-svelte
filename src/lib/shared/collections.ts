import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = '{}';
const initialValue = browser
  ? window.localStorage.getItem('collections') ?? defaultValue
  : defaultValue;

const collections = writable<Object>(JSON.parse(initialValue));

export default collections;
