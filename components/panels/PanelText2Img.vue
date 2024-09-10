<script setup lang="ts">
import { generateRandomSeed } from "@/utils/common";
import { createTask } from "~/utils/task";
import { useTaskStore } from "@/stores/taskStore";
import SubHeader from "~/components/layout/SubHeader.vue";
import Button1 from "~/components/UI/button/Button1.vue";
import { styleData } from "@/data/aiData";
const router = useRouter();
const taskStore = useTaskStore();
const panel = ref(["promptPanel", "configPanel", "stylePanel"]);
const prompt = ref("A beautiful girl, HD，Chinese portrait");
const styles = ref(styleData);

const currentStyle = ref({
  key: "none",
  text: "style.none",
  cover:
    "https://pub-static.fotor.com/assets/aiImageConfig/template/fotorWeb/rg0th3khguqn.jpg@196w_196h_1l.src",
});

const stylePrompt = computed(() => {
  return `style is ${currentStyle.value.key} `;
});

const fullPrompt = computed(() => {
  return `${prompt.value} ,${stylePrompt.value}`;
});

const handleStyle = (style: any) => {
  currentStyle.value = style;
};

const isCurrentStyle = (style: any) => {
  return currentStyle.value.key === style.key;
};

const batchSize = ref(1);
const aspectRatio = ref("1:1");

const handleCreate = () => {
  createTask({
    type: "FLUX1-nf4-schnell-txt2img",
    client_id: "32324324224",
    prompt: {
      seed: generateRandomSeed(),
      batch_size: batchSize.value,
      positive: fullPrompt.value,
    },
  });
};
</script>

<template>
  <div>
    <SubHeader title="aiTools.generate.text2img" link="/generate" />
    <div class="px-2 pt-2 ">
      <Button1 @click="handleCreate" text="btn.create" />
      <!-- <v-btn class="gradient info text-gray-50 my-2" color="primary" size="large" block :disabled="taskStore.isLoading"
        @click="handleCreate">图像生成</v-btn> -->
    </div>
    <perfect-scrollbar class="config-panel  pa-2">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel value="promptPanel">
          <v-expansion-panel-title class="font-weight-bold">{{ $t("header.prompt") }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-textarea v-model="prompt" color="primary" variant="outlined" counter hide-details></v-textarea>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="configPanel">
          <v-expansion-panel-title class="font-weight-bold">{{ $t("header.baseParam") }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <!-- Param -->

            <div class="d-flex gap-1 mb-5">
              <v-select v-model="aspectRatio" :label="$t('label.ratio')" density="compact" hide-details color="primary"
                class="flex-grow-1" :items="['1:1', '4:3', '3:4', '16:9', '9:16']" variant="outlined"></v-select>
              <v-select :label="$t('label.number')" v-model="batchSize" density="compact" hide-details color="primary"
                class="flex-grow-1" :items="[1, 2, 3, 4]" variant="outlined"></v-select>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="stylePanel">
          <v-expansion-panel-title class="font-weight-bold">{{ $t("header.style") }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="grid gap-2 grid-cols-3">
              <div v-for="style in styles" :key="style.key" class="cursor-pointer"
                :class="isCurrentStyle(style) ? ' color-border-3 ' : ''" @click="handleStyle(style)">
                <v-img :src="style.cover" class="rounded-lg ma-1"></v-img>
                <div class="text-center text-xs font-bold py-2">
                  {{ $t(style.text) }}
                </div>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </perfect-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.config-panel {
  height: calc(100vh - 144px);
}
</style>
