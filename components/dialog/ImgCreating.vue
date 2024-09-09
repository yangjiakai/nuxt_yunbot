<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import { useTaskStore } from "~/stores/taskStore";

const taskStore = useTaskStore();
</script>

<template>
  <v-dialog
    v-model="taskStore.isLoading"
    width="auto"
    scrim
    class="dialog-bg-blur"
    theme="light"
    :persistent="true"
  >
    <div
      v-if="taskStore.errorMessage"
      class="flex align-center flex-col bg-black/60 rounded-lg pa-5"
    >
      <Icon
        class="text-error"
        size="50"
        name="solar:shield-warning-line-duotone"
      />

      <v-card
        class="flex align-center justify-center my-5"
        width="200"
        :minHeight="100"
        variant="outlined"
      >
        <p class="text-white">{{ taskStore.errorMessage }}</p>
      </v-card>
      <v-btn block color="error" @click="taskStore.isLoading = false">
        OK</v-btn
      >
    </div>
    <div
      class="flex align-center justify-center flex-col bg-black/60 pb-10 rounded-lg"
      v-else
    >
      <Vue3Lottie
        class="w-1/2 h-1/2"
        animationLink="https://lottie.host/d9894a93-0578-485a-81c5-1b9c5e4e9e02/6gNnk09DxY.json"
        :height="200"
        :width="200"
      />

      <p class="text-white">{{ $t("info.imageGenerating") }}</p>
    </div>
  </v-dialog>
</template>

<style></style>
