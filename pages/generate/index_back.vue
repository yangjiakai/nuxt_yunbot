<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 企划设计
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";

import cover1 from "/covers/cover1.png";
import cover2 from "/covers/cover2.png";
import cover3 from "/covers/cover3.png";
import cover4 from "/covers/cover4.png";
import cover5 from "/covers/cover5.png";
import cover6 from "/covers/cover6.png";
import { useAppStore } from "@/stores/app";
import type { FunctionCard } from "@/types/app";

import ListHeader from "@/components/common/ListHeader.vue";
const appStore = useAppStore();

const router = useRouter();

const cards = ref<FunctionCard[]>([
  {
    url: "/ai-image/txt2img",
    title: "文本生成图像",
    description: "AI智能图像生成器",
    icon: "mdi-home",
    cover:
      "https://me.yunrobot.cn:8433/ssss/images/883d1535f3e891c9ab80eaa6fc056ea6.jpg",
  },
  {
    url: "/ai-image/image-generation",
    title: "图像生成",
    description: "AI智能图像生成器",
    icon: "mdi-home",
    cover:
      "https://me.yunrobot.cn:8433/ssss/images/883d1535f3e891c9ab80eaa6fc056ea6.jpg",
  },
  {
    url: "/ai-image/remove-background",
    title: "移除背景",
    description: "一键智能去除图片背景，轻松获取透明背景图像",
    icon: "mdi-backspace-reverse",
    cover:
      "https://me.yunrobot.cn:8433/ssss/images/c0fb4e678233f7d720587a53ca79d97f.jpg",
  },
  {
    url: "/ai-image/remove-text",
    title: "去除水印",
    description: "智能检测并移除图片中的文字，保留纯净图像内容",
    icon: "mdi-format-clear",
    cover:
      "https://me.yunrobot.cn:8433/ssss/images/08824511a4dead3b7257c3b926e9ca32.jpg",
  },
  {
    url: "/ai-image/replace-background",
    title: "替换背景",
    description: "自定义背景替换，创造独特的图片视觉效果",
    icon: "mdi-image-area",
    cover:
      "https://me.yunrobot.cn:8433/ssss/images/80154f70bf2e0af81bf137ceb4a270bc.jpg",
  },
  {
    url: "/ai-image/enhance-quality",
    title: "画质提升",
    description: "提升图片分辨率和清晰度，重现细节之美",
    icon: "mdi-magnify-plus-outline",
    cover:
      "https://me.yunrobot.cn:8433/ssss/images/9cc836a828113b1319433904f0e2f8e9.jpg",
  },
]);

const myFavorates = computed(() => appStore.myLikes);

const goToPage = (url: string) => {
  router.push(url);
};
</script>

<template>
  <div class="h-full ">
    <v-card  variant="flat" class="home-bg h-full">
      <ListHeader />
      <div class="px-15 mb-10">
        <h1 class="font-weight-bold">
          AI图像处理技术，为图像编辑、优化和创造提供了前所未有的便捷和精准度。
        </h1>
      </div>
      <div class="text-h5 font-weight-black pl-15 pb-8">AI图像处理</div>
      <v-row class="px-10">
        <v-col v-for="card in cards" cols="12" md="4" lg="3" xl="2">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              class="mx-5"
              rounded="xl"
              :elevation="isHovering ? 10 : 1"
              @click="goToPage(card.url)"
              height="320"
            >
              <v-img
                class="rounded-md zoom-on-hover"
                height="200"
                :aspect-ratio="5 / 3"
                cover
                :src="card.cover"
                :lazy-src="card.cover"
              >
                <div class="pa-5 d-flex">
                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="
                    myFavorates.find((item:any) => item.title === card.title) !==
                      undefined &&
                    myFavorates.find((item:any) => item.title === card.title) !==
                      null
                  "
                    density="comfortable"
                    color="error"
                    icon="mdi-heart"
                    size="small"
                    @click.stop="appStore.removeFromMylikes(card.title)"
                  ></v-btn>
                  <v-btn
                    v-else
                    density="comfortable"
                    color="grey"
                    icon="mdi-heart-outline"
                    size="small"
                    @click.stop="appStore.addToMyLikes(card)"
                  ></v-btn>
                </div>
              </v-img>
              <v-card-title class="font-weight-bold my-1">{{
                card.title
              }}</v-card-title>
              <v-card-text class="d-flex text-grey-500">
                <div>{{ card.description }}</div>
                <!-- icon -->
                <v-spacer></v-spacer>
                <Icon
                  width="22"
                  icon="solar:round-alt-arrow-right-line-duotone"
                  class="text-primary"
                />
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
// .bg-color {
//   background-color: #f6f8fe;
// }

.zoom-on-hover {
  transition: transform 0.3s ease;
  transform-origin: center;
}

.zoom-on-hover:hover {
  transform: scale(1.05);
}
</style>
