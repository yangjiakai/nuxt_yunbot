interface canvasScaleInitializerProps {
  width: number;
  height: number;
  containerRef: any;
  shouldFitToWidth?: boolean;
}

interface canvasScaleResizerProps {
  width: number;
  height: number;
  containerWidth: number;
  containerHeight: number;
  shouldFitToWidth?: boolean;
}

const canvasScaleInitializer = ({
  width,
  height,
  containerRef,
  shouldFitToWidth,
}: canvasScaleInitializerProps) => {
  const containerWidth = containerRef.current?.offsetWidth || width;
  const containerHeight = containerRef.current?.offsetHeight || height;
  return canvasScaleResizer({
    width,
    height,
    containerWidth,
    containerHeight,
    shouldFitToWidth,
  });
};

// 这段代码定义了一个名为`canvasScaleResizer`的函数，它的作用是计算并应用适当的缩放比例，以便将一个元素（如Canvas画布）适配到一个容器元素内部，同时考虑到是否应该仅根据宽度来适配，以及是否在移动设备上显示。函数接收一个对象作为参数，该对象包含以下属性：

// - `width`：元素的原始宽度。
// - `height`：元素的原始高度。
// - `containerWidth`：容器的宽度。
// - `containerHeight`：容器的高度。
// - `shouldFitToWidth`：一个布尔值，指示是否应该根据容器的宽度来调整元素的大小，忽略高度。

// 函数的主要逻辑如下：

// 1. **检测是否为移动设备**：通过检查浏览器窗口的宽度是否小于768像素来判断。这是一个常见的方法来简单判定设备是否可能是手机或较小屏幕的设备。

// 2. **计算缩放比例**：
//    - 首先计算x轴和y轴的缩放比例（`xScale`和`yScale`），这是通过将容器的尺寸除以元素的原始尺寸得到的。
//    - 如果是移动设备，选择`xScale`和`yScale`中较大的一个作为缩放比例，这样可以确保元素完全覆盖容器。
//    - 对于非移动设备，如果`shouldFitToWidth`为真，则使用`xScale`作为缩放比例；否则，选择`xScale`和`yScale`中较小的一个，以确保元素能够完全适配进容器内部而不溢出。

// 3. **计算缩放后的尺寸**：根据计算出的缩放比例乘以原始宽度和高度，得到缩放后的尺寸。

// 4. **生成样式对象**：
//    - `scalingStyle`：包含CSS变换属性，用于应用计算出的缩放比例。变换原点设置为"left top"，表示从元素的左上角开始缩放。
//    - `scaledDimensionsStyle`：包含调整后的宽度和高度，用于可能需要直接应用于元素上以改变其物理尺寸。

// 5. **返回值**：函数返回一个对象，包含了缩放样式、调整后的尺寸以及容器尺寸。

// 总之，这个函数提供了一种灵活的方式来根据不同设备和容器尺寸动态调整元素尺寸和缩放级别。
const canvasScaleResizer = ({
  width,
  height,
  containerWidth,
  containerHeight,
  shouldFitToWidth,
}: canvasScaleResizerProps) => {
  // 检查是否为移动设备
  const isMobile = window.innerWidth < 768;
  let scale = 1;
  // 计算元素x,y的缩放比例
  // 容器的尺寸除以元素的原始尺寸
  // 容器缩小则元素缩小以适应容器

  const xScale = containerWidth / width;
  const yScale = containerHeight / height;
  // 否则取大大
  scale = Math.min(xScale, yScale);
  // 计算缩放后大元素宽高
  const scaledWidth = scale * width;
  const scaledHeight = scale * height;
  // 计算缩放样式
  const scalingStyle = {
    transform: `scale(${scale})`,
    transformOrigin: "left top",
  };
  // `scaledDimensionsStyle`：包含调整后的宽度和高度，用于可能需要直接应用于元素上以改变其物理尺寸。
  const scaledDimensionsStyle = {
    width: scaledWidth,
    height: scaledHeight,
  };
  return {
    scalingStyle,
    scaledDimensionsStyle,
    scaledWidth,
    scaledHeight,
    containerWidth,
    containerHeight,
  };
};

export { canvasScaleInitializer, canvasScaleResizer };
