<template>
  <div id="app">
    <Header :dataOut="dataOut"/>
    <ToDoList :isAddedTo="isAddedTo" @outData="outData"/>
    <Footer @addTodo="addTodo"/>
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
    },
    data() {
      return {
        isAddedTo: false,
        dataOut: {
          todoLength: 0
        }
      };
    },
    methods: {
      addTodo(trigger) {
        this.isAddedTo = trigger;
      },
      outData(dataOut) {
        this.dataOut = { todoLength: dataOut.todoLength };
      }
    }
  };
</script>

<style lang="scss">
  @import "./assets/styles/styles.scss";
</style>
