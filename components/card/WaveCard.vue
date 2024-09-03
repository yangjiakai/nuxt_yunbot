<!--
  * @Component: WaveCard
  * @Maintainer: J.K. Yang
  * @Description: A customizable card component with wave animation
  -->
<script setup lang="ts">
import { computed } from "vue";

interface Props {
  background?: string;
}

const props = withDefaults(defineProps<Props>(), {
  background: "linear-gradient(744deg, #af40ff, #5b42f3 60%, #00ddeb)",
});

const waveStyle = computed(() => ({
  background: props.background,
}));
</script>

<template>
  <div class="e-card playing">
    <div class="wave" :style="waveStyle"></div>
    <div class="wave" :style="waveStyle"></div>
    <div class="wave" :style="waveStyle"></div>

    <div class="card-content">
      <div class="card-title">
        <slot name="card-title"></slot>
      </div>
      <div class="card-body">
        <slot name="card-body"></slot>
      </div>
      <div class="card-action">
        <slot name="card-action"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.e-card {
  background: transparent;
  box-shadow: 0px 8px 28px -9px rgba(0, 0, 0, 0.45);
  position: relative;

  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
}

.wave {
  position: absolute;
  width: 700px;
  height: 700px;
  opacity: 0.6;
  left: 0;
  top: 0;
  margin-left: -50%;
  margin-top: -40%;
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 20px;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-title {
  margin-bottom: 10px;
}

.card-body {
  flex-grow: 1;
}

.card-action {
  margin-top: 10px;
}

.wave:nth-child(2),
.wave:nth-child(3) {
  top: 210px;
}

.playing .wave {
  border-radius: 40%;
  animation: wave 3000ms infinite linear;
}

.playing .wave:nth-child(2) {
  animation-duration: 4000ms;
}

.playing .wave:nth-child(3) {
  animation-duration: 5000ms;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
`
