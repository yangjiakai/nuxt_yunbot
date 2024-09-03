<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
// import HistorySidebar from "~/components/app/ai-image/HistorySidebar.vue";
import { useImageAiStore } from "@/stores/imageAi";
const imageAiStore = useImageAiStore();
</script>

<template>
  <div class="h-full">
    <div class="pa-5 d-flex">
      <!-- CENTER -->
      <v-card
        class="center flex-grow-1 mx-5 d-flex flex-column"
        rounded="lg"
        variant="outlined"
      >
        <v-img :src="imageAiStore.currentCreationImage.img_url"></v-img>
      </v-card>

      <!-- RIGHT -->
      <!-- <HistorySidebar /> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.center {
  height: calc(100vh - 112px);
  overflow: auto;
}
</style>
