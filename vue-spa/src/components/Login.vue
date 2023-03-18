<template>
  <form class="auth d-flex justify-content-center" action="">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Welcome to Super chat</h5>
        <div class="mb-3">
          <label for="loginInput" class="form-label">Login (Email)
          <input
            type="email"
            class="form-control"
            id="loginInput"
            aria-describedby="loginHelp"
          />
          </label>
          <div id="loginHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">Password
          <input type="password" class="form-control" id="inputPassword" />
          </label>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button type="submit" class="btn btn-primary">ENTER CHAT</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'LoginComponent',
};
</script>

<style scoped>
.auth {
  padding-top: 50px;
}

.auth .card {
  width: 400px;
}

label {
  width: 100%;
}
</style>
