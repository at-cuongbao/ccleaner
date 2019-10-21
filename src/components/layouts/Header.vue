<template>
  <header class="header">
    <div class="container">
      <div class="header-top flex-between">
        <div class="menu"><i class="icon-all"></i></div>
        <div class="heading">
          <h1>Investory Management</h1>
        </div>
        <div class="addition"><i class="icon-add"></i></div>
      </div>
      <ul class="filter-list d-flex">
        <li class="filter-item pointer">
          <div class="filter-number">421</div>overdue
        </li>
        <li class="filter-item pointer">
          <div class="filter-number">81</div>todos
        </li>
        <li class="filter-item pointer">
          <div class="filter-number">72</div>open
        </li>
        <li class="filter-item pointer">
          <div class="filter-number">51</div>due today
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  }
};
</script>
