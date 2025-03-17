<script setup lang="ts">
import {onMounted, ref} from "vue";
import {FormInstance, Message} from "@arco-design/web-vue";
import {ImageServer, queryImageServers, generateImage} from "@/api/image-server";

const formRef = ref<FormInstance>();
const form = ref({
  modelId: '',
  prompt: '',
  negativePrompt: '',
  width: 512,
  height: 512,
  steps: 30,
  cfgScale: 7.5,
  sampler: 'Euler a',
  seed: -1,
  batchSize: 1,
});

const imageConfigs = ref<ImageServer[]>([]);
const loading = ref(false);
const generatedImage = ref<string>('');

const handleQueryImageConfig = async () => {
  try {
    const {data} = await queryImageServers();
    imageConfigs.value = data.records;
  } catch (error: any) {
    Message.error(error.message || '加载配置失败');
  }
}

const handleGenerateImage = async () => {
  try {
    const valid = await formRef.value?.validate();
    if (!valid) {
      return;
    }
    
    loading.value = true;
    const {data} = await generateImage(form.value);
    generatedImage.value = data;
    Message.success('图像生成成功');
  } catch (error: any) {
    Message.error(error.message || '图像生成失败');
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  handleQueryImageConfig();
})
</script>

<template>
  <div style="margin-top: 10px">
    <a-form
        ref="formRef"
        :model="form"
        :label-col-props="{ span: 4 }"
        :wrapper-col-props="{ span: 20 }"
    >
      <a-form-item field="modelId" label="模型" required>
        <a-select v-model="form.modelId">
          <a-option
              v-for="(item, index) in imageConfigs"
              :key="index"
              :value="item.id"
          >
            {{ item.name }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="prompt" label="提示词" required>
        <a-textarea
            v-model="form.prompt"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="请输入提示词"
        />
      </a-form-item>
      <a-form-item field="negativePrompt" label="反向提示词">
        <a-textarea
            v-model="form.negativePrompt"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="请输入反向提示词"
        />
      </a-form-item>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item field="width" label="宽度">
            <a-input-number v-model="form.width" :min="64" :max="2048" :step="64"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="height" label="高度">
            <a-input-number v-model="form.height" :min="64" :max="2048" :step="64"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item field="steps" label="步数">
            <a-input-number v-model="form.steps" :min="1" :max="150" :step="1"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="cfgScale" label="CFG Scale">
            <a-input-number v-model="form.cfgScale" :min="1" :max="30" :step="0.5"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item field="sampler" label="采样器">
            <a-select v-model="form.sampler">
              <a-option value="Euler a">Euler a</a-option>
              <a-option value="Euler">Euler</a-option>
              <a-option value="LMS">LMS</a-option>
              <a-option value="Heun">Heun</a-option>
              <a-option value="DPM2">DPM2</a-option>
              <a-option value="DPM2 a">DPM2 a</a-option>
              <a-option value="DPM++ 2S a">DPM++ 2S a</a-option>
              <a-option value="DPM++ 2M">DPM++ 2M</a-option>
              <a-option value="DDIM">DDIM</a-option>
              <a-option value="PLMS">PLMS</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="seed" label="种子">
            <a-input-number v-model="form.seed" :min="-1"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item>
        <a-button type="primary" :loading="loading" @click="handleGenerateImage">
          生成图像
        </a-button>
      </a-form-item>
    </a-form>

    <div v-if="generatedImage.length > 0" style="margin-top: 20px">
      <a-typography-title :heading="6">生成结果</a-typography-title>
      <a-card hoverable>
        <img :src="generatedImage" style="width: 100%; height: auto"/>
      </a-card>
    </div>
  </div>
</template> 