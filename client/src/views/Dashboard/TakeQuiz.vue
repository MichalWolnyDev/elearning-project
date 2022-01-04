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

    <div>
      <div v-if="!hideQuiz">
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
                    v-model="userAnswers[id].answer[answerId].val"
                    @change="updateUserAnswer(id, answerId, answer._id)"
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
      <div v-else>
        <h2>Twój wynik: {{ score }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TakeQuiz",
  computed: {
    ...mapGetters(["getSingleQuiz", "getUserInfo"]),
  },
  data: () => ({
    userAnswers: null,
    quizLength: null,
    score: null,
    hideQuiz: false,
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
    updateUserAnswer(a, b, c) {
      this.userAnswers[a].answer[b].id = c;
    },
    sendAnswer(payload) {
      this.$http
        .post("/api/user/updateSolved/" + this.getUserInfo.id, payload)
        .then((res) => {
          console.log(payload)
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkQuiz() {
      var _this = this;
      this.score = 0;
      var arrQuiz = [];
      var arrAnswers = []

      this.getSingleQuiz.questions.map((e) => {
        // console.log(e.answers)
        arrQuiz.push(e.answers)
      })

      this.userAnswers.map((e) => {
        // console.log(e.answer)
        arrAnswers.push(e.answer)
      })


      // console.log(arrQuiz)
      // console.log("******")
      // console.log(arrAnswers)

      for(var i = 0; i < arrQuiz.length; i++){
        for(var j = 0; j < arrAnswers.length - 1; j++){
          // console.log(i + " " + j)
          // console.log("========")
          // console.log(arrQuiz[i][j].isCorrect)
          // console.log("--as-")
          // console.log(arrAnswers[i][j].val)
          // console.log("========")
          if(arrQuiz[i][j].isCorrect == true && arrAnswers[i][j].val == true ){
            this.score += 1;
          }
        }
      }
  
      setTimeout(function(){
        _this.sendAnswer({
        id: _this.getSingleQuiz._id,
        score: _this.score,
        name: _this.getSingleQuiz.quizName,
        category: _this.getSingleQuiz.quizCategory,
      });
      }, 2000)
      this.hideQuiz = true;
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
          answer: [
            { id: null, val: false },
            { id: null, val: false },
            { id: null, val: false },
            { id: null, val: false },
          ],
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
