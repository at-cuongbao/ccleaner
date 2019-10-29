<template>
  <div class="page-todo">
    <Header :activeTodo="itemLeft" :allTodo="itemAll" :completedTodo="itemCompleted" />
    <div class="page-main">
      <div class="container">
        <div class="todo-info clr">
          <h2 class="left">Today's task</h2>
        </div>
        <transition
          name="fade"
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutDown"
        >
          <div class="no-task txt-center is-absolute" v-if="!todos.length">
            <img class="img-covered" src="@/assets/images/no-task.png" alt="No task" />
            <h3 class="bold">No tasks</h3>
            <h5>You have no task</h5>
          </div>
        </transition>
        <ul class="list-todo is-relative">
          <transition-group
            name="fade"
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown"
          >
            <TodoItem
              v-for="(todo, index) in todosFilter"
              :key="todo.id"
              :todo="todo"
              :index="index"
              :checkAll="!itemLeft"
              @finishedEdit="finishedEdit"
              @removedTodo="removeTodo"
            />
          </transition-group>
        </ul>
      </div>
      <transition name="fade">
        <div class="fade-wrapper">
          <div v-if="isOpenModal" class="modal" @keyup.esc="closeModal" @click="closeModal()">
            <div class="modal-content" @click="onClickModalContent($event)">
              <div class="modal-header is-relative">
                <h3 class="txt-center">Create a todo</h3>
                <span class="close pointer" @click="isOpenModal = false">&times;</span>
              </div>
              <div class="form-group">
                <input
                  id="input"
                  type="text"
                  maxlength="30"
                  class="form-input"
                  placeholder="Enter a task!"
                  v-model="newTodo"
                  @keyup.enter="addTodo"
                />
                <button type="submit" class="input-group-addon" @click="addTodo">
                  <i class="icon-add pointer"></i>
                </button>
              </div>
            </div>
          </div>
          <Loading :isLoading="isDone" />
        </div>
      </transition>
    </div>
    <Footer
      @filtered="filterTodo"
      @addTodo="openModal"
      @clearCompleted="onClearCompleted"
      :showClearCompletedBtn="showClearCompletedBtn"
    />
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Loading from "../shared/Loading";
import { todoLocalStorage } from "@/assets/store/todoLocalStorage.js";

export default {
  name: "ToDoList",
  components: {
    TodoItem,
    Header,
    Footer,
    Loading
  },
  mounted() {
    this.$emit("outData", { todoLength: this.todos.length });
  },
  data() {
    return {
      newTodo: "",
      cachedTask: "",
      idForTodo: todoLocalStorage.get("todos").idForTodo,
      filter: "all",
      todos: todoLocalStorage.get("todos").todos,
      isOpenModal: false,
      isDone: false
    };
  },
  computed: {
    itemAll() {
      return this.todos.length;
    },
    itemLeft() {
      return this.todos.filter(v => !v.completed).length;
    },
    itemCompleted() {
      return this.todos.filter(v => v.completed).length;
    },
    todosFilter() {
      switch (this.filter) {
        case "active":
          return this.todos.filter(v => !v.completed);
        case "completed":
          return this.todos.filter(v => v.completed);
        default:
          return this.todos;
      }
    },
    showClearCompletedBtn() {
      return this.todos.filter(v => v.completed).length > 0;
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    addTodo() {
      this.closeModal();

      this.isDone = true;

      setTimeout(() => {
        this.isDone = false;
  
        if (this.newTodo.trim().length) {
          this.todos.push({
            id: this.idForTodo,
            title: this.newTodo,
            completed: false,
            editing: false
          });

          this.newTodo = "";
          this.idForTodo++;
        }
      }, 1000);
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAll() {
      this.todos = this.todos.map(v => {
        v.completed = event.target.checked;
        return v;
      });
    },
    onClearCompleted() {
      this.todos = this.todos.filter(v => !v.completed);
    },
    finishedEdit(data) {
      this.todos = this.todos.map((v, i) => (i === data.index ? data.todo : v));
    },
    closeModal() {
      this.isOpenModal = false;
    },
    openModal() {
      this.isOpenModal = true;

      setTimeout(() => {
        document.getElementById("input").focus();
      });
    },
    onClickModalContent($event) {
      $event.stopPropagation();
    },
    filterTodo(filter) {
      this.filter = filter;
    }
  },
  watch: {
    todos: {
      handler(todos) {
        todoLocalStorage.set("todos", todos);
      },
      deep: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
</style>
