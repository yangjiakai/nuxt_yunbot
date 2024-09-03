<script setup lang="ts">
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

    <label :for="`file-upload-${uniqueId}`" class="upload-area">
      <v-img
        width="200"
        height="200"
        v-if="imageBase64"
        :src="imageBase64"
      ></v-img>
      <div v-else class="d-flex align-center flex-column">
        <Icon
          class="text-primary mb-1"
          width="26"
          name="solar:cloud-upload-line-duotone"
        />
        <span class="text-body-2 font-weight-bold">上传图片</span>
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
</style>
