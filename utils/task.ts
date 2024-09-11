import { useTaskStore } from "~/stores/taskStore";
import type { UseFetchOptions } from "nuxt/app";
const taskStore = useTaskStore();
const imageAiStore = useImageAiStore();
const config = useRuntimeConfig();
interface TaskParams {
  type: string;
  user: string;
  client_id: string;
  prompt: Record<string, any>;
}

interface TaskResponse {
  task_id: string;
}

interface ProgressResponse {
  type: string;
  data: {
    history: any[];
  };
}

type SuccessHandler = (progressData: ProgressResponse) => void;

const defaultSuccessHandler: SuccessHandler = (progressData) => {
  console.log(progressData);

  imageAiStore.creations = progressData.data.history;
  imageAiStore.historys.unshift(...progressData.data.history);
  imageAiStore.currentCreationImage = progressData.data.history[0];
};

/**
 * @description
 *   创建AI任务
 *
 * @param params 任务参数
 * @param successHandler
 *   任务成功回调函数，会在任务结束时被调用
 *   该回调函数的参数是任务的进度信息
 * @param options.useFetchOptions
 *   任务API的useFetch选项
 *   请注意，useFetchOptions的body参数将被params对象所覆盖
 * @returns
 *   Promise<void>
 *   任务结束时resolve
 */
export const createTask = async (
  params: TaskParams,
  successHandler: SuccessHandler = defaultSuccessHandler,
  options: {
    taskApiOptions?: UseFetchOptions<TaskResponse>;
    progressApiOptions?: UseFetchOptions<ProgressResponse>;
  } = {}
) => {
  const { taskApiOptions = {}, progressApiOptions = {} } = options;
  const POLL_INTERVAL = 1000; // 1秒
  const MAX_POLL_TIME = 50000; // 50秒
  taskStore.startTask();

  try {
    const { data: taskData } = await useFetch<TaskResponse>(
      "/api/v1/AIGC/prompt",
      {
        baseURL: config.public.baseUrl1,
        method: "POST",
        body: params,
        ...taskApiOptions,
      }
    );

    if (!taskData.value || !taskData.value.task_id) {
      throw new Error("No task ID returned");
    }

    const taskId = taskData.value.task_id;
    let pollCount = 0;
    const maxPollCount = MAX_POLL_TIME / POLL_INTERVAL;

    const pollInterval = setInterval(async () => {
      pollCount++;

      if (pollCount > maxPollCount) {
        clearInterval(pollInterval);
        taskStore.setError("任务超时");
        return;
      }

      const { data: progressData } = await useFetch<ProgressResponse>(
        "/api/v1/AIGC/task",
        {
          baseURL: config.public.baseUrl1,
          params: { task_id: taskId },
          ...progressApiOptions,
        }
      );

      if (progressData.value && progressData.value.type === "end") {
        clearInterval(pollInterval);
        successHandler(progressData.value);
        setTimeout(() => {
          taskStore.endTask();
        }, 1000);
      }
    }, POLL_INTERVAL);
  } catch (error: unknown) {
    if (error instanceof Error) {
      taskStore.setError(error.message);
    } else {
      taskStore.setError("发生未知错误");
    }
  }
};
