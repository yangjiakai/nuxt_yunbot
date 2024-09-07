<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import ImageCard from "@/components/ai-image/ImageCard.vue";
import InpaintCard from "~/components/ai-image/InpaintCard.vue";
</script>

<template>
  <div class="h-full d-flex py-5">
    <div class="w-1/2">
      <InpaintCard />
    </div>
    <div class="w-1/2">
      <v-card class="h-full" color="rgba(0,0,0,.3)">
        <ImageCard />
      </v-card>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
