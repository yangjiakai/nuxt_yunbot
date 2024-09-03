<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useImageAiStore } from "@/stores/imageAi";

const imageAiStore = useImageAiStore();

const actions = [
  {
    icon: "mdi-thumb-up-outline",
    text: "Star",
    click: () => {
      imageAiStore.toggoleImgPreviewDialog();
    },
    color: "white",
  },
  // Edit
  {
    icon: "mdi-pencil-outline",
    text: "Edit",
    click: () => {
      imageAiStore.toggoleImgPreviewDialog();
    },
    color: "white",
  },
  // Delete
  {
    icon: "mdi-delete-outline",
    text: "Delete",
    click: () => {
      imageAiStore.toggoleImgPreviewDialog();
    },
    color: "white",
  },
  // Favorite
  {
    icon: "mdi-heart-outline",
    text: "Favorite",
    click: () => {
      imageAiStore.toggoleImgPreviewDialog();
    },
    color: "primary",
  },
];

const handleClose = () => {
  imageAiStore.imgPreviewDialog = false;
};
</script>

<template>
  <v-dialog
    v-model="imageAiStore.imgPreviewDialog"
    width="auto"
    scrim
    class="dialog-bg-blur"
    theme="light"
  >
    <div class="flex align-stretch">
      <div class="d-flex align-center pr-2">
        <v-btn
          icon
          variant="text"
          color="white"
          @click="imageAiStore.toggoleImgPreviewDialog()"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
      <v-card
        class="d-flex flex-column flex-1"
        :style="{
          width: '90vw',
          maxWidth: '1000px',
          height: '80vh',
          maxHeight: '800px',
        }"
      >
        <div class="d-flex flex-grow-1 overflow-hidden">
          <!-- 左侧图片区域 -->
          <div
            class="flex-grow-1 overflow-hidden d-flex align-center justify-center bg-[#27282c]"
          >
            <v-img
              :src="imageAiStore.currentHisoryImage.img_url"
              contain
              max-height="100%"
              max-width="100%"
            />
          </div>

          <!-- 右侧文本区域 -->
          <v-card
            width="320"
            variant="flat"
            rounded="0"
            color="#2f3034"
            class="pa-5"
            :style="{
              height: '100%',
              minHeight: '600px',
              overflowY: 'auto',
            }"
          >
            <div class="d-flex mb-5">
              <v-btn block color="primary">
                <!-- Download  -->
                <v-icon>mdi-download</v-icon>

                <span class="ml-1">下载</span>
              </v-btn>
            </div>

            <div class="grid gap-2 grid-cols-4">
              <!--上Icon 下title 居中-->
              <div
                v-for="action in actions"
                :key="action.text"
                class="cursor-pointer text-center d-flex flex-column align-center justify-center"
              >
                <v-btn variant="text" :color="action.color" icon>
                  <v-icon size="20">{{ action.icon }}</v-icon>
                </v-btn>

                <div class="text-center text-xs">{{ action.text }}</div>
              </div>
            </div>
            <v-divider class="my-5"></v-divider>

            <v-card-title class="d-flex align-center">
              <span class="text-body-2 font-bold text-gray-400">提示词</span>
              <v-spacer></v-spacer>
              <!-- copy -->
              <v-icon size="14">mdi-content-copy</v-icon>
            </v-card-title>
            <v-card-text>
              <div class="line-clamp-3 text-xs mb-5">
                A masterful digital fantasy painting in the style of Greg
                Rutkowski Dan Mumford and Caspar David Friedrich, a dark tall,
                and gothic vampire castle sits atop a creepy mountain spire,
                moonlit, night, masterpiece, 8k, award-winning, high quality,
                best quality, cinematic, extremely detailed, intense lighting,
                epic
              </div>

              <div class="grid grid-cols-2 gap-5">
                <div>
                  <div class="text-body-2 font-bold text-gray-400 mb-2">
                    图片比例
                  </div>
                  <div class="text-xs">1:1</div>
                </div>
                <div>
                  <div class="text-body-2 font-bold text-gray-400 mb-2">
                    风格
                  </div>
                  <div class="text-xs">写真</div>
                </div>
                <div>
                  <div class="text-body-2 font-bold text-gray-400 mb-2">
                    时间
                  </div>
                  <div class="text-xs">2024/7/29 12:12</div>
                </div>
                <div>
                  <div class="text-body-2 font-bold text-gray-400 mb-2">
                    尺寸
                  </div>
                  <div class="text-xs">512x512</div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-card>
      <div class="d-flex flex-column justify-between pl-2">
        <v-btn
          color="grey"
          icon
          class="rounded-sm"
          size="small"
          @click="handleClose"
        >
          <!-- close -->
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn icon variant="text" color="white">
          <!-- next -->
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>

        <div></div>
      </div>
    </div>
  </v-dialog>
</template>

<style></style>
