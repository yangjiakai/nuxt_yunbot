<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import Konva from "konva";

import type {
  modelInputProps,
  modelScaleProps,
  AnnotationProps,
} from "@/components/helpers/Interface";
import { modelData } from "@/components/helpers/modelAPI";
import { canvasScaleResizer } from "@/components/helpers/canvasHelper";

import {
  rleToImage,
  traceOnnxMaskToSVG,
} from "@/components/helpers/mask_utils";
import { handleImageScale } from "@/components/helpers/ImageHelper";

import { Tensor, InferenceSession } from "onnxruntime-web";

import * as ort from "onnxruntime-web";
import { logger } from "@/utils/common";

import { useElementSize } from "@vueuse/core";
import SvgMask from "./SvgMask.vue";

/* -------------------------------
   Props
------------------------------- */
const props = defineProps<{
  baseImageFile: File;
  baseImage: string;
}>();

const emits = defineEmits(["update:maskImg", "resetMaskImg"]);

/* -------------------------------
   类型
------------------------------- */
type Points = { sx: number; sy: number; x: number; y: number };
// The line below is part of the fix for the iOS canvas area limit of 16777216
Konva.pixelRatio = 1;

/* -------------------------------
   常量
------------------------------- */
const API_ENDPOINT =
  // "https://model-zoo.metademolab.com/predictions/segment_everything_box_model";
  "http://36.213.4.210:18201/imgtoembedding";

const positiveClickColor = "turquoise";
const negativeClickColor = "pink";

const handleClickColor = (num: number) => {
  switch (num) {
    case 0:
      return negativeClickColor;
    case 1:
      return positiveClickColor;
    default:
      return null;
  }
};

/* -------------------------------
   变量
------------------------------- */
// 模型
const model = ref<InferenceSession | null>(null);
const setModel = (value: InferenceSession | null) => {
  model.value = value;
};

// 模型输出
const tensor = ref<Tensor | null>(null);
const setTensor = (value: Tensor | null) => {
  tensor.value = value;
};

// Loading state handling
const isLoading = ref<boolean>(false);
const setIsLoading = (e: boolean) => {
  isLoading.value = e;
};

const isModelLoaded = ref({
  boxModel: false,
  allModel: false,
});

const setIsModelLoaded = (obj: any) => {
  isModelLoaded.value = obj;
};

// 是否显示加载中模态框
const showLoadingModal = ref(false);
const setShowLoadingModal = (value: boolean) => {
  showLoadingModal.value = value;
};

// 加载中文本
const loadingText = ref("正在加载中...");
const setLoadingText = (value: string) => {
  loadingText.value = value;
};

// points
const points = ref<Points | null>(null);
const setPoints = (value: Points | null) => {
  points.value = value;
};

// 模型缩放
const modelScale = ref<modelScaleProps | null>(null);
const setModelScale = (value: modelScaleProps | null) => {
  modelScale.value = value;
};

// Canvas缩放
const canvasScale = ref(1);
const setCanvasScale = (value: number) => {
  canvasScale.value = value;
};

// 缩放样式
const resizer = ref();
const setResizer = (value: any) => {
  resizer.value = value;
};

const scalingStyle = computed(() => {
  if (resizer.value) {
    return resizer.value.scalingStyle;
  } else {
    return {
      transform: "scale(1)",
      transformOrigin: "left top",
    };
  }
});

const scaledDimensionsStyle = computed(() => {
  if (resizer.value) {
    return {
      width: resizer.value.scaledDimensionsStyle.width + "px",
      height: resizer.value.scaledDimensionsStyle.height + "px",
    };
  } else {
    return {
      width: "100%",
      height: "100%",
    };
  }
});

const canvasWidth = computed(() => {
  return resizer.value.scaledWidth;
});
const canvasHeight = computed(() => {
  return resizer.value.scaledHeight;
});

const canvasDimensions = ref({ width: 0, height: 0 });
const setCanvasDimensions = (value: { width: number; height: number }) => {
  canvasDimensions.value = value;
};

// Click handling
// x: number; // X坐标
// y: number; // Y坐标
// width: null | number; // 宽度，可以为空
// height: null | number; // 高度，可以为空
// clickType: number; // 点击类型，参见clickType枚举
// 触发时机:加载新图时清空
const click = ref<modelInputProps | null>(null);
const setClick = (e: modelInputProps | null) => {
  click.value = e;
};

