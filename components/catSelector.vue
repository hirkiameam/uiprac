<template>
  <div>
    <div>
      <p>アイテム検索</p>
      <input type="text" v-model="input" placeholder="アイテムコード・名称でフィルター">
      <button @click="() => {
        resetValues()
      }">reset</button>
    </div>

    <p>領域</p>
    <div class="selectContainer">
      <div v-for="content in lineList" :key="content" class="content" :class="{ active: selectedLine === content }"
        @click="() => {
          selectedLine = selectedLine === content ? '' : content
          selectedSubLine = ''
          selectedItem = ''
          selectItem()
        }
          " :style="`min-width:25%;`">
        <p>{{ content }}</p>
      </div>
    </div>
    <p>ライン</p>
    <div class="selectContainer">
      <div v-for="content in subLineList" :key="content" class="content" :class="{ active: selectedSubLine === content }"
        @click="() => {
          // selectedLine = categoryList.filter((itm) => {
          //   return itm.Subline === content
          // })[0].line
          selectedLine = cattegoryFilter('Subline', 'line', content)
          selectedSubLine = selectedSubLine === content ? '' : content
          selectedItem = ''
          selectItem()
        }
          " :style="`min-width:25%;`">
        <p>{{ content }}</p>
      </div>
    </div>
    <p>アイテム</p>
    <div class="selectContainer" v-if="input || selectedSubLine">
      <div v-for="content in itemList" :key="content" class="content" :class="{ active: selectedItem === content }"
        @click="() => {
          // selectedLine = categoryList.filter((itm) => {
          //   return itm.Item === content
          // })[0].line
          // selectedSubLine = categoryList.filter((itm) => {
          //   return itm.Item === content
          // })[0].Subline
          selectedLine = cattegoryFilter('Item', 'line', content)
          selectedSubLine = cattegoryFilter('Item', 'Subline', content)
          selectedItem = selectedItem === content ? '' : content
          selectItem()
        }
          " :style="`min-width:25%;`">
        <p>{{ content }}</p>
      </div>
    </div>
    {{ resultValue }}
  </div>
</template>

<script setup lang="ts">
const categoryList = [
  { line: 1, Subline: 10, Item: 1000 },
  { line: 1, Subline: 10, Item: 1001 },
  { line: 1, Subline: 11, Item: 1002 },
  { line: 1, Subline: 11, Item: 1003 },
  { line: 1, Subline: 11, Item: 1004 },
  { line: 1, Subline: 12, Item: 1005 },
  { line: 1, Subline: 12, Item: 1006 },
  { line: 1, Subline: 12, Item: 1007 },
  { line: 1, Subline: 12, Item: 1008 },
  { line: 1, Subline: 12, Item: 1009 },
  { line: 2, Subline: 20, Item: 2000 },
  { line: 2, Subline: 20, Item: 2001 },
  { line: 2, Subline: 21, Item: 2002 },
  { line: 2, Subline: 21, Item: 2003 },
  { line: 2, Subline: 21, Item: 2004 },
  { line: 2, Subline: 22, Item: 2005 },
  { line: 2, Subline: 22, Item: 2006 },
  { line: 2, Subline: 22, Item: 2007 },
  { line: 2, Subline: 22, Item: 2008 },
  { line: 2, Subline: 22, Item: 2009 },
  { line: 4, Subline: 40, Item: 4000 },
  { line: 4, Subline: 40, Item: 4001 },
  { line: 4, Subline: 41, Item: 4002 },
  { line: 4, Subline: 41, Item: 4003 },
  { line: 4, Subline: 41, Item: 4004 },
  { line: 4, Subline: 42, Item: 4005 },
  { line: 4, Subline: 42, Item: 4006 },
  { line: 4, Subline: 42, Item: 4007 },
  { line: 4, Subline: 42, Item: 4008 },
  { line: 4, Subline: 42, Item: 4009 },
  { line: 3, Subline: 30, Item: 3000 },
  { line: 3, Subline: 30, Item: 3001 },
  { line: 3, Subline: 31, Item: 3002 },
  { line: 3, Subline: 31, Item: 3003 },
  { line: 3, Subline: 31, Item: 3004 },
  { line: 3, Subline: 32, Item: 3005 },
  { line: 3, Subline: 32, Item: 3006 },
  { line: 3, Subline: 32, Item: 3007 },
  { line: 3, Subline: 32, Item: 3008 },
  { line: 3, Subline: 32, Item: 3009 },
]
const cattegoryFilter = (level, resultLevel, key) => {
  return categoryList.filter((itm) => {
    return itm[level] === key
  })[0][resultLevel]
}
const input = ref()
const selectedLine = ref()
const selectedSubLine = ref()
const selectedItem = ref()
const resultValue = computed(() => {
  return {
    line: selectedLine.value,
    subline: selectedSubLine.value,
    item: selectedItem.value
  }
})

const objToList = (obj: any, key: string) => {
  return Array.from(new Set(obj.map(itm => itm[key]))).sort()
}

const lineList = computed(() => {
  return objToList(categoryList, 'line')
})
const subLineList = computed(() => {
  let filterList = categoryList.filter((itm) => {
    if (selectedLine.value) {
      return itm.line === selectedLine.value
    } else {
      return true
    }
  })
  return objToList(filterList, 'Subline')
})
const itemList = computed(() => {

  let filterList = categoryList.filter((itm) => {
    if (input.value) {
      return itm.Item == input.value
    } else {
      return true
    }
  })
  if (filterList.length === 1) {
    selectedItem.value = filterList[0].Item
    selectedLine.value = filterList[0].line
    selectedSubLine.value = filterList[0].Subline
    selectItem()
  } else if (filterList.length === 0) {
    selectedItem.value = ''
  }
  filterList = filterList.filter((itm) => {
    if (selectedSubLine.value) {
      return (itm.line == selectedLine.value && itm.Subline === selectedSubLine.value)
    } else {
      return true
    }
  })
  return objToList(filterList, 'Item')
})

const resetValues = () => {
  selectedLine.value = ''
  selectedSubLine.value = ''
  selectedItem.value = ''
}

// const itemWidth = computed(() => {
//   if (props.rowItemCount === 0) {
//     return '25%'
//   }
//   else if (props.rowItemCount > props.contentList.length) {
//     return `${100 / props.contentList.length}%`
//   } else {
//     return `${100 / props.rowItemCount}%`
//   }
// })

const emits = defineEmits<{
  (e: 'selected', result: Object): void
}>()

const selectItem = () => {
  emits('selected', resultValue.value)
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

input {
  padding: 5px;
  width: 60%;
}
</style>