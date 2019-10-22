<template>
  <div id="app">
    <Header :dataOut="dataOut"/>
    <ToDoList :isAddedTo="isAddedTo" :isClearCompleted="isClearCompleted" :filterTodos="filter" @outData="outData"/>
    <Footer @addTodo="addTodo" @clearCompleted="clearCompleted" @filterTodos="filterTodos"/>
  </div>
</template>

<script>
  import ToDoList from "./components/features/ToDoList";
  import Header from "./components/layouts/Header";
  import Footer from "./components/layouts/Footer";
import { log } from 'util';
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
        isClearCompleted: false,
        filter: 'all',
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
        console.log(this.dataOut);
        
      },
      clearCompleted(clear) {
        this.isClearCompleted = clear;
      },
      filterTodos(filter) {
        this.filter = filter;
      }
    }
  };
</script>

<style lang="scss">
  @import "./assets/styles/styles.scss";
</style>