// 点击点列表
// 触发时机:未点击时，鼠标移动时的坐标点
// 已点击后，存放所有点击点,移动点不存放
// Reset清空
const clicks = ref<modelInputProps[] | null>(null);
const setClicks = (e: modelInputProps[] | null) => {
  clicks.value = e;
};

//    点击历史
const clicksHistory = ref<modelInputProps[] | null>(null);
const setClicksHistory = (e: modelInputProps[] | null) => {
  clicksHistory.value = e;
};

const shouldSetClick = ref<boolean>(false);
const setShouldSetClick = (e: boolean) => {
  shouldSetClick.value = e;
};

const isErasing = ref<boolean>(false);
const setIsErasing = (e: boolean) => {
  isErasing.value = e;
};

// hasClicked
const hasClicked = ref<boolean>(false);
const setHasClicked = (e: boolean) => {
  hasClicked.value = e;
};

const hasNegClicked = ref<boolean>(false);
const setHasNegClicked = (e: boolean) => {
  hasNegClicked.value = e;
};

const userNegClickBool = ref<boolean>(false);
const setUserNegClickBool = (e: boolean) => {
  userNegClickBool.value = e;
};

const isHovering = ref<boolean | null>(null);
const setIsHovering = (e: boolean | null) => {
  isHovering.value = e;
};

const shouldShowAnimation = ref<boolean | null>(null);
const setShouldShowAnimation = (val: boolean | null) => {
  shouldShowAnimation.value = val;
};

// Annotations
const annotations = ref<Array<AnnotationProps>>([]);
const setAnnotations = (value: Array<AnnotationProps>) => {
  annotations.value = value;
};

const newAnnotation = ref<Array<AnnotationProps>>([]);
const setNewAnnotation = (value: Array<AnnotationProps>) => {
  newAnnotation.value = value;
};

const prevAnnotaiton = ref<Array<AnnotationProps>>([]);
const setPrevAnnotation = (value: Array<AnnotationProps>) => {
  prevAnnotaiton.value = value;
};

const predMask = ref<Tensor | null>(null);
const setPredMask = (e: Tensor | null) => {
  predMask.value = e;
};

const predMasks = ref<Tensor[] | null>(null);
const setPredMasks = (e: Tensor[] | null) => {
  predMasks.value = e;
};

const predMasksHistory = ref<Tensor[] | null>(null);
const setPredMasksHistory = (e: Tensor[] | null) => {
  predMasksHistory.value = e;
};

// Mask image handling
const maskImg = ref<HTMLImageElement | null>(null);
const setMaskImg = (e: HTMLImageElement | null) => {
  maskImg.value = e;
};

// Mask canvas handling
const maskCanvas = ref<HTMLCanvasElement | null>(null);
const setMaskCanvas = (e: HTMLCanvasElement | null) => {
  maskCanvas.value = e;
};

const mask = ref<
  | string[]
  | Uint8Array
  | Float32Array
  | Int8Array
  | Uint16Array
  | Int16Array
  | Int32Array
  | BigInt64Array
  | Float64Array
  | Uint32Array
  | BigUint64Array
  | null
>(null);
const setMask = (
  value:
    | string[]
    | Uint8Array
    | Float32Array
    | Int8Array
    | Uint16Array
    | Int16Array
    | Int32Array
    | BigInt64Array
    | Float64Array
    | Uint32Array
    | BigUint64Array
    | null
) => {
  mask.value = value;
};

// Mask的Svg
const svg = ref<string[] | null>(null);
const setSVG = (e: string[] | null) => {
  svg.value = e;
};

// svgs
const svgs = ref<string[] | null>(null);
const setSVGs = (e: string[] | null) => {
  svgs.value = e;
};

const containerRef = ref<HTMLDivElement | null>(null);
const konvaRef = ref<Konva.Stage | null>(null);
const scrollRef = ref<HTMLDivElement | null>(null);

const { width: containerWidth, height: containerHeight } =
  useElementSize(containerRef);

// 原图base64
const uplaoadImgBase64 = ref<string>("");

// 初始缩放图
// 原图
const image = ref<HTMLImageElement | null>(null);
const setImage = (e: HTMLImageElement | null) => {
  image.value = e;
};

