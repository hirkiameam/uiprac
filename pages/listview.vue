<template></template>
<div id="interactive" class="viewport"></div>

<script setup>
import Quagga from 'quagga';

const config = {
  // カメラの映像の設定
  inputStream: {
    type: "LiveStream",
    // カメラ映像を表示するHTML要素の設定
    target: document.querySelector("#interactive"),
    // バックカメラの利用を設定. (フロントカメラは"user")
    constraints: { facingMode: "environment" },
    // 検出範囲の指定: 上下30%は対象外
    area: { top: "30%", right: "0%", left: "0%", bottom: "30%" }
  },
  // 解析するワーカ数の設定
  numOfWorkers: navigator.hardwareConcurrency || 4,
  // バーコードの種類を設定: ISBNは"ean_reader"
  decoder: { readers: ["ean_reader"] }
}

</script>