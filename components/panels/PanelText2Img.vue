<script setup lang="ts">
import { generateRandomSeed } from "@/utils/common";
import { createTask } from "~/utils/task";
import { useTaskStore } from "@/stores/taskStore";
import SubHeader from "~/components/layout/SubHeader.vue";
import Button1 from "~/components/UI/button/Button1.vue";
const router = useRouter();
const taskStore = useTaskStore();
const panel = ref(["promptPanel", "configPanel", "stylePanel"]);
const prompt = ref("A beautiful girl, HD，Chinese portrait");
const styles = ref([
  {
    text: "None",
    textZh: "无",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/fotorWeb/rg0th3khguqn.jpg@196w_196h_1l.src",
  },
  {
    text: "Photography",
    textZh: "摄影",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/5a61d47x6r1c.jpg@196w_196h_1l.src",
  },
  {
    text: "Psychedelic",
    textZh: "迷幻",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/185w5i9s26er.jpg@196w_196h_1l.src",
  },
  {
    text: "Digital Art",
    textZh: "数字艺术",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/rskwaasqq9se.jpg@196w_196h_1l.src",
  },
  {
    text: "Art Oils",
    textZh: "油画艺术",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/tlzz7y7pjrws.jpg@196w_196h_1l.src",
  },
  {
    text: "Tattoo",
    textZh: "纹身",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/h9cpi98sa41p.jpg@196w_196h_1l.src",
  },
  {
    text: "Acrylic Painting",
    textZh: "丙烯画",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/j2ubca96rmfs.jpg@196w_196h_1l.src",
  },
  {
    text: "Chinese Illustration",
    textZh: "中国插画",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/k1tkfjdvevf1.jpg@196w_196h_1l.src",
  },
  {
    text: "Chinese Ink Painting",
    textZh: "中国水墨画",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/cva58ri9o55i.jpg@196w_196h_1l.src",
  },
  {
    text: "Colored Pencil Drawing",
    textZh: "彩色铅笔画",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/i7rol6bmvxio.jpg@196w_196h_1l.src",
  },
  {
    text: "Color Manga",
    textZh: "彩色漫画",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/8osa2ndgux1h.jpg@196w_196h_1l.src",
  },
  {
    text: "Neonpunk",
    textZh: "霓虹朋克",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/yqhk8jzwnowa.jpg@196w_196h_1l.src",
  },
  {
    text: "Tee Printing",
    textZh: "T恤印花",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/ni49174se7yt.jpg@196w_196h_1l.src",
  },
  {
    text: "Anime",
    textZh: "动漫",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/bij6jpquh9ug.jpg@196w_196h_1l.src",
  },
  {
    text: "Cinematic",
    textZh: "电影风格",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/uhgtz698jloy.jpg@196w_196h_1l.src",
  },
  {
    text: "Icon",
    textZh: "图标",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/13b0d1pplfpp.jpg@196w_196h_1l.src",
  },
  {
    text: "Logo",
    textZh: "标志",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/bs1c9fat0rn4.jpg@196w_196h_1l.src",
  },
  {
    text: "Pixel Art",
    textZh: "像素艺术",
    cover:
      "https://pub-static.fotor.com/assets/aiImageConfig/template/teauo5you13o.jpg@196w_196h_1l.src",
  },
]);

const currentStyle = ref(styles.value[0]);

const stylePrompt = computed(() => {
  return `style is ${currentStyle.value.text} `;
});

const fullPrompt = computed(() => {
  return `${prompt.value} ,${stylePrompt.value}`;
});

const handleStyle = (style: any) => {
  currentStyle.value = style;
};

const isCurrentStyle = (style: any) => {
  return currentStyle.value.text === style.text;
};

const batchSize = ref(1);
const aspectRatio = ref("1:1");

const handleCreate = () => {
  createTask({
    type: "FLUX1-nf4-schnell-txt2img",
    client_id: "32324324224",
    prompt: {
      seed: generateRandomSeed(),
      batch_size: batchSize.value,
      positive: fullPrompt.value,
    },
  });
};
</script>

<template>
  <div>
    <SubHeader title="aiTools.generate.text2img" link="/generate" />
    <div class="px-2 pt-2 ">
      <Button1 @click="handleCreate" text="btn.create" />
      <!-- <v-btn class="gradient info text-gray-50 my-2" color="primary" size="large" block :disabled="taskStore.isLoading"
        @click="handleCreate">图像生成</v-btn> -->
    </div>
    <perfect-scrollbar class="config-panel  pa-2">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel value="promptPanel">
          <v-expansion-panel-title class="font-weight-bold">{{ $t("header.prompt") }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-textarea v-model="prompt" color="primary" variant="outlined" counter hide-details></v-textarea>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="configPanel">
          <v-expansion-panel-title class="font-weight-bold">{{ $t("header.baseParam") }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <!-- Param -->

            <div class="d-flex gap-1 mb-5">
              <v-select v-model="aspectRatio" :label="$t('label.ratio')" density="compact" hide-details color="primary"
                class="flex-grow-1" :items="['1:1', '4:3', '3:4', '16:9', '9:16']" variant="outlined"></v-select>
              <v-select :label="$t('label.number')" v-model="batchSize" density="compact" hide-details color="primary"
                class="flex-grow-1" :items="[1, 2, 3, 4]" variant="outlined"></v-select>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="stylePanel">
          <v-expansion-panel-title class="font-weight-bold">{{ $t("header.style") }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="grid gap-2 grid-cols-3">
              <div v-for="style in styles" :key="style.text" class="cursor-pointer"
                :class="isCurrentStyle(style) ? ' color-border-3 ' : ''" @click="handleStyle(style)">
                <v-img :src="style.cover" class="rounded-lg ma-1"></v-img>
                <div class="text-center text-xs font-bold py-2">
                  {{ style.textZh }}
                </div>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </perfect-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.config-panel {
  height: calc(100vh - 144px);
}
</style>