const imageClone = ref<HTMLImageElement | null>(null);
const setImageClone = (e: HTMLImageElement | null) => {
  imageClone.value = e;
};

const handleBase64Update = (base64: string) => {
  uplaoadImgBase64.value = base64;
  const img = new Image();
  img.src = base64;
  img.onload = () => {
    handleReset();
    // 原图高,原图宽,原图缩放比例，上传图缩放比例
    const { height, width, scale, uploadScale } = handleImageScale(img);

    setModelScale({
      onnxScale: scale / uploadScale,
      maskWidth: width * uploadScale,
      maskHeight: height * uploadScale,
      scale: scale,
      uploadScale: uploadScale,
      width: width,
      height: height,
    });
    img.width = Math.round(width * scale);
    img.height = Math.round(height * scale);

    // 设置原图
    setImage(img);
    handleCanvasScale();

    // 根据原图去设置Canvas尺寸

    // 对原图进行编码
    loadingText.value = "正在进行分割...";
    isLoading.value = true;
    showLoadingModal.value = true;

    queryModelReturnTensors({
      width: width,
      height: height,
      uploadScale: uploadScale,
      imgData: img,
    });
  };
};

const handleCanvasScale = () => {
  if (!image.value) return;
  const MAX_CANVAS_AREA = 1677721;
  const w = modelScale.value!.width;
  const h = modelScale.value!.height;

  const area = w * h;
  const canvasScale =
    area > MAX_CANVAS_AREA ? Math.sqrt(MAX_CANVAS_AREA / (w * h)) : 1;
  const canvasDimensions = {
    width: Math.floor(w * canvasScale),
    height: Math.floor(h * canvasScale),
  };

  setCanvasDimensions(canvasDimensions);

  const tempImageClone = new Image();
  tempImageClone.src = image.value.src;
  tempImageClone.width = w;
  tempImageClone.height = h;
  setImageClone(tempImageClone);

  resizer.value = canvasScaleResizer({
    width: canvasDimensions.width,
    height: canvasDimensions.height,
    containerWidth: containerWidth.value,
    containerHeight: containerHeight.value,
  });
};

// 查询模型获取Tensor
const queryModelReturnTensors = async ({
  width,
  height,
  uploadScale,
  imgData,
}: {
  width: number;
  height: number;
  uploadScale: number;
  imgData: HTMLImageElement;
}) => {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * uploadScale);
  canvas.height = Math.round(height * uploadScale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(imgData, 0, 0, canvas.width, canvas.height);

  // canvas.toBlob 是一个异步方法，用于将 canvas 元素的内容转换为一个 Blob 对象。
  // 它接受三个参数：
  // 一个回调函数，在 Blob 对象创建完成后会被调用。
  // 图片的 MIME 类型（这里是 "image/jpeg"）。
  // 图片的质量（范围是 0 到 1，这里是 1.0，表示最高质量）。
  canvas.toBlob(
    (blob) => {
      if (!blob) return;
      const formData = new FormData();
      formData.append("image", props.baseImageFile);
      const segRequest = fetch(`${API_ENDPOINT}`, {
        method: "POST",
        body: formData,
      });
      segRequest.then(async (segResponse) => {
        const segJSON = await segResponse.json();
        const embedArr = segJSON.map((arrStr: string) => {
          const binaryString = window.atob(arrStr);
          const uint8arr = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            uint8arr[i] = binaryString.charCodeAt(i);
          }
          const float32Arr = new Float32Array(uint8arr.buffer);
          return float32Arr;
        });
        const lowResTensor = new Tensor(
          "float32",
          embedArr[0],
          [1, 256, 64, 64]
        );
        handleSegModelResults({
          tensor: lowResTensor,
        });
      });
    },
    "image/jpeg",
    1.0
  );
};

// 获取Tensor结束后的处理
const handleSegModelResults = ({ tensor }: { tensor: Tensor }) => {
  setTensor(tensor);

  setLoadingText("模型分割完成");
  setTimeout(() => {
    setIsLoading(false);
    setShowLoadingModal(false);
  }, 1000);
};

watch([() => clicks.value, () => hasClicked.value], () => {
  const runOnnx = async () => {
    runModel();
  };
  runOnnx();
});

