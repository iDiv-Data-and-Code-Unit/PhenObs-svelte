import type { CollectionType, StoredCollectionType } from '$lib/types';
import collectionsStore from '$lib/shared/collections';

/**
 * Returns a formatted string of a date object.
 *
 * @param {Date} dateToFormat - The date object to format.
 * @param {boolean} includeYear - Whether or not to include the year in the formatted string. Default is true.
 * @returns {string} - The formatted string of the date.
 */
export const formatDate = (dateToFormat: Date, includeYear = true): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: includeYear ? 'numeric' : undefined
  };

  return dateToFormat.toLocaleString('en-US', options);
};

/**
 * Fetches a collection from the server or returns an existing collection from the local storage .
 *
 * @param {number} id - The ID of the collection to fetch.
 * @returns {StoredCollectionType|null} - Fetched collection or `null` if the collection does not exist.
 */
export const getCollection = async (id: number) => {
  let col: StoredCollectionType | null = collectionsStore.exists(id);

  if (!col || !('records' in col && col)) {
    collectionsStore.remove(id);

    const res = await fetch(`http://127.0.0.1:8000/observations/${id}/`, {
      credentials: 'include'
    });

    if (res.ok) {
      const json = await res.json();
      collectionsStore.add(json);
    }
  }

  return collectionsStore.exists(id);
};

/**
 * Updates the date of a stored collection and fetches the previous collection, if it exists, based on the new date.
 *
 * @param {CustomEvent<Date>} e - The event object containing the new date value.
 * @param {StoredCollectionType|null} collection - The stored collection to update the date for.
 * @param {StoredCollectionType|null} previousCollection - The latest finished collection in the same garden for the given colleciton with the new date, if it exists.
 * @returns {[StoredCollectionType|null, StoredCollectionType|null]} - A tuple of the updated collection and the previous collection, if it exists.
 */
export const dateChangeHandler = async (
  e: CustomEvent<Date>,
  collection: StoredCollectionType | null,
  previousCollection: StoredCollectionType | null
) => {
  if (collection) {
    collection.date = e.detail.toISOString().split('T')[0];
    collectionsStore.edit(collection);

    const res = await fetch(
      `http://127.0.0.1:8000/observations/${collection?.id}/?date=${e.detail.getTime() / 1000}`,
      {
        credentials: 'include'
      }
    );

    if (res.ok) {
      const json: CollectionType = await res.json();
      collection.prev_collection = json.id;
      collectionsStore.edit(collection);
      previousCollection = await getCollection(collection['prev_collection']);
    } else if (res.status === 404) {
      collection.prev_collection = null;
      collectionsStore.edit(collection);
      previousCollection = null;
    } else {
      console.log('Error', res);
    }
  }

  return [collection, previousCollection];
};

/**
 * Converts a string in sentence case to camelCase.
 *
 * @param {string} text - The sentence case string to convert to camelCase.
 * @returns {string} - The camelCase version of the input string.
 *
 * @see {@link https://stackoverflow.com/questions/24916090/convert-sentence-case-to-camelcase-in-javascript}
 */
export const toCamelCase = (text: string) =>
  text.toLowerCase().replace(/\s+(.)/g, (_, group) => group.toUpperCase());

/**
 * Converts a string to snake_case.
 *
 * @param {string} text - The string to convert to snake_case.
 * @returns {string} - The snake_case version of the input string.
 *
 * @see {@link https://stackoverflow.com/questions/52963900/convert-different-strings-to-snake-case-in-javascript}
 */
export const toSnakeCase = (text: string) => {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_');
};

/**
 * An object mapping locally stored keys to their corresponding human readable names.
 *
 * @type {{ [key: string]: string }}
 */
export const mapped: { [key: string]: string } = {
  no: 'no',
  yes: 'y',
  unsure: 'u',
  missed: 'm',
  m: 'missed',
  u: 'unsure',
  y: 'yes'
};

/**
 * Maps the value of a button based on its type and value.
 *
 * @param {string | number | string[]} value - The value of the button.
 * @param {string} type - The type of the button. Is one of ['group', 'multiselect', 'intensity', 'textarea'].
 * @returns {string | number} - The mapped value of the button.
 */
export const getButtonValue = (value: string | number | string[], type: string) => {
  return type === 'group' ? mapped[value as string] : value === null ? 0 : value;
};

/**
 * An array of available choices for a 'group' components and values.
 *
 * @type {string[]}
 */
export const choices = ['yes', 'unsure', 'missed', 'no'];

/**
 * An array of details to be recorded per plant.
 *
 * @type {object[]}
 */
export const fields = [
  {
    type: 'group',
    name: 'Initial vegetative growth',
    key: 'initial_vegetative_growth',
    related: ''
  },
  {
    type: 'group',
    name: 'Young leaves unfolding',
    key: 'young_leaves_unfolding',
    related: ''
  },
  {
    type: 'group',
    name: 'Flowers opening',
    key: 'flowers_open',
    related: ''
  },
  {
    type: 'group',
    name: 'Peak flowering',
    key: 'peak_flowering',
    related: ''
  },
  {
    type: 'intensity',
    name: 'Flowering intensity',
    key: 'flowering_intensity',
    related: 'flowers_open'
  },
  {
    type: 'group',
    name: 'Ripe fruits',
    key: 'ripe_fruits',
    related: ''
  },
  {
    type: 'group',
    name: 'Senescence',
    key: 'senescence',
    related: ''
  },
  {
    type: 'intensity',
    name: 'Senescence intensity',
    related: 'senescence',
    key: 'senescence_intensity'
  },
  {
    type: 'multiselect',
    name: 'Maintenance',
    key: 'maintenance',
    related: ''
  },
  {
    type: 'textarea',
    name: 'Remarks',
    key: 'remarks',
    related: ''
  }
];
