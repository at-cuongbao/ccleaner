<template>
  <div class="section-2 footer">
    <div class="left">
      <button :class="{active: filter == 'all'}" @click="filter = 'all'">All</button>
      <button :class="{active: filter == 'active'}" @click="filter = 'active'">Active</button>
      <button :class="{active: filter == 'completed'}" @click="filter = 'completed'">Completed</button>
    </div>
    <div class="right">
      <button v-if="showClearCompletedBtnFromChild" @click="onClearCompleted">Clear Completed</button>
    </div>
  </div>
</template>

<script>
import { log } from 'util';
export default {
  name: "FilterTab",
  props: {
    filter: 'all',
    showClearCompletedBtnFromChild: Boolean
  },
  data() {
    return {
      mess: "TODO"
    };
  },
  methods: {
    onClearCompleted() {
      console.log(123);

      this.$emit('onClearCompletedFromChild');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.footer {
  position: fixed;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
}
</style>
