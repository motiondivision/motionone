<template>
  <main>
    <header><h1>Header</h1></header>
    <article>
      <div id="video">
        <div id="carousel">
          <div class="item">
            <div class="offset-wrapper">
              <svg viewBox="0 0 1200 870">
                <path
                  d="M 331 162 C 359.8 129.7 399.1 107.2 441.3 97.6 C 483.5 88.1 528.4 91.5 569 106.5 C 609.6 121.4 645.8 147.8 673.1 181.4 C 700.5 214.9 719 255.4 727.4 297.8 C 744.2 382.7 719.1 473.6 666.4 542.2 C 613.7 610.8 535.1 657.6 451 678 C 408.1 688.4 363.4 692.3 319.6 687.1 C 275.7 681.9 232.7 667.4 196 643 C 159.2 618.6 128.8 584.1 111.3 543.5 C 93.8 503 89.7 456.4 102 414 C 110.9 383.3 128.2 355.1 151.5 333.2 C 174.7 311.3 203.8 295.6 234.8 288.1 C 265.9 280.7 298.9 281.3 329.6 289.9 C 360.4 298.4 389 314.8 412 337 C 449.9 373.5 472.2 426.5 468.6 479 C 466.8 505.3 458.7 531.1 444.8 553.5 C 430.9 575.8 411.2 594.6 388 607 C 355.9 624.2 317.5 628.9 282 621 C 254.9 615 229.2 601.7 209.7 581.9 C 190.2 562.1 177.2 535.7 175 508 C 173.5 488.9 177 469.6 184.7 452.1 C 192.3 434.6 204.1 418.9 218.4 406.3 C 247.2 381.1 285.8 368.5 324 368 C 365.7 367.4 406.7 380.5 443.5 400.1 C 480.3 419.7 513.3 445.7 545.2 472.6 C 577.1 499.4 608.2 527.4 642.2 551.5 C 676.2 575.6 713.5 596 754 606 C 801.2 617.6 851.9 614.4 897.6 597.6 C 943.2 580.8 983.7 550.5 1013.2 511.8 C 1042.8 473.2 1061.4 426.3 1067 378 C 1072.7 329.7 1065.5 280 1047 235 C 1026.5 185.1 992 140.9 947.8 110 C 903.7 79 849.9 61.6 796 62 C 753.9 62.3 711.8 73.5 675.8 95.1 C 639.7 116.7 609.8 148.9 592 187 C 572.6 228.5 567.9 276.6 577.8 321.4 C 587.6 366.1 611.7 407.5 645 439 C 674.9 467.2 711.4 487.4 748.3 505.3 C 785.3 523.3 823.3 539.4 858.3 561 C 893.2 582.7 925.4 610.4 945.4 646.4 C 955.3 664.4 962.1 684.2 964.1 704.7 C 966.1 725.1 963.2 746.2 955 765 C 947.2 782.8 934.7 798.4 919.6 810.6 C 904.5 822.8 886.9 831.8 868.4 837.8 C 831.5 849.7 791.7 849.8 753 846 C 648.1 835.7 545.9 796.8 462 733 C 398.4 684.6 345.4 621.9 310.9 549.9 C 276.5 477.8 260.8 396.5 269 317 C 274.8 260.7 293.3 204.2 331 162"
                  fill="none"
                  id="path"
                  stroke="red"
                  stroke-width="2"
                ></path>
              </svg>
              <div class="offset-box"></div>
            </div>
          </div>
          <div class="item three"></div>
          <div class="item">
            <video
              muted
              playsinline
              loop
              src="https://d85hka1o93tql.cloudfront.net/tools-edit.mp4"
            ></video>
          </div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
      </div>
    </article>
    <footer><h1>Footer</h1></footer>
    <div id="debug"></div>
  </main>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

header {
  height: 100vh;
  background: red;
  color: white;
  font-size: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

footer {
  height: 100vh;
  background: blue;
  color: white;
  font-size: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

article {
  height: 500vh;
  position: relative;
}

#video {
  height: 100vh;
  width: 100%;
  position: sticky;
  top: 0;
  background: green;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#carousel {
  display: flex;
  width: 300px;
  height: 200px;
  gap: 20px;
}

.item {
  flex: 0 0 300px;
  background: white;
}

video {
  width: 300px;
  height: 200px;
}

#debug {
  position: fixed;
  top: 10px;
  left: 10px;
  color: white;
  z-index: 20;
}

