<template>
  <footer class="footer">
    <ul class="filter-list d-flex">
      <li class="filter-item pointer" :class="{ active: filter == 'all' }" @click="onFilter('all')">
        <i class="icon-all bold d-block"></i>All
      </li>
      <li class="filter-item pointer" :class="{ active: filter == 'active' }" @click="onFilter('active')">
        <i class="icon-planning bold d-block"></i>Active
      </li>
      <li class="filter-item pointer" :class="{ active: filter == 'completed' }" @click="onFilter('completed')">
        <i class="icon-completed bold d-block"></i>Completed
      </li>
      <transition name="fade">
        <li :class="{'is-disabled': !showClearCompletedBtn}" class="filter-item pointer" @click="onClearCompleted()">
          <i class="icon-remove bold d-block"></i>Clear completed
        </li>
      </transition>
    </ul>
    <div class="filter-action d-inline-block pointer" @click="onAddTo()">
      <i class="icon-add"></i>
    </div>
  </footer>
</template>
<script lang="ts">
  export default ({
    name: 'Footer',
    props: {
      showClearCompletedBtn: Boolean
    },
    data() {
      return {
        filter: 'all',
      };
    },
    methods: {
      onClearCompleted() {
        this.$emit("clearCompleted", true);
      },
      onAddTo() {
        this.$emit("addTodo", true);
      },
      onFilter(filter) {
        this.filter = filter;
        switch (this.filter) {
          case "active":
            this.$emit("filtered", filter);
          case "completed":
            this.$emit("filtered", filter);
          default:
            this.$emit("filtered", filter);
        }
      }
    },
  });
</script>
