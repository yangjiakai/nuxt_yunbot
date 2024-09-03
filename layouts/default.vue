<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import MainSiderbar from "~/components/layout/MainSiderbar.vue";
import Subsidebar from "~/components/layout/Subsidebar.vue";
import ImgPreview from "~/components/dialog/ImgPreview.vue";
import AppBar from "~/components/layout/AppBar.vue";
import ImgCreating from "~/components/dialog/ImgCreating.vue";
import HistorySidebar from "~/components/ai-image/HistorySidebar.vue";
import AuthDialog from "~/components/dialog/AuthDialog.vue";
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();
const back = computed(() => appStore.currentBackground);
</script>
<template>
  <v-app class="app">
    <MainSiderbar />
    <Subsidebar />
    <AppBar />
    <HistorySidebar />
    <ImgPreview />
    <ImgCreating />
    <AuthDialog />
    <v-main>
      <div class="image-board pa-2">
        <v-card class="fill-height glassmorphism" color="rgba(40,40,40,.5) ">
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

.glassmorphism {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
</style>
