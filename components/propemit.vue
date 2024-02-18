<template>
  <div>
    <div @click="alertEvent" class="test">
      {{ title }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'aiueo'
  }
})
const emits = defineEmits<{
  (e: 'change', id: number): void
}>()
const alertEvent = (): void => {
  emits('change', 123)
}
</script>

<style scoped></style>