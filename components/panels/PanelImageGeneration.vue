<script setup lang="ts">
import { useFakeProgress } from "@/hooks/useFakeProgress";
import useWebsocket from "@/hooks/useWebSocket";
import { useImageAiStore } from "@/stores/imageAi";

const imageAiStore = useImageAiStore();
const websocketUrl =
  "wss://api.yunrobot.cn/api/v1/AIGC/ws?client_id=648683-3-4957-b27f-ae86a68875884";
// 定义一个响应式变量来存储接收到的消息
// 定义收到消息时的回调函数
const onMessage = (message: any) => {
  switch (message.type) {
    case "created_image":
      imageAiStore.creations = message.data.images;
      // imageAiStore.currentIndex = 0;
      imageAiStore.currentCreationImage = message.data.images[0];
      break;
    case "end":
      // if (message.data.result === "success") {
      //   useToast("生成成功", { type: "success" });
      // } else {
      //   useToast("生成失败", { type: "error" });
      // }
      // useToast("生成完成", { type: "success" });
      isCreating.value = false;
      imageAiStore.imgCreatingDialog = false;
      endProgress();
      break;
    default:
      break;
  }
};

// 使用WebSocket Hook
const { sendMessage: sendWebSocketMessage } = useWebsocket(
  websocketUrl,
  onMessage
);

const {
  progress: fakeProgress,
  startProgress,
  endProgress,
} = useFakeProgress();

const panel = ref(["promptPanel", "configPanel", "stylePanel"]);
const prompt = ref("");
const styles = ref([
  {
    link: "aiimage",
    text: "AI 图像生成",
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

const currentStyle = ref(styles.value[0]);

const handleStyle = (style: any) => {
  currentStyle.value = style;
};

const isCurrentStyle = (style: any) => {
  return currentStyle.value.link === style.link;
};

const isCreating = ref<boolean>(false);

const batchSize = ref(1);
const aspectRatio = ref("1:1");

// 定义发送消息的函数
const sendMessage = () => {
  const message = {
    type: "flux-txt2img",
    prompt: {
      seed: "12345678888",
      batch_size: 1,
      positive: prompt.value,
    },
  };
  sendWebSocketMessage(message);
};

/* -------------------------------
   创建任务
------------------------------- */

const handleCreate = async () => {
  isCreating.value = true;
  imageAiStore.imgCreatingDialog = true;
  startProgress();
  try {
    sendMessage();
  } catch (error: any) {
    isCreating.value = false;
    imageAiStore.imgCreatingDialog = false;
  } finally {
  }
};
</script>

<template>
  <div>
    <div class="px-1 py-5">
      <v-btn
        class="gradient info text-gray-50"
        color="primary"
        size="large"
        block
        :disabled="isCreating"
        @click="handleCreate"
        >图像生成</v-btn
      >
    </div>

    <v-expansion-panels v-model="panel" multiple>
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
            clearable
          ></v-textarea>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel value="configPanel">
        <v-expansion-panel-title class="font-weight-bold"
          >基础参数</v-expansion-panel-title
        >
        <v-expansion-panel-text>
          <!-- Param -->

          <div class="d-flex gap-1 mb-5">
            <v-select
              v-model="aspectRatio"
              label="比例"
              density="compact"
              hide-details
              color="primary"
              class="flex-grow-1"
              :items="['1:1', '4:3', '3:4', '16:9', '9:16']"
              variant="outlined"
            ></v-select>
            <v-select
              label="数量"
              v-model="batchSize"
              density="compact"
              hide-details
              color="primary"
              class="flex-grow-1"
              :items="[1, 2, 3, 4]"
              variant="outlined"
            ></v-select>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel value="stylePanel">
        <v-expansion-panel-title class="font-weight-bold"
          >风格</v-expansion-panel-title
        >
        <v-expansion-panel-text>
          <div class="grid gap-2 grid-cols-3">
            <div
              v-for="style in styles"
              :key="style.link"
              class="cursor-pointer"
              :class="isCurrentStyle(style) ? ' light-border ' : ''"
              @click="handleStyle(style)"
            >
              <v-img :src="style.cover" class="rounded-lg ma-1"></v-img>
              <div class="text-center text-xs font-bold py-2">
                {{ style.text }}
              </div>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped lang="scss">
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
