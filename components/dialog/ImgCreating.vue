<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useImageAiStore } from "@/stores/imageAi";
import { Vue3Lottie } from "vue3-lottie";
const imageAiStore = useImageAiStore();
</script>

<template>
  <v-dialog
    v-model="imageAiStore.imgCreatingDialog"
    width="auto"
    scrim
    class="dialog-bg-blur"
    theme="light"
  >
    <div
      class="flex align-center justify-center flex-col bg-black/60 pb-10 rounded-lg"
    >
      <Vue3Lottie
        class="w-1/2 h-1/2"
        animationLink="https://lottie.host/d9894a93-0578-485a-81c5-1b9c5e4e9e02/6gNnk09DxY.json"
        :height="200"
        :width="200"
      />

      <p class="text-white">AI创作中...</p>
    </div>
  </v-dialog>
</template>

<style></style>
