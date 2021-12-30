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
            <p class="quizzes__category">Kategoria: {{ quiz.quizCategory }}</p>
            <div v-if="!getUserInfo.solvedQuizzes.some(o => o.id == quiz._id)">
              <a :href="'/dashboard/takequiz/' + quiz._id">
              <v-btn elevation="2">
              Rozwiąż quiz

              </v-btn>
            </a>
            </div>
            <div v-else>
              <p>
                Rozwiązałeś już ten quiz!
              </p>
            </div>
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
    showList: false,
  }),
  computed: {
    ...mapGetters(["getQuizList", "getUserInfo"]),
  },
  methods: {
    ...mapActions(["fetchQuizzes"]),
  },
  mounted() {
    var _this = this;
    this.fetchQuizzes();

    setTimeout(function(){
      _this.showList = true;
    }, 2000)
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