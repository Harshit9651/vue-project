<template>
  <div class="page-wrapper">
    <div class="canvas-wrapper"><canvas id="canvas"></canvas></div>
  </div>
</template>

<script setup>
import { fabric } from "fabric-with-erasing";
import { onMounted, ref } from "vue";

let canvasElement;
let canvas;

function initCanvas() {
  canvasElement = document.getElementById("canvas");

  canvas = new fabric.Canvas(canvasElement, {
    height: 500,
    width: 500,
  });

  fabric.Image.fromURL(
    "https://images.pexels.com/photos/16465970/pexels-photo-16465970/free-photo-of-a-woman-posing-in-a-vast-yellow-flower-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    function (img) {
      img.set({
        left: 0,
        top: 0,
        scaleX: 1,
        scaleY: 1,
        width: 500,
        height: 500,
      });
      canvas.add(img);
    }
  );
}

onMounted(() => {
  initCanvas();
});
</script>

<style lang="scss" scoped>
.page-wrapper {
  .canvas-wrapper {
    width: 31.25rem;
    height: 31.25rem; 
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-box-shadow: 1px -4px 15px -1px rgba(110, 62, 110, 1);
    -moz-box-shadow: 1px -4px 15px -1px rgba(110, 62, 110, 1);
    box-shadow: 1px -4px 15px -1px rgba(110, 62, 110, 1);
  }
}
</style>
