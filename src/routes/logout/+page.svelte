<script lang="ts">
  import { browser } from '$app/environment';

  const signOut = async () => {
    const res = await fetch('http://127.0.0.1:8000/auth/logout/', {
      method: 'POST'
    });
  };
</script>

<form method="post">
  <div class="mx-auto my-40 grid gap-2 max-w-max md:gap-5">
    <h1 class="text-4xl md:text-5xl font-bold">Sign Out</h1>
    <p class="text-md sm:text-xl md:text-3xl">Are you sure you want to sign out?</p>
    <button class="btn btn-error" type="submit">Sign Out</button>
  </div>
</form>
