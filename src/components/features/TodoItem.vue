<template>
  <li class="todo-item is-relative">
    <input type="checkbox" class="middle input-checkbox" v-model="completed" @change="doneEdit" />
    <span
      class="middle middle-over"
      v-if="!editing"
      @dblclick="editTodo()"
      :class="{completed: completed}"
    >{{title}}</span>
    <input
      v-else
      v-focus
      class="form-control middle middle-over"
      type="text"
      placeholder="Enter a task!"
      v-model="title"
      @blur="cancelEdit()"
      @keyup.enter="doneEdit()"
    />
    <div class="remove-item" @click="removeTodo(index)">&times;</div>
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
