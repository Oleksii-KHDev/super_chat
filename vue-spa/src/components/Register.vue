<template>
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
  <form class="auth d-flex justify-content-center">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Please input your data</h3>
        <div
          v-bind:class="[isShowFormError ? 'show' : 'hide']"
          class="alert alert-danger align-items-center"
          role="alert"
        >
          <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Warning:">
            <use xlink:href="#exclamation-triangle-fill" />
          </svg>
          <div>
            {{ formErrorMessage }}
          </div>
        </div>
        <div class="mb-3">
          <label for="loginInput" class="form-label"
            >*Enter your Login (Email)
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
          <label id="nameHelp" for="nameInput" class="form-label"
            >*Enter your name
            <input
              type="text"
              class="form-control"
              id="nameInput"
              name="name"
              aria-describedby="nameHelp"
              v-model="name"
              @focus.self="onFocus"
            />
          </label>
          <div
            class="alert alert-warning align-items-center form-text"
            role="alert"
            v-bind:class="[isShowNameError ? 'show' : 'hide']"
          >
            <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Warning:">
              <use xlink:href="#exclamation-triangle-fill" />
            </svg>
            <div>
              {{ nameErrorMessage }}
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label"
            >*Enter Password
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              v-model="password"
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
        <div class="mb-3">
          <label for="confirmPassword" class="form-label"
            >*Confirm Password
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              v-model="confirmPassword"
              @focus.self="onFocus"
            />
          </label>
          <div
            class="alert alert-warning align-items-center form-text"
            role="alert"
            v-bind:class="[isShowConfirmPasswordError ? 'show' : 'hide']"
          >
            <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Warning:">
              <use xlink:href="#exclamation-triangle-fill" />
            </svg>
            <div>
              {{ ConfirmPasswordErrorMessage }}
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="homePage" class="form-label"
            >Home Page
            <input
              type="text"
              class="form-control"
              id="homePage"
              @focus.self="onFocus"
              v-model="homePage"
            />
          </label>
        </div>
        <div class="mb-3">
          <div class="form-label">Select your avatar</div>
          <div class="form-check form-check-inline">
            <label class="form-check-label" for="avatarRadio1">
              <input
                class="form-check-input"
                type="radio"
                id="avatarRadio1"
                value="assets/avatar1.svg"
                checked
                v-model="avatar"
              />
              <img
                src="assets/avatar1.svg"
                width="50"
                height="50"
                alt="mens avatar"
              />
            </label>
          </div>
          <div class="form-check form-check-inline">
            <label class="form-check-label" for="avatarRadio2">
              <input
                class="form-check-input"
                type="radio"
                id="avatarRadio2"
                value="assets/avatar3.svg"
                v-model="avatar"
              />
              <img
                src="assets/avatar3.svg"
                width="50"
                height="50"
                alt="girls avatar"
              />
            </label>
          </div>
        </div>
        <div class="mb-3">
          <div class="d-flex flex-row">
            <div v-html="captchaImg"></div>
            <v-text-field
              single-line
              label="Enter value"
              variant="outlined"
              v-model.trim="captchaInputValue"
            >
            </v-text-field>
          </div>
          <div
            class="alert alert-warning align-items-center form-text"
            role="alert"
            v-bind:class="[isShowCaptchaError ? 'show' : 'hide']"
          >
            <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Warning:">
              <use xlink:href="#exclamation-triangle-fill" />
            </svg>
            <div>
              {{ captchaErrorMessage }}
            </div>
          </div>
        </div>
        <div class="h6 pb-2 mb-4 text-danger border-bottom border-danger">
          * Required fields
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button
            @click.self="submitForm"
            type="button"
            class="btn btn-primary"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import RegisterRequest from '@/requests/register/register.request';
import { getCaptcha, pushUserToStorage } from '@/helpers/auth';

