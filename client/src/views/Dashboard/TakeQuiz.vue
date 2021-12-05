<template>
  <div>
    <v-container>
      <v-row class="justify-center">
        <div class="pa-6">
          <h1 class="quiz__title">Rozwiązujesz quiz: {{ getSingleQuiz.quizName }}</h1>
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

          <h2 class="question__title">Pytanie nr. {{ id + 1 }}: {{ question.text }}</h2>
          <div class="answer__row" v-for="(answer, id) in question.answers" :key="id">
            <div>
                <strong>{{ toLetters(id+1) }}:</strong>
            {{ answer.text }}
            </div>
            <div>
                <v-checkbox>
                    
                </v-checkbox>
            </div>
          </div>
        </v-card>
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
  methods: {
    ...mapActions(["fetchSingleQuiz"]),
    toLetters(num) {
      var mod = num % 26,
        pow = (num / 26) | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, "Z");
      return pow ? this.toLetters(pow) + out : out;
    },
  },
  mounted() {},
  created() {
    this.fetchSingleQuiz(this.$route.params.id);
  },
};
</script>
<style lang="scss" scoped>
.quiz{
    &__title{
        @media(max-width: 525px){
            font-size: 20px;
        }
    }
}
.question{
    &__row{
        width: 100%;
    }
    &__title{
        padding-bottom: 15px;
        border-bottom: 1px solid #cecece;
    }
}
 .answer{
     &__row{
         display: flex;
         justify-content: space-between;
         align-items: center;
     }
 }
</style>
