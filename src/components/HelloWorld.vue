<template>
  <div>
    <h1>fabric.js</h1>
    <div>
      <canvas
        id="fabricCanvas"
        width="800"
        heigh="600"
        style="border: 1px solid black"
      ></canvas>
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
const drawRectangle =()=>{
    const rect = new fabric.rect({
        left:100,
        top:100,
        fill:'red',
        height:100,
        width:100,
    })
    canvas.value.add(rect)
}
</script>
