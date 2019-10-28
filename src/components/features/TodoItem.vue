<template>
  <li class="list-item">
    <input type="checkbox" class="hidden-box" v-bind:id="index" v-model="completed" @change="doneEdit" />
    <label class="check-label"  v-bind:for="index">
      <span class="check-label-box"></span>
      <span class="check-label-text">{{title}}</span>
    </label>
    <i class="icon-trash pointer" @click="removeTodo(index)"></i>
  </li>
</template>

<script>
  export default {
    name: "TodoItem",
    props: {
      todo: {
        type: Object,
        required: true
      },
      index: Number,
      checkAll: Boolean
    },
    data() {
      return {
        id: this.todo.id,
        title: this.todo.title,
        completed: this.todo.completed,
        editing: this.todo.editing,
        cachedTask: ""
      };
    },
    directives: {
      focus: {
        inserted: function(el) {
          el.focus();
        }
      }
    },
    methods: {
      editTodo() {
        this.cachedTask = this.title;
        this.editing = true;
      },
      doneEdit() {
        this.editing = false;

        if (!this.title.trim().length) {
          this.title = this.cachedTask;
        }

        this.$emit("finishedEdit", {
          index: this.index,
          todo: {
            id: this.id,
            title: this.title,
            completed: this.completed,
            editing: this.editing
          }
        });
      },
      cancelEdit() {
        this.editing = false;
      },
      removeTodo(index) {
        this.$emit("removedTodo", index);
      }
    },
    watch: {
      checkAll() {
        if (this.checkAll) {
          this.completed = true;
        } else {
          this.completed = this.todo.completed;
        }
      }
    }
  };
</script>
