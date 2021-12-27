<template>
    <div>
        <h1>
            Witaj {{ currentUser.name }}
        </h1>
    </div>
</template>
<script>
export default {
    name: 'Main',
    computed: {
      currentUser(){
        return this.$store.getters.getUserInfo;
      }
    },
}
</script>