export default {
  data() {
    return {
      login: '',
      name: '',
      password: '',
      confirmPassword: '',
      homePage: '',
      isShowLoginError: false,
      isShowPasswordError: false,
      isShowConfirmPasswordError: false,
      isShowNameError: false,
      PasswordErrorMessage: '',
      nameErrorMessage: '',
      ConfirmPasswordErrorMessage: '',
      loginErrorMessage: '',
      formErrorMessage: '',
      isShowFormError: '',
      captchaString: '',
      captchaImg: '',
      captchaInputValue: '',
      isShowCaptchaError: false,
      captchaErrorMessage: '',
      avatar: 'assets/avatar1.svg',
    };
  },
  created() {
    this.createCaptcha();
  },
  methods: {
    /**
     * Creates new captcha image
     *
     * @returns {Promise<void>}
     */
    async createCaptcha() {
      const c = await getCaptcha();
      this.captchaImg = c.data;
      this.captchaString = c.text;
    },

    onFocus() {
      if (this.isShowFormError) {
        this.isShowFormError = false;
        this.formErrorMessage = '';
      }
    },

    /**
     * Registration form validation
     *
     * @returns {boolean}
     */
    formValidation() {
      const loginValidation = this.loginValidation();
      const passwordValidation = this.passwordValidation();
      const nameValidation = this.nameValidation();
      const captchaValidation = this.captchaValidation();
      return (
        loginValidation
        && passwordValidation
        && nameValidation
        && captchaValidation
      );
    },

    /**
     * Validate captcha inputs
     * @returns {boolean}
     */
    captchaValidation() {
      if (this.captchaString !== this.captchaInputValue.trim()) {
        this.isShowCaptchaError = true;
        this.captchaErrorMessage = 'Invalid captcha value';
        return false;
      }
      this.isShowCaptchaError = false;
      this.captchaErrorMessage = '';
      return true;
    },

    /**
     * Validate username field
     *
     * @returns {boolean}
     */
    nameValidation() {
      if (!this.name) {
        this.isShowNameError = true;
        this.nameErrorMessage = 'This field is required';
        return false;
      }
      this.isShowNameError = false;
      this.nameErrorMessage = '';
      return true;
    },

    /**
     * Validate user login
     *
     * @returns {boolean}
     */
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

    /**
     * Validate passwords fields (password and confirm password)
     *
     * @returns {boolean}
     */
    passwordValidation() {
      let result = true;

      if (!this.password) {
        this.isShowPasswordError = true;
        this.PasswordErrorMessage = 'This field is required';
        result = false;
      }

      if (!this.confirmPassword) {
        this.isShowConfirmPasswordError = true;
        this.ConfirmPasswordErrorMessage = 'This field is required';
        result = false;
      }

      if (this.password.toString() !== this.confirmPassword.toString()) {
        this.isShowPasswordError = true;
        this.PasswordErrorMessage = 'This fields should be equal';
        this.isShowConfirmPasswordError = true;
        this.ConfirmPasswordErrorMessage = 'This fields should be equal';
        result = false;
      }

      if (result) {
        this.isShowPasswordError = false;
        this.PasswordErrorMessage = '';
        this.isShowConfirmPasswordError = false;
        this.ConfirmPasswordErrorMessage = '';
      }

      return result;
    },

    /**
     * Sends user registration data to server
     *
     * @returns {Promise<void>}
     */
    async submitForm() {
      if (this.formValidation()) {
        const resp = await RegisterRequest({
          login: this.login,
          password: this.password,
          name: this.name,
          homeUrl: this.homePage,
          avatar: this.avatar,
        });

        if (resp.status === 'ok') {
          this.$store.commit('set_user', resp.user);
          pushUserToStorage(resp.user);
          this.$router.push('/chat');
        } else {
          await this.createCaptcha();
          this.isShowFormError = true;
          this.formErrorMessage = resp.message;
        }
      }
    },
  },
  name: 'RegisterComponent',
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

.bi {
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  fill: currentcolor;
}

.alert {
  padding: 0.5rem;
}

.show {
  display: flex !important;
}

.hide {
  display: none;
}
</style>
