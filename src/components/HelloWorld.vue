<template>
  <div>
    <button @click="toggleSidebar" v-if="showslidbarbuttonvisible">show more</button>
    <div class="slidbar" :style="{ display: isSidebarVisible ? 'flex' : 'none' }">
  
      <h2>Sidebar Content</h2>
      <i class="fa-solid fa-xmark"></i>
    </div>
    <div class="content" :class="{ 'shifted': isSidebarVisible }">
      <h1>fabric.js</h1>
      <div>
        <canvas id="fabricCanvas" style="border: 1px solid black"></canvas>
      </div>
      <div class="buttons">
        <button class="button" @click="drawRectangle">Draw Rectangle</button>
        <button class="button" @click="drawCircle">Draw Circle</button>
        <button class="button" @click="drawPancil">Draw Pencil</button>
        <label class="button" for="fileUpload">Upload Image</label>
        <input id="fileUpload" type="file" @change="uploadImage" accept="image/*" class="file-input" />
        <label class="button" for="bgColorPicker">Change Background Color</label>
        <input id="bgColorPicker" type="color" @input="changeBackgroundColor" hidden='true' class="color-picker button" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fabric } from "fabric-with-erasing";

const canvas = ref(null);
const isSidebarVisible = ref(false);
const showslidbarbuttonvisible = ref(true)

onMounted(() => {
  canvas.value = new fabric.Canvas("fabricCanvas");
  canvas.value.setWidth(1000);
  canvas.value.setHeight(500);
});

const drawRectangle = () => {
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: "red",
    height: 100,
    width: 100,
  });
  canvas.value.add(rect);
};

const drawCircle = () => {
  const circle = new fabric.Circle({
    left: 50,
    top: 10,
    fill: "pink",
    radius: 50,
  });
  canvas.value.add(circle);
};

const drawPancil = () => {
  canvas.value.isDrawingMode = true;
};

const uploadImage = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    fabric.Image.fromURL(e.target.result, function (img) {
      img.set({
        left: 10,
        top: 10,
        scaleX: 0.5,
        scaleY: 0.5,
      });
      canvas.value.add(img);
    });
  };
  reader.readAsDataURL(file);
};

const changeBackgroundColor = (event) => {
  const color = event.target.value;
  canvas.value.setBackgroundColor(color, canvas.value.renderAll.bind(canvas.value));
};

// Toggle sidebar visibility
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
  showslidbarbuttonvisible.value =!showslidbarbuttonvisible.value;
};
</script>

<style lang="scss" scoped>
@import '@fortawesome/fontawesome-free/css/all.css';
body {
  background-color: black;
  color: white;
}

.slidbar {
  top: 0;
  left: 0;
  width: 15%;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #007acc;
  padding: 1rem;
}

.content {
  transition: margin-left 0.3s ease; 
  margin-left: 0;
}

.shifted {
  margin-left: 15%;
}

canvas {
  height: 700px;
  width: 900px;
  background-color: rgb(41, 47, 47);
  border-radius: 1rem;
  border: 1px solid white;
}

.buttons {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;

  .button {
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    background-color: #007acc;
    color: white;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #005fa3;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .file-input,
  .color-picker {
    display: none;
  }

  #bgColorPicker {
    display: inline-block;
    cursor: pointer;
    padding: 0.3rem;
  }
}
</style>
