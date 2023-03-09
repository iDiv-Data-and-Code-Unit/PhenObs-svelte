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
