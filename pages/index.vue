<script setup>
import RecomendCard from '~/components/home/RecomendCard.vue';
import FeatureCard from '~/components/home/FeatureCard.vue';
import { designToolsData, generateToolsData, editToolsData } from "~/data/aiData.ts";
import { Icon } from "@iconify/vue";
import LanguageSwitcher from '~/components/common/LanguageSwitcher.vue';
definePageMeta({
  layout: "home",
});

const homeMenu = ref([
  {
    text: "menu.home",
    link: "/",
    icon: "solar:home-bold-duotone",
  }]
)

const toolMenu = ref([

  {
    text: "aiTools.generate.title",
    link: "generate",
    icon: "mdi-image-edit-outline",
  },
  {
    text: "aiTools.edit.title",
    link: "edit",
    icon: "mdi-image-edit-outline",
  },
  {
    text: "aiTools.design.title",
    link: "design",
    icon: "solar:paw-line-duotone",
  },
]);

const projectMenu = ref([
  {
    text: "menu.creations",
    link: "#",
    icon: "solar:gallery-wide-broken",
  },
  {
    text: "menu.favorites",
    link: "#",
    icon: "solar:gallery-favourite-line-duotone",
  },
  {
    text: "menu.trash",
    link: "#",
    icon: "solar:gallery-remove-line-duotone",
  },
  {
    text: "menu.testpage",
    link: "/testpage",
    icon: "solar:ruler-pen-line-duotone",
  },
  {
    text: "menu.config",
    link: "/config",
    icon: "solar:settings-line-duotone",
  },
])


const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);

  if (element) {
    currentAnchor.value = sectionId;
    const offsetTop = element.offsetTop;
    console.log(offsetTop);

    const mainArea = document.getElementById("main");

    mainArea.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
};


const currentAnchor = ref("");


</script>
<template>
  <div class="h-screen w-screen bg-gray-100">
    <!-- 左侧边栏 -->
    <v-card theme="light">
      <v-layout>
        <v-navigation-drawer theme="light" permanent class="px-2">
          <!-- prepend -->
          <template v-slot:prepend>
            <div class="pa-5  ">
              <h3 class="text-2xl font-weight-bold d-flex align-center ">

                <Icon icon="token-branded:dxp" width="30" class="mr-2" />
                <span>AI Box</span>
              </h3>
            </div>
          </template>
          <v-list nav>

            <v-list-item v-for="item in homeMenu" :key="item.text" :value="item.text" :to="item.link"
              :prepend-icon="item.icon" color="primary" :active="item.text === 'Home'">
              <template v-slot:prepend>
                <Icon class="mx-2 mr-3" width="20" :icon="item.icon" />
              </template>
              <v-list-item-title v-text="$t(item.text)" class="font-weight-bold"></v-list-item-title>
            </v-list-item>
          </v-list>

          <hr />
          <v-list nav>
            <v-list-subheader>{{ $t("header.aiTools") }}</v-list-subheader>
            <v-list-item v-for="item in toolMenu" @click="scrollToSection(item.link)" :prepend-icon="item.icon"
              color="primary" :active="item.link === currentAnchor">
              <template v-slot:prepend>
                <Icon class="mx-2 mr-3" width="20" :icon="item.icon" />
              </template>
              <v-list-item-title class="font-weight-bold">
                {{ $t(item.text) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <hr />
          <v-list nav>
            <v-list-subheader>{{ $t("header.myClould") }}</v-list-subheader>
            <v-list-item v-for="item in projectMenu" :to="item.link" :prepend-icon="item.icon" color="primary"
              :active="item.link === currentAnchor">
              <template v-slot:prepend>
                <Icon class="mx-2 mr-3" width="20" :icon="item.icon" />
              </template>
              <v-list-item-title v-text="$t(item.text)" class="font-weight-bold"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-app-bar color="primary" elevation="1" height="64">
          <!-- Search -->
          <v-text-field density="compact" variant="solo-filled" hide-details prepend-inner-icon="mdi-magnify"
            placeholder="Search Tools" class="ml-5 mr-5"></v-text-field>

          <v-spacer></v-spacer>
          <v-btn icon>
            <v-badge dot color="success">
              <v-icon>mdi-google</v-icon>
            </v-badge>
          </v-btn>
          <v-btn icon>
            <v-badge dot color="success">
              <v-icon>mdi-home-outline</v-icon>
            </v-badge>
          </v-btn>


          <v-btn class="text-none" stacked>
            <v-icon>mdi-account-multiple-outline</v-icon>
          </v-btn>

          <v-btn class="text-none" stacked>
            <v-badge content="9+" color="error">
              <v-icon>mdi-store-outline</v-icon>
            </v-badge>
          </v-btn>

          <v-btn class="text-none" stacked>
            <v-badge content="2" color="error">
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>
          <LanguageSwitcher />

          <v-avatar class="mx-5">
            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
          </v-avatar>
        </v-app-bar>

        <v-main id="main" class="main h-screen overflow-auto">
          <div class="h-full pa-5">
            <!-- Banner -->
            <v-card height="160" class="d-flex align-center justify-center banner-gradient text-white">
              <h1 class="text-3xl font-weight-bold">{{ $t("banner.welcome") }}</h1>
            </v-card>

            <!-- Recomended -->
            <RecomendCard />

            <!-- AI Image Generator -->
            <FeatureCard id="generate" title="aiTools.design.title" :tools="generateToolsData" />

            <!-- AI Image Editor -->

            <FeatureCard id="edit" title="aiTools.edit.title" :tools="editToolsData" />

            <!-- AI Designer -->
            <FeatureCard id="design" title="aiTools.design.title" :tools="designToolsData" />

            <!-- Inspiration -->

            <!-- Recent -->
          </div>
        </v-main>
      </v-layout>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.banner-gradient {
  background: linear-gradient(to right, #72e6ff, #2563ff);
}
</style>
