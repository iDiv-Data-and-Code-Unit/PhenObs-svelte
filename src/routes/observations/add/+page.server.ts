import type { Actions } from '@sveltejs/kit';

export const actions = {
  default: async ({ cookies, fetch, request }) => {
    const data = await request.formData();

    const res = await fetch('http://127.0.0.1:8000/observations/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': `${cookies.get('csrftoken')}`,
        Cookie: `sessionid=${cookies.get('sessionid')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        garden: data.get('garden'),
        creator: data.get('creator')
      })
    });

    if (res.ok) {
      const json = await res.json();
      return JSON.stringify(json);
    }

    return { success: res.ok };
  }
} satisfies Actions;
