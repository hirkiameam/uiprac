<template>
  <div class="outercontainer">
    <div class="outline">
      <button @click="initQuagga">start</button>
      <div class="result">
      </div>
      <div class="quaggaarea">
        <div id="camera-area" class="camera-area">
        </div>
        <div class="detect-area top"></div>
        <div class="detect-area left"></div>
        <div class="detect-area right"></div>
        <div class="detect-area bottom"></div>
      </div>
      <div class="cancel">
        <button class="cancelButton" @click="stopQuaaga">戻る</button>
      </div>
      <div class="finalResult"> {{ finalresult }}</div>
    </div>
    {{ cameras }}
  </div>
</template>

<script setup>
import Quagga from 'quagga'

const initQuagga = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  cameras.value = devices
  finalresult.value = ''
  resultList.value = []
  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.getElementById("camera-area"),
      constraints: { facingMode: "environment" },
      // area: { top: "20%", right: "0%", left: "0%", bottom: "20%" }
    },
    decoder: {
      readers: ["ean_reader"]
    },
    numOfWorkers: navigator.hardwareConcurrency || 4,
  }, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Initialization finished!!");
    Quagga.start();
  })
}
const stopQuaaga = () => {
  Quagga.stop()
  res.value = ''
}
Quagga.onProcessed(function (result) {
  let ctx = Quagga.canvas.ctx.overlay;
  let canvas = Quagga.canvas.dom.overlay;
  ctx.clearRect(0, 0, parseInt(canvas.width), parseInt(canvas.height));
  if (result) {
    if (result.box) {
      Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, ctx, { color: 'green', lineWidth: 4 });
    }
    if (result.codeResult && result.codeResult.code) {
      Quagga.ImageDebug.drawPath(result.line, { x: "x", y: "y" }, ctx, { color: 'red', lineWidth: 4 });
    }

  }
});


Quagga.onDetected(result => {
  let r = result.codeResult.code
  resultList.value.push(r)
  if (resultList.value.length > 10) {
    // stopscan()
    calculateResult()
    resultList.value = []
    Quagga.stop()
  }
  // Quagga.stop();
});
const cameras = ref()
const finalresult = ref()
const resultList = ref([])
const calculateResult = () => {
  let countList = []
  let uniqueCode = new Set(resultList.value)
  uniqueCode.forEach((cd) => {
    let r2 = resultList.value.filter((itm) => {
      return cd == itm
    })
    let returnObj = { code: cd, count: r2.length }
    countList.push(returnObj)
  })
  countList.sort((a, b) => (a.count > b.count ? -1 : 1))
  finalresult.value = countList[0].code
  resultList.value = []
}
</script>

<style>
.quaggaarea {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
}

#camera-area>canvas,
#camera-area>video {
  position: relative;
}

#camera-area>canvas.drawingBuffer {
  position: absolute;
  top: 0;
  left: 0;
}

#camera-area {
  position: relative;
  overflow: hidden;
}

.detect-area {
  position: absolute;
  top: 20%;
  left: 16%;
  bottom: 20%;
  right: 16%;
  border: 6px solid gray;
  z-index: 3;
}

/* .detect-area {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
}

.detect-area.left {
  height: 100%;
  width: 10%;
  z-index: 99;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
} */
.cancel {
  text-align: center;
}

.cancelButton {
  background-color: teal;
  border: none;
  outline: none;
  padding: 10px 30px;
  color: white;
  text-decoration: none;
  min-width: 120px;
  font-size: 1.2em;
  border-radius: 8px;
}

.cancelButton:link {
  color: white;
}

.outline {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100svh;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.4);
}

.finalResult {
  font-size: 2em;
  font-weight: 500;
}
</style>