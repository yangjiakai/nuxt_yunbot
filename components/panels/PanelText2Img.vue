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
      imageAiStore.historys.unshift(...message.data.images);
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
const prompt = ref("A beautiful girl, HD，Chinese portrait");
const styles = ref([
  {
    text: "None",
    textZh: "无",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/fotorWeb/rg0th3khguqn.jpg@196w_196h_1l.src",
  },
  {
    text: "Photography",
    textZh: "摄影",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/5a61d47x6r1c.jpg@196w_196h_1l.src",
  },
  {
    text: "Psychedelic",
    textZh: "迷幻",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/185w5i9s26er.jpg@196w_196h_1l.src",
  },
  {
    text: "Digital Art",
    textZh: "数字艺术",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/rskwaasqq9se.jpg@196w_196h_1l.src",
  },
  {
    text: "Art Oils",
    textZh: "油画艺术",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/tlzz7y7pjrws.jpg@196w_196h_1l.src",
  },
  {
    text: "Tattoo",
    textZh: "纹身",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/h9cpi98sa41p.jpg@196w_196h_1l.src",
  },
  {
    text: "Acrylic Painting",
    textZh: "丙烯画",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/j2ubca96rmfs.jpg@196w_196h_1l.src",
  },
  {
    text: "Chinese Illustration",
    textZh: "中国插画",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/k1tkfjdvevf1.jpg@196w_196h_1l.src",
  },
  {
    text: "Chinese Ink Painting",
    textZh: "中国水墨画",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/cva58ri9o55i.jpg@196w_196h_1l.src",
  },
  {
    text: "Colored Pencil Drawing",
    textZh: "彩色铅笔画",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/i7rol6bmvxio.jpg@196w_196h_1l.src",
  },
  {
    text: "Color Manga",
    textZh: "彩色漫画",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/8osa2ndgux1h.jpg@196w_196h_1l.src",
  },
  {
    text: "Neonpunk",
    textZh: "霓虹朋克",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/yqhk8jzwnowa.jpg@196w_196h_1l.src",
  },
  {
    text: "Tee Printing",
    textZh: "T恤印花",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/ni49174se7yt.jpg@196w_196h_1l.src",
  },
  {
    text: "Anime",
    textZh: "动漫",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/bij6jpquh9ug.jpg@196w_196h_1l.src",
  },
  {
    text: "Cinematic",
    textZh: "电影风格",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/uhgtz698jloy.jpg@196w_196h_1l.src",
  },
  {
    text: "Icon",
    textZh: "图标",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/13b0d1pplfpp.jpg@196w_196h_1l.src",
  },
  {
    text: "Logo",
    textZh: "标志",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/bs1c9fat0rn4.jpg@196w_196h_1l.src",
  },
  {
    text: "Pixel Art",
    textZh: "像素艺术",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/teauo5you13o.jpg@196w_196h_1l.src",
  },
]);

const currentStyle = ref(styles.value[0]);

const stylePrompt = computed(() => {
  return `style is ${currentStyle.value.text} `;
});

const fullPrompt = computed(() => {
  return `${prompt.value} ,${stylePrompt.value}`;
});

const handleStyle = (style: any) => {
  currentStyle.value = style;
};

const isCurrentStyle = (style: any) => {
  return currentStyle.value.text === style.text;
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
      batch_size: batchSize.value,
      positive: fullPrompt.value,
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
    <div class="px-2 pt-2">
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
    <perfect-scrollbar class="config-panel overflow-auto pa-2">
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
                :key="style.text"
                class="cursor-pointer"
                :class="isCurrentStyle(style) ? ' light-border ' : ''"
                @click="handleStyle(style)"
              >
                <v-img :src="style.cover" class="rounded-lg ma-1"></v-img>
                <div class="text-center text-xs font-bold py-2">
                  {{ style.textZh }}
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