.offset-box {
  width: 50px;
  height: 50px;
  background-color: red;
  offset-path: path(
    "M 331 162 C 359.8 129.7 399.1 107.2 441.3 97.6 C 483.5 88.1 528.4 91.5 569 106.5 C 609.6 121.4 645.8 147.8 673.1 181.4 C 700.5 214.9 719 255.4 727.4 297.8 C 744.2 382.7 719.1 473.6 666.4 542.2 C 613.7 610.8 535.1 657.6 451 678 C 408.1 688.4 363.4 692.3 319.6 687.1 C 275.7 681.9 232.7 667.4 196 643 C 159.2 618.6 128.8 584.1 111.3 543.5 C 93.8 503 89.7 456.4 102 414 C 110.9 383.3 128.2 355.1 151.5 333.2 C 174.7 311.3 203.8 295.6 234.8 288.1 C 265.9 280.7 298.9 281.3 329.6 289.9 C 360.4 298.4 389 314.8 412 337 C 449.9 373.5 472.2 426.5 468.6 479 C 466.8 505.3 458.7 531.1 444.8 553.5 C 430.9 575.8 411.2 594.6 388 607 C 355.9 624.2 317.5 628.9 282 621 C 254.9 615 229.2 601.7 209.7 581.9 C 190.2 562.1 177.2 535.7 175 508 C 173.5 488.9 177 469.6 184.7 452.1 C 192.3 434.6 204.1 418.9 218.4 406.3 C 247.2 381.1 285.8 368.5 324 368 C 365.7 367.4 406.7 380.5 443.5 400.1 C 480.3 419.7 513.3 445.7 545.2 472.6 C 577.1 499.4 608.2 527.4 642.2 551.5 C 676.2 575.6 713.5 596 754 606 C 801.2 617.6 851.9 614.4 897.6 597.6 C 943.2 580.8 983.7 550.5 1013.2 511.8 C 1042.8 473.2 1061.4 426.3 1067 378 C 1072.7 329.7 1065.5 280 1047 235 C 1026.5 185.1 992 140.9 947.8 110 C 903.7 79 849.9 61.6 796 62 C 753.9 62.3 711.8 73.5 675.8 95.1 C 639.7 116.7 609.8 148.9 592 187 C 572.6 228.5 567.9 276.6 577.8 321.4 C 587.6 366.1 611.7 407.5 645 439 C 674.9 467.2 711.4 487.4 748.3 505.3 C 785.3 523.3 823.3 539.4 858.3 561 C 893.2 582.7 925.4 610.4 945.4 646.4 C 955.3 664.4 962.1 684.2 964.1 704.7 C 966.1 725.1 963.2 746.2 955 765 C 947.2 782.8 934.7 798.4 919.6 810.6 C 904.5 822.8 886.9 831.8 868.4 837.8 C 831.5 849.7 791.7 849.8 753 846 C 648.1 835.7 545.9 796.8 462 733 C 398.4 684.6 345.4 621.9 310.9 549.9 C 276.5 477.8 260.8 396.5 269 317 C 274.8 260.7 293.3 204.2 331 162"
  );
  position: absolute;
  top: 0;
  left: 0;
}
.offset-wrapper {
  position: relative;
  transform: scale(0.2);
  transform-origin: 0% 0%;
}

.offset-wrapper svg {
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(4);
  transform-origin: 0% 0%;
}
</style>

<script lang="ts">
import { animate, scroll } from "motion"
import * as THREE from "three"

export default {
  setup() {
    onMounted(() => {
      const controls = animate(
        "#video",
        { backgroundColor: ["green", "purple"] },
        { duration: 1, easing: "linear" }
      )
      controls.pause()

      const scaleControls = animate(
        "header",
        { scale: [1, 0] },
        { duration: 1, easing: "linear" }
      )

      scaleControls.pause()
      scaleControls.finished.then(() => console.log("animation finished"))

      const carousel = animate(
        "#carousel",
        { transform: ["none", "translateX(-400%)"] },
        { duration: 1, easing: "linear" }
      )
      carousel.pause()

      const footerZoomIn = animate(
        "footer",
        { scale: [0, 1] },
        { duration: 1, easing: "linear" }
      )
      footerZoomIn.pause()
      console.log(footerZoomIn)
      scroll(
        ({ y }) => {
          footerZoomIn.currentTime = y.progress
        },
        {
          target: document.querySelector("footer"),
          offset: "enter",
        }
      )
      scroll(
        ({ y }) => {
          scaleControls.currentTime = y.progress
        },
        {
          target: document.querySelector("header"),
          offset: "exit",
        }
      )

      var scene = new THREE.Scene()
      var camera = new THREE.PerspectiveCamera(75, 300 / 200, 0.1, 1000)

      var renderer = new THREE.WebGLRenderer()
      renderer.setSize(300, 200)
      renderer.setPixelRatio(2)
      document.querySelector(".three").appendChild(renderer.domElement)

      var geometry = new THREE.BoxGeometry(1, 1, 1)
      var material = new THREE.MeshPhongMaterial({
        color: "red",
        shininess: 70,
      })
      var cube = new THREE.Mesh(geometry, material)
      const lights = []
      lights[0] = new THREE.PointLight(0xffffff, 1, 0)
      lights[1] = new THREE.PointLight(0xffffff, 1, 0)
      lights[2] = new THREE.PointLight(0xffffff, 1, 0)
      const light = new THREE.AmbientLight(0x404040) // soft white light
      scene.add(light)
      lights[0].position.set(0, 20, 0)
      lights[1].position.set(50, 100, 50)
      lights[2].position.set(-50, -100, -50)

      scene.add(lights[0])
      scene.add(lights[1])
      scene.add(lights[2])

      scene.add(cube)
      camera.position.z = 2

      const video = document.querySelector("video")
      const offsetBox = document.querySelector(".offset-box") as HTMLElement
      scroll(
        ({ y }) => {
          controls.currentTime = y.progress
          carousel.currentTime = y.progress
          console.log("video ready", video.readyState > 0)
          if (video.readyState > 0) {
            video.currentTime = video.duration * y.progress
          }
          cube.rotation.y = y.progress * 10
          renderer.render(scene, camera)
          offsetBox.style.offsetDistance = `${y.progress * 100}%`
        },
        {
          target: document.querySelector("article"),
        }
      )
    })
  },
}
</script>
