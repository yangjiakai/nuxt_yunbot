<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import MainSiderbar from "@/components/layout/MainSiderbar.vue";
import { useAppStore } from "@/stores/app";

const router = useRouter();
const appStore = useAppStore();
const back = computed(() => appStore.currentBackground);
</script>

<template>
  <v-app class="app" theme="dark">
    <MainSiderbar />

    <v-app-bar color="rgba(40,40,40,.8)" class="px-5">
      <!-- Back Icon -->
      <v-btn @click="router.go(-1)" icon density="comfortable">
        <Icon name="eva:arrow-back-outline" size="24" />
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn
        class="font-weight-bold"
        color="primary"
        @click="appStore.toggleAuthDialog"
        >登录</v-btn
      >
    </v-app-bar>

    <v-main>
      <div class="pa-2 h-full">
        <v-card color="rgba(40,40,40,.5)" height="100%" class="overflow-auto">
          <!-- <transition name="fade">
            <RouterView />
          </transition> -->
          <NuxtPage />
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped lang="scss">
.app {
  /* background: url("https://w.wallhaven.cc/full/yx/wallhaven-yxxvox.png"); */
  background: v-bind(back);
  background-size: cover;
  background-position: center center;
}

.v-main {
  height: calc(100vh - 64px);
}
</style>
