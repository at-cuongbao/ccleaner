<template>
  <!-- <div class="to-do-list"> -->
  <div class="page-main">
    <div class="container">
      <!-- <input
        type="text"
        class="todo-input form-control"
        placeholder="Enter a task!"
        v-model="newTodo"
        @keyup.enter="addTodo"> -->
      <div class="todo-info clr">
        <h2 class="left">Due today</h2>
        <span class="right">Sort by <i class="icon-add"></i></span>
      </div>
      <ul class="todo-list">
        <transition name="fade">
          <div class="no-task txt-center" v-if="todos.length">
            <img class="img-covered" src="@/assets/images/no-task.png" alt="No task">
            <h3 class="bold">No tasks</h3>
            <h5>You have no task</h5>
          </div>
        </transition>
        <!-- <transition-group
          name="fade"
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutDown"> -->
          <li class="todo-item">
            <div class="todo-item-checkbox txt-center">
              <input type="checkbox"/>
            </div>
            <div class="todo-item-wrapper">
              <h3 class="todo-item-title">Illustrations</h3>
              <i class="icon-trash"></i>
            </div>
          </li>
          <li class="todo-item">
            <div class="todo-item-checkbox txt-center">
              <input type="checkbox"/>
            </div>
            <div class="todo-item-wrapper">
              <h3 class="todo-item-title">Illustrations</h3>
              <i class="icon-trash"></i>
            </div>
          </li>
          <li class="todo-item">
            <div class="todo-item-checkbox txt-center">
              <input type="checkbox"/>
            </div>
            <div class="todo-item-wrapper">
              <h3 class="todo-item-title">Illustrations</h3>
              <i class="icon-trash"></i>
            </div>
          </li>
          <!-- <TodoItem
            v-for="(todo, index) in todosFilter"
            :key="todo.id"
            :todo="todo"
            :index="index"
            :checkAll="!itemLeft"
            @finishedEdit="finishedEdit"
            @removedTodo="removeTodo"/> -->
        <!-- </transition-group> -->
      </ul>
      <!-- <hr>
      <div class="section-1 clr">
        <div class="left">
          <input type="checkbox" class="input-checkbox" @click="checkAll()" :checked="!itemLeft && todos.length" />
          <span class="middle">Check all</span>
        </div>
        <div class="right">
          <span class="middle">{{itemLeft}} item(s) left</span>
        </div>
      </div>
      <hr> -->
      <!-- <div class="section-2 left">
        <button :class="{active: filter == 'all'}" @click="filter = 'all'">All</button>
        <button :class="{active: filter == 'active'}" @click="filter = 'active'">Active</button>
        <button :class="{active: filter == 'completed'}" @click="filter = 'completed'">Completed</button>
      </div>
      <div class="right">
        <transition name="fade">
          <button v-if="showClearCompletedBtn" @click="onClearCompleted">Clear Completed</button>
        </transition>
      </div> -->
    </div>
  </div>
</template>

<script>
  import TodoItem from "./TodoItem";
  import { todoLocalStorage } from "@/assets/store/todoLocalStorage.js";

  export default {
    name: "ToDoList",
    components: {
      TodoItem
    },
    data() {
      return {
        newTodo: "",
        cachedTask: "",
        idForTodo: todoLocalStorage.get("todos").idForTodo,
        filter: "all",
        todos: todoLocalStorage.get("todos").todos
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
