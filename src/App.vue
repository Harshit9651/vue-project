<!-- <template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script >
export default {
  name: 'App',
};
</script>

<style lang="scss" scoped>
#app{
  height: 100%;
  width: 100%;
}
body{
  height: 100%;
  width: 100%;
}

</style> -->



<template>
  <div id="app">
    <!-- Fabric.js canvas -->
    <div ref="canvasContainer" id="fabricCanvasContainer">
      <canvas id="fabricCanvas"></canvas>
    </div>

    <!-- Your UI components here, rendered on top of the canvas -->
    <div class="ui-overlay">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
// import { fabric } from "fabric"; 
import {fabric} from 'fabric-with-erasing'
export default {
  name: "App",
  setup() {
    onMounted(() => {
      // Initialize the Fabric.js canvas
      const canvas = new fabric.Canvas("fabricCanvas");
      canvas.setHeight(window.innerHeight);
      canvas.setWidth(window.innerWidth);

      // Example: Add a rectangle to the Fabric canvas
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "red",
        width: 200,
        height: 100,
      });
      canvas.add(rect);

      // Optionally, handle window resize to adjust canvas size
      window.addEventListener("resize", () => {
        canvas.setHeight(window.innerHeight);
        canvas.setWidth(window.innerWidth);
        canvas.renderAll();
      });
    });
  },
};
</script>

<style>
/* Make sure the canvas takes the full screen */
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

/* UI Overlay should appear above the canvas */
.ui-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2; /* Higher than the canvas */
  width: 100vw;
  height: 100vh;
  pointer-events: none; /* Allows fabric.js to handle mouse events */
}

.ui-overlay > * {
  pointer-events: auto; /* Enables interaction with UI components */
}
</style>

