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
          <div class="answer__row" v-for="(answer, answerId) in question.answers" :key="answerId">
            <div>
                <strong>{{ toLetters(answerId+1) }}:</strong>
            {{ answer.text }}
            </div>
            <div>
              {{ id }} {{ answerId }}
               <!-- v-model="userAnswers[id][answerId].answer" -->
               <!-- {{userAnswers[id][answerId]}} -->
                <v-checkbox @change="checkAnswer(id, answerId)">
                    
                </v-checkbox>
            </div>
          </div>
        </v-card>
      </v-row>
    </v-container>

    <v-container>
      <v-row class="d-flex justify-center pa-3">
        <v-btn color="success">
          Zapisz
        </v-btn>
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
    userAnswers: [],
    checkedAnswer: [],
    quizLength: null,
    // answerObj: 
  }),
  methods: {
    ...mapActions(["fetchSingleQuiz"]),
    toLetters(num) {
      var mod = num % 26,
        pow = (num / 26) | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, "Z");
      return pow ? this.toLetters(pow) + out : out;
    },
    checkAnswer(questionid, answerid){
      console.log(questionid)
      console.log(answerid)
      
      // console.log(this.userAnswers[questionid])
      // this.userAnswers[questionid].answerTrigger = null
      // this.userAnswers[questionid].answerTrigger = answerid
      // this.userAnswers[questionid][answerid].answer = true
      // console.log(this.userAnswers)
      this.userAnswers[questionid][answerid].answer = !this.userAnswers[questionid][answerid].answer 
      console.log("answer clicked");
      // if (!this.userAnswers[questionid]) this.userAnswers[questionid] = [] // if the current question has no answers mapped yet set an empty array 
      // this.userAnswers[questionid] = this.checkedAnswers[questionid]; // set the answer to whatever value it has currently (true, false)
    }
  },
  mounted() {},
  created() {
    this.fetchSingleQuiz(this.$route.params.id);
  },
  // watch: {
  //   'getSingleQuiz': {
  //     handler: function(){
  //       var tmp = [{answer: false, test: "dupa"}, {answer: false}, {answer: false}, {answer: false}];
  //       this.quizLength = this.getSingleQuiz.questions.length;

  //       if(this.quizLength > 0){
  //         for(var i = 0; i < this.quizLength; i++){
  //           this.userAnswers[i] = tmp;
  //         }
  //       }
  //     }
  //   }
  // }
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
