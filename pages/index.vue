<template>
  <div class="container">
    <!-- <Selects label="領域" :contentList="['健康雑貨', 'バラエティ', '文具', '生活']" @selected="selected" Pname="a" />
    <Selects label="区分" :contentList="['a', 'v', 'c', 'd', 'e', 'f', 'g']" @selected="selected" Pname="b" /> -->
    <div class="contentWrapper">
      <div class="leftSide">
        <div class="inputBox">
          <label for="keyword">商品名</label>
          <input type="search" id="keyword" placeholder="商品名・キーワード" ref="input" />
        </div>
        <div class="inputBox">
          <label for="oyaJan">親JAN</label>
          <input type="search" id="oyaJan" placeholder="親JANコード" />
        </div>
        <div class="inputBox">
          <label for="brand">ブランド</label>
          <input type="search" id="brand" placeholder="ブランド名称" />
        </div>
        <div class="inputBox">
          <label for="torihikisaki">取引先</label>
          <input type="search" id="torihikisaki" placeholder="取引先コード" />
        </div>
        <div class="inputBox">
          <label>基準商品区分</label>
          <Selects @selected="selected($event, 1)" Pname="kbn" class="selects"
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
          <input type="search" id="keyword" placeholder="yyyymmdd" />
          <span>〜</span>
          <input type="search" id="keyword" placeholder="yyyymmdd" />
        </div>
        <div class=" inputBox between">
          <label for="keyword">売価</label>
          <input type="search" id="keyword" placeholder="0" />
          <span>〜</span>
          <input type="search" id="keyword" placeholder="0" />
        </div>

      </div>
      <div class="rightSide">
        <CatSelector />
      </div>

      <div class="submitFooter">
        <button>検索</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const selected = (result, num) => {
  console.log(result)
  console.log(num)
}
// const input = ref(null)
// onMounted(() => {
//   input.value.focus()
// })
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
  /* background-color: aliceblue; */
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