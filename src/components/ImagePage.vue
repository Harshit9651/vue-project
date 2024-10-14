<template>
  <div class="page-wrapper">
    <div class="canvas-wrapper">
      <canvas id="canvas"></canvas>
    </div>
    <label for="file-upload" class="custom-file-upload">
      Upload Image
    </label>
    <input id="file-upload" type="file" @change="handleImageUpload" accept="image/*" />
  </div>
</template>

<script setup>
import { fabric } from "fabric-with-erasing";
import { onMounted } from "vue";

let canvasElement;
let canvas;

function initCanvas(imageUrl) {
  canvasElement = document.getElementById("canvas");

  const canvasWrapper = document.querySelector(".canvas-wrapper");

  const canvasWidth = canvasWrapper.clientWidth;
  const canvasHeight = canvasWrapper.clientHeight;

  canvas = new fabric.Canvas(canvasElement);

  fabric.Image.fromURL(
    imageUrl,
    function (img) {
      const imgRatio = img.width / img.height;
      const desiredWidth = canvasWidth / 2;
      const desiredHeight = canvasHeight;

      canvas.setWidth(desiredWidth);
      canvas.setHeight(desiredHeight);

      img.set({
        scaleX: desiredWidth / img.width,
        scaleY: desiredHeight / img.height,
      });

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    }
  );
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageUrl = e.target.result;
      initCanvas(imageUrl);
    };
    reader.readAsDataURL(file);
  }
}

onMounted(() => {
  const defaultImageUrl = "https://images.pexels.com/photos/6576802/pexels-photo-6576802.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
  initCanvas(defaultImageUrl);
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
    background-color: bisque;
  }
  input[type="file"] {
    display: none;
  }
  .custom-file-upload {
    margin-top: 1rem;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  .custom-file-upload:hover {
    background-color: #d3c0a4;
  }
}
</style>
