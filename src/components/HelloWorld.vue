<template>
  <div>
    <!-- Sidebar Toggle Button -->
    <button
      class="button"
      @click="toggleSidebar"
      v-if="showslidbarbuttonvisible"
    >
      Show More
    </button>

    <!-- Sidebar with Fabric.js Features -->
    <div
      class="slidbar"
      :style="{ display: isSidebarVisible ? 'flex' : 'none' }"
    >
      <h2>Fabric.js Features</h2>

      <button @click="groupObjects" class="button-feature">Group Objects</button>
      <button @click="ungroupObjects" class="button-feature">Ungroup Objects</button>
      <button @click="bringToFront" class="button-feature">Bring to Front</button>
      <button @click="sendToBack" class="button-feature">Send to Back</button>
      
      <div class="color-picker-container">
        <label for="objectColorPicker">Change Object Color:</label>
        <input
          type="color"
          v-model="objectColor"
          @input="changeObjectColor"
          id="objectColorPicker"
          class="color-picker"
        />
      </div>
      
      <button @click="clearCanvas" class="button-feature">Clear Canvas</button>
      <button @click="checkslidbar" v-if="isslide" class="button-feature">Hide</button>
    </div>

    <!-- Main Content Area -->
    <div class="content" :class="{ shifted: isSidebarVisible }">
      <h1>Fabric.js Canvas</h1>
      <div>
        <!-- Undo and Redo Buttons -->
        <div class="undo-redo">
          <button @click="undo" class="button-undo-redo">Undo</button>
          <button @click="redo" class="button-undo-redo">Redo</button>
        </div>

        <!-- Fabric.js Canvas -->
        <canvas id="fabricCanvas"></canvas>
      </div>

      <!-- Drawing Tools -->
      <div class="buttons">
        <button class="button" @click="drawRectangle">Draw Rectangle</button>
        <button class="button" @click="drawCircle">Draw Circle</button>
        <button class="button" @click="drawPencil">Draw Pencil</button>
        
        <!-- Image Upload -->
        <label class="button" for="fileUpload">Upload Image</label>
        <input
          id="fileUpload"
          type="file"
          @change="uploadImage"
          accept="image/*"
          class="file-input"
        />

        <!-- Change Background Color -->
        <label class="button" for="bgColorPicker">Change Background Color</label>
        <input
          id="bgColorPicker"
          type="color"
          @input="changeBackgroundColor"
          hidden
          class="color-picker"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fabric } from "fabric-with-erasing";

// Reactive References
const canvas = ref(null);
const isSidebarVisible = ref(false);
const showslidbarbuttonvisible = ref(true);
const isslide = ref(false);
const canvasStates = ref([]);
const currentStateIndex = ref(-1);
const objectColor = ref("#ff0000"); // Default object color

// Initialize Fabric.js Canvas on Mount
onMounted(() => {
  canvas.value = new fabric.Canvas("fabricCanvas");
  canvas.value.setWidth(1000);
  canvas.value.setHeight(500);
  saveCanvasState();

  // Disable drawing mode initially
  canvas.value.isDrawingMode = false;

  // Event Listener to Save State on Object Modifications
  canvas.value.on('object:added', saveCanvasState);
  canvas.value.on('object:modified', saveCanvasState);
  canvas.value.on('object:removed', saveCanvasState);
});

// Save Canvas State for Undo/Redo Functionality
const saveCanvasState = () => {
  const json = canvas.value.toJSON();
  if (currentStateIndex.value < canvasStates.value.length - 1) {
    canvasStates.value = canvasStates.value.slice(0, currentStateIndex.value + 1);
  }
  canvasStates.value.push(json);
  currentStateIndex.value = canvasStates.value.length - 1;
};

// Undo Function
const undo = () => {
  if (currentStateIndex.value > 0) {
    currentStateIndex.value -= 1;
    restoreCanvasState(canvasStates.value[currentStateIndex.value]);
  }
};

// Redo Function
const redo = () => {
  if (currentStateIndex.value < canvasStates.value.length - 1) {
    currentStateIndex.value += 1;
    restoreCanvasState(canvasStates.value[currentStateIndex.value]);
  }
};

// Restore Canvas State from Saved State
const restoreCanvasState = (state) => {
  canvas.value.loadFromJSON(state, () => {
    canvas.value.renderAll();
  });
};

// Draw Rectangle
const drawRectangle = () => {
  canvas.value.isDrawingMode = false; // Disable drawing mode when drawing a shape
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: objectColor.value,
    height: 100,
    width: 100,
    selectable: true,
  });
  canvas.value.add(rect);
  saveCanvasState();
};

// Draw Circle
const drawCircle = () => {
  canvas.value.isDrawingMode = false; // Disable drawing mode when drawing a shape
  const circle = new fabric.Circle({
    left: 200,
    top: 100,
    fill: objectColor.value,
    radius: 50,
    selectable: true,
  });
  canvas.value.add(circle);
  saveCanvasState();
};