// 在点击以及鼠标移动事件发生时触发事件
const runModel = async () => {
  try {
    if (
      model.value === null ||
      clicks.value === null ||
      tensor.value === null ||
      modelScale.value === null
    )
      return;
    const feeds = modelData({
      clicks: clicks.value,
      tensor: tensor.value,
      modelScale: modelScale.value,
      last_pred_mask: predMask.value,
    });

    if (feeds === undefined) return;
    console.log("-------Feeds内容");
    console.log(feeds);

    const results = await model.value.run(feeds);
    console.log("-------Results内容");
    console.log(results);

    const output = results.low_res_masks;
    const masks = results.masks;
    console.log("-------Output");
    console.log(output);
    console.log(output.data);
    if (hasClicked.value) {
      // const beforeSVG = Date.now();
      // const pred_mask = results.masks;
      // setPredMask(pred_mask);
      // if (!predMasksHistory) {
      //   setPredMasks([...(predMasks.value || []), pred_mask]);
      // }
      const svgStr = traceOnnxMaskToSVG(
        masks.data,
        masks.dims[3],
        masks.dims[2]
      );
      setSVG(svgStr);
      setMask(masks.data);
      emits(
        "update:maskImg",
        rleToImage(masks.data, masks.dims[3], masks.dims[2], "OUTPUT")
      );
    } else {
      setMaskImg(rleToImage(masks.data, masks.dims[3], masks.dims[2]));
    }
    setClick(null);
    setIsLoading(false);
    setIsModelLoaded((prev: any) => {
      return { ...prev, boxModel: true };
    });
  } catch (error) {
    logger(error);
  }
};

// 初始化ort参数
const initOrtParams = () => {
  // Onnxruntime
  ort.env.debug = false;
  // set global logging level
  ort.env.logLevel = "verbose";

  // override path of wasm files - for each file
  ort.env.wasm.numThreads = 2;
  ort.env.wasm.simd = true;

  // ort.env.wasm.proxy = true;
  try {
    ort.env.wasm.wasmPaths = {
      "ort-wasm.wasm": "/ort-wasm.wasm",
      "ort-wasm-simd.wasm": "/ort-wasm-simd.wasm",
      "ort-wasm-threaded.wasm": "/ort-wasm-threaded.wasm",
      "ort-wasm-simd-threaded.wasm": "/ort-wasm-simd-threaded.wasm",
    };
  } catch (e) {
    console.error("Failed to initialize ONNX Runtime", e);
  }
};

/* -------------------------------
   模型加载
------------------------------- */
// 初始化模型 InferenceSession
const initModal = async () => {
  logger("模型加载开始");
  setLoadingText("模型加载中...");
  setShowLoadingModal(true);
  try {
    const MODEL_DIR =
      // "./interactive_module_quantized_592547_2023_03_19_sam6_long_uncertain.onnx";
      // "https://jhhdelbjsxbjqldlrhre.supabase.co/storage/v1/object/public/xluo/interactive_module_quantized_592547_2023_03_19_sam6_long_uncertain.onnx";
      "/sam_onnx_example.onnx";
    console.log(ort.env.wasm);

    const model = await ort.InferenceSession.create(MODEL_DIR);

    setModel(model);

    logger("模型加载完成");
  } catch (e) {
    console.error(e);
    logger("模型加载失败");
  } finally {
    setShowLoadingModal(false);
  }
};

/* -------------------------------
   事件
------------------------------- */
const handleMouseMove = (e: any) => {
  const { x, y } = e.target.getStage().getPointerPosition();

  logger("移动事件开始");

  // 未点击前
  if (!hasClicked.value) {
    handleMoveToMask(e, x, y);
  } else if (newAnnotation.value.length === 1) {
    const sx = newAnnotation.value[0].x;
    const sy = newAnnotation.value[0].y;
    setNewAnnotation([getAnnotation({ sx, sy, x, y })]);
    setAnnotations([]);
  }
};

const handleMouseOut = () => {
  if (clicks.value?.length === 1 && !hasClicked.value) {
    useDefer(handleResetInteraction);
    setTimeout(handleResetInteraction, 25);
  }
};

const handleMouseDown = (e: any) => {
  logger("点击事件开始");
  if (clicksHistory.value) setClicksHistory(null);
  if (predMasksHistory.value) setPredMasksHistory(null);
  const { x, y } = e.target.getStage().getPointerPosition();
  if (newAnnotation.value.length === 0) {
    setNewAnnotation([
      {
        x,
        y,
        width: 0,
        height: 0,
        clickType: -1,
      },
    ]);
  }
};

