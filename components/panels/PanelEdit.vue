<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/app";
const router = useRouter();
const appStore = useAppStore();

const solidColors = ref([
  "#02577A",
  "#09A4EC",
  "#89D6FB",
  "#D4F0FC",
  "#332B40",
  "#074B63",
  "#018B73",
  "#8CB303",
  "#E6DD00",
  "#F9C004",
  "#FF5733",
  "#BD0A3E",
  "#8B1643",
  "#571E48",
]);

const currentColor = ref("");

const changeColor = (color: string) => {
  currentColor.value = color;
  appStore.currentBackground = color;
};

const panel = ref(["recommend", "aiTools"]);

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
    link: "blur-bg",
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

const currenTool = ref({
  link: "enhanse",
  text: "画质增强",
  cover: "https://www.fotor.com/photo-editor-app/ai/thumb/enhance.jpg",
});

const changeTool = (tool: any) => {
  currenTool.value = tool;
  router.push("/edit/" + tool.link);
};
</script>

<template>
  <div class="pa-2">
    <v-expansion-panels v-model="panel" multiple>
      <!-- <v-expansion-panel value="recommend">
        <v-expansion-panel-title class="font-weight-bold"
          >最近使用</v-expansion-panel-title
        >
        <v-expansion-panel-text>
          <div class="d-flex flex-wrap">
            <v-card
              width="82"
              height="120"
              class="ma-1 mb-1"
              v-for="item in recommend"
              :class="currenTool.link === item.link ? 'active-card' : ''"
              :key="item.link"
              @click="changeTool(item)"
              variant="flat"
            >
              <v-img :src="item.cover" width="82" height="82"></v-img>
              <div class="text-center text-body-2 mt-2">{{ item.text }}</div>
            </v-card>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel> -->
      <v-expansion-panel value="aiTools">
        <v-expansion-panel-title class="font-weight-bold"
          >AI 工具
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="grid grid-rows-6 grid-flow-col gap-4">
            <v-card
              v-for="item in editTools"
              :class="currenTool.link === item.link ? 'active-card' : ''"
              :key="item.link"
              @click="changeTool(item)"
              variant="flat"
            >
              <v-img :src="item.cover" height="120" cover></v-img>
              <div class="text-center text-body-2 my-3">{{ item.text }}</div>
            </v-card>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped lang="scss">
.active-card {
  outline: 2px solid #eee;
}
</style>
