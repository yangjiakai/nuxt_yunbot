import { InferenceSession, Tensor } from "onnxruntime-web";

// 定义注释属性接口，用于描述某个界面上的注释区域
export interface AnnotationProps {
  x: number; // 注释区域的X坐标
  y: number; // 注释区域的Y坐标
  width: number; // 注释区域的宽度
  height: number; // 注释区域的高度
  clickType: number; // 点击类型，表示注释区域的交互方式（使用clickType枚举定义）
}

// 定义模型输入属性接口
export interface modelInputProps {
  x: number; // X坐标
  y: number; // Y坐标
  width: null | number; // 宽度，可以为空
  height: null | number; // 高度，可以为空
  clickType: number; // 点击类型，参见clickType枚举
}

// 定义点击类型的枚举，用于更清晰地描述点击的分类
export enum clickType {
  POSITIVE = 1.0, // 正面点击
  NEGATIVE = 0.0, // 反面点击
  UPPER_LEFT = 2.0, // 左上角点击
  BOTTOM_RIGHT = 3.0, // 右下角点击
}

// 定义模型缩放属性接口
export interface modelScaleProps {
  onnxScale: number; // ONNX模型的缩放比例
  maskWidth: number; // 遮罩的宽度
  maskHeight: number; // 遮罩的高度
  scale: number; // 图像的缩放比例
  uploadScale: number; // 上传时应用的缩放比例
  width: number; // 原始图像的宽度
  height: number; // 原始图像的高度
}

// 接口定义用于设置参数和查询模型的属性
export interface setParmsandQueryModelProps {
  width: number; // 图像处理的宽度
  height: number; // 图像处理的高度
  uploadScale: number; // 上传图像时使用的缩放比例
  imgData: HTMLImageElement; // 用于处理的HTML图像元素
  // 处理分割模型的结果
  handleSegModelResults({ tensor }: { tensor: Tensor }): void;
  // 处理所有模型的结果，并提供对所有JSON数据的处理
  handleAllModelResults({
    allJSON,
    image_height,
  }: {
    allJSON: {
      encodedMask: string; // 编码的遮罩
      bbox: number[]; // 边界框数组
      score: number; // 目标的评分
      point_coord: number[]; // 点坐标数组
      uncertain_iou: number; // 不确定的 IOU 评分
      area: number; // 面积
    }[];
    image_height: number; // 图像高度
  }): void;
  imgName: string; // 图像文件名
  shouldDownload: boolean | undefined; // 是否需要下载处理完的图像
  shouldNotFetchAllModel: boolean | undefined; // 是否不需要获取所有模型数据
}

// 接口定义用于设置参数和查询擦除模型的属性
export interface setParmsandQueryEraseModelProps {
  width: number;
  height: number;
  uploadScale: number;
  imgData: HTMLImageElement | null; // 可能为null的图像数据
  // 多种类型支持的掩码数据
  mask:
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
    | BigUint64Array;
  handlePredictedImage: (e: string) => void; // 处理预测后的图像结果
}

export interface queryEraseModelProps {
  image: Blob | string; // 图像数据，可以是Blob或URL
  mask: // 同上，支持多种类型的掩码数据
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
    | BigUint64Array;
  handlePredictedImage: (e: string) => void; // 处理预测后的图像结果
}

// 接口定义，用于返回基于模型查询的Tensor数据结果
export interface queryModelReturnTensorsProps {
  blob: Blob; // 保存图像数据的Blob对象
  // 处理来自分割模型的Tensor结果
  handleSegModelResults: ({ tensor }: { tensor: Tensor }) => void;
  // 处理模型返回的所有结果，包括全JSON数据和图像高度
  handleAllModelResults: ({
    allJSON,
    image_height,
  }: {
    allJSON: {
      encodedMask: string; // 编码后的遮罩字符串
      bbox: number[]; // 边界框数组
      score: number; // 预测得分
      point_coord: number[]; // 点坐标数组
      uncertain_iou: number; // 不确定的交集比率
      area: number; // 区域面积
    }[];
    image_height: number; // 图像的高度
  }) => void;
  image_height: number; // 图像的高度
  imgName: string; // 图像的名称
  shouldDownload: boolean | undefined; // 是否应下载处理后的图像
  shouldNotFetchAllModel: boolean | undefined; // 是否不应获取所有模型数据
}

// 接口定义，用于存储模型处理数据的必要属性
export interface modeDataProps {
  clicks?: Array<modelInputProps>; // 用户点击数据数组
  tensor: Tensor; // Tensor数据，用于模型预测
  modelScale: modelScaleProps; // 模型缩放属性
  best_box?: number[]; // 最优边界框数组
  point_coords?: Array<number[]>; // 点坐标数组
  point_labels?: number[]; // 点标签数组
  last_pred_mask: Tensor | null; // 上一次预测的遮罩Tensor
}

// 接口定义，用于描述适用于多阶段处理流程的属性和方法
export interface StageProps {
  handleResetState: () => void; // 重置当前状态的处理函数
  handleImage: (img?: HTMLImageElement) => void; // 处理图像数据的函数
  scale: modelScaleProps | null; // 缩放属性，可能为null
  hasClicked: boolean; // 标识是否已进行点击操作
  setHasClicked: (e: boolean) => void; // 设置点击状态
  // 处理选定图像的函数，可包含下载和获取模型的选项
  handleSelectedImage: (
    data: File | URL,
    options?: { shouldDownload?: boolean; shouldNotFetchAllModel?: boolean }
  ) => void;
  image: HTMLImageElement | null; // 当前处理的图像元素，可能为null
  isStandalone?: boolean; // 标识是否为独立模式
  model?: InferenceSession | null; // ONNX推理会话实例，可能为null
}
