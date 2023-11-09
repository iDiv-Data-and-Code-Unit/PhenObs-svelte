import setCookie from 'set-cookie-parser';

import { redirect, type Actions } from '@sveltejs/kit';
import gardensStore from '$lib/shared/gardens';
import userStore from '$lib/shared/user';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
  default: async ({ fetch, request, cookies }) => {
    // Get form data
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    // Send login request with CSRF token
    const res = await fetch('http://127.0.0.1:8000/auth/login/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    // If login is successful, set cookies, set garden and user info and redirect to the referrrer or home page
    if (res.status === 200 || res.status === 201 || res.status === 204) {
      const setCookies = res.headers.get('set-cookie')!.split('SameSite=Lax,');
      setCookies[0] = setCookies[0].concat('SameSite=Lax;');

      const cookiesToSet = setCookie.parse(setCookies);

      cookiesToSet.forEach((cookie: any) => {
        cookies.set(cookie.name, cookie.value, {
          path: cookie.path,
          domain: cookie.domain,
          expires: cookie.expires,
          httpOnly: cookie.httpOnly,
          secure: cookie.secure
        });
      });

      throw redirect(301, '/');
    } else {
      // Show error message
      console.log(res.body);
      throw redirect(301, '/login');
    }
  }
};

export const load: PageServerLoad = async ({ request, locals }) => {
  if (locals.user.isAuthenticated) {
    throw redirect(301, '/');
  }
};
