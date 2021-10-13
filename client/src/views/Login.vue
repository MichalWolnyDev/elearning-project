<template>
  <div class="login__container">
    <div class="login__box">
      <div>
        <v-card class="login__card" elevation="2" color="#1f3f49">
          <v-responsive>
            <form>
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="10"
                label="Name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>

              <v-btn class="mr-4" @click="submit"> submit </v-btn>
              <v-btn @click="clear"> clear </v-btn>
            </form>
          </v-responsive>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
  },

  data: () => ({
    name: "",
    email: "",
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  &__container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }
  &__box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__card {
    padding: 2rem;
  }
}
</style>
