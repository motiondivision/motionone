<template>
  <div style="display: flex">
    <div class="box" ref="a" style="background-color: red"></div>
    <div
      class="box"
      ref="b"
      data-motion-id="Box"
      style="background-color: green"
    ></div>
    <div class="box" ref="c" id="c" style="background-color: blue"></div>
    <div class="box" ref="d" id="d" style="background-color: yellow"></div>
  </div>
</template>

<style>
.box {
  width: 200px;
  height: 200px;
  transition: transform 100ms cubic-bezier(0, 0, 1, 1),
    opacity 200ms ease-out 300ms, all 0.5s ease;
}

.box:hover {
  transform: scale(3);
  opacity: 0.4;
  width: 100px;
}
</style>
