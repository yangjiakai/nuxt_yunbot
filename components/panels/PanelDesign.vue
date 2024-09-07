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

const currenTool = ref({
  link: "enhanse",
  text: "画质增强",
  cover: "https://www.fotor.com/photo-editor-app/ai/thumb/enhance.jpg",
});

const changeTool = (tool: any) => {
  currenTool.value = tool;
  router.push("/design/" + tool.link);
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
          <div class="flex gap-3">
            <v-card
              v-for="item in designTools"
              :class="currenTool.link === item.link ? 'active-card' : ''"
              :key="item.link"
              @click="changeTool(item)"
              variant="flat"
              class="basis-1/2"
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
