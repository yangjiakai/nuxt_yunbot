<script setup lang="ts">
const panel = ref([1]);
</script>

<template>
  <div>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-title class="font-weight-bold"
          >默认面板</v-expansion-panel-title
        >
        <v-expansion-panel-text>
          <div class="d-flex flex-wrap">Panel</div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped lang="scss"></style>
