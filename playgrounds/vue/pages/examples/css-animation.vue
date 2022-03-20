<template>
  <div style="display: flex">
    <div class="box-animate" ref="a" style="background-color: red"></div>
    <div
      class="box-animate"
      ref="b"
      data-motion-id="Box"
      style="background-color: purple"
    ></div>
    <div
      class="box-animate"
      ref="c"
      id="c"
      style="background-color: blue"
    ></div>
    <div
      class="box-animate"
      ref="d"
      id="d"
      style="background-color: yellow"
    ></div>
  </div>
</template>

<style>
.box-animate {
  width: 200px;
  height: 200px;
  border-radius: 20px;
}

.box-animate:hover {
  animation-name: bounce;
  animation-direction: "alternate";
  animation-duration: 1s;
  animation-timing-function: steps(2);
  animation-iteration-count: infinite;
}
</style>

<style global>
@keyframes bounce {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(2);
    opacity: 0.3;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
}
</style>
