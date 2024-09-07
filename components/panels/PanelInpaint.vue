<script setup lang="ts">
import { useImageAiStore } from "@/stores/imageAi";
import { useTaskStore } from "@/stores/taskStore";
import ImgUploader from "@/components/common/ImgUploader2.vue";
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
    <div class="px-2 pt-2">
      <v-btn
        class="gradient info text-gray-50 my-2"
        color="primary"
        size="large"
        block
        :disabled="taskStore.isLoading"
        @click="handleCreate"
        >图像生成</v-btn
      >
    </div>

    <perfect-scrollbar class="config-panel overflow-auto pa-2">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel value="baseImgPanel">
          <v-expansion-panel-title class="font-weight-bold"
            >原图</v-expansion-panel-title
          >
          <v-expansion-panel-text>
            <ImgUploader
              @update:base64Str="handleBase64Update"
              @update:uploadImg="handleImageFileUpdate"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="refImgPanel">
          <v-expansion-panel-title class="font-weight-bold"
            >参照图</v-expansion-panel-title
          >
          <v-expansion-panel-text>
            <ImgUploader @update:base64Str="handleRefImgUpdate" />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="selectionPanel">
          <v-expansion-panel-title class="font-weight-bold"
            >选区</v-expansion-panel-title
          >
          <v-expansion-panel-text>
            <v-card width="280" height="200">
              <v-img contain :src="imageAiStore.maskSrc" width="100%"></v-img>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel value="promptPanel">
          <v-expansion-panel-title class="font-weight-bold"
            >提示词</v-expansion-panel-title
          >
          <v-expansion-panel-text>
            <v-textarea
              v-model="prompt"
              color="primary"
              variant="outlined"
              counter
              hide-details
            ></v-textarea>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </perfect-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.config-panel {
  height: calc(100vh - 172px);
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin {
  from {
    --angle: 0deg;
  }
  to {
    --angle: 360deg;
  }
}

.light-border {
  background: #1c1f2b;

  border-radius: 10px;
  position: relative;

  &::after,
  &::before {
    content: "";
    position: absolute;
    height: 105%;
    width: 105%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-image: conic-gradient(
        from var(--angle),
        transparent 70%,
        rgba(var(--v-theme-primary))
      ),
      conic-gradient(
        from calc(var(--angle) + 180deg),
        transparent 70%,
        rgba(var(--v-theme-primary))
      );
    border-radius: 10px;
    padding: 3px;
    z-index: -1 !important;
    animation: 3s linear infinite spin;
  }
  &::before {
    filter: blur(1.5rem);
    opacity: 0.7;
  }
}
</style>
