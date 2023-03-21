<script lang="ts">
  import { goto } from '$app/navigation';
  import imgTransparent from '$lib/assets/PhenObs_Logo_Transparent.png'
  import imgWhite from '$lib/assets/PhenObs_Logo_Transparent_White.png'

  let username: string = 'user';
  let password: string = 'QazxswedC123!';
  export let displayLogin;

  async function login() {
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (response.ok) {
        displayLogin = false;
        goto('/');
      } else {
        // Error logging in - handle error here
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
</script>

<div class="container">
  <div class="hero min-h-screen">
    <div class="hero-content flex-col lg:flex-row lg:gap-16">
      <div class="text-center lg:text-left">
        <img
          src={imgTransparent}
          alt="PhenObs Logo"
          class="w-48 md:w-60 lg:w-80 dark:hidden"
        />
        <img
          src={imgWhite}
          alt="PhenObs Logo"
          class="w-48 md:w-60 lg:w-80 dark:block hidden"
        />
      </div>
      <div class="card w-full max-w-sm shadow-2xl bg-white/5">
        <div class="card-body">
          <div class="form-control w-64 md:w-72 lg:w-80">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              class="input input-bordered"
              name="username"
              id="username"
              bind:value={username}
            />
          </div>
          <div class="form-control w-64 md:w-72 lg:w-80">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              name="password"
              id="password"
              bind:value={password}
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-secondary" on:click={login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
