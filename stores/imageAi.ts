import { defineStore } from "pinia";

export const useImageAiStore = defineStore("ImageAi", {
  state: () => ({
    // 图像预览dialog
    imgPreviewDialog: false,
    // 图像生成中Dialog
    imgCreatingDialog: false,
    // 当前图像对象
    currentCreationImage: {
      img_url:
        "https://cdn.pixabay.com/photo/2023/09/16/20/14/ai-generated-8257503_1280.jpg",
    },

    currentHisoryImage: {
      img_url:
        "https://cdn.pixabay.com/photo/2023/09/16/20/14/ai-generated-8257503_1280.jpg",
    },

    currentIndex: 0,

    // AI本次生成的图像列表
    creations: [
      {
        img_url:
          "https://cdn.pixabay.com/photo/2023/09/16/20/14/ai-generated-8257503_1280.jpg",
      },
    ],

    historys: [
      {
        img_url:
          "https://cdn.pixabay.com/photo/2023/09/16/20/14/ai-generated-8257503_1280.jpg",
      },
    ],
  }),
  persist: [
    {
      paths: ["imgPreviewDialog", "creations", "historys"],
      storage: persistedState.localStorage,
    },
  ],

  getters: {},
  actions: {
    toggoleImgPreviewDialog(): void {
      this.imgPreviewDialog = !this.imgPreviewDialog;
    },

    toggleImgCreatingDialog(): void {
      this.imgCreatingDialog = !this.imgCreatingDialog;
    },

    updateCurrentCreationImage(image: any): void {
      this.currentCreationImage = image;
    },

    updateCurrentHistoryImage(image: any): void {
      this.currentHisoryImage = image;
    },
  },
});
