<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
definePageMeta({
  layout: "home",
});
type InputVariant =
  | "outlined"
  | "plain"
  | "filled"
  | "underlined"
  | "solo"
  | "solo-inverted"
  | "solo-filled"
  | undefined;

const inputVariants = ref<InputVariant[]>([
  "outlined",
  "plain",
  "filled",
  "underlined",
  "solo",
  "solo-inverted",
  "solo-filled",
]);

const colorNames = [
  "background",
  "surface",
  "primary",
  "secondary",
  "error",
  "info",
  "success",
  "warning",
];

const primaryColor = ref(["darken-4"]);

const showToast = () => {
  console.log("This is a toast message 一条信息", { type: "success" });
};

const blendModes = ref([
  { label: "normal", value: "normal", chinese: "正常" },
  { label: "multiply", value: "multiply", chinese: "正片叠底" },
  { label: "screen", value: "screen", chinese: "滤色" },
  { label: "overlay", value: "overlay", chinese: "叠加" },
  { label: "darken", value: "darken", chinese: "变暗" },
  { label: "lighten", value: "lighten", chinese: "变亮" },
  { label: "color-dodge", value: "color-dodge", chinese: "颜色减淡" },
  { label: "color-burn", value: "color-burn", chinese: "颜色加深" },
  { label: "hard-light", value: "hard-light", chinese: "强光" },
  { label: "soft-light", value: "soft-light", chinese: "柔光" },
  { label: "difference", value: "difference", chinese: "差值" },
  { label: "exclusion", value: "exclusion", chinese: "排除" },
  { label: "hue", value: "hue", chinese: "色相" },
  { label: "saturation", value: "saturation", chinese: "饱和度" },
  { label: "color", value: "color", chinese: "颜色" },
  { label: "luminosity", value: "luminosity", chinese: "亮度" },
]);

const selectedStyle = ref(0);
const mode = ref(blendModes.value[0]);
const color = ref("#1976D2");
</script>

<template>
  <div class="">
    <v-card class="pa-5 ma-5">
      <v-text-field
        v-for="(item, i) in inputVariants"
        :key="i"
        :variant="item"
        label="Label"
      ></v-text-field>
    </v-card>
    <v-card class="pa-5 ma-5">
      <div class="d-flex">
        <v-card
          class="ma-1 d-flex align-center justify-center font-weight-bold"
          v-for="color in colorNames"
          height="200"
          width="200"
          :color="color"
          >{{ color }}</v-card
        >
      </div>

      <div class="mt-5">
        <v-card width="200" height="200" color="red-darken-1"></v-card>
      </div>
      <div class="mt-5">
        <v-card height="200" variant="outlined">
          <v-card-title>Card Title</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
            <v-btn color="success" @click="showToast">show</v-btn>
          </v-card-text>
        </v-card>
      </div>
    </v-card>
    <v-img
      class="blend-img original-css-filter"
      src="@/assets/images/shoes/shoes_01.jpg"
      width="500"
    ></v-img>
    <div class="d-flex">
      <v-color-picker
        v-model="color"
        class="ma-2"
        swatches-max-height="400px"
        show-swatches
      ></v-color-picker>
      <div class="flex-grow-1">
        <v-row class="flex-grow-1">
          <v-col cols="2" v-for="mode in blendModes">
            <v-card
              :style="{
                'background-blend-mode': mode.value,
                'background-color': color,
              }"
              class="pa-5 ma-5 blend-card"
              height="300"
              width="300"
            >
              {{ mode.chinese }}
            </v-card>
          </v-col>
        </v-row>
        <v-row class="flex-grow-1">
          <v-col cols="2" v-for="mode in blendModes">
            <v-card
              :style="{
                'background-blend-mode': mode.value,
                'background-color': color,
              }"
              class="pa-5 ma-5 blend-card2"
              height="300"
              width="300"
            >
              {{ mode.chinese }}
            </v-card>
          </v-col>
        </v-row>
        <v-row class="flex-grow-1">
          <v-col cols="2" v-for="mode in blendModes">
            <v-card
              :style="{
                'background-blend-mode': mode.value,
                'background-color': color,
              }"
              class="pa-5 ma-5 blend-card3"
              height="300"
              width="300"
            >
              {{ mode.chinese }}
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blend-card {
  border-radius: 10px;
  background-image: url("@/assets/images/shoes/shoes_01.jpg");
  background-color: #1976d2;

  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-blend-mode: multiply;
}

.blend-card2 {
  border-radius: 10px;
  background-image: url("@/assets/images/shoes/shoes_02.jpg");
  background-color: #1976d2;

  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-blend-mode: multiply;
}

.blend-card3 {
  border-radius: 10px;
  background-image: url("@/assets/images/shoes/shoes_03.jpg");
  background-color: #1976d2;

  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-blend-mode: multiply;
}

.original-css-filter {
  filter: hue-rotate(135deg);
}
</style>
