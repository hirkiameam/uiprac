<template>
  <div class="container">
    <!-- <Selects label="領域" :contentList="['健康雑貨', 'バラエティ', '文具', '生活']" @selected="selected" Pname="a" />
    <Selects label="区分" :contentList="['a', 'v', 'c', 'd', 'e', 'f', 'g']" @selected="selected" Pname="b" /> -->
    <div class="contentWrapper">
      <div class="leftSide">
        <div class="inputBox">
          <label for="keyword">商品名</label>
          <input type="search" id="keyword" />
        </div>
        <div class="inputBox">
          <label for="oyaJan">親JAN</label>
          <input type="search" id="oyaJan" />
        </div>
        <div class="inputBox">
          <label for="brand">ブランド</label>
          <input type="search" id="brand" />
        </div>
        <div class="inputBox">
          <label for="brand">取引先</label>
          <input type="search" id="brand" />
        </div>
        <div class="inputBox">
          <label>基準商品区分</label>
          <Selects @selected="selected(result, event)" Pname="kbn" class="selects"
            :contentList="['全て', '一般', '必須', '基準', '過去基準']" />
        </div>
        <div class="inputBox">
          <label>小型商品区分</label>
          <Selects :rowItemCount=4 class="selects" :contentList="['全て', '-', '必須', '基準', '一般', 'オプション', '小型枠外']" />
        </div>
        <div class="inputBox">
          <label>自動補充</label>
          <Selects class="selects" :contentList="['全て', 'ON', 'OFF']" />
        </div>
        <div class="inputBox">
          <label>認定外</label>
          <Selects class="selects" :contentList="['全て', '認定枠内', '認定外', '認定外予定']" />
        </div>
        <div class="inputBox">
          <label>自主開発区分</label>
          <Selects :rowItemCount=7 class="selects" :contentList="['全て', 'なし', 'LF', 'LP', 'P限', 'N限', '海直']" />
        </div>
        <div class="inputBox between">
          <label for="keyword">登録日</label>
          <input type="search" id="keyword" />
          <span>〜</span>
          <input type="search" id="keyword" />
        </div>
        <div class="inputBox between">
          <label for="keyword">売価</label>
          <input type="search" id="keyword" />
          <span>〜</span>
          <input type="search" id="keyword" />
        </div>

      </div>
      <div class="rightSide">
        <p>LINE</p>
        <Selects @selected="updateLine" :rowItemCount=4 class="selects" :contentList="lineList" />
        <p>SUBLINE</p>
        <Selects @selected="updateSubLine" :rowItemCount=4 class="selects" :contentList="sublineList" />
        <p>ITEM</p>
        <Selects @selected="updateItem" :rowItemCount=4 class="selects" :contentList="ItemList" />
      </div>

      <div class="submitFooter">
        <button>検索</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const selected = (result, event) => {
  console.log(result),
    console.log(event)
}
const updateLine = (result) => {
  selectLine.value = result.v
  selectSubLine.value = ''
  selectItem.value = ''
}
const updateSubLine = (result) => {
  selectSubLine.value = result.v
}
const updateItem = (result) => {
  selectItem.value = result.v
}
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

const selectLine = ref(1)
const selectSubLine = ref()
const selectItem = ref()
const lineList = computed(() => {
  return Array.from(new Set(categoryList.map(itm => itm.line)))
})
const sublineList = computed(() => {
  const filterItem = categoryList.filter((ct) => {
    if (selectLine.value) {
      return ct.line === selectLine.value
    } else {
      return true
    }
  })
  return Array.from(new Set(filterItem.map(itm => itm.Subline)))
})
const ItemList = computed(() => {
  const filterItem = categoryList.filter((ct) => {
    if (selectSubLine.value) {
      return ct.Subline === selectSubLine.value
    } else {
      return true
    }
  })
  return Array.from(new Set(filterItem.map(itm => itm.Item)))
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 500px;

}

.contentWrapper {
  width: 100vw;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
}

.leftSide {
  max-width: 768px;
  width: 100%;
  padding: 20px;
}

.rightSide {
  background-color: aliceblue;
  max-width: 768px;
  width: 100%;
  padding: 20px;
  padding-bottom: 120px;
}

.submitFooter {
  color: white;
  position: fixed;
  right: 10px;
  bottom: 10px;
}

.inputBox {
  display: flex;
  align-items: center;
  padding: 5px;
}

.inputBox label {
  min-width: 10em;
  padding: 0 10px;
}

.inputBox input {
  padding: 5px;
  width: 60%;
}

.between input {
  width: 9em;

}
</style>