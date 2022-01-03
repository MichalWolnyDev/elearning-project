<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-row class="mb-10">
          <v-btn color="success" elevation="3" v-bind="attrs" v-on="on">
            Dodaj użytkownika
          </v-btn>
        </v-row>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Wpisz dane użytkownika</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Imię*"
                  v-model="formData.firstName"
                  :error-messages="firstNameErrors"
                  @input="$v.formData.firstName.$touch()"
                  @blur="$v.formData.firstName.$touch()"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nazwisko*"
                  v-model="formData.lastName"
                  :error-messages="lastNameErrors"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  :error-messages="emailErrors"
                  v-model="formData.email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Hasło*"
                  :append-icon="val ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="val ? 'password' : 'text'"
                  :error-messages="passwordErrors"
                  @click:append="() => (val = !val)"
                  required
                  v-model="formData.password"
                  @input="$v.formData.password.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Powtórz hasło*"
                  :append-icon="val ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="val ? 'password' : 'text'"
                  :error-messages="passwordErrors"
                  @click:append="() => (val = !val)"
                  required
                  v-model="formData.confirmPassword"
                  @input="$v.formData.password.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  :items="['admin', 'teacher', 'student']"
                  label="Rola*"
                  v-model="formData.role"
                  :error-messages="roleErrors"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*wymagane pola</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="show = false">
            Anuluj
          </v-btn>
          <v-btn color="green darken-1" text @click="submit"> Zapisz </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  mixins: [validationMixin],

  validations: {
    formData: {
      firstName: { required },
      lastName: { required },
      role: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) },
    },
  },

  name: "AddUser",
  props: {
    value: Boolean,
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.formData.email.$dirty) return errors;
      !this.$v.formData.email.email && errors.push("Niepoprawny adres e-mail");
      !this.$v.formData.email.required && errors.push("E-mail jest wymagany");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.formData.password.$dirty) return errors;
      !this.$v.formData.password.required &&
        errors.push("Hasło musi oposiadać min. 8 znaków");
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.formData.firstName.$dirty) return errors;
      !this.$v.formData.firstName.required && errors.push("Podaj imię");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.formData.lastName.$dirty) return errors;
      !this.$v.formData.lastName.required && errors.push("Podaj nazwisko");
      return errors;
    },
    roleErrors() {
      const errors = [];
      if (!this.$v.formData.role.$dirty) return errors;
      !this.$v.formData.role.required && errors.push("Wybierz rolę");
      return errors;
    },
  },
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        role: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      submitStatus: null,
      val: true,
    };
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    submit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.$http
          .post("/api/user/register", this.formData)
          .then((res) => {
            this.show = false;
            this.fetchUsers()
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        this.submitStatus = "Correct";
      }
    },
  },
};
</script>
