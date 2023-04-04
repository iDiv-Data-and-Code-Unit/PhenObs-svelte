export const formatDate = (dateToFormat: Date, includeYear = true): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: includeYear ? 'numeric' : undefined
  };

  return dateToFormat.toLocaleString('en-US', options);
};

// https://stackoverflow.com/questions/24916090/convert-sentence-case-to-camelcase-in-javascript
export const toCamelCase = (text: string) =>
  text.toLowerCase().replace(/\s+(.)/g, (_, group) => group.toUpperCase());

// https://stackoverflow.com/questions/52963900/convert-different-strings-to-snake-case-in-javascript
export const toSnakeCase = (text: string) => {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_');
};

export const mapped: { [key: string]: string } = {
  no: 'no',
  yes: 'y',
  unsure: 'u',
  missed: 'm',
  m: 'missed',
  u: 'unsure',
  y: 'yes'
};

export const getButtonValue = (value: string | number | string[], type: string) => {
  return type === 'group' ? mapped[value as string] : value;
};

export const choices = ['yes', 'unsure', 'missed', 'no'];

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
    key: ''
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
