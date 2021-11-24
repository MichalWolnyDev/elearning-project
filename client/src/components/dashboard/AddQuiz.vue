<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="1240px">
      <template v-slot:activator="{ on, attrs }">
        <v-row class="mb-10">
          <v-btn color="success" elevation="3" v-bind="attrs" v-on="on">
            Nowy Quiz
          </v-btn>
        </v-row>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Uzupełnij pola:</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Nazwa quizu*"
                  v-model="formData.quizName"
                  :error-messages="quizNameErrors"
                  @input="$v.formData.quizName.$touch()"
                  @blur="$v.formData.quizName.$touch()"
                  required
                >
                </v-text-field>
              </v-col>

              <v-col cols="6">
                <v-autocomplete
                  :items="['Matematyka', 'Informatyka', 'Biologia']"
                  label="Kategoria*"
                  v-model="formData.category"
                  :error-messages="categoryErrors"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <div v-for="(question, id) in formData.questions" :key="id">
              <v-row>
                <v-col cols="12">
                  <div class="d-flex justify-space-between align-center">
                    <p class="text-h6 mt-4">Pytanie nr. {{ id + 1 }}</p>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          elevation="2"
                          icon
                          v-bind="attrs"
                          v-on="on"
                          color="error"
                          @click="removeQuestionForm(id)"
                        >
                          <v-icon v-text="'mdi-minus'"></v-icon>
                        </v-btn>
                      </template>
                      <span>Usuń pytanie</span>
                    </v-tooltip>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Pytanie*"
                    v-model="formData.questions[id].name"
                    required
                  >
                  </v-text-field>
                  <!-- @input="$v.question.name.$touch()"
                    @blur="$v.question.name.$touch()" -->
                  <!-- :error-messages="nameErrors" -->
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="6"
                  v-for="(answer, id) in question.answers"
                  :key="id"
                >
                  <v-text-field
                    :label="`Odpowiedź ${id + 1}*`"
                    v-model="question.answers[id].text"
                    required
                  >
                  </v-text-field>
                  <v-checkbox
                    v-model="answer.isCorrect"
                    label="Prawidłowa odpowiedź"
                  ></v-checkbox>
                  <!-- @input="$v.answer.$touch()"
                    @blur="$v.answer.$touch()" -->
                  <!-- :error-messages="quizNameErrors" -->
                </v-col>
              </v-row>
            </div>
            <v-row>
              <v-col cols="12">
                <div class="d-flex justify-space-between align-center">
                  <span class="text-h5">Dodaj pytanie</span>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        elevation="2"
                        icon
                        v-bind="attrs"
                        v-on="on"
                        color="indigo"
                        @click="addQuestionForm()"
                      >
                        <v-icon v-text="'mdi-plus'"></v-icon>
                      </v-btn>
                    </template>
                    <span>Dodaj pytanie</span>
                  </v-tooltip>
                </div>
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
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    formData: {
      quizName: { required },
      category: { required },
    },
  },

  name: "AddQuiz",
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

    quizNameErrors() {
      const errors = [];
      if (!this.$v.formData.quizName.$dirty) return errors;
      !this.$v.formData.quizName.required && errors.push("Podaj nazwę quizu");
      return errors;
    },

    categoryErrors() {
      const errors = [];
      if (!this.$v.formData.category.$dirty) return errors;
      !this.$v.formData.category.required && errors.push("Wybierz kategorię");
      return errors;
    },
  },
  data() {
    return {
      formData: {
        quizName: "",
        category: "",
        questions: [
          {
            name: "",
            answers: [
              {
                text: "",
                isCorrect: false,
              },
              {
                text: "",
                isCorrect: false,
              },
              {
                text: "",
                isCorrect: false,
              },
              {
                text: "",
                isCorrect: false,
              },
            ],
          },
        ],
      },
    
      submitStatus: null,
      val: true,
    };
  },
  methods: {
    addQuestionForm() {
        const emptyQustion =  {
            name: "",
            answers: [
              {
                text: "",
                isCorrect: false,
              },
              {
                text: "",
                isCorrect: false,
              },
              {
                text: "",
                isCorrect: false,
              },
              {
                text: "",
                isCorrect: false,
              },
            ],
          }
      this.formData.questions.push(emptyQustion);
    },
    removeQuestionForm(id) {
      this.formData.questions.splice(id, 1);
    },
    submit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.$http
          .post("/quizapi/quizzes/", this.formData)
          .then((res) => {
            this.show = false;
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