const handleMouseUp = (e: any) => {
  // setIsLoading(true);
  setHasClicked(true);

  const { x, y } = e.target.getStage().getPointerPosition();
  if (hasClicked.value || shouldSetClick.value) {
    if (shouldSetClick.value) {
      const newClick = getClick(e, x, y) || null;
      if (newClick?.clickType === 0) {
        setHasNegClicked(true);
      }
      setClick(newClick);
    } else {
      handleSegmentByClick(e, x, y);
    }
  }
};

const handleSegmentByClick = (e: any, x: number, y: number) => {
  const tempClick = getClick(e, x, y);
  if (!tempClick) return;

  // 将 clicks.value 深拷贝到普通对象
  const currentClicks = JSON.parse(JSON.stringify(clicks.value || []));
  const newClick = JSON.parse(JSON.stringify(tempClick));
  const uniqueClicks = [...currentClicks, newClick].filter(
    (click, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.x === click.x &&
          t.y === click.y &&
          t.width === click.width &&
          t.height === click.height &&
          t.clickType === click.clickType
      )
  );

  setClicks(uniqueClicks);
};

const getAnnotation = ({ sx, sy, x, y }: Points): AnnotationProps => {
  return {
    x: sx,
    y: sy,
    width: x - sx,
    height: y - sy,
    clickType: 2,
  };
};

const handleMoveToMask = useThrottle((e: any, x: number, y: number) => {
  const tempClick = getClick(e, x, y);

  if (!tempClick) return;
  setClicks([tempClick]);
}, 15);

const getClick = (
  e: any,
  x: number,
  y: number
): modelInputProps | undefined => {
  let clickType;
  if (e.evt.button === 0 || !e.evt.button) {
    clickType = 1;
  } else if (e.evt.button === 2) {
    clickType = 0;
  }
  if (clickType === undefined) return;
  if (userNegClickBool.value) clickType = 0;
  x *= modelScale.value!.scale / canvasScale.value;
  y *= modelScale.value!.scale / canvasScale.value;
  return { x, y, width: null, height: null, clickType };
};

const handleResetInteraction = (forceFullReset?: boolean) => {
  setSVG(null);
  setSVGs(null);
  setClick(null);
  setClicks(null);
  setAnnotations([]);
  setNewAnnotation([]);
  setClicksHistory(null);
  setMaskImg(null);
  setUserNegClickBool(false);
  setIsHovering(null);
  setPredMask(null);
  setPredMasks(null);
  setPredMasksHistory(null);
  setIsLoading(false);
  setPoints(null);
  setHasClicked(false);
};

const handleReset = () => {
  handleResetInteraction(true);
  setUserNegClickBool(false);
  emits("resetMaskImg");
};

/* -------------------------------
   监听
------------------------------- */
//watch containerWidth,containerHeight
watch([() => containerWidth.value, () => containerHeight.value], () => {
  if (containerWidth.value && containerHeight.value) {
    resizer.value = canvasScaleResizer({
      width: canvasDimensions.value.width,
      height: canvasDimensions.value.height,
      containerWidth: containerWidth.value,
      containerHeight: containerHeight.value,
    });
  }
});

// watch clicks
watch(
  () => clicks.value,
  (newVal) => {
    if (!newVal) {
      setAnnotations([]);
      setNewAnnotation([]);
      setPoints(null);
    }
  }
);

// watch click
watch(click, (newValue) => {
  let newClicks: modelInputProps[] | null = null;
  if (clicks.value && click.value) {
    newClicks = [...clicks.value, click.value];
  } else if (click.value) {
    newClicks = [click.value];
  }

  if (newClicks) {
    superDefer(() => superDefer(() => setClicks(newClicks)));
  }
});

// watch canvasDimensions
watch(
  () => canvasDimensions.value,
  (newValue) => {
    console.log(newValue);
  }
);

// watch 原图
watch(
  () => props.baseImage,
  (newValue) => {
    if (newValue) {
      handleBase64Update(newValue);
    }
  }
);

watchEffect(() => {
  if (isHovering.value && clicks.value && clicks.value.length == 1) {
    setShouldShowAnimation(true);
  } else {
    setShouldShowAnimation(false);
  }
});

