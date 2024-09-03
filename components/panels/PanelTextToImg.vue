<script setup lang="ts">
const panel = ref([1]);
const prompt = ref("");
</script>

<template>
  <div>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-title class="font-weight-bold"
          >提示词</v-expansion-panel-title
        >
        <v-expansion-panel-text>
          <!-- Buttons -->
          <div class="d-flex gap-1 mb-5">
            <v-btn color="primary" class="flex-grow-1"> 文生图 </v-btn>
            <v-btn color="primary" class="flex-grow-1"> 图生图 </v-btn>
          </div>
          <!-- Prompt -->
          <div>
            <v-textarea
              v-model="prompt"
              class="mb-5"
              color="primary"
              variant="outlined"
              label="提示词"
              counter
              hide-details
              clearable
            ></v-textarea>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped lang="scss"></style>
