<template>
  <div>
    <v-container>
      <v-row class="justify-center">
        <div class="pa-6">
          <h1 class="quiz__title">
            Rozwiązujesz quiz: {{ getSingleQuiz.quizName }}
          </h1>
        </div>
      </v-row>
    </v-container>

    <v-container>
      <v-row class="question__row">
        <v-card
          class="pa-6 mb-6 w-100"
          v-for="(question, id) in getSingleQuiz.questions"
          :key="id"
        >
          <h2 class="question__title">
            Pytanie nr. {{ id + 1 }}: {{ question.text }}
          </h2>
          <div
            class="answer__row"
            v-for="(answer, answerId) in question.answers"
            :key="answerId"
          >
            <div>
              <strong>{{ toLetters(answerId + 1) }}:</strong>
              {{ answer.text }}
            </div>
            <div>
              <v-checkbox
                :value="false"
                v-model="userAnswers[id].answer[answerId]"
              >
              </v-checkbox>
            </div>
          </div>
        </v-card>
      </v-row>
    </v-container>

    <v-container>
      <v-row class="d-flex justify-center pa-3">
        <v-btn color="success" @click="checkQuiz"> Zapisz </v-btn>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TakeQuiz",
  computed: {
    ...mapGetters(["getSingleQuiz"]),
  },
  data: () => ({
    userAnswers: null,
    quizLength: null,
  }),
  methods: {
    ...mapActions(["fetchSingleQuiz"]),
    toLetters(num) {
      var mod = num % 26,
        pow = (num / 26) | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, "Z");
      return pow ? this.toLetters(pow) + out : out;
    },
    keyValue(input) {
      Object.entries(input).forEach(([key, value]) => {
        console.log(key, value);
      });
    },
    checkQuiz() {
      // this.userAnswers.map((e) => {
      //   if (e.answer.length > 0) {
      //     console.log(e.answer);
      //   }

      //   console.log(this.getSingleQuiz.questions)

      //   for(var i in e.answer){
      //     console.log(e.answer[i])
      //   }
      // });

      this.getSingleQuiz.questions.map((e) => {
        // console.log(e.answers)
      console.log("==================");

        // console.log(this.userAnswers)

        for(var i in e.answers){
          // console.log(e.answers[i].isCorrect)
          for(var j in this.userAnswers[i]){
            console.log(j)
          }
          
        }

        // for(var i in e.answers){
        //   console.log(e.answers[i])
        // }
      });
      // for (var i in this.userAnswers) {
      //   console.log(this.userAnswers[i]);
      //   this.keyValue(this.userAnswers[i])
      // }
    },
  },
  mounted() {},
  created() {
    this.fetchSingleQuiz(this.$route.params.id);
  },
  watch: {
    getSingleQuiz: {
      handler: function () {
        this.userAnswers = this.getSingleQuiz.questions.map(() => ({
          answer: [],
        }));
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.quiz {
  &__title {
    @media (max-width: 525px) {
      font-size: 20px;
    }
  }
}
.question {
  &__row {
    width: 100%;
  }
  &__title {
    padding-bottom: 15px;
    border-bottom: 1px solid #cecece;
  }
}
.answer {
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
