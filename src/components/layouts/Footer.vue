<template>
  <footer class="footer">
    <ul class="filter-list d-flex">
      <li class="filter-item pointer" :class="{ active: filter == 'all' }" @click="filter = 'all'">
        <i class="icon-all bold d-block"></i>All
      </li>
      <li class="filter-item pointer" :class="{ active: filter == 'active' }" @click="filter = 'active'">
        <i class="icon-planning bold d-block"></i>Active
      </li>
      <li class="filter-item pointer" :class="{ active: filter == 'completed' }" @click="filter = 'completed'">
        <i class="icon-completed bold d-block"></i>Completed
      </li>
      <li class="filter-item pointer" @click="onClearCompleted">
        <i class="icon-remove bold d-block"></i>Clear
      </li>
    </ul>
    <div class="filter-action d-inline-block">
      <i class="icon-add"></i>
    </div>
  </footer>
</template>
<script lang="ts">
  export default ({
    name: 'Footer',
    data() {
      return {
        filter: 'all',
      };
    },
    computed: {
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
    methods: {
      onClearCompleted() {
        // this.todos = this.todos.filter(v => !v.completed);
      },
    },
  });
</script>
