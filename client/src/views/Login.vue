<template>
  <div class="login__container">
    <div class="login__row">
      <div class="login__col login__col-sm">
        <div class="login__box">
          <h1 class="login__title">E-learning App</h1>
          <div>
            <v-card class="login__card" elevation="2">
              <v-responsive v-if="showLoginForm">
                <form>
                  <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Hasło"
                    :error-messages="passwordErrors"
                    :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="() => (value = !value)"
                    :type="value ? 'password' : 'text'"
                    :passwordRules="[
                      passwordRules.required,
                      passwordRules.password,
                    ]"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>

                  <br />
                  <v-btn block class="mt-4" @click="submit"> Zaloguj </v-btn>
                </form>
              </v-responsive>
              <Loader v-else />
            </v-card>
          </div>
        </div>
      </div>
      <div class="login__col login__col-big">
        <div class="login__image">
          <div class="login__image--shadow"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
import Loader from "@/components/Loader.vue";
// import router from "../router";

export default {
  mixins: [validationMixin],

  components: {
    Loader,
  },

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },

  data: () => ({
    email: "",
    password: "",
    submitStatus: null,
    showLoader: false,
    showLoginForm: true,
    value: true,
    passwordRules: {
      required: (value) => !!value || "Wymagane.",
      password: (value) => {
        const pattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        return (
          pattern.test(value) ||
          "Min. 8 znaków, jedna wielka litera, liczba oraz znak specjalny"
        );
      },
    },
  }),

  computed: {
    ...mapGetters(["getUserInfo", "getLoginApiStatus"]),

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Niepoprawny adres e-mail");
      !this.$v.email.required && errors.push("E-mail jest wymagany");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Podaj hasło");
      return errors;
    },
  },

  methods: {
    ...mapActions(["userInfoRequest", "loginApi"]),
    async submit() {
      var _this = this;
      this.$v.$touch();

      this.showLoginForm = false;

      if (this.$v.$invalid) {
        this.showLoginForm = true;
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here

        await this.loginApi({
          email: this.email,
          password: this.password,
        });

        if (this.getLoginApiStatus.isAuth) {
          this.showLoginForm = false;
          setTimeout(() => {
            _this.$router.push("/dashboard");
          }, 1500);
        } else {
          this.showLoginForm = true;
          alert(this.getLoginApiStatus.message);
        }
      }
    },
  },
  mounted() {
    // this.getUserInfo();
  },
};
</script>

<style lang="scss" scoped>
.login {
  &__title {
    margin-bottom: 30px;
    text-align: center;
  }
  &__card {
    padding: 2rem;
  }
  &__row {
    display: flex;
    min-height: 100vh;
    @media (max-width: 768px) {
      display: block;
    }
  }
  &__col {
    &-sm {
      display: flex;
      align-items: center;
      width: 33.333%;
      background-color: #fff;
      justify-content: center;

      @media (max-width: 960px) {
        width: 50%;
      }
      @media (max-width: 768px) {
        width: 100%;
        padding: 50px 0;
      }
    }
    &-big {
      width: 66.666%;

      @media (max-width: 960px) {
        width: 50%;
      }

      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }
  &__image {
    background-image: url("../assets/img/elearning.webp");
    height: 100%;
    padding: 0;
    padding-bottom: 75%;
    background-position: center center;
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;

    @media (max-width: 960px) {
      padding-bottom: 100%;
      background-size: cover;
    }

    &--shadow {
      background-color: rgba(0, 0, 0, 0.8);
      height: 100%;
      width: 100%;
      position: absolute;
    }
  }
}
</style>
