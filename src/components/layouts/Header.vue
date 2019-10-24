<template>
  <header class="header">
    <div class="container">
      <div class="header-top flex-between">
        <div class="menu pointer"><i class="icon-menu"></i></div>
        <div class="heading">
          <h1>TODO</h1>
        </div>
        <div class="user">
          <a href="#" class="avatar flex-between">
            <img class="img-covered" src="@/assets/images/avatar.jpg" alt="avatar">
          </a>
        </div>
      </div>
      <ul class="filter-list d-flex">
        <li class="filter-item">
          <div class="filter-number">{{allTodo}}</div>All
        </li>
        <li class="filter-item">
          <div class="filter-number">{{activeTodo}}</div>Active
        </li>
        <li class="filter-item">
          <div class="filter-number">{{completedTodo}}</div>Completed
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { todoLocalStorage } from "@/assets/store/todoLocalStorage.js";

export default {
  name: "Header",
  props: {
    allTodo: Number,
    activeTodo: Number,
    completedTodo: Number
  }
};
</script>
