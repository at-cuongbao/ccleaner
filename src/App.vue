<template>
  <div id="app">
    <Header />
    <ToDoList />
    <Footer />
  </div>
</template>

<script>
  import ToDoList from "./components/features/ToDoList";
  import Header from "./components/layouts/Header";
  import Footer from "./components/layouts/Footer";
  export default {
    name: "App",
    components: {
      ToDoList,
      Header,
      Footer
    }
  };
</script>

<style lang="scss">
  @import "./assets/styles/styles.scss";
</style>
