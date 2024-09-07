<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useComfySocket } from "@/composable/useComfySocket";

import FunctionHeader from "@/components/common/FunctionHeader.vue";
import { Vue3Lottie } from "vue3-lottie";
const { connectWebSocket, progressmax, progress, resImg, taskStatus } =
  useComfySocket();
</script>

<template>
  <div class="h-full bg-background">
    <FunctionHeader title="底花设计" />
    <div class="pa-5 d-flex">
      <!-- LEFT -->
      <v-card class="left pa-5" rounded="lg"> </v-card>

      <!-- CENTER -->
      <v-card
        class="center flex-grow-1 mx-5 px-5 d-flex flex-column"
        rounded="lg"
      >
        <div class="h-full d-flex align-center justify-center">
          <div class="text-center">
            <Vue3Lottie
              class="w-1/2 h-1/2"
              animationLink="https://assets4.lottiefiles.com/packages/lf20_OT15QW.json"
              :height="200"
              :width="200"
            />
            <p class="text-primary">开发中......</p>
          </div>
        </div>
      </v-card>

      <!-- RIGHT -->
      <v-card class="right pa-5"> </v-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.left {
  width: 240px;
  min-width: 240px;
  height: calc(100vh - 112px);
  overflow: auto;
}

.center {
  height: calc(100vh - 112px);
  overflow: auto;
}

.right {
  width: 400px;
  min-width: 400px;
  height: calc(100vh - 112px);
  overflow: auto;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 160px;
  border: 2px dashed #ccc;
  cursor: pointer;
  border-radius: 10px;
}

.upload-icon {
  font-size: 24px;
}

.dotted-card {
  border: 2px dashed #ccc;
  border-radius: 10px;
}

.blend-card {
  width: 100%;
  height: 100px;

  border-radius: 10px;
  background: linear-gradient(rgb(153, 153, 153), rgba(0, 0, 0, 0.081)),
    url("@/assets/images/shoes/shoes_05.jpg");
  background-size: cover;
  background-position: center;
  cursor: pointer;
}

.active-blend-card {
  border: 3px solid rgba(var(--v-theme-primary));
}
</style>
