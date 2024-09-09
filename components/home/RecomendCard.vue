<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { recomendedToolsData } from "~/data/aiData";
const router = useRouter()
const recomendedTools2 = ref(recomendedToolsData);
</script>

<template>
  <v-card variant="flat">
    <v-card-title class="pa-5 font-weight-bold">You might want to try...</v-card-title>
    <v-card-text>
      <v-row>
        <v-col v-for="tool in recomendedTools2" cols="12" sm="6" md="4" lg="3" xl="2" :key="tool.name">
          <v-hover v-slot="{ isHovering, props }">
            <v-card v-bind="props" height="70" variant="flat" :color="tool.color"
              class="d-flex align-center pa-3 cursor-pointer" :elevation="isHovering ? 8 : 0"
              @click="router.push(tool.link)">

              <Icon width="30" :icon="tool.icon">
              </Icon>

              <h1 class="text-body-2 mx-3">{{ tool.name }}</h1>
              <v-spacer></v-spacer>
              <v-icon v-if="isHovering" size="30" color="grey-800">mdi-chevron-right</v-icon>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

</template>

<style scoped lang="scss"></style>
