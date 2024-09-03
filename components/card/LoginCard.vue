<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { validateEmail } from "@/utils/validation";

const appStore = useAppStore();

interface FormData {
  email: string;
  password: string;
}

const form = ref<FormData>({
  email: "",
  password: "",
});

const isSubmitting = ref(false);
const showPassword = ref(false);

const showErrorMessage = ref(false);
const errorMessage = ref("");

const isValidEmail = computed(() => validateEmail(form.value.email));

function showError(message: string) {
  errorMessage.value = message;
  showErrorMessage.value = true;
}

async function handleLogin() {
  // 校验各个字段
  if (!form.value.email) {
    showError("请输入邮箱地址");
    return;
  }

  if (!isValidEmail.value) {
    showError("请输入有效的邮箱地址");
    return;
  }

  if (!form.value.password) {
    showError("请输入密码");
    return;
  }

  isSubmitting.value = true;
  try {
    // await authStore.login({
    //   email: form.value.email,
    //   password: form.value.password,
    // });
    showError("登录成功");
    // 登录成功后的逻辑，比如跳转到首页
  } catch (error) {
    showError("登录失败，请检查您的邮箱和密码");
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <v-card width="440" rounded="xl" elevation="3" theme="dark">
    <v-img
      src="https://flowgpt.com/_next/image?url=%2Fsign-in%2Fsign-in-image-slides.png&w=1024&q=100"
      alt=""
      height="200"
      position="bottom"
      cover
    />

    <v-card-text class="px-10" style="transform: translateY(-20px)">
      <!-- Title -->
      <div class="text-h4 font-weight-bold my-5">登录</div>
      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="form.email"
          label="邮箱"
          prepend-inner-icon="mdi-email"
          required
          density="comfortable"
          variant="outlined"
          color="primary"
          validateOn="blur"
          rounded="lg"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          label="密码"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          required
          @click:append-inner="showPassword = !showPassword"
          density="comfortable"
          variant="outlined"
          color="primary"
          validateOn="blur"
          rounded="lg"
        ></v-text-field>

        <div class="text-center">
          <v-btn
            color="primary"
            type="submit"
            :loading="isSubmitting"
            block
            size="large"
            rounded="lg"
          >
            登录
          </v-btn>
        </div>
        <div v-if="showErrorMessage" class="text-error my-2">
          {{ errorMessage }}
        </div>
        <div class="mt-3 text-left pa-1 text-body-2">
          <v-spacer></v-spacer>
          还没有账号？

          <span
            @click="appStore.authType = 'register'"
            class="text-primary font-weight-bold cursor-pointer"
          >
            注册</span
          >
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>
/* 你可以在这里添加任何额外的 Tailwind 类或自定义样式 */
</style>
