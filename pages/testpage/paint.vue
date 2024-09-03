<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import ImgUploader from "@/components/common/ImgUploader.vue";
import SamApp from "@/components/sam/SamApp.vue";
definePageMeta({
  layout: "home",
});

const maskImgSrc = ref("");
const baseImage = ref("");
const baseImageFile = ref();

const handleMaskImgUpdate = (img: any) => {
  maskImgSrc.value = img.src;
};

const handleResetMaskImg = () => {
  maskImgSrc.value = "";
};

const handleBase64Update = (base64: string) => {
  baseImage.value = base64;
};

const handleImageFileUpdate = (file: File) => {
  baseImageFile.value = file;
};
</script>

<template>
  <div class="h-full bg-background">
    <div class="pa-5 d-flex">
      <v-card class="left pa-5">
        <ImgUploader
          @update:base64Str="handleBase64Update"
          @update:uploadImg="handleImageFileUpdate"
        />
      </v-card>
      <v-card class="center flex-grow-1 mx-5 pa-5 d-flex flex-column">
        <SamApp
          :baseImage="baseImage"
          :baseImageFile="baseImageFile"
          @update:maskImg="handleMaskImgUpdate"
          @resetMaskImg="handleResetMaskImg"
        />
      </v-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.left {
  width: 260px;
  min-width: 260px;
  height: calc(100vh - 112px);
  overflow: auto;
}

.center {
  height: calc(100vh - 112px);
  overflow: auto;
}
</style>
