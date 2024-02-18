<template>
  <div class="container">
    <div class="tabcontainer">
      <div class="tab">
        <button v-for="content in tabContent" :key="content" class="tabcontent"
          :class="{ selected: selectedTab === content }" @click="tabSelect">
          <p>{{ content }}</p>
        </button>
        <div class="line" ref="line"></div>
      </div>
      <div class="maincontent" :class="{ hidden: ishidden }">
        <h1>{{ selectedTab }}</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, quasi. Velit aut ab dolorem inventore, saepe
          necessitatibus fugit ex atque quod delectus hic iure magni ratione. At dicta veritatis quisquam!</p>
      </div>
    </div>
    <div class="overlay"></div>
  </div>
</template>

<script setup>
import { faL } from '@fortawesome/free-solid-svg-icons';

const tabContent = ['Beauty', 'Variety', 'Stationary', 'Interior']
const selectedTab = ref('Beauty')
const line = ref(null)
const tabSelect = (e) => {
  if (e.target.innerText === selectedTab.value) {
    ishidden.value = !ishidden.value
  } else {
    selectedTab.value = e.target.innerText
    line.value.style.width = e.target.offsetWidth + 'px'
    line.value.style.left = e.target.offsetLeft + 'px'
  }
}
const ishidden = ref(false)
</script>

<style scoped>
/* .container {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: navy;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
} */



* {
  font-family: 'poppins';
}

.tabcontainer {
  background-color: ghostwhite;
  backdrop-filter: blur(5px);
  padding: 30px;
  width: 600px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, .4);

}

.tab {
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: relative;
  border-bottom: 5px solid #c8c8c8;
  margin-bottom: -5px;
}

.tabcontent {
  background: none;
  border-style: none;
  cursor: pointer;
  font-size: 1.2em;
  padding-bottom: 20px;
  color: #c8c8c8;
  font-weight: 500;
  min-width: 120px;
}

.tabcontent.selected {
  color: black;
}

.line {
  position: absolute;
  width: 100px;
  height: 5px;
  background-color: teal;
  top: 49px;
  left: 8px;
  transition: all .3s ease-out;
}

.maincontent {
  margin: 20px 0;
  overflow: hidden;
  transition: all .4s ease-out;
  height: 200px;
  /* animation: switch .5s ease; */
}

@keyframes switch {
  from {
    transform: translateX(50px);
    opacity: 0;
  }

  to {
    transform: translateX(0px);
    opacity: 1;
  }

}

.maincontent.hidden {
  height: 0px;
  /* display: none; */
}

/* .overlay {
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(3px);
  position: absolute;
  animation: blur 1s ease-in-out;
}

@keyframes blur {
  from {
    backdrop-filter: blur(5px);
  }

  to {
    backdrop-filter: blur(0px);
  }
} */
</style>