<template>
  <div class="selectContainer">
    <!-- <div class="label">{{ label }}</div> -->
    <div v-for="content in  contentList " :key="content" class="content" :class="{ active: selected === content }" @click="() => {
      selected = content
      selectItem()
    }
      " :style="`min-width:${itemWidth};`">
      <p>{{ content }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">


const props = defineProps({
  label: {
    type: String,
    default: 'label'
  },
  contentList: {
    type: Array<any>,
    default: [1, 2, 3, 4, 5]
  },
  Pname: {
    type: String,
    default: ''
  },
  rowItemCount: {
    type: Number,
    default: 6
  }
})
const selected = ref(props.contentList[0])
const itemWidth = computed(() => {
  if (props.rowItemCount === 0) {
    return '25%'
  }
  else if (props.rowItemCount > props.contentList.length) {
    return `${100 / props.contentList.length}%`
  } else {
    return `${100 / props.rowItemCount}%`
  }
})

const emits = defineEmits<{
  (e: 'selected', result: Object): void
}>()

const selectItem = () => {
  emits('selected', { n: props.Pname, v: selected.value })
}

</script>
<style scoped>
* {
  box-sizing: border-box;
}

.selectContainer {
  padding: 5px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2px 0;
  width: 100%;
}

.content {
  padding: 2px 5px;
  min-width: 25%;
  text-align: center;
  background-color: lightgray;
  color: gray;
  cursor: pointer;
}

.content.active {
  background-color: teal;
  color: white;
}
</style>