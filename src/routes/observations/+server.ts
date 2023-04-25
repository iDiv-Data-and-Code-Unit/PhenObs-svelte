import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ServerCollectionType } from '$lib/types';

export const PUT = (async ({ cookies, fetch, request }) => {
  const data = (await request.json()) as ServerCollectionType;
  
  console.log(data);
  const res = await fetch(`http://127.0.0.1:8000/observations/${data.id}/`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': `${cookies.get('csrftoken')}`,
      Cookie: `sessionid=${cookies.get('sessionid')}`
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    const json = await res.json() as ServerCollectionType;
    return new Response(JSON.stringify(json));
  } else {
    console.log('Error', res);
    throw error(500, res.statusText);
  }
}) satisfies RequestHandler;
