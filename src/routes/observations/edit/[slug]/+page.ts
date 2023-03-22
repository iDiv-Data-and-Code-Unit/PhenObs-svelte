import type { PageLoad } from './$types';

export const load = (({ params }) => {
  const id = parseInt(params.slug);
  return { id: id };
}) satisfies PageLoad;
