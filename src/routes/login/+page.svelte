<script lang="ts">
  import imgTransparent from '$lib/assets/PhenObs_Logo_Transparent.png';
  import imgWhite from '$lib/assets/PhenObs_Logo_Transparent_White.png';
</script>

<form method="post" class="w-full h-full">
  <div class="container mx-auto h-full">
    <div class="hero h-full">
      <div class="hero-content flex-col lg:flex-row lg:gap-16">
        <div class="text-center lg:text-left">
          <img src={imgTransparent} alt="PhenObs Logo" class="w-48 md:w-60 lg:w-80 dark:hidden" />
          <img src={imgWhite} alt="PhenObs Logo" class="w-48 md:w-60 lg:w-80 dark:block hidden" />
        </div>
        <div class="card w-full max-w-sm shadow-2xl bg-white/5">
          <div class="card-body">
            <div class="form-control w-64 md:w-72 lg:w-80">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                class="input input-bordered"
                name="username"
                id="username"
              />
            </div>
            <div class="form-control w-64 md:w-72 lg:w-80">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                class="input input-bordered"
                name="password"
                id="password"
              />
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-secondary" type="submit">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>
