<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { gradients } from "@/data/gradients2";
import GradientDetailCard from "./GradientDetailCard.vue";
const appStore = useAppStore();
const changeBgColor = (gradient: any) => {
  currentGradient.value = gradient;
  appStore.currentBackground = `linear-gradient(${gradient.colors[0]}, ${gradient.colors[1]})`;
};

const currentGradient = ref();
</script>

<template>
  <perfect-scrollbar class="d-flex flex-wrap gradient-panel mb-3">
    <v-card
      width="42"
      height="42"
      class="ma-1"
      :class="currentGradient?.name === gradient.name ? 'active-card' : ''"
      v-for="gradient in gradients"
      :key="gradient.name"
      :style="`background: linear-gradient(${gradient.colors[0]}, ${gradient.colors[1]}`"
      @click="changeBgColor(gradient)"
    >
    </v-card>
  </perfect-scrollbar>
  <GradientDetailCard v-if="currentGradient" :gradient="currentGradient" />
</template>

<style scoped lang="scss">
.active-card {
  border: 2px solid #eee;
}
</style>
