<template>
  <div id="app">
    <div ref="canvasContainer" id="fabricCanvasContainer">
      <canvas id="fabricCanvas"></canvas>
    </div>

    <ShapeAdder v-if="fabricCanvas" :canvas="fabricCanvas" />

    <div class="ui-overlay">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { fabric } from "fabric-with-erasing";
import ShapeAdder from "./components/ShapeAdder.vue";

export default {
  name: "App",
  components: {
    ShapeAdder,
  },
  setup() {
    const fabricCanvas = ref(null);

    onMounted(() => {
      const canvas = new fabric.Canvas("fabricCanvas");
      fabricCanvas.value = canvas;

      canvas.setHeight(window.innerHeight);
      canvas.setWidth(window.innerWidth);

      window.addEventListener("resize", () => {
        canvas.setHeight(window.innerHeight);
        canvas.setWidth(window.innerWidth);
        canvas.renderAll();
      });
    });

    return {
      fabricCanvas,
    };
  },
};
</script>
<style>
#fabricCanvasContainer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

#fabricCanvas {
  display: block;
  width: 100vw;
  height: 100vh;
}

.ui-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.ui-overlay > * {
  pointer-events: auto;
}
</style>
