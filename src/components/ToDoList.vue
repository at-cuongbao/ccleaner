<template>
  <div class="to-do-list">
    <div class="container">
      <input
        type="text"
        class="todo-input form-control"
        placeholder="Enter a task!"
        v-model="newTodo"
        @keyup.enter="addTodo"
      />
      <div class="todos">
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
      </div>
      <hr />
      <div class="section-1 clr">
        <div class="left">
          <input type="checkbox" class="input-checkbox" @click="checkAll()" :checked="!itemLeft && todos.length" />
          <span class="middle">Check all</span>
        </div>
        <div class="right">
          <span class="middle">{{itemLeft}} item(s) left</span>
        </div>
      </div>
      <hr />
      <!-- <FilterTab :showClearCompletedBtnFromChild="showClearCompletedBtn" @onClearCompletedFromChild="onClearCompleted" /> -->
      <div class="section-2 left">
        <button :class="{active: filter == 'all'}" @click="filter = 'all'">All</button>
        <button :class="{active: filter == 'active'}" @click="filter = 'active'">Active</button>
        <button :class="{active: filter == 'completed'}" @click="filter = 'completed'">Completed</button>
      </div>
      <div class="right">
        <transition name="fade">
          <button v-if="showClearCompletedBtn" @click="onClearCompleted">Clear Completed</button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// import FilterTab from "./FilterTab";
import TodoItem from "./TodoItem";
import { todoLocalStorage } from "./../assets/store/todoLocalStorage.js";

export default {
  name: "ToDoList",
  components: {
    // FilterTab,
    TodoItem
  },
  data() {
    return {
      newTodo: "",
      cachedTask: "",
      idForTodo: todoLocalStorage.get("todos").idForTodo,
      filter: "all",
      todos: todoLocalStorage.get("todos").todos
      // [
      //   {
      //     id: 1,
      //     title: "Học NodeJS",
      //     completed: true,
      //     editting: false
      //   },
      //   {
      //     id: 2,
      //     title: "Học Angular 8",
      //     completed: false,
      //     editting: false
      //   },
      //   {
      //     id: 3,
      //     title: "Học VueJS",
      //     completed: false,
      //     editting: false
      //   }
      // ]
    };
  },
  computed: {
    itemLeft() {
      return this.todos.filter(v => !v.completed).length;
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
