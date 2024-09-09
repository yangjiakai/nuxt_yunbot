<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
const router = useRouter();
const props = defineProps<{
  title: string;
  link: string;
}>();

</script>

<template>
  <v-card height="70" variant="flat" class="d-flex align-center justify-space-between px-5 position-sticky top-0 ">
    <h4 class="text-body-1 font-weight-bold">
      {{ $t(props.title) }}
    </h4>
    <v-btn v-if="props.link !== 'generate' && props.link !== 'edit' && props.link !== 'design'" variant="text" icon
      class="ml-auto" density="compact" @click="router.push(props.link)">
      <v-icon icon="mdi-close"></v-icon>
    </v-btn>
  </v-card>
</template>

<style scoped lang="scss"></style>
