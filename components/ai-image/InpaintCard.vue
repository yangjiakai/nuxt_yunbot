<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useImageAiStore } from "@/stores/imageAi";
const imageAiStore = useImageAiStore();
const handleMaskImgUpdate = (img: any) => {
  imageAiStore.setMaskSrc(img.src);
};

const handleResetMaskImg = () => {
  imageAiStore.setMaskSrc("");
};

const imgFile = ref<File>();

watch(
  () => imageAiStore.baseImageFile,
  (newVal) => {
    if (newVal) {
      imgFile.value = newVal;
    }
  }
);
</script>

<template>
  <v-card
    color="rgba(0,0,0,.3)"
    class="h-full mx-5 pa-5 d-flex flex-column justify-center"
  >
    <SamApp
      :baseImage="imageAiStore.baseImage"
      :baseImageFile="imageAiStore.baseImageFile"
      @update:maskImg="handleMaskImgUpdate"
      @resetMaskImg="handleResetMaskImg"
    />
  </v-card>
</template>

<style scoped lang="scss"></style>
