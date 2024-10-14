 <!-- <template>
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


  console.log(`wrapper height ${canvasHeight}`)
  console.log(`wrapper width ${canvasWidth}`)

  canvas = new fabric.Canvas(canvasElement);

  fabric.Image.fromURL(
    "https://images.pexels.com/photos/12481165/pexels-photo-12481165.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    function (img) {
      console.log(`hii image height is ${img.height}`)
      console.log(`hii image width is ${img.width}`)
      const imgRatio = img.width / img.height;
      const wrapperRatio = canvasWidth / canvasHeight;

      let scaleX, scaleY, finalWidth, finalHeight;

      if (imgRatio > wrapperRatio) {
        scaleX = scaleY = canvasWidth / img.width;
        console.log(scaleX,scaleY)
        finalWidth = canvasWidth;
        console.log(`final width is :${finalWidth}`)
        finalHeight = img.height * scaleY;
      } else {
        scaleX = scaleY = canvasHeight / img.height;
        finalWidth = img.width * scaleX;
        finalHeight = canvasHeight;
        console.log(`final Height is ${finalHeight}`)
      }

      canvas.setWidth(finalWidth);
      canvas.setHeight(finalHeight);
      console.log(`final height of canva is ${finalHeight}`)
      console.log(`final width of canva is ${finalWidth}`)

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
</style> -->
<!-- 
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
  
  // Get the wrapper's dimensions
  const canvasWidth = canvasWrapper.clientWidth;
  const canvasHeight = canvasWrapper.clientHeight;

  console.log(`Wrapper height: ${canvasHeight}`);
  console.log(`Wrapper width: ${canvasWidth}`);

  canvas = new fabric.Canvas(canvasElement);

  fabric.Image.fromURL(
    "https://images.pexels.com/photos/6576802/pexels-photo-6576802.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    function (img) {
      console.log(`Image height: ${img.height}`);
      console.log(`Image width: ${img.width}`);

      // Image aspect ratio (width/height)
      const imgRatio = img.width / img.height;
      
      // Set the desired width to half the wrapper's width
      const desiredWidth = canvasWidth / 2;
      
      // Calculate the corresponding height using the image's aspect ratio
      // const desiredHeight = desiredWidth / imgRatio;
const desiredHeight = canvasHeight
      console.log(`Desired width: ${desiredWidth}`);
      console.log(`Desired height: ${desiredHeight}`);

      // Resize the canvas to the calculated dimensions
      canvas.setWidth(desiredWidth);
      canvas.setHeight(desiredHeight);

      // Scale the image proportionally
      img.set({
        scaleX: desiredWidth / img.width,
        scaleY: desiredHeight / img.height,
      });

      // Set the background image and render it
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
    background-color: bisque;
  }
}
</style>  -->

<template>
  <div class="page-wrapper">
    <div class="canvas-wrapper">
      <canvas id="canvas"></canvas>
    </div>
    <input type="file" @change="handleImageUpload" accept="image/*" />
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
  
  // Get the wrapper's dimensions
  const canvasWidth = canvasWrapper.clientWidth;
  const canvasHeight = canvasWrapper.clientHeight;

  console.log(`Wrapper height: ${canvasHeight}`);
  console.log(`Wrapper width: ${canvasWidth}`);

  canvas = new fabric.Canvas(canvasElement);

  fabric.Image.fromURL(
    imageUrl,
    function (img) {
      console.log(`Image height: ${img.height}`);
      console.log(`Image width: ${img.width}`);

      // Image aspect ratio (width/height)
      const imgRatio = img.width / img.height;
      
      // Set the desired width to half the wrapper's width
      const desiredWidth = canvasWidth / 2;
      
      // Calculate the corresponding height using the image's aspect ratio
      const desiredHeight = canvasHeight;
      
      console.log(`Desired width: ${desiredWidth}`);
      console.log(`Desired height: ${desiredHeight}`);

      // Resize the canvas to the calculated dimensions
      canvas.setWidth(desiredWidth);
      canvas.setHeight(desiredHeight);

      // Scale the image proportionally
      img.set({
        scaleX: desiredWidth / img.width,
        scaleY: desiredHeight / img.height,
      });

      // Set the background image and render it
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    }
  );
}

// Function to handle image upload
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageUrl = e.target.result; // Image URL from user upload
      initCanvas(imageUrl); // Reinitialize the canvas with uploaded image
    };
    reader.readAsDataURL(file);
  }
}

onMounted(() => {
  // Initialize with default image on first load
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
}
</style>
