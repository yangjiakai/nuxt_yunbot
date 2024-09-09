<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import WaveCard from "@/components/card/WaveCard.vue";

definePageMeta({
  layout: "test",
});

const router = useRouter();

const editTools = ref([
  {
    link: "enhanse",
    text: "画质增强",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/enhance.jpg",
  },
  {
    link: "upscaler",
    text: "图像放大",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/ai%20enlarger.jpg",
  },
  {
    link: "beauty",
    text: "AI美颜",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/beauty.jpg",
  },
  {
    link: "beauty",
    text: "AI美颜",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/beauty.jpg",
  },
  {
    link: "remove-object",
    text: "物体移除",
    cover:
      "https://www.fotor.com/photo-editor-app/ai/thumb/remove%20object.jpg",
  },
  {
    link: "remove-bg",
    text: "背景移除",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/bgremover.jpg",
  },
  {
    link: "blurBg",
    text: "AI 背景虚化",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/blurBg1_1.jpg",
  },
  {
    link: "textRemover",
    text: "AI 文本移除",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/text_remover.jpg",
  },
  {
    link: "filtern",
    text: "AI 滤镜",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/ai_filtern.jpg",
  },
  {
    link: "goart",
    text: "AI 艺术效果",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/goart.jpg",
  },
  {
    link: "colorRestorer",
    text: "AI 旧照修复",
    cover:
      "https://www.fotor.com/photo-editor-app/ai/thumb/ai_color_restorer.jpg",
  },
  {
    link: "colorize",
    text: "AI 图片上色",
    cover:
      "https://www.fotor.com/photo-editor-app/ai/thumb/ai_color_colorizer.jpg",
  },
]);

// AI生成
const generateTools = ref([
  {
    link: "text2img",
    text: "文生图",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/aiimage.jpg",
  },
  {
    link: "img2img",
    text: "图生图",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/aiimage.jpg",
  },
  {
    link: "expand",
    text: "AI 图像扩展",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/ai_expand.jpg",
  },
  {
    link: "wear",
    text: "AI 换装",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/aiimage.jpg",
  },
  {
    link: "avatarn",
    text: "AI 证件照",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/ai_avatarn.jpg",
  },
  {
    link: "avatar",
    text: "AI 头像",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/ai_avatar.jpg",
  },
]);

// AI设计
const designTools = ref([
  // 图标生成
  {
    link: "icon",
    text: "图标生成",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/aiimage.jpg",
  },
  // 电商海报生成
  {
    link: "poster",
    text: "电商海报生成",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/aiimage.jpg",
  },
]);

const aiTools = ref([
  {
    link: "image-generation",
    text: "AI 图像生成",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/aiimage.jpg",
  },
  {
    link: "wear",
    text: "AI 换装",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/aiimage.jpg",
  },
  {
    link: "avatarn",
    text: "AI 证件照",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/ai_avatarn.jpg",
  },
  {
    link: "avatar",
    text: "AI 头像",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/ai_avatar.jpg",
  },
  {
    link: "filtern",
    text: "AI 滤镜",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/ai_filtern.jpg",
  },
  {
    link: "goart",
    text: "AI 艺术效果",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/goart.jpg",
  },
  {
    link: "expand",
    text: "AI 图像扩展",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/ai_expand.jpg",
  },
  {
    link: "inpaint",
    text: "AI 局部重绘",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/ai_replace.jpg",
  },
  {
    link: "colorRestorer",
    text: "AI 旧照修复",
    cover:
      "https://www.fotor.com/photo-editor-app/ai/thumb/ai_color_restorer.jpg",
  },
  {
    link: "colorize",
    text: "AI 图片上色",
    cover:
      "https://www.fotor.com/photo-editor-app/ai/thumb/ai_color_colorizer.jpg",
  },
  {
    link: "textRemover",
    text: "AI 文本移除",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/text_remover.jpg",
  },
  {
    link: "blurBg",
    text: "AI 背景虚化",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/blurBg1_1.jpg",
  },
  {
    link: "changeBg",
    text: "AI 背景替换",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/changeBg1_1.jpg",
  },
  {
    link: "colorSplash",
    text: "AI 色彩分离",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/Color%20Splash.jpg",
  },
  {
    link: "HDR",
    text: "AI HDR",
    cover: "https://www.fotor.com/photo-editor-app/ai/thumb/HDR2.jpg",
  },
]);
</script>

<template>
  <div class="pa-5">
    <!-- AI 图像生成 -->
    <v-card variant="outlined" class="mb-5">
      <v-card-title class="px-5 py-8 font-weight-bold">AI 图像生成</v-card-title>
      <v-card-text>
        <v-row>
          <v-col align="center" v-for="item in generateTools" cols="12" sm="6" md="4" lg="3" xl="2" :key="item.link">
            <WaveCard @click="router.push('/ai-image/' + item.link)">
              <template #card-body>
                <div class="h-full d-flex flex-column align-center justify-space-around">
                  <Icon size="80" name="solar:figma-bold-duotone" />
                  <h1 class="text-h4 font-weight-bold">{{ item.text }}</h1>

                  <h5 class="text-h6">{{ item.link }}</h5>
                </div>
              </template>
            </WaveCard>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- 图像编辑 -->
    <v-card variant="outlined" class="mb-5">
      <v-card-title class="px-5 py-8 font-weight-bold">图像编辑</v-card-title>
      <v-card-text>
        <v-row>
          <v-col align="center" v-for="item in editTools" cols="12" sm="6" md="4" lg="3" xl="2" :key="item.link">
            <WaveCard @click="router.push('/image-edit/' + item.link)">
              <template #card-body>
                <div class="h-full d-flex flex-column align-center justify-space-around">
                  <Icon size="80" name="solar:figma-bold-duotone" />
                  <h1 class="text-h4 font-weight-bold">{{ item.text }}</h1>

                  <h5 class="text-h6">{{ item.link }}</h5>
                </div>
              </template>
            </WaveCard>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- AI 设计 -->
    <v-card variant="outlined" class="mb-5">
      <v-card-title class="px-5 py-8 font-weight-bold">AI 设计</v-card-title>
      <v-card-text>
        <v-row>
          <v-col align="center" v-for="item in designTools" cols="12" sm="6" md="4" lg="3" xl="2" :key="item.link">
            <WaveCard @click="router.push('/ai-image/' + item.link)">
              <template #card-body>
                <div class="h-full d-flex flex-column align-center justify-space-around">
                  <Icon size="80" name="solar:figma-bold-duotone" />
                  <h1 class="text-h4 font-weight-bold">{{ item.text }}</h1>

                  <h5 class="text-h6">{{ item.link }}</h5>
                </div>
              </template>
            </WaveCard>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped lang="scss"></style>
