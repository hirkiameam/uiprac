<template>
  <div>
    <p>selectedLine:{{ selectedLine }}</p>
    <p>inputtest: {{ input || 'notInput' }}</p>
    <p>selecteDItem: {{ selectedItem }}</p>
    <div class="searchBox" v-if="searchBox">
      <input id="searchInput" type="search" v-model="input">
      <label for="searchInput">検索条件を入力</label>
    </div>
    <div class="chips">
      <span class="chip" v-for="category in categoryList" :key="categoryList" @click="() => {
        selectedLine = category
        selectedItem = ''
      }" :class="{ selected: selectedLine === category }">
        {{ category }}
      </span>
    </div>
    <div class="sublinechips">
      <span class="chip" v-for="subline in filteredSubline" :key="subline.subline" @click="() => {
        selectedItem = subline.subline
      }" :class="{ selected: selectedItem === subline.subline }">
        {{ subline.subline }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  categoryList: {
    type: Array,
    default: ['Beauty', 'Variety', 'Stationary', 'Interior', 'all']
  },
  searchBox: {
    type: Boolean,
    default: true
  }
})
const childItems = [
  { line: 'Beauty', subline: 'b1' },
  { line: 'Beauty', subline: 'b2' },
  { line: 'Beauty', subline: 'b3' },
  { line: 'Beauty', subline: 'b4' },
  { line: 'Beauty', subline: 'b5' },
  { line: 'Variety', subline: 'v1' },
  { line: 'Variety', subline: 'v2' },
  { line: 'Variety', subline: 'v3' },
  { line: 'Variety', subline: 'v4' },
  { line: 'Variety', subline: 'v5' },
  { line: 'Stationary', subline: 's1' },
  { line: 'Stationary', subline: 's2' },
  { line: 'Stationary', subline: 's3' },
  { line: 'Stationary', subline: 's4' },
  { line: 'Stationary', subline: 's5' },
  { line: 'Interior', subline: 'i1' },
  { line: 'Interior', subline: 'i2' },
  { line: 'Interior', subline: 'i3' },
  { line: 'Interior', subline: 'i4' },
  { line: 'Interior', subline: 'i5' },
]
const selectedLine: any = ref('all')
const filteredSubline = computed(() => {
  let firstResult = []
  if (selectedLine.value === 'all') {
    firstResult = childItems
  } else {
    firstResult = childItems.filter((item) => {
      return item.line === selectedLine.value
    })
  }
  firstResult = firstResult.filter((item) => {
    return item.subline.includes(input.value)
  })
  if (firstResult.length === 1) {
    selectedItem.value = firstResult[0].subline
  }
  return firstResult
})
const input = ref('')
const selectedItem = ref('')

</script>
<style scoped>
* {
  font-family: 'poppins';
}

.chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.chip.selected {
  background-color: skyblue;
}

.sublinechips {
  justify-content: flex-start;

}

.sublinechips .chip {
  display: inline-block;
  min-width: 100px;
  padding: 2px 10px;
  margin: 2px 5px;
  text-align: center;
  border-radius: 10px;
  outline: 1px solid black;
}

input {
  padding: 15px;
  outline: none;
  border-style: none;
  font-weight: normal;
  font-size: 1.2em;
  border-bottom: 3px solid lightslategray;
  width: 30vw;
  background-color: ghostwhite;
  transition: all .3s;
}

input:focus {
  border-bottom: 3px solid teal;
  background-color: aliceblue;
  transform: translateY(10px);
  padding-top: 30px;
}

.searchBox {
  position: relative;
}

.searchBox label {
  position: absolute;
  left: 7px;
  top: 25%;
}

.searchBox input:focus~label .searchBox :valid:focus~label {
  transform: translate(-7px) scale(.8);
}
</style>