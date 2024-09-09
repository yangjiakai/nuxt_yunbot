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
    <input :id="`file-upload-${uniqueId}`" type="file" @change="handleFileChange" accept="image/*"
      style="display: none" />

    <label :for="`file-upload-${uniqueId}`" class="custum-file-upload">
      <v-img width="200" height="200" contain v-if="imageBase64" :src="imageBase64"></v-img>
      <div v-else>
        <div class="icon">
          <Icon width="50" icon="solar:cloud-upload-line-duotone" />
        </div>
        <div class="text">
          <span>{{ $t("info.uploadImage") }}</span>
        </div>
      </div>
    </label>
  </div>
</template>

<style scoped>
textarea
{
  width: 100%;
}

.upload-area
{
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
.custum-file-upload
{
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

.custum-file-upload .icon
{
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .icon svg
{
  height: 80px;
  fill: #e8e8e8;
}

.custum-file-upload .text
{
  display: flex;
  align-items: center;
  justify-content: center;
}

.custum-file-upload .text span
{
  font-weight: 400;
  color: #e8e8e8;
}

.custum-file-upload input
{
  display: none;
}
</style>
