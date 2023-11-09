import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
  default: async ({ cookies, fetch, locals }) => {
    const res = await fetch('http://127.0.0.1:8000/auth/logout/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': cookies.get('csrftoken'),
        Cookie: `sessionid=${cookies.get('sessionid')}`
      }
    });

    if (res.ok) {
      cookies.delete('sessionid');
      cookies.delete('csrftoken');
      locals.user = {
        id: -1,
        isAuthenticated: false,
        username: '',
        email: ''
      };
    }

    throw redirect(301, '/login');
  }
} satisfies Actions;
