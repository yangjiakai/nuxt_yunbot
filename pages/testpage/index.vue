<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import WaveCard from "~/components/card/WaveCard.vue";

definePageMeta({
  layout: "test",
});
const router = useRouter();
const pages = ref([
  // opencv
  {
    url: "/testpage/opencv",
    name: "opencv",
  },
  // sam
  {
    url: "/testpage/sam",
    name: "sam",
  },
  // test
  {
    url: "/testpage/canvas",
    name: "canvas",
  },
  // training
  {
    url: "/testpage/training",
    name: "training",
  },
  // paint
  {
    url: "/testpage/paint",
    name: "局部重绘",
  },
  // comfyui
  {
    url: "/testpage/comfyui-api",
    name: "ComfyUI",
  },
  // minio
  {
    url: "/testpage/minio",
    name: "minio",
  },
  {
    url: "/testpage/removeBg",
    name: "removeBg",
  },
  {
    url: "/testpage/paint2",
    name: "paint2",
  },
]);

const goToPage = (url: string) => {
  router.push(url);
};
</script>

<template>
  <div class="pa-5">
    <v-toolbar rounded="lg" height="100" color="primary" class="mb-5">
      <div class="ml-5">
        <h3 class="text-h5 font-weight-bold">Ai 测试区域</h3>
      </div>
      <v-spacer></v-spacer>
    </v-toolbar>

    <div class="pa-5">
      <v-row>
        <v-col
          justify="center"
          align="center"
          v-for="page in pages"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <WaveCard @click="goToPage(page.url)" class="cursor-pointer">
            <template #card-body>
              <div
                class="h-full d-flex flex-column align-center justify-space-around"
              >
                <Icon size="80" icon="solar:figma-bold-duotone" />
                <h1 class="text-h4 font-weight-bold">
                  <span>{{ page.name }}</span>
                </h1>

                <h5>ai-tools-test</h5>
              </div>
            </template>
          </WaveCard>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
