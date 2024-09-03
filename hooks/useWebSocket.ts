import { ref, onMounted, onUnmounted } from "vue";

/**
 * @description websocket hook
 * @param url websocket地址：ws://xxxxxxx/
 * @param onMessage 收到消息的回调
 * @param heartbeatInterval 心跳间隔时间
 */
export default function useWebsocket(
  url: string,
  onMessage: (res: any) => void,
  heartbeatInterval = 3000
) {
  // 用来存放websocket实例
  const socketTask = ref<WebSocket | null>(null);
  // 连接是否处于断开状态的标识
  const isDisconnect = ref(true);
  // 心跳定时器
  let heartbeatTimer: NodeJS.Timeout | null = null;

  // 连接
  const connect = () => {
    if (isDisconnect.value) {
      isDisconnect.value = false;
      console.log("WebSocket连接中...", url);
      socketTask.value = new WebSocket(url);

      socketTask.value.onopen = () => {
        console.log("WebSocket连接已打开");
        startHeartbeat();
      };

      socketTask.value.onclose = (event: CloseEvent) => {
        console.log(event);

        console.log(
          `WebSocket连接已关闭, 代码: ${event.code}, 原因: ${event.reason}`
        );
        if (!isDisconnect.value) {
          setTimeout(() => {
            console.log("WebSocket尝试重新连接");
            connect();
          }, 5000); // 增加重连间隔时间
        }
      };

      socketTask.value.onerror = (error: Event) => {
        console.error("WebSocket连接发生错误:", error);
        isDisconnect.value = true;
      };

      socketTask.value.onmessage = (res: MessageEvent) => {
        try {
          const data = JSON.parse(res.data);
          console.log("收到服务器消息:", data);
          if (onMessage) {
            onMessage(data);
          }
        } catch (error) {
          console.error("消息解析错误:", error);
        }
      };
    }
  };

  // 断开连接
  const disconnect = () => {
    console.log("主动断开");
    if (socketTask.value) {
      isDisconnect.value = true;
      socketTask.value.close();
      stopHeartbeat();
      socketTask.value = null;
    }
  };

  // 发送心跳
  const startHeartbeat = () => {
    heartbeatTimer = setInterval(() => {
      if (socketTask.value && socketTask.value.readyState === WebSocket.OPEN) {
        console.log("发送心跳");
        socketTask.value.send(JSON.stringify({ type: "heartbeat" }));
      }
    }, heartbeatInterval);
  };

  // 停止心跳
  const stopHeartbeat = () => {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
    }
  };

  // 发送消息
  const sendMessage = (message: any) => {
    console.log("发送消息:", message);
    if (socketTask.value && socketTask.value.readyState === WebSocket.OPEN) {
      socketTask.value.send(JSON.stringify(message));
    } else {
      console.error("WebSocket未连接");
    }
  };

  // 组件挂载时连接
  onMounted(() => {
    connect();
  });

  // 组件卸载时断开连接
  onUnmounted(() => {
    disconnect();
  });

  return {
    socketTask,
    connect,
    disconnect,
    sendMessage,
  };
}
