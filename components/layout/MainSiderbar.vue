<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { Icon } from "@iconify/vue";
const router = useRouter();
const appStore = useAppStore();

const mainMenu = ref([
  {
    text: "menu.home",
    link: "/",
    icon: "solar:widget-add-bold-duotone",
  },
  {
    text: "menu.generate",
    link: "/generate",
    icon: "solar:gallery-add-line-duotone",
  },
  {
    text: "menu.edit",
    link: "/edit",
    icon: "solar:gallery-edit-bold-duotone",
  },
  {
    text: "menu.design",
    link: "/design",
    icon: "solar:paw-bold-duotone",
  },

  {
    text: "menu.testpage",
    link: "/testpage",
    icon: "solar:ruler-pen-bold-duotone",
  },
  {
    text: "menu.config",
    link: "/config",
    icon: "solar:settings-bold-duotone",
  },
]);

const currentPath = computed(() => {
  console.log(router.currentRoute.value.path);

  return router.currentRoute.value.path;
});

const getMainMenuAcitve = (menuPath: string) => {
  if (currentPath.value.startsWith(menuPath) && menuPath !== "/") {
    return true;
  } else if (menuPath === "/" && currentPath.value === menuPath) {
    return true;
  }
};

const sidebarType = ref("chip");
</script>

<template>
  <v-navigation-drawer v-model="appStore.mainSidebar" elevation="0" location="left" width="100">
    <!-- ---------------------------------------------- -->
    <!---Top Area -->
    <!-- ---------------------------------------------- -->

    <template v-slot:prepend>
      <router-link to="/">
        <div class="d-flex flex-column align-center my-8" variant="flat">
          <Icon icon="token-branded:dxp" width="46" />
          <p class="mt-2 font-weight-bold">AI Box</p>
          <!-- <img width="60" src="@/assets/images/logo.png" alt="" /> -->
          <!-- <span class="text-grey-500 text-body-2">yunbot</span> -->
        </div>
      </router-link>
    </template>
    <v-list v-if="sidebarType === 'chip'" lines="three" density="compact" nav color="primary">
      <v-list-item rounded="lg" v-for="item in mainMenu" :to="item.link" :active="getMainMenuAcitve(item.link)">
        <v-list-item-subtitle>
          <div class="d-flex flex-column align-center justify-center">
            <Icon width="25" :icon="item.icon"></Icon>

            <div class="mt-2 font-weight-bold text-center">{{ $t(item.text) }}</div>
          </div>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-list v-else-if="sidebarType === 'tail'" lines="two">
      <v-list-item v-for="item in mainMenu" :to="item.link" :active="getMainMenuAcitve(item.link)"
        :prepend-icon="item.icon" @click="appStore.currentPanel = item.text">
        <template v-slot:prepend>
          <Icon width="25" :icon="item.icon"></Icon>
        </template>
        <v-tooltip activator="parent" location="right" class="" :text="item.text" theme="light"></v-tooltip>
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
