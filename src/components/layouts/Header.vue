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
            <img class="img-covered" src="@/assets/images/avatar.jpeg" alt="avatar">
          </a>
        </div>
      </div>
      <ul class="filter-list d-flex">
        <li class="filter-item">
          <div class="filter-number">{{todoLength}}</div>All
        </li>
        <li class="filter-item">
          <div class="filter-number">81</div>Active
        </li>
        <li class="filter-item">
          <div class="filter-number">72</div>Completed
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
    dataOut: {
      todoLength: Number
    }
  },
  data() {
    return {
      todoLength: todoLocalStorage.get("todos").todos.length
    };
  },
  watch: {
    todoLength: {
      handler(todos) {
        
      },
      deep: true
    }
  }
};
</script>
