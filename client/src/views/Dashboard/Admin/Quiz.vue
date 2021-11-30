<template>
  <div>
    <v-container class="spacing-playground pa-6" fluid>
      <AddQuiz v-model="showQuizCreate" />

      <v-row v-if="showList">
        <v-card
          v-for="(quiz, id) in getQuizList"
          :key="id"
          class="d-flex justify-space-between align-center pa-6 mb-6"
          width="100%"
        >
          <div>
            <p class="quizzes__name">
              {{ quiz.quizName }}
            </p>
            {{quiz._id}}
            <p class="quizzes__category">Kategoria: {{ quiz.quizCategory }}</p>
            <a :href="'/dashboard/takequiz/' + quiz._id">
              <v-btn elevation="2">
              Rozwiąż quiz

              </v-btn>
            </a>
            <!-- <p class="quizzes__category">
              Pytania (temp): {{ quiz.questions }}
            </p> -->
          </div>
          <div class="d-flex">
            <!-- <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  elevation="2"
                  icon
                  class="mr-4"
                  v-bind="attrs"
                  v-on="on"
                ></v-btn>
              </template>
              <span>Something</span>
            </v-tooltip> -->
            <!-- <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn elevation="2" icon v-bind="attrs" v-on="on" @click="deleteUser(id)">
                  <v-icon v-text="'mdi-delete'"></v-icon>
                </v-btn>
              </template>
               <span>Usuń</span>
            </v-tooltip> -->
          </div>
        </v-card>
      </v-row>
      <Loader v-else />
    </v-container>
  </div>
</template>

<script>
import AddQuiz from "@/components/dashboard/AddQuiz.vue";
import Loader from "@/components/Loader.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Quiz",
  components: {
    AddQuiz,
    Loader,
  },
  data: () => ({
    showQuizCreate: false,
    showList: true,
  }),
  computed: {
    ...mapGetters(["getQuizList"]),
  },
  methods: {
    ...mapActions(["fetchQuizzes"]),
  },
  mounted() {
    this.fetchQuizzes();
  },
};
</script>
<style lang="scss" scoped>
.quizzes {
  &__name {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 0;
  }
}
</style>