<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();
</script>

<template>
  <v-app-bar color="rgba(40,40,40,.8)" class="px-5">
    <template v-slot:prepend>
      <transition>
        <v-icon
          v-if="appStore.subSidebar"
          @click="appStore.subSidebar = !appStore.subSidebar"
          >mdi-menu-open</v-icon
        >
        <v-icon
          v-else-if="!appStore.subSidebar"
          @click="appStore.subSidebar = !appStore.subSidebar"
          >mdi-menu</v-icon
        >
      </transition>
    </template>

    <v-spacer></v-spacer>
    <v-btn
      class="font-weight-bold"
      color="primary"
      @click="appStore.toggleAuthDialog"
      >登录</v-btn
    >
  </v-app-bar>
</template>

<style scoped lang="scss"></style>
