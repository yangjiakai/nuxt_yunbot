import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    theme: "dark",
    sidebar: true,
    mainSidebar: true,
    subSidebar: true,
    authDialog: false,
    imgPreviewDialog: false,
    authType: "login",
    // 当前功能
    currentPanel: ref("wall"),
    // App背景图
    currentBackground: ref(
      `url("https://firebasestorage.googleapis.com/v0/b/wallingapp.appspot.com/o/attachments%2Fh1BtWGEdBSCDddNvsXE2sunucN2KsJJqhj6Vg9Q8jE3OTinqfd.png?alt=media"`
    ),
    commonTools: {
      title: "常用工具",
      key: "common-tools",
      icon: "mdi-tools",
      items: [],
    },
  }),
  actions: {
    toggleSidebar() {
      this.subSidebar = !this.subSidebar;
    },
    toggleAuthDialog() {
      this.authDialog = !this.authDialog;
    },
    toggleImgPreviewDialog() {
      this.imgPreviewDialog = !this.imgPreviewDialog;
    },
    setTheme(theme: string) {
      this.theme = theme;
    },
  },
  persist: [
    {
      paths: ["theme", "currentBackground"],
      storage: persistedState.localStorage,
    },
  ],
});
