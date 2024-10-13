<template>
  <div>
    <h1>fabric.js</h1>
    <div>
      <canvas id="fabricCanvas" style="border: 1px solid black"></canvas>
    </div>
    <!-- buttons -->
    <div class="buttons">
      <button @click="drawRectangle">Draw Reactangle</button>
      <button @click="drawCircle">Draw Circle</button>
      <button @click="drawPancil">Drawpancile</button>
      <input type="file" @change="uploadImage" accept="image/*" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { fabric } from "fabric-with-erasing";
const canvas = ref(null);
onMounted(() => {
  canvas.value = new fabric.Canvas("fabricCanvas");
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
const drawCircle = ()=>{
  const circle = new fabric.Circle({
   left:50,
   top:10,
   fill:'pink',
   radius:50,
  })
  canvas.value.add(circle)
}
const drawPancil = ()=>{
  canvas.value.isDrawingMode =true
}
const uploadImage = (event)=>{
  const file = event.target.files[0];
  if(!file) return
  const reader = new FileReader();
  reader.onload = function(e){
    fabric.Image.fromURL(e.target.result,function(img){
      img.set({
        left:10,
        top:10,
        scaleX:0.5,
        scaleY:0.5
      })
      canvas.value.add(img)
    })
  }
  reader.readAsDataURL(file)
}
</script>
<style lang="scss" scoped>
canvas {
  height: 700px;
  width: 900px;
  background-color: aqua;
}
</style>
