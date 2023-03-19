<template>
  <form class="auth d-flex justify-content-center" action="">
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
      <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
        <path
          d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091
      1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535
      0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1
      5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
      </symbol>
    </svg>
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Welcome to Super chat</h3>
        <div
          v-bind:class="[isShowFormError ? 'show' : 'hide']"
          class="alert alert-danger" role="alert"
        >
          {{ formErrorMessage }}
        </div>
        <div class="mb-3">
          <label for="loginInput" class="form-label"
            >Login (Email)
            <input
              type="email"
              class="form-control"
              id="loginInput"
              aria-describedby="loginHelp"
              v-model="login"
              @focus.self="onFocus"
            />
          </label>
          <div
            class="alert alert-warning align-items-center form-text"
            role="alert"
            v-bind:class="[isShowLoginError ? 'show' : 'hide']"
          >
            <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Warning:">
              <use xlink:href="#exclamation-triangle-fill" />
            </svg>
            <div>
              {{ loginErrorMessage }}
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label"
            >Password
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="inputPassword"
              @focus.self="onFocus"
            />
          </label>
          <div
            class="alert alert-warning align-items-center form-text"
            role="alert"
            v-bind:class="[isShowPasswordError ? 'show' : 'hide']"
          >
            <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Warning:">
              <use xlink:href="#exclamation-triangle-fill" />
            </svg>
            <div>
              {{ PasswordErrorMessage }}
            </div>
          </div>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
          <button @click="loginChat" type="button" class="btn btn-primary">
            ENTER CHAT
          </button>
          <button @click="register" type="button" class="btn btn-primary">
            REGISTER
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import loginRequest from '@/requests/login/login.request';

export default {
  name: 'LoginComponent',
  data() {
    return {
      login: '',
      password: '',
      loginErrorMessage: '',
      isShowLoginError: false,
      isShowPasswordError: false,
      PasswordErrorMessage: '',
      isShowFormError: false,
      formErrorMessage: '',
    };
  },
  methods: {
    onFocus() {
      if (this.isShowFormError) {
        this.isShowFormError = false;
        this.formErrorMessage = '';
      }
    },
    register() {
      this.$router.push('/register');
    },
    formValidation() {
      const loginValidation = this.loginValidation();
      const passwordValidation = this.passwordValidation();
      return loginValidation && passwordValidation;
    },
    loginValidation() {
      if (!this.login) {
        this.isShowLoginError = true;
        this.loginErrorMessage = 'This field is required';
        return false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.login)) {
        this.isShowLoginError = true;
        this.loginErrorMessage = 'Incorrect login format';
        return false;
      }

      this.isShowLoginError = false;
      this.loginErrorMessage = '';
      return true;
    },
    passwordValidation() {
      if (!this.password) {
        this.isShowPasswordError = true;
        this.PasswordErrorMessage = 'This field is required';
        return false;
      }

      this.isShowPasswordError = false;
      this.PasswordErrorMessage = '';
      return true;
    },
    async loginChat() {
      if (this.formValidation()) {
        const resp = await loginRequest({
          login: this.login,
          password: this.password,
        });

        if (resp.status === 'ok') {
          this.$router.push('/chat');
        } else {
          this.isShowFormError = true;
          this.formErrorMessage = resp.message;
        }
      }
    },
  },
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

button {
  width: 40%;
}

.show {
  display: flex !important;
}

.hide {
  display: none;
}

.bi {
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  fill: currentcolor;
}

.alert {
  padding: 0.5rem;
}
</style>
