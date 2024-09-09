<script setup lang="ts">
import { useImageAiStore } from "@/stores/imageAi";
import { useTaskStore } from "@/stores/taskStore";
import ImgUploader from "@/components/common/ImgUploader2.vue";
import SubHeader from "~/components/layout/SubHeader.vue";
import Button1 from "~/components/UI/button/Button1.vue";
const taskStore = useTaskStore();
const imageAiStore = useImageAiStore();
const panel = ref([
  "baseImgPanel",
  "refImgPanel",
  "selectionPanel",
  "promptPanel",
]);
const prompt = ref("A beautiful girl, HD，Chinese portrait");

const removePrefix = (base64String: string) => {
  return base64String.split(",")[1];
};

/* -------------------------------
   创建任务
------------------------------- */

const baseImage = ref("");

const handleBase64Update = (base64: string) => {
  baseImage.value = base64;
  imageAiStore.setBaseImage(base64);
};

const handleImageFileUpdate = (file: File) => {
  imageAiStore.setBaseImageFile(file);
};

const refImg = ref("https://thitbo.vivusea.com/upload/images/noimg.jpg");
const handleRefImgUpdate = (base64: string) => {
  refImg.value = base64;
};

const handleCreate = () => {
  createTask({
    type: "cat_vton",
    client_id: "32324324224",
    prompt: {
      model_img: removePrefix(imageAiStore.baseImage),
      mask_img: removePrefix(imageAiStore.maskSrc),
      clothes_img: removePrefix(refImg.value),
    },
  });
};
</script>

<template>
  <div>
    <SubHeader title="aiTools.generate.text2img" link="/generate" />
    <div class="px-2 pt-2 ">
      <Button1 @click="handleCreate" text="btn.create" />

    </div>

    <perfect-scrollbar class="config-panel overflow-auto pa-2">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel value="baseImgPanel">
          <v-expansion-panel-title class="font-weight-bold">{{ $t("header.model") }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <ImgUploader @update:base64Str="handleBase64Update" @update:uploadImg="handleImageFileUpdate" />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="refImgPanel">
          <v-expansion-panel-title class="font-weight-bold">{{ $t("header.wear") }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <ImgUploader @update:base64Str="handleRefImgUpdate" />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="selectionPanel">
          <v-expansion-panel-title class="font-weight-bold">{{ $t("header.selection") }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-card width="280" height="200">
              <v-img contain :src="imageAiStore.maskSrc" width="100%"></v-img>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel value="promptPanel">
          <v-expansion-panel-title class="font-weight-bold">{{ $t("header.prompt") }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-textarea v-model="prompt" color="primary" variant="outlined" counter hide-details></v-textarea>
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
