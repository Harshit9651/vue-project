<template>
  <div class="page-wrapper">
    <div class="canvas-wrapper">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { fabric } from "fabric-with-erasing";
import { onMounted } from "vue";

let canvasElement;
let canvas;

function initCanvas() {
  canvasElement = document.getElementById("canvas");

  const canvasWrapper = document.querySelector(".canvas-wrapper");

  const canvasWidth = canvasWrapper.clientWidth;
  const canvasHeight = canvasWrapper.clientHeight;

  canvas = new fabric.Canvas(canvasElement);

  fabric.Image.fromURL(
    "https://images.pexels.com/photos/16465970/pexels-photo-16465970/free-photo-of-a-woman-posing-in-a-vast-yellow-flower-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    function (img) {
      const imgRatio = img.width / img.height;
      const wrapperRatio = canvasWidth / canvasHeight;

      let scaleX, scaleY, finalWidth, finalHeight;

      if (imgRatio > wrapperRatio) {
        scaleX = scaleY = canvasWidth / img.width;
        finalWidth = canvasWidth;
        finalHeight = img.height * scaleY;
      } else {
        scaleX = scaleY = canvasHeight / img.height;
        finalWidth = img.width * scaleX;
        finalHeight = canvasHeight;
      }

      canvas.setWidth(finalWidth);
      canvas.setHeight(finalHeight);

      img.set({
        scaleX,
        scaleY,
      });

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    }
  );
}

onMounted(() => {
  initCanvas();
});
</script>

<style lang="scss" scoped>
.page-wrapper {
  height: 100%;
  width: 100%;
  .canvas-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70vw;
    height: 80vh;
    box-shadow: 1px -4px 15px -1px rgba(110, 62, 110, 1);
    background-color: rgb(247, 106, 18);
  }
  canvas {
    // border: 1px solid #ccc;
    background-color: bisque;
  }
}
</style>
