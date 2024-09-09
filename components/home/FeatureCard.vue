<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";
interface Tool {
  cover: string;
  text: string;
  color: string;
  link: string;
  badge?: string;
  icon: string;
}
const props = defineProps<{
  title: string;
  tools: Tool[]
}>();

const router = useRouter()

</script>

<template>
  <v-card variant="flat">
    <v-card-title class="pa-5 font-weight-bold">{{ $t(props.title) }}</v-card-title>
    <v-card-text>

      <v-row>
        <v-col v-for="tool in props.tools" cols="12" sm="6" md="4" lg="3" xl="2" :key="tool.text">

          <v-hover v-slot="{ isHovering, props }">
            <v-card color="grey-lighten-4" v-bind="props" variant="flat" class=" cursor-pointer" rounded="lg"
              :elevation="isHovering ? 8 : 0" @click="router.push(tool.link)">
              <v-card-text :style="tool.color ? `background-color: ${tool.color}` : 'background-color: #f0f4ff'">
                <v-badge v-if="tool.badge" class="position-absolute z-10 right-0" offset-x="36" color="error"
                  :content="tool.badge">

                </v-badge>
                <v-img aspect-ratio="1" cover
                  :src="tool.cover ? tool.cover : 'https://pub-static.fotor.com/assets/aiImageConfig/template/fotorWeb/rg0th3khguqn.jpg@196w_196h_1l.src'">

                </v-img>

              </v-card-text>

              <h1 class="text-body-2 d-flex align-center  pa-3 pa-lg-5">
                <Icon class="mr-2" width="20" :icon="tool.icon"></Icon>
                {{ $t(tool.text) }}
              </h1>

            </v-card>
          </v-hover>

        </v-col>

      </v-row>
    </v-card-text>

  </v-card>

</template>

<style scoped lang="scss"></style>
