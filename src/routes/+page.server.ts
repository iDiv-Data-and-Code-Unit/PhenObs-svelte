import type { GardensType } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const gardens = await fetch(`http://127.0.0.1:8000/gardens/`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': cookies.get('csrftoken'),
      Cookie: `sessionid=${cookies.get('sessionid')}`
    }
  });

  let gardensObject: GardensType = {
    userSubgarden: -1,
    main_garden: {
      id: -1,
      name: ''
    },
    subgardens: []
  };

  if (gardens.ok) {
    const json = await gardens.json();

    gardensObject = {
      userSubgarden: json.user.subgarden,
      main_garden: json.main_garden,
      subgardens: json.subgardens
    };
  }

  return {
    gardens: gardensObject
  };
};