const superDefer = (cb: Function) => {
  setTimeout(
    () =>
      window.requestAnimationFrame(() => {
        setTimeout(() => {
          cb();
        }, 0);
      }),
    0
  );
};

onMounted(() => {
  initOrtParams();

  initModal();
});
</script>

<template>
  <div class="h-full d-flex flex-column">
    <div class="d-flex py-2">
      <v-spacer></v-spacer>
      <v-btn class="mr-3" @click="handleReset" color="primary">{{ $t("btn.resetSelection") }}</v-btn>
      <v-btn-toggle v-model="userNegClickBool" divided color="primary" density="compact" variant="outlined">
        <v-btn>
          {{ $t("btn.addSelection") }}
          <v-icon icon="mdi-plus" value="false"></v-icon>
        </v-btn>

        <v-btn>
          {{ $t("btn.removeSelection") }}
          <v-icon icon="mdi-minus" value="true"></v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>
    <div
      class="pa-5 w-full flex-grow-1 position-relative dotted-card .dotted-card { border: 2px dashed #ccc; border-radius: 10px; }"
      ref="containerRef">
      <div ref="scrollRef" class="position-absolute w-auto h-auto overflow-visible absolute-center bg-success">
        <div :style="scaledDimensionsStyle" class="position-relative" :class="{ 'pointer-events-none': isLoading }">
          <div class="position-absolute w-full h-full bg-black pointer-events-none background"></div>
          <img class="position-absolute w-full h-full ma-0 pointer-events-none" :src="image?.src"
            :class="{ 'opacity-40': isLoading || hasClicked }" />
          <SvgMask v-if="svg && modelScale && hasClicked" :xScale="modelScale.width * modelScale.uploadScale"
            :yScale="modelScale.height * modelScale.uploadScale" :click="click" :image="image" :isLoading="isLoading"
            :isErasing="isErasing" :svg="svg"></SvgMask>
          <div :style="scalingStyle" ref="konvaRef">
            <v-stage class="konva" :config="{
              width: canvasDimensions.width,
              height: canvasDimensions.height,
              pixelRatio: 1,
            }" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mousemove="handleMouseMove"
              @mouseout="handleMouseOut" @mouseleave="handleMouseOut" @contextmenu="console.log('contextmenu')">
              <v-layer ref="layerRef" name="svgMask">
                <v-image :image="imageClone" :x="0" :y="0" :width="canvasDimensions.width"
                  :height="canvasDimensions.height" :opacity="0" :preventDefault="false" ref="imageRef"></v-image>
                <template v-if="svg && modelScale && hasClicked"></template>
              </v-layer>

              <v-layer name="annotations">
                <template v-if="clicks && hasClicked && modelScale">
                  <v-circle v-for="(click, idx) in clicks" :key="idx" :id="`${idx}`"
                    :x="(click.x * canvasScale) / modelScale.scale" :y="(click.y * canvasScale) / modelScale.scale"
                    :fill="handleClickColor(click.clickType)" :radius="(5 * canvasScale) / modelScale.scale"
                    :shadowBlur="5" :shadowColor="handleClickColor(click.clickType) === positiveClickColor
                        ? 'black'
                        : handleClickColor(click.clickType)
                      " :preventDefault="false" />
                </template>
              </v-layer>
            </v-stage>
          </div>

          <!-- Hover时的蒙版 -->
          <img v-if="maskImg && !hasClicked" :src="maskImg?.src"
            class="ma-0 position-absolute w-full h-full opacity-40 top-0 pointer-events-none" />
        </div>
      </div>
    </div>

    <v-dialog v-model="showLoadingModal" max-width="320" persistent>
      <v-list class="py-2" color="primary" elevation="12" rounded="lg">
        <v-list-item prepend-icon="$vuetify-outline" :title="loadingText">
          <template v-slot:prepend>
            <div class="pe-4">
              <v-icon color="primary" size="x-large"></v-icon>
            </div>
          </template>

          <template v-slot:append>
            <v-progress-circular color="primary" indeterminate="disable-shrink" size="16"
              width="2"></v-progress-circular>
          </template>
        </v-list-item>
      </v-list>
    </v-dialog>
  </div>
</template>

<style scoped lang="scss">
.konva {
  border: 1px solid #000;
}
</style>
