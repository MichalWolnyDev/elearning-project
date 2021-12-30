<template>
  <div>
    <h1>Witaj {{ currentUser.name }}</h1>

    <section>
      <div v-if="currentUser.solvedQuizzes.length > 0">
        <p>Poniżej znajdziesz listę quizów które już rozwiązałeś</p>
        <div class="">
          <div
            class="solved__box solved__box--shadow"
            v-for="(quiz, id) in currentUser.solvedQuizzes"
            :key="id"
          >
            <p>Nazwa quizu: {{ quiz.name }}</p>
            <p>Kategoria: {{ quiz.category }}</p>
            <p>Twój wynik: {{ quiz.score }} pkt.</p>
          </div>
        </div>
      </div>

      <div v-else>
        <p>Nie rozwiązałeś jeszcze żadnego quizu!</p>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "Main",
  computed: {
    currentUser() {
      return this.$store.getters.getUserInfo;
    },
  },
};
</script>
<style lang="scss" scoped>
.solved {
  &__box {
    padding: 1.3rem;
    margin: 30px 0;

    &--shadow {
      -webkit-box-shadow: 0px 0px 28px -14px rgba(66, 68, 90, 1);
      -moz-box-shadow: 0px 0px 28px -14px rgba(66, 68, 90, 1);
      box-shadow: 0px 0px 28px -14px rgba(66, 68, 90, 1);
    }
  }
}
</style>