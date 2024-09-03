<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/app";

const router = useRouter();
const appStore = useAppStore();

const mainMenu = ref([
  {
    text: "首页",
    link: "/",
    icon: "solar:widget-add-bold-duotone",
  },
  {
    text: "图像",
    link: "/ai-image",
    icon: "solar:pallete-2-bold-duotone",
  },

  // {
  //   text: "聊天",
  //   link: "/ai-chat",
  //   icon: "solar:filters-bold-duotone",
  // },

  // {
  //   text: "设计",
  //   link: "/ai-design",
  //   icon: "solar:pallete-2-bold-duotone",
  // },
  // {
  //   text: "语音",
  //   link: "/ai-voice",
  //   icon: "solar:cart-large-2-bold-duotone",
  // },
  // {
  //   text: "视频",
  //   link: "/ai-video",
  //   icon: "solar:shop-2-bold-duotone",
  // },

  {
    text: "测试",
    link: "/testpage",
    icon: "solar:ruler-pen-bold-duotone",
  },
  {
    text: "设置",
    link: "/config",
    icon: "solar:settings-bold-duotone",
  },
]);

const currentPath = computed(() => {
  return router.currentRoute.value.path;
});

const getMainMenuAcitve = (menuPath: string) => {
  if (currentPath.value.startsWith(menuPath) && menuPath !== "/") {
    return true;
  } else if (menuPath === "/" && currentPath.value === menuPath) {
    return true;
  }
  return false;
};

const sidebarType = ref("tail");
</script>

<template>
  <v-navigation-drawer
    v-model="appStore.mainSidebar"
    elevation="0"
    location="left"
    rail
  >
    <!-- ---------------------------------------------- -->
    <!---Top Area -->
    <!-- ---------------------------------------------- -->

    <template v-slot:prepend>
      <router-link to="/">
        <div class="d-flex flex-column align-center my-8" variant="flat">
          <img width="60" src="@/assets/images/logo.png" alt="" />
          <!-- <span class="text-grey-500 text-body-2">yunbot</span> -->
        </div>
      </router-link>
    </template>
    <v-list
      v-if="sidebarType === 'chip'"
      lines="three"
      density="compact"
      nav
      color="primary"
    >
      <v-list-item rounded="lg" v-for="item in mainMenu" :to="item.link">
        <v-list-item-subtitle>
          <div class="d-flex flex-column align-center justify-center">
            <Icon size="25" :name="item.icon"></Icon>

            <div class="mt-2 font-weight-bold">{{ item.text }}</div>
          </div></v-list-item-subtitle
        >
      </v-list-item>
    </v-list>
    <v-list v-else-if="sidebarType === 'tail'" lines="two">
      <v-list-item
        v-for="item in mainMenu"
        :to="item.link"
        :active="getMainMenuAcitve(item.link)"
        :prepend-icon="item.icon"
        @click="appStore.currentPanel = item.text"
      >
        <template v-slot:prepend>
          <Icon size="25" :name="item.icon"></Icon>
        </template>
        <v-tooltip
          activator="parent"
          location="right"
          class=""
          :text="item.text"
          theme="light"
        ></v-tooltip>
      </v-list-item>
    </v-list>
    <!-- ---------------------------------------------- -->
    <!---Menu Area -->
    <!-- ---------------------------------------------- -->
    <!-- <main-menu :menu="navigation.menu"></main-menu> -->

    <!-- ---------------------------------------------- -->
    <!---Bottom Area -->
    <!-- ---------------------------------------------- -->
    <template v-slot:append>
      <!-- <GithubCard /> -->
    </template>
  </v-navigation-drawer>
</template>

<style scoped lang="scss"></style>
