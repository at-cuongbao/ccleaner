<template>
  <div class="loader" v-if="isLoading">
    <div class="loader-content">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "Loading",
  props: {
    isLoading: Boolean
  }
}
</script>
