<script lang="ts" setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useAppStore } from "@/stores/app";
import {
  validateEmail,
  validatePassword,
  validateVerificationCode,
} from "@/utils/validation";

const appStore = useAppStore();
const authStore = useAuthStore();

interface FormData {
  username: string;
  email: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
}

const form = ref<FormData>({
  username: "",
  email: "",
  verificationCode: "",
  password: "",
  confirmPassword: "",
});

const isGettingCode = ref(false);
const isSubmitting = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const showErrorMessage = ref(false);
const errorMessage = ref("");

const isValidEmail = computed(() => validateEmail(form.value.email));
const isValidPassword = computed(() => validatePassword(form.value.password));
const isPasswordMatch = computed(
  () => form.value.password === form.value.confirmPassword
);
const isValidVerificationCode = computed(() =>
  validateVerificationCode(form.value.verificationCode)
);

function showError(message: string) {
  errorMessage.value = message;
  showErrorMessage.value = true;
}

async function getCode() {
  if (!isValidEmail.value) {
    showError("请输入有效的邮箱地址");
    return;
  }

  isGettingCode.value = true;
  try {
    await authStore.getVerificationCode(form.value.email);
    showError("验证码已发送到您的邮箱，请查收");
  } catch (error) {
    showError("获取验证码失败，请稍后重试");
  } finally {
    isGettingCode.value = false;
  }
}

async function handleSubmit() {
  // 依次校验各个字段
  if (!form.value.username) {
    showError("请输入用户名");
    return;
  }

  if (!isValidEmail.value) {
    showError("请输入有效的邮箱地址");
    return;
  }

  if (!isValidVerificationCode.value) {
    showError("请输入有效的验证码");
    return;
  }

  if (!isValidPassword.value) {
    showError("密码不符合要求，请重新输入");
    return;
  }

  if (!isPasswordMatch.value) {
    showError("两次输入的密码不一致，请重新确认");
    return;
  }

  isSubmitting.value = true;
  try {
    await authStore.register({
      username: form.value.username,
      password: form.value.password,
      user_email: form.value.email,
      verification_Code: form.value.verificationCode,
    });
    showError("注册成功");
    // 注册成功后的逻辑，比如跳转到登录页面
  } catch (error) {
    showError("注册失败，请检查您的输入并重试");
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
      <div class="text-h4 font-weight-bold my-5">注册</div>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="form.username"
          label="用户名"
          prepend-inner-icon="mdi-account"
          required
          density="comfortable"
          variant="outlined"
          color="primary"
          validateOn="blur"
          rounded="lg"
        ></v-text-field>

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

        <div class="d-flex align-stretch">
          <v-text-field
            v-model="form.verificationCode"
            label="验证码"
            prepend-inner-icon="mdi-shield-account"
            maxlength="6"
            required
            class="flex-grow-1 mr-2"
            density="comfortable"
            variant="outlined"
            color="primary"
            validateOn="blur"
            rounded="lg"
          ></v-text-field>
          <div class="d-flex align-start mt-0.5">
            <v-btn
              @click="getCode"
              :disabled="isGettingCode || !isValidEmail"
              :loading="isGettingCode"
              color="primary"
              size="large"
              class="text-body-2"
            >
              {{ isGettingCode ? "获取中..." : "获取验证码" }}
            </v-btn>
          </div>
        </div>

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

        <v-text-field
          v-model="form.confirmPassword"
          label="确认密码"
          prepend-inner-icon="mdi-lock-check"
          :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showConfirmPassword ? 'text' : 'password'"
          required
          @click:append-inner="showConfirmPassword = !showConfirmPassword"
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
            注册
          </v-btn>
        </div>
        <div v-if="showErrorMessage" class="text-error my-2">
          {{ errorMessage }}
        </div>
        <div class="mt-3 text-left pa-1 text-body-2">
          <v-spacer></v-spacer>
          已注册账号？

          <span
            @click="appStore.authType = 'login'"
            class="text-primary font-weight-bold cursor-pointer"
          >
            登录</span
          >
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>
/* 你可以在这里添加任何额外的 Tailwind 类或自定义样式 */
</style>
