<template>
    <div class="shape-adder">
      <h2>Add Shapes to Fabric.js Canvas</h2>
      <button @click="addRectangle">Add Rectangle</button>
      <button @click="addCircle">Add Circle</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "ShapeAdder",
    props: {
      canvas: Object, // Pass the fabric canvas as a prop
    },
    methods: {
      addRectangle() {
        const rect = new fabric.Rect({
          left: 50,
          top: 50,
          fill: "blue",
          width: 100,
          height: 100,
        });
        this.canvas.add(rect); // Add rectangle to the canvas
      },
      addCircle() {
        const circle = new fabric.Circle({
          left: 150,
          top: 150,
          radius: 50,
          fill: "green",
        });
        this.canvas.add(circle); // Add circle to the canvas
      },
    },
  };
  </script>
  
  <style scoped>
  .shape-adder {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 3; 
  }
  button {
    margin: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  button:hover {
    background-color: #ddd;
  }
  </style>
  