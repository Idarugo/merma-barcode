<template>
  <div id="app">
    <MermaBarcode />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MermaBarcode from "./components/MermaBarcode.vue";

export default defineComponent({
  name: "App",
  components: {
    MermaBarcode,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
