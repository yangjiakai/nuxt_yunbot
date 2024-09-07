<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useComfySocket } from "@/composable/useComfySocket";
// import { Queue, Worker } from 'bullmq';
// import Redis from 'ioredis';
import FunctionHeader from "@/components/common/FunctionHeader.vue";
import {tex2img} from "@/api/comfyApi";
import { Vue3Lottie } from "vue3-lottie";
const { connectWebSocket, progressmax, progress, resImg, taskStatus } =  useComfySocket();

const res = ref()
const data = reactive({
  "client_id": "123244346456",
  "socket_id": "12324",
  "params": {
    "positive": "1 dog",
    "negative": "丑陋的",
    "seed": 1234557899345,
    "width": 512,
    "height": 768,
    "ckpt_name_id": 0,
    "filename_prefix": "iamgename",
    "upscale_by": 1
  },
  "options": {
    "source": "web",
    "apisource": "default",
    "lifo": false
  }
})

const handleCreate = async () => {
  console.log("handleCreate");
  res.value = await tex2img(data);
  console.log(res);
};
// onMounted(() => {
//   const connection = new IORedis({
//     host: '123.249.107.40',
//     port: 6379,
//     password: 'jhkdjhkjdhsIUTYURTU_rK2bQp'
//     // 其他 Redis 配置...
//     });

//   const myWorker = new Worker('dram', async (job)=>{
//     console.log('job', job);
// }, { connection})

// });

</script>

<template>
  <div class="h-full bg-background">
    <FunctionHeader title="文生图" />
    <div class="pa-1 d-flex">
      <!-- LEFT -->
      <v-card class="center flex-grow-1   d-flex flex-column">
        <V-img
          :src= "res"
          contain
   
        >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-lighten-4"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>
        </V-img>
         
        <v-card-actions>
          <v-textarea
          label="提示词"
          row-height="25"
          rows="2"
          variant="outlined"
          auto-grow
          
        ></v-textarea>
          <v-btn
            class="ma-2"
            color="primary"
            @click="handleCreate"
            >开始</v-btn
          >
          
        </v-card-actions>
       
      </v-card>

      <!-- RIGHT -->
      <v-card class="right pa-1"> </v-card>
    </div>
  </div>
</template>

<style scoped lang="scss">


.center {
  height: calc(100vh - 80px);
  overflow: auto;
}

.right {
  width: 400px;
  min-width: 400px;
  height: calc(100vh - 80px);
  overflow: auto;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 160px;
  border: 2px dashed #ccc;
  cursor: pointer;
  border-radius: 10px;
}

.upload-icon {
  font-size: 24px;
}

.dotted-card {
  border: 2px dashed #ccc;
  border-radius: 10px;
}

.blend-card {
  width: 100%;
  height: 100px;

  border-radius: 10px;
  background: linear-gradient(rgb(153, 153, 153), rgba(0, 0, 0, 0.081)),
    url("@/assets/images/shoes/shoes_05.jpg");
  background-size: cover;
  background-position: center;
  cursor: pointer;
}

.active-blend-card {
  border: 3px solid rgba(var(--v-theme-primary));
}
</style>
