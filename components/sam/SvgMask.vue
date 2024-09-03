<script setup lang="ts">
import type { modelInputProps } from "@/components/helpers/Interface";
interface SvgMaskProps {
  xScale: number;
  yScale: number;
  id?: string;
  className?: string;
  click: modelInputProps | null;
  image?: HTMLImageElement | null;
  isLoading?: boolean;
  isErasing?: boolean;
  svg?: string[];
}

const props = defineProps<SvgMaskProps>();
const {
  xScale,
  yScale,
  id = "",
  className = "",
  click,
  image,
  isLoading,
  isErasing,
  svg,
} = props;

console.log("!!!--------------------!!!");
console.log(props);
console.log("!!!--------------------!!!");

const key = ref(Math.random());
const boundingBox = ref<DOMRect | undefined>(undefined);
const pathRef = ref<SVGPathElement | null>(null);
const svgStr = ref<string>(props.svg?.join(" ") || "");

const getBoundingBox = () => {
  if (!pathRef.value) return;
  boundingBox.value = pathRef.value.getBBox();
};

watch(
  () => props.svg,
  (newVAl) => {
    if (!newVAl) return;
    svgStr.value = newVAl.join(" ");
    console.log("!!!-----------Props---------!!!");

    console.log(props);

    if (!isLoading) {
      key.value = Math.random();
    }
    getBoundingBox();
  }
);

onMounted(() => {
  getBoundingBox();
});

const bbX = computed(() => boundingBox.value?.x);
const bbY = computed(() => boundingBox.value?.y);
const bbWidth = computed(() => boundingBox.value?.width);
const bbHeight = computed(() => boundingBox.value?.height);
const bbMiddleY = computed(
  () => bbY.value && bbHeight.value && bbY.value + bbHeight.value / 2
);
const bbWidthRatio = computed(() => bbWidth.value && bbWidth.value / xScale);
</script>
<template>
  <svg
    :class="`position-absolute w-full h-full pointer-events-none ${className}`"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${xScale} ${yScale}`"
    :key="key"
  >
    <template v-if="bbX && bbWidth">
      <radialGradient
        :id="`gradient${id}`"
        :cx="0"
        :cy="0"
        :r="bbWidth"
        gradientUnits="userSpaceOnUse"
        :gradientTransform="`translate(${bbX - bbWidth / 4},${bbMiddleY})`"
      >
        <stop offset="0" stop-color="white" stop-opacity="0"></stop>
        <stop offset="0.25" stop-color="white" stop-opacity="0.7"></stop>
        <stop offset="0.5" stop-color="white" stop-opacity="0"></stop>
        <stop offset="0.75" stop-color="white" stop-opacity="0.7"></stop>
        <stop offset="1" stop-color="white" stop-opacity="0"></stop>
        <animateTransform
          attributeName="gradientTransform"
          attributeType="XML"
          type="scale"
          from="0"
          to="12"
          dur="1.5s"
          begin=".3s"
          fill="freeze"
          additive="sum"
        ></animateTransform>
      </radialGradient>
    </template>
    <clipPath :id="`clip-path${id}`">
      <path :d="svgStr" />
    </clipPath>
    <filter :id="`glow${id}`" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#1d85bb" />
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#1d85bb" />
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#1d85bb" />
    </filter>
    <image
      width="100%"
      height="100%"
      :xlink:href="image?.src"
      :clip-path="`url(#clip-path${id})`"
    />
    <template v-if="!click && (!isLoading || isErasing)">
      <template v-if="bbWidthRatio">
        <path
          :id="`mask-gradient${id}`"
          :d="svgStr"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-opacity="0"
          fill-opacity="1"
          :fill="`url(#gradient${id})`"
        />
      </template>
      <path
        :id="`mask-path${id}`"
        class="mask-path"
        :d="svgStr"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-opacity=".8"
        fill-opacity="0"
        stroke="#1d85bb"
        stroke-width="3"
        ref="pathRef"
        :filter="`url(#glow${id})`"
      />
    </template>
  </svg>
</template>

<style scoped>
/* 添加你的样式 */
</style>
