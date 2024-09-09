<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { generateToolsData } from "~/data/aiData";
const router = useRouter();
const panel = ref(["generateTools"]);
const generateTools = ref(generateToolsData);

const currenTool = ref({
  link: "text2img",
  text: "aiTools.generate.text2img",
  cover: "https://www.fotor.com/photo-editor-app/ai/thumb/enhance.jpg",
});

const changeTool = (tool: any) => {
  currenTool.value = tool;
  router.push(tool.link);
};
</script>

<template>
  <div class="pa-2">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel value="generateTools">
        <v-expansion-panel-title class="font-weight-bold">{{ $t("aiTools.generate.title") }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="6" v-for="item in generateTools">
              <div :class="currenTool.link === item.link ? 'color-border-5' : ''" :key="item.link"
                class="bg-black/50 rounded-lg cursor-pointer" @click="changeTool(item)" variant="flat">
                <v-img :src="item.cover" height="120" cover rounded="lg"></v-img>
                <div class="text-center text-body-2  py-3">{{ $t(item.text) }}</div>
              </div>
            </v-col>
          </v-row>
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
