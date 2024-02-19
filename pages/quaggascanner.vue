
<template>
    <div class="container">
        <div class="resultLink">
            <h1>result:{{ finalresult }}</h1>
            <h1>{{ resultList.length }}</h1>
        </div>
        <div id="my_container">
            <div id="my_quagga">
            </div>
        </div>
        <div>
            <button @click="startscan()">start</button>
            <button @click="stopscan()">stop</button>
        </div>
        <p v-for="r in resultList">
            {{ r }}
        </p>
    </div>
</template>

<script setup>
import Quagga from 'quagga';
const coderesult = ref('バーコードをスキャン')
// onMounted(() => {
//     startscan()
// })
const startscan = (() => {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.getElementById("my_quagga")
        },
        decoder: {
            readers: ["ean_reader"]
        },
        numOfWorkers: 10,
    }, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Initialization finished!!");
        Quagga.start();
    });
    Quagga.onProcessed(result => {
        if (result == null) return;
        if (typeof (result) != "object") return;
        if (result.boxes == undefined) return;
        const ctx = Quagga.canvas.ctx.overlay;
        const canvas = Quagga.canvas.dom.overlay;
        ctx.clearRect(0, 0, parseInt(canvas.width), parseInt(canvas.height));
        // Quagga.ImageDebug.drawPath(result.box,
        //     { x: 0, y: 1 }, ctx, { color: "blue", lineWidth: 5 });
    });
    Quagga.onDetected(result => {
        console.log(result.codeResult);
        let r = result.codeResult.code
        resultList.value.push(r)
        if (resultList.value.length > 10) {
            // stopscan()
            calculateResult()
        }
        // Quagga.stop();
    });
})
const stopscan = () => {
    console.log("Stop!!");
    Quagga.stop();
}
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

const finalresult = ref()
const resultList = ref([])
</script>



<style scoped>
#my_container {
    width: 100svw;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-flow: row;
}

#my_quagga {
    position: relative;
    margin: auto;
}

#my_quagga video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
}

#my_quagga canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 2;
}

.drawingBuffer {
    position: absolute;
    left: 0;
}

.resultLink {
    text-align: center;
    background-color: lightgray;
}

.read {
    background-color: lightgreen;
}

#my_quagga>video,
#my_quagga>canvas {
    width: 100%;
}

#my_quagga>canvas {
    position: absolute;
    top: 0;
    left: 0;
}
</style>