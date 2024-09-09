<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useDraggable } from "@vueuse/core";

// const draggableImg = ref<HTMLElement | null>(null);
// const { x, y, style } = useDraggable(draggableImg, {
//   initialValue: { x: innerWidth / 4.2, y: 80 },
//   preventDefault: true,
// });
import { isClient } from "@vueuse/shared";

definePageMeta({
  layout: "test",
});
const draggableImg = ref<HTMLElement | null>(null);
const handle = ref<HTMLElement | null>(null);

const innerWidth = isClient ? window.innerWidth : 200;

const disabled = ref(false);
const { x, y, style } = useDraggable(draggableImg, {
  initialValue: { x: innerWidth / 4.2, y: 80 },
  preventDefault: true,
  disabled,
});
</script>

<template>
  <div class="pa-5 h-full">
    <v-card rounded="lg" class="h-full transparent-bg">
      <!-- <v-card
        ref="draggableImg"
        class="pa-15 cursor-move"
        width="700"
        style="position: fixed; touch-action: none"
        :style="style"
      >
        <v-img
          width="500"
          height="500"
          src="https://d41chssnpqdne.cloudfront.net/image_tools/1847076/task_da80bf13-25f5-4def-b75e-4ad7b0bdc69c/IwynV.png?Expires=1729473898&Signature=Tsn881mf-noMIzhY3Vlf0VJSpb-wIa3cHhBtROslEN4rLwipbPUkUadabbKthGYuJz7FN0pNs6UVjioks6xzXPVvgRxzuOZQ6j7g0m6-JfZML5oa~nQWrF6q~UEVMNKIt8A34sycEOgSnniQ0~F-tePpxYXDztlPPf~ToUAIzGMqkaRZAEclH6CQJ51Khle4LYRdYQsa8Fo6-GvUvvbK93O4T1b7QSfg0uNx194nUVYjEvlDX8wvkLDB66vKBfMykhhfAnk1fZa4kHI1rIouxNMoE4RI7dSSQcvdaJcz3afqO92mycaCbDPIQWikj7Pr4Ph~rrBj~0fYN~UlHQO1Vg__&Key-Pair-Id=K3USGZIKWMDCSX"
        >
        </v-img>
      </v-card>
      <div>pos: {{ x }}, {{ y }}</div> -->

      <div
        ref="draggableImg"
        class="draggable-img"
        style="touch-action: none; position: absolute"
        :style="style"
      >
        <v-img
          width="500"
          height="500"
          src="https://d41chssnpqdne.cloudfront.net/image_tools/1847076/task_da80bf13-25f5-4def-b75e-4ad7b0bdc69c/IwynV.png?Expires=1729473898&Signature=Tsn881mf-noMIzhY3Vlf0VJSpb-wIa3cHhBtROslEN4rLwipbPUkUadabbKthGYuJz7FN0pNs6UVjioks6xzXPVvgRxzuOZQ6j7g0m6-JfZML5oa~nQWrF6q~UEVMNKIt8A34sycEOgSnniQ0~F-tePpxYXDztlPPf~ToUAIzGMqkaRZAEclH6CQJ51Khle4LYRdYQsa8Fo6-GvUvvbK93O4T1b7QSfg0uNx194nUVYjEvlDX8wvkLDB66vKBfMykhhfAnk1fZa4kHI1rIouxNMoE4RI7dSSQcvdaJcz3afqO92mycaCbDPIQWikj7Pr4Ph~rrBj~0fYN~UlHQO1Vg__&Key-Pair-Id=K3USGZIKWMDCSX"
        >
        </v-img>
      </div>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
.transparent-bg {
  background-image: url("data:image/png;base64,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0BSaQlPotwoYIcYjhCSWJJYkliSWJJYkliRWqwKrQY3Z5xEYgREYgREYgREYgRsVmCmEQw73pCOFOP35odAUmkJTaApNoSk0habQHxU4XQGNQGsjkCilKKUopSilKKUopSilKKUopSilKOVLBWYjBoWm0BSaQlNoCk2hKTSFptAUmkL/r8BshnBN46dyjmaIqz8/ZmAzsBk4eQb260XXLtKv/oZmGGcbhiy0LLQstCy0LLQstCy0LLQstCz0WwWMAOMRgEJTaApNoSk0habQFJpCU2gK/VKB2QhBoSk0hU5WaL8f+Ox7QvfUZ9/zS2JJYkliJSexEBiBk7PAsxnxdANBYARGYATuV+D0N+DdCeD732twCIzACIzACNyrAAM5+xR4t4EgMAIjcDKB7QMjxKiDdxPG17fMgDDBhNHAGlgDa+BuBdLPKGShZaFloZOz0GZgM7AZOHcdFoERGIEROPcNlj4D+fff26AQGIEROJnAtpH2Zlldk6j/yjaYJJYklmu24Gs2DayBNbAGtsxgmaFdAYdstYdsCIzACIzACIzACNyqQLWBIDACIzACIzACI/AOAv8BzflgZfiGIygAAAAASUVORK5CYII=");
  background-repeat: repeat;
}

.draggable-img {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: grab;
}
</style>
