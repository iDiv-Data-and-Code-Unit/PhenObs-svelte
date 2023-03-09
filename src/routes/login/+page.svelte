<script lang="ts">
  import { onMount } from 'svelte';

  let username: string;
  let password: string;

  const logIn = async () => {
    const request = await fetch('http://localhost:8000/auth/login/', {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await request.json();
    console.log(data);
  };
</script>

<div class="container">
  <div class="hero min-h-screen">
    <div class="hero-content flex-col lg:flex-row lg:gap-16">
      <div class="text-center lg:text-left">
        <img
          src="PhenObs_Logo_Transparent.png"
          alt="PhenObs Logo"
          class="w-48 md:w-60 lg:w-80  dark:hidden"
        />
        <img
          src="PhenObs_Logo_Transparent_White.png"
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
              bind:value={password}
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-secondary" on:click={logIn}>Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
