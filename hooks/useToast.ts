import { toast, type ToastOptions } from "vue3-toastify";

// 二次封装的函数
const useToast = (message: string, options?: ToastOptions) => {
  // 设置默认选项
  const defaultOptions: ToastOptions = {
    theme: "auto",
    transition: "flip",
    dangerouslyHTMLString: true,
  };

  // 使用展开运算符合并选项，传入的选项将覆盖默认选项
  const finalOptions = { ...defaultOptions, ...options };

  // 调用toast函数并传入处理过的选项
  toast(message, finalOptions);
};

export default useToast;
