<template>
  <div class="container">
    <span>
      <svg viewBox="0 0 24 24">
        <path :d="icr" />
      </svg>
    </span>
    <div class="transparent" v-if="!setVisible" @click="setVisible = true">
    </div>
    <div class="rightside">
      <p class="set" @click="() => {
        setVisible = !setVisible
        inputFocus()
      }">{{ store }}</p>
      <div class="setWindow" :class="{ hidden: setVisible }">
        <p>modify code</p>
        <input id="inpId" :placeholder="store" type="number" @keydown="(e) => {
          if (e.key === 'Enter') {
            if (e.target.value !== '' && e.target.value.length === 3) {
              store = e.target.value;
              e.target.value = ''
              setVisible = true
              inputFocus()
            }
          }
        }">
      </div>
    </div>
    <div class="title">
      <h1>
        seach Example Sample
      </h1>
    </div>
    <div class="selectChips">
      <p @click="selectedchip = chip" :class="{ selected: selectedchip == chip }" v-for="chip in chipsValue">
        {{ chip }}
      </p>
    </div>
    <div class="searchbox">
      <p class="magni">
        <input @keydown="async (e) => {
          if (e.key === 'Enter' && !e.isComposing) {
            await navigateTo({
              path: '/s/search',
              query: {
                w: input,
                cat: selectedchip != 'all' ? selectedchip : undefined
              }
            })
          }
        }" v-model="input" type="search" class="search"
          placeholder="input product code or search words then press enter">
        <svg class="magnify" viewBox="0 0 24 24">
          <path :d="mag" />
        </svg>
      </p>
    </div>
    <div class="functions">
      <div class="func">
        <div class="funcContent">
          function1
        </div>
      </div>
      <div class="func">
        <div class="funcContent">
          function2
        </div>
      </div>
      <div class="func">
        <div class="funcContent">
          function3
        </div>
      </div>
    </div>
    <p class="homeicon" @click="draw = !draw">
      <svg viewBox="0 0 24 24">
        <path :d="bcd" />
      </svg>
    </p>
    <div class="draw" :class="{ open: draw }">
      <ul>
        <li>
          <svg viewBox="0 0 24 24">
            <path :d="home" />
          </svg>
          <span>home</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  user-select: none;
}

.draw {
  width: 20px;
  height: 0px;
  background-color: beige;
  transition: height 1s ease-in-out, width 1.5s .6s ease-in-out;
  /* transition: width 1.5s ease-in-out; */
  overflow: hidden;
}

.draw.open {
  height: 300px;
  width: 200px;
}


.container {
  height: 100lvh;
  position: relative;
}

svg {
  width: 1em;
  height: 1em;
}

.rightside {
  display: flex;
  justify-content: right;
  position: relative;
}

.title {
  text-align: center;
  margin-bottom: 40px;
}

.selectChips {
  display: flex;
  justify-content: center;
}

.selectChips p {
  font-size: 8px;
  margin: .2em;
  width: 8em;
  background-color: #EEE;
  padding: .5em;
  text-align: center;
  border-radius: 3em;
  cursor: pointer;
  transition: background-color .5s;
}

.selectChips p:hover {
  background-color: rgb(194, 247, 229);
}

.selectChips p.selected {
  background-color: aquamarine;
}

.searchbox {
  margin: 20px;
  display: flex;
  justify-content: center;
}

.magni {
  display: flex;
  align-items: center;
}

.homeicon {}

.magnify {
  transform: translateX(-2em);
}

.search {
  width: 95%;
  max-width: 680px;
  padding: 1em 2em;
  border-radius: 2em;
  border: 1px solid #999;
}

.search:hover {
  background-color: azure;
}

.search:focus {
  border: 2px solid teal;
  outline: 4px solid rgb(121, 203, 203);
}

.functions {
  margin: 0 auto;
  width: 95%;
  max-width: 680px;
  display: flex;
  justify-content: space-around;
}

.func {
  margin: .3em;
  border-radius: 1em;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .4s;
}

.func:hover {
  background-color: RGBA(240, 240, 240, .5);
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1);
}

.func:active {
  background-color: RGBA(240, 240, 240, .9);
}

.set {
  text-align: center;
  width: 4em;
  height: 30px;
  padding: .2em;
  border-radius: 1em;
  background-color: aliceblue;
  cursor: pointer;
  position: relative;
  margin: 10px 20px 0 0;
}

.set:hover {
  background-color: aquamarine;
}

.setWindow {
  position: absolute;
  top: 2.5em;
  right: 0;
  width: 200px;
  height: 100px;
  background-color: aliceblue;
  border-radius: 1em;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: .3em;
  transition: opacity .3s ease;
}

.setWindow p {
  margin-top: 7px;
}

.setWindow input {
  text-align: center;
  padding: .2em;
  width: 5em;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.setWindow.hidden {
  opacity: 0;
}

.transparent {
  position: absolute;
  top: 0;
  left: 0;
  height: 100lvh;
  width: 100lvw;
}

.homeicon {
  width: 2em;
  height: 2em;
  background-color: teal;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 3px 3px 1px lightgray;
  cursor: pointer;
  transition: opacity .3s ease-in;
}

.homeicon:hover {
  opacity: .6;
}

.homeicon svg {
  fill: white;
  width: 1.2em;
  height: 1.2em;
}
</style>

<script setup>

const chipsValue = ['beauty', 'variety', 'stationary', 'housegoods', 'all']
const selectedchip = ref('all')
const input = ref('')
const setVisible = ref(true)
const store = ref('200')
const inputFocus = () => {
  if (!setVisible.value) {
    document.getElementById('inpId').focus()
  } else {
    document.getElementById('inpId').blur()
  }
}
onMounted((e) => {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !setVisible.value) {
      setVisible.value = true
      inputFocus()
    } else if (e.key === 's' && setVisible.value && e.target.nodeName != 'INPUT') {
      setVisible.value = false
      e.preventDefault()
      inputFocus()
    }
  })
})

import { mdiChevronRight, mdiMagnify, mdiHome, mdiBarcode } from '@mdi/js'
const icr = mdiChevronRight
const mag = mdiMagnify
const home = mdiHome
const bcd = mdiBarcode
const draw = ref(false)
</script>