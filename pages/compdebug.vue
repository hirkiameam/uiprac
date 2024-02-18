
import type selectsVue from '~/components/selects.vue';
<template>
  <div class="catSelector">
    <CatSelector @selected="selectedValue" />
  </div>
</template>

<script setup>
const selectedValue = (e) => {
  console.log(e.item || e.subline || e.line)
}
</script>

<style scoped>
.catSelector {
  width: 100%;
}
</style>
