<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useImageAiStore } from "@/stores/imageAi";
const imageAiStore = useImageAiStore();
const panel = ref(["result", "history"]);

const historys = ref([
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

const isCurrentImg = (item: any) => {
  return item.img_url === imageAiStore.currentCreationImage.img_url;
};

const handleImg = (item: any) => {
  imageAiStore.updateCurrentCreationImage(item);
};

const handleImgDialog = (item: any) => {
  imageAiStore.updateCurrentHistoryImage(item);
  imageAiStore.toggoleImgPreviewDialog();
};
</script>

<template>
  <v-navigation-drawer
    width="300"
    location="right"
    permanent
    color="rgba(40,40,40,.5)"
  >
    <!-- <template v-slot:prepend>
      <v-list-item
        lines="two"
        prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
        subtitle="Logged in"
        title="Jane Smith"
      ></v-list-item>
    </template> -->

    <!-- <v-divider></v-divider> -->
    <perfect-scrollbar class="scrollnav pa-2">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel value="result">
          <v-expansion-panel-title class="font-weight-bold"
            >生成结果</v-expansion-panel-title
          >
          <v-expansion-panel-text>
            <div class="grid gap-2 grid-cols-2">
              <div
                v-for="item in imageAiStore.creations"
                :key="item.img_url"
                class="cursor-pointer"
                :class="isCurrentImg(item) ? ' light-border ' : ''"
                @click="handleImg(item)"
              >
                <v-img
                  :src="item.img_url"
                  cover
                  class="rounded-lg ma-1"
                ></v-img>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="history">
          <v-expansion-panel-title class="font-weight-bold"
            >生成历史</v-expansion-panel-title
          >
          <v-expansion-panel-text>
            <div class="grid gap-2 grid-cols-2">
              <div
                v-for="item in imageAiStore.historys"
                :key="item.img_url"
                class="cursor-pointer"
                @click="handleImgDialog(item)"
              >
                <v-img
                  :src="item.img_url"
                  cover
                  class="rounded-lg ma-1"
                  :aspect-ratio="1 / 1"
                ></v-img>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.scrollnav {
  height: calc(100vh - 64px);
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
