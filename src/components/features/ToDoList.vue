<template>
  <div class="page-main">
    <div class="container">
      <div class="todo-info clr">
        <h2 class="left">Todos today</h2>
      </div>
      <ul class="todo-list is-relative">
        <transition name="fade">
          <div class="no-task txt-center" v-if="!todos.length">
            <img class="img-covered" src="@/assets/images/no-task.png" alt="No task" />
            <h3 class="bold">No tasks</h3>
            <h5>You have no task</h5>
          </div>
        </transition>
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
    <div class="modal" :class="{'d-block': isOpenModal}">
      <div class="modal-content">
        <span class="close" @click="isOpenModal = false">&times;</span>
        <div class="form-group">
          <input
            type="text"
            maxlength="30"
            class="form-input"
            placeholder="Enter a task!"
            v-model="newTodo"
            @keyup.enter="addTodo"
          />
          <button type="submit" class="input-group-addon" @click="addTodo">
            <i class="icon-add"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import { todoLocalStorage } from "@/assets/store/todoLocalStorage.js";

export default {
  name: "ToDoList",
  props: {
    isAddedTo: Boolean
  },
  components: {
    TodoItem
  },
  mounted() {
    this.$emit("outData", { todoLength: this.todos.length });
  },
  data() {
    return {
      isOpenModal: false,
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
    },
  },
  watch: {
    todos: {
      handler(todos) {
        this.$emit("outData", { todoLength: todos.length });
        todoLocalStorage.set("todos", todos);
      },
      deep: true
    },
    isAddedTo() {
      if (this.isAddedTo) {
        this.isOpenModal = this.isAddedTo;
      }
    }
  }
};
</script>
