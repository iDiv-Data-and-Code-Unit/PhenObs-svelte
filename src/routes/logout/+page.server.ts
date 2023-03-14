import type { Actions } from '@sveltejs/kit';

export const actions = {
  default: async ({ cookies, fetch }) => {
    const res = await fetch('http://127.0.0.1:8000/auth/logout/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': `${cookies.get('csrftoken')}`,
        Cookie: `sessionid=${cookies.get('sessionid')}`
      }
    });

    if (res.ok) {
      cookies.delete('sessionid');
    }

    return { success: res.ok };
  }
} satisfies Actions;
