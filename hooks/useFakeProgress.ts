// composable/useFakeProgress.ts
import { ref } from "vue";

export function useFakeProgress() {
  const progress = ref(0);
  let intervalId: any = 0;

  const startProgress = () => {
    progress.value = 0;
    intervalId = setInterval(() => {
      if (progress.value < 90) {
        progress.value += 10;
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  };

  const endProgress = () => {
    progress.value = 100;
    clearInterval(intervalId);
  };

  return { progress, startProgress, endProgress };
}
