<template>
  <div class="space-y-4">
    <a-card>
      <template #title>图像服务器配置</template>
      <template #description>配置图像生成服务的连接信息</template>
      <a-form :model="form" @submit="handleSubmit" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item field="host" label="服务器地址">
              <a-input v-model="form.host" placeholder="例如：http://localhost:7860" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item field="path" label="API路径">
              <a-input v-model="form.path" placeholder="例如：/sdapi/v1/txt2img" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item field="apiKey" label="API密钥">
              <a-input-password v-model="form.apiKey" placeholder="输入API密钥" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item field="apiSecret" label="API密钥">
              <a-input-password v-model="form.apiSecret" placeholder="输入API密钥" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item field="model" label="模型名称">
          <a-input v-model="form.model" placeholder="输入模型名称" />
        </a-form-item>

        <a-form-item field="active">
          <a-checkbox v-model="form.active">启用此配置</a-checkbox>
        </a-form-item>

        <div class="flex justify-end space-x-2">
          <a-button type="outline" @click="handleReset">重置</a-button>
          <a-button type="primary" html-type="submit">保存</a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Message } from '@arco-design/web-vue'
import { queryImageServers, updateImageServer, type ImageServer } from '@/api/image-server'

const form = ref<Partial<ImageServer>>({
  host: '',
  path: '',
  apiKey: '',
  apiSecret: '',
  model: '',
  active: false
})

const handleSubmit = async () => {
  try {
    if (!form.value.id) {
      Message.error('请先选择要编辑的服务器配置')
      return
    }
    await updateImageServer(form.value as ImageServer)
    Message.success('图像服务器配置已更新')
  } catch (error: any) {
    Message.error(error.message || '更新配置时发生错误')
  }
}

const handleReset = () => {
  loadConfig()
}

const loadConfig = async () => {
  try {
    const { data } = await queryImageServers(1, 1)
    if (data.records.length > 0) {
      form.value = { ...data.records[0] }
    }
  } catch (error: any) {
    Message.error(error.message || '加载配置时发生错误')
  }
}

onMounted(() => {
  loadConfig()
})
</script> 