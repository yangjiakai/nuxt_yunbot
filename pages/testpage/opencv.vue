<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
definePageMeta({
  layout: "home",
});
const clickPositions = ref(null as any);
// var coords = ref([] as any[])
const labels = ref([] as any[]);

const test = () => {
  var coords = [
    [123, 2312],
    [111, 111],
  ];
  var flattenedCoords = coords.flat();
  const onnx_coord = new Float32Array(flattenedCoords);
  onnx_coord.set(flattenedCoords, 0);

  console.log("coords", coords);
  console.log("nnx_coord", onnx_coord);
};
const sss = (e: any) => {
  const pos = e.target.getStage();

  console.log("sss", pos);
};
</script>

<template>
  <div class="pa-5">
    <v-card height="500px" width="500">
      <v-stage @mousemove="sss" :confing="{ width: 500, height: 500 }">
        <v-layer> </v-layer>
      </v-stage>
    </v-card>
  </div>
</template>

<style scoped lang="scss"></style>
