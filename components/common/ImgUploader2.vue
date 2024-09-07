<script setup lang="ts">
import { Icon } from "@iconify/vue";
const imageBase64 = ref("");
const emit = defineEmits(["update:base64Str", "update:uploadImg"]);
function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    imageBase64.value = e.target?.result as string;
    // 当图片转换完成后，通过emit发送事件及数据给父组件
    emit("update:base64Str", imageBase64.value);
  };
  reader.readAsDataURL(file);
  emit("update:uploadImg", file);
}

const uniqueId = ref(Date.now());
</script>
<template>
  <div>
    <input
      :id="`file-upload-${uniqueId}`"
      type="file"
      @change="handleFileChange"
      accept="image/*"
      style="display: none"
    />

    <label :for="`file-upload-${uniqueId}`" class="custum-file-upload">
      <v-img
        width="200"
        height="200"
        contain
        v-if="imageBase64"
        :src="imageBase64"
      ></v-img>
      <div v-else>
        <div class="icon">
          <Icon width="60" icon="solar:cloud-upload-line-duotone" />
          <!-- <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                fill=""
              ></path>
            </g>
          </svg> -->
        </div>
        <div class="text">
          <span>点击上传图片</span>
        </div>
      </div>
    </label>
  </div>
</template>

<style scoped>
textarea {
  width: 100%;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border: 2px dashed #ccc;
  cursor: pointer;
  border-radius: 10px;
}

/* From Uiverse.io by csemszepp */
.custum-file-upload {
  height: 200px;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: 2px dashed #e8e8e8;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  border-radius: 10px;
  box-shadow: 0px 48px 35px -48px #e8e8e8;
}

.custum-file-upload .icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .icon svg {
  height: 80px;
  fill: #e8e8e8;
}

.custum-file-upload .text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .text span {
  font-weight: 400;
  color: #e8e8e8;
}

.custum-file-upload input {
  display: none;
}
</style>
