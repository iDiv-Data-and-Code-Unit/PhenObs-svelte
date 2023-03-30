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

export const choices = ['yes', 'unsure', 'missed', 'no'];

export const fields = [
  {
    type: 'group',
    name: 'Initial vegetative growth'
  },
  {
    type: 'group',
    name: 'Young leaves unfolding'
  },
  {
    type: 'group',
    name: 'Flowers opening',
    key: 'flowers_open'
  },
  {
    type: 'group',
    name: 'Peak flowering'
  },
  {
    type: 'intensity',
    name: 'Flowering intensity',
    related: 'flowers_open'
  },
  {
    type: 'group',
    name: 'Ripe fruits'
  },
  {
    type: 'group',
    name: 'Senescence'
  },
  {
    type: 'intensity',
    name: 'Senescence intensity',
    related: 'senescence'
  },
  {
    type: 'multiselect',
    name: 'Maintenance'
  },
  {
    type: 'textarea',
    name: 'Remarks'
  }
];
