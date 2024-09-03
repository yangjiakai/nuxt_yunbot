<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useImageAiStore } from "@/stores/imageAi";
import ImgUploader2 from "@/components/common/ImgUploader2.vue";
const imageAiStore = useImageAiStore();
</script>

<template>
  <div class="h-full pa-5">
    <div class="h-full d-flex align-center justify-center center">
      <v-img
        v-if="imageAiStore.currentCreationImage.img_url"
        :src="imageAiStore.currentCreationImage.img_url"
      >
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn
            icon
            variant="text"
            color="white"
            @click="imageAiStore.currentCreationImage.img_url = ''"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-img>
      <div v-else>
        <ImgUploader2 />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.center {
  height: calc(100vh - 122px);
  overflow: auto;
}

/* From Uiverse.io by csemszepp */
.custum-file-upload {
  height: 200px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: 2px dashed #e8e8e8;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 48px 35px -48px #e8e8e8;
}

.custum-file-upload .icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .icon svg {
  height: 80px;
  fill: #e8e8e8;
}

.custum-file-upload .text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .text span {
  font-weight: 400;
  color: #e8e8e8;
}

.custum-file-upload input {
  display: none;
}
</style>
