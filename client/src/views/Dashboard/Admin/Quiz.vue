<template>
   <div>
    <v-container class="spacing-playground pa-6" fluid>
        <AddQuiz v-model="showQuizCreate"/>
      <v-row>
        <v-card
          v-for="(quiz, id) in quizzes"
          :key="id"
          class="d-flex justify-space-between align-center pa-6 mb-6"
          width="100%"
        >
          <div>
            <p class="quizzes__name">
              {{ quiz.quizName }}
            </p>
            <p class="quizzes__category">
              Kategoria: {{ quiz.quizCategory }}
            </p>
            <p class="quizzes__category">
              Pytania (temp): {{ quiz.questions }}
            </p>
          
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
    </v-container>
  </div>
</template>

<script>
import AddQuiz from '@/components/dashboard/AddQuiz.vue';

export default{
    name: 'Quiz',
    components: {
        AddQuiz
    },
    data: () => ({
        quizzes: [],
        showQuizCreate: false
     
    }),
    methods: {
        async fetchQuizzes(){
            var _this = this;
            await this.$http.get('/quizapi/quizzes/')
            .then((res) => {
                _this.quizzes = res.data;

                console.log(_this.quizzes);
            })
            .catch((err) => {
                console.log(err);
            })
        },
    },
    mounted(){
    this.fetchQuizzes();
  }

}
</script>
<style lang="scss" scoped>
.quizzes{
  &__name{
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 0;
  }

}
</style>