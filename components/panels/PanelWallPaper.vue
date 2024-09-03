<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
// import { gradients } from "@/data/gradients";
import ColorSetting from "./wallpaper/ColorSetting.vue";
import GradientSetting from "./wallpaper/GradientSetting.vue";
import MyWallpapearSetting from "./wallpaper/MyWallpapearSetting.vue";

const panel = ref([0, 1, 0]);
</script>

<template>
  <v-expansion-panels v-model="panel" multiple>
    <!-- ---------------------------------------------- -->
    <!---ColorSetting -->
    <!-- ---------------------------------------------- -->
    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold"
        >单色背景</v-expansion-panel-title
      >
      <v-divider v-if="panel.length != 0"></v-divider>
      <v-expansion-panel-text><ColorSetting /> </v-expansion-panel-text>
    </v-expansion-panel>
    <!-- ---------------------------------------------- -->
    <!---GradientSetting -->
    <!-- ---------------------------------------------- -->

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold"
        >渐变背景</v-expansion-panel-title
      >
      <v-expansion-panel-text>
        <GradientSetting />
      </v-expansion-panel-text>
    </v-expansion-panel>
    <!-- <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold"
        >远程壁纸</v-expansion-panel-title
      >
      <v-expansion-panel-text>
        <UnsplshWalPaperSetting />
      </v-expansion-panel-text>
    </v-expansion-panel> -->

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold"
        >我的壁纸</v-expansion-panel-title
      >
      <v-expansion-panel-text>
        <MyWallpapearSetting />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped lang="scss"></style>
