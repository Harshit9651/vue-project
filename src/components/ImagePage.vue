<!-- <template>
  <div class="page-wrapper">
    <div class="canvas-wrapper"><canvas id="canvas"></canvas></div>
  </div>
</template>

<script setup>
import { fabric } from "fabric-with-erasing";
import { onMounted } from "vue";

let canvasElement;
let canvas;

function initCanvas() {
  canvasElement = document.getElementById("canvas");

  canvas = new fabric.Canvas(canvasElement);

  fabric.Image.fromURL(
    "https://images.pexels.com/photos/16465970/pexels-photo-16465970/free-photo-of-a-woman-posing-in-a-vast-yellow-flower-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    function (img) {
      img.set({
        height: 500,
        width: 500,
        scaleX: 1,
      });
      canvas.setWidth(img.width);
      canvas.setHeight(img.height);

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: 1,
        scaleY: 1,
      });
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
    -webkit-box-shadow: 1px -4px 15px -1px rgba(110, 62, 110, 1);
    -moz-box-shadow: 1px -4px 15px -1px rgba(110, 62, 110, 1);
    box-shadow: 1px -4px 15px -1px rgba(110, 62, 110, 1);
    background-color: rgb(247, 106, 18);
  }
  canvas {
    border: 1px solid #ccc;
    background-color: bisque;
  }
}
</style> -->


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

  // Get the canvas-wrapper element
  const canvasWrapper = document.querySelector(".canvas-wrapper");

  // Set up canvas width and height according to the wrapper
  const canvasWidth = canvasWrapper.clientWidth;
  const canvasHeight = canvasWrapper.clientHeight;

  canvas = new fabric.Canvas(canvasElement);

  fabric.Image.fromURL(
    "https://images.pexels.com/photos/16465970/pexels-photo-16465970/free-photo-of-a-woman-posing-in-a-vast-yellow-flower-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    function (img) {
      // Get the aspect ratio of the image
      const imgRatio = img.width / img.height;
      const wrapperRatio = canvasWidth / canvasHeight;

      let scaleX, scaleY, finalWidth, finalHeight;

      // Determine whether to scale based on width or height
      if (imgRatio > wrapperRatio) {
        // Image is wider than the wrapper, scale based on width
        scaleX = scaleY = canvasWidth / img.width;
        finalWidth = canvasWidth;
        finalHeight = img.height * scaleY;
      } else {
        // Image is taller or proportional, scale based on height
        scaleX = scaleY = canvasHeight / img.height;
        finalWidth = img.width * scaleX;
        finalHeight = canvasHeight;
      }

      // Set the canvas dimensions to match the scaled image
      canvas.setWidth(finalWidth);
      canvas.setHeight(finalHeight);

      img.set({
        scaleX,
        scaleY,
      });

      // Set the image as the background
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
    border: 1px solid #ccc;
    background-color: bisque;
  }
}
</style>
