// Debounce

// Format file size
export const formatFileSize = (size: number): string => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

// 判断当前设备是否为移动端
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
};

// scroll to top
interface ScrollOptions {
  behavior?: "auto" | "smooth";
  block?: "start" | "center" | "end" | "nearest";
  inline?: "start" | "center" | "end" | "nearest";
  top?: number;
}

export const scrollToTop = (
  element: HTMLElement | null,
  options: ScrollOptions = { top: 0, behavior: "auto" }
): void => {
  if (!element) {
    console.error("Element not found");
    return;
  }
  element.scrollTo({
    ...options,
  });
};

// scroll to bottom
export const scrollToBottom = (
  element: HTMLElement | null,
  options: ScrollOptions = { behavior: "auto" }
): void => {
  element?.scrollTo({
    ...options,
    top: element.scrollHeight,
  });
};

// 5483383610121433 生成一个16位的随机数字seed
export const generateRandomSeed = () => {
  const seed = Math.floor(Math.random() * 10000000000000000);
  return seed;
};

export const downloadImg = (
  url: string,
  filename: string = "line-draw.png"
) => {
  if (!url) return;
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
};

export const generateClientId = () => {
  // 生成一个部分随机字符串的函数
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  // 按照8-4-4-4-12的格式拼接字符串
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

export const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const logger = (obj: any) => {
  console.log(new Date().toISOString().substring(11, 23), obj);
};