// Enable Drawing Mode (Pencil)
const drawPencil = () => {
  canvas.value.isDrawingMode = true; // Enable drawing mode for freehand drawing
  canvas.value.freeDrawingBrush.color = objectColor.value;
  canvas.value.freeDrawingBrush.width = 2;
  saveCanvasState();
};

// Upload Image to Canvas
const uploadImage = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    fabric.Image.fromURL(e.target.result, function (img) {
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.5,
        scaleY: 0.5,
        selectable: true,
      });
      canvas.value.add(img);
      saveCanvasState();
    });
  };
  reader.readAsDataURL(file);
};

// Change Background Color of Canvas
const changeBackgroundColor = (event) => {
  const color = event.target.value;
  canvas.value.setBackgroundColor(color, canvas.value.renderAll.bind(canvas.value));
  saveCanvasState();
};

// Toggle Sidebar Visibility
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
  showslidbarbuttonvisible.value = !showslidbarbuttonvisible.value;
  isslide.value = !isslide.value;
};

// Hide Sidebar
const checkslidbar = () => {
  isSidebarVisible.value = false;
  showslidbarbuttonvisible.value = true;
  isslide.value = false;
};

// Group Selected Objects
const groupObjects = () => {
  const activeSelection = canvas.value.getActiveObjects();
  if (activeSelection.length > 1) {
    const group = new fabric.Group(activeSelection);
    canvas.value.discardActiveObject();
    activeSelection.forEach((obj) => canvas.value.remove(obj)); // Remove objects from canvas
    canvas.value.add(group);
    canvas.value.renderAll();
    saveCanvasState();
  }
};

// Ungroup Selected Group
const ungroupObjects = () => {
  const activeGroup = canvas.value.getActiveObject();
  if (activeGroup && activeGroup.type === "group") {
    const items = activeGroup._objects;
    activeGroup._restoreObjectsState();
    canvas.value.remove(activeGroup);
    items.forEach((item) => canvas.value.add(item));
    canvas.value.renderAll();
    saveCanvasState();
  }
};

// Bring Selected Object to Front
const bringToFront = () => {
  const activeObject = canvas.value.getActiveObject();
  if (activeObject) {
    canvas.value.bringToFront(activeObject);
    canvas.value.renderAll();
    saveCanvasState();
  }
};

// Send Selected Object to Back
const sendToBack = () => {
  const activeObject = canvas.value.getActiveObject();
  if (activeObject) {
    canvas.value.sendToBack(activeObject);
    canvas.value.renderAll();
    saveCanvasState();
  }
};

// Change Color of Selected Object
const changeObjectColor = () => {
  const activeObject = canvas.value.getActiveObject();
  if (activeObject) {
    if (activeObject.type === 'group') {
      activeObject.getObjects().forEach((obj) => {
        obj.set('fill', objectColor.value);
      });
    } else {
      activeObject.set('fill', objectColor.value);
    }
    canvas.value.renderAll();
    saveCanvasState();
  }
};

// Clear Entire Canvas
const clearCanvas = () => {
  canvas.value.clear();
  canvas.value.setBackgroundColor('#ffffff', canvas.value.renderAll.bind(canvas.value));
  saveCanvasState();
};
</script>


<style lang="scss" scoped>
@import "@fortawesome/fontawesome-free/css/all.css";

/* Body Styles */
body {
  background-color: #f0f0f0;
  color: #333;
  font-family: Arial, sans-serif;
}

/* Sidebar Styles */
.slidbar {
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #007acc;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.button-feature {
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #005fa3;
  color: white;
  cursor: pointer;
  border: none;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #004080;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

/* Color Picker Container */
.color-picker-container {
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  color: white;

  label {
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
  }

  .color-picker {
    width: 100%;
    height: 30px;
    border: none;
    cursor: pointer;
  }
}

/* Main Content Styles */
.content {
  margin-left: 0;
  padding: 1rem;
  transition: margin-left 0.3s ease;
}

.shifted {
  margin-left: 250px;
}

/* Undo and Redo Buttons */
.undo-redo {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
}

.button-undo-redo {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #67349a;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #442d7c;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

/* Canvas Styles */
canvas {
  height: 500px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Drawing Tools Buttons */
.buttons {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.button {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #007acc;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: #005fa3;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

/* Hidden Inputs */
.file-input,
.color-picker {
  display: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .slidbar {
    width: 200px;
  }

  .shifted {
    margin-left: 200px;
  }

  canvas {
    height: 400px;
  }
}

@media (max-width: 480px) {
  .slidbar {
    width: 100%;
    height: auto;
    position: relative;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .content {
    margin-left: 0;
  }

  .shifted {
    margin-left: 0;
  }

  .buttons {
    flex-direction: column;
  }

  canvas {
    width: 100%;
    height: 300px;
  }
}
</style>
