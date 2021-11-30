<template>
    <div>
        tu beda rozwiazywane quizy

        {{getSingleQuiz}}
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default{
    name: 'TakeQuiz',
    computed: {
        ...mapGetters(['getSingleQuiz'])
    },
    methods: {
        ...mapActions(['fetchSingleQuiz'])
    },
    mounted(){
    },
    created(){
        this.fetchSingleQuiz(this.$route.params.id);

    }
}
</script>
