<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import PanelWallPaper from "@/components/panels/PanelWallPaper.vue";
import PanelGenerate from "@/components/panels/PanelGenerate.vue";
import PanelDeafault from "@/components/panels/PanelDeafault.vue";
import PanelText2Img from "@/components/panels/PanelText2Img.vue";
import PanelImageGeneration from "@/components/panels/PanelImageGeneration.vue";
// import PanelInpaint from "@/components/panels/PanelInpaint.vue";
import PanelEdit from "@/components/panels/PanelEdit.vue";
import PanelDesign from "@/components/panels/PanelDesign.vue";
const router = useRouter();

const appStore = useAppStore();

const currentPath = computed(() => {
  return router.currentRoute.value.path.split("/").pop() || "ai-image";
});

// to CommelCase
const toComelCase = (str: string) => {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};
</script>

<template>
  <v-navigation-drawer
    class="sub-sidebar text-white"
    v-model="appStore.subSidebar"
    width="340"
    color="rgba(40,40,40,.5)"
  >
    <!-- ---------------------------------------------- -->
    <!---Top Area -->
    <!-- ---------------------------------------------- -->
    <template v-slot:prepend>
      <v-card
        height="70"
        variant="flat"
        class="d-flex align-center justify-space-between px-5"
      >
        <h4 class="text-body-1 font-weight-bold">
          <!-- {{ $t("aiTools." + toComelCase(currentPath)) }} -->
          AITOOLS
        </h4>
        <v-btn
          variant="text"
          icon
          class="ml-auto"
          density="compact"
          v-if="currentPath !== 'generate'"
          size="small"
          @click="router.push('/generate')"
        >
          <v-icon icon="mdi-close"></v-icon>
        </v-btn>
      </v-card>
    </template>
    <!-- ---------------------------------------------- -->
    <!---Nav List -->
    <!-- ---------------------------------------------- -->
    <div>
      <perfect-scrollbar class="scrollnav">
        <!-- ---------------------------------------------- -->
        <!---背景设置 Panel -->
        <!-- ---------------------------------------------- -->

        <PanelWallPaper v-if="currentPath === 'config'" />
        <PanelGenerate v-else-if="currentPath === 'generate'" />
        <PanelText2Img v-else-if="currentPath === 'text2img'" />
        <PanelImageGeneration v-else-if="currentPath === 'image-generation'" />
        <PanelInpaint v-else-if="currentPath === 'inpaint'" />
        <PanelEdit v-else-if="currentPath === 'edit'" />
        <PanelDesign v-else-if="currentPath === 'design'" />
        <PanelDeafault v-else />
      </perfect-scrollbar>
    </div>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.scrollnav {
  height: calc(100vh - 100px);
}
</style>
