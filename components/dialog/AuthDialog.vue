<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import LoginCard from "./LoginCard.vue";
import RegisterCard from "./RegisterCard.vue";
const appStore = useAppStore();
</script>

<template>
  <v-dialog
    v-model="appStore.authDialog"
    width="auto"
    theme="light"
    class="dialog-bg-blur"
  >
    <LoginCard v-if="appStore.authType === 'login'" />
    <RegisterCard v-else />
  </v-dialog>
</template>

<style scoped lang="scss"></style>
