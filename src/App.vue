<template>
  <div id="app">
    <div v-if="!isLoading">
      <ToDoList/>
    </div>
    <Loading :isLoading="isLoading"/>
  </div>
</template>

<script>
  import ToDoList from "./components/features/ToDoList";
  import Loading from "./components/shared/Loading";

  export default {
    name: "App",
    components: {
      ToDoList,
      Loading
    },
    data() {
      return {
        isLoading: true
      }
    },
    mounted() {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    },
  };
</script>

<style lang="scss">
  @import "./assets/styles/styles.scss";
</style>
