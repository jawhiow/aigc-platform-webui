<script setup lang="ts">
import {ref} from "vue";
import TextModelServer from "@/views/model/text-model-server/index.vue";
import AudioModelServer from "@/views/model/audio-model-server/index.vue";
import RefAudio from "@/views/model/prompt-audio/index.vue";
import GptSovits from "@/views/model/gpt-sovits/index.vue";
import FishSpeech from "@/views/model/fish-speech/index.vue";
import EdgeTts from "@/views/model/edge-tts/index.vue";
import ChatTts from "@/views/model/chat-tts/index.vue";
import CosyVoice from "@/views/model/cosy-voice/index.vue";
import ImageModelServer from "@/views/model/image-model-server/index.vue";

const menuGroups = [
  {
    name: '文本',
    list: [
      '文本大模型'
    ]
  },
  {
    name: '音频',
    list: [
      '音频生成服务',
      '参考音频',
      'gpt-sovits',
      'fish-speech',
      'edge-tts',
      'chat-tts',
      'cosy-voice'
    ]
  },
  {
    name: '图像',
    list: [
      '图像大模型'
    ]
  }
]

const activeModelType = ref('文本大模型')

const changeModelType = (item: string) => {
  activeModelType.value = item
}
</script>

<template>
  <div class="model-container">
    <div class="model-menu">
      <div v-for="(group, index) in menuGroups" :key="index" class="menu-group">
        <div class="menu-group-title">{{ group.name }}</div>
        <div class="menu-group-list">
          <div
              v-for="(item, itemIndex) in group.list"
              :key="itemIndex"
              class="menu-item"
              :class="{ active: activeModelType === item }"
              @click="changeModelType(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="model-content">
      <text-model-server v-if="activeModelType === '文本大模型'"/>
      <audio-model-server v-if="activeModelType === '音频生成服务'"/>
      <ref-audio v-if="activeModelType === '参考音频'"/>
      <gpt-sovits v-if="activeModelType === 'gpt-sovits'"/>
      <fish-speech v-if="activeModelType === 'fish-speech'"/>
      <edge-tts v-if="activeModelType === 'edge-tts'"/>
      <chat-tts v-if="activeModelType === 'chat-tts'"/>
      <cosy-voice v-if="activeModelType === 'cosy-voice'"/>
      <image-model-server v-if="activeModelType === '图像大模型'"/>
    </div>
  </div>
</template>

<style scoped>
.model-container {
  display: flex;
  height: 100%;
}

.model-menu {
  width: 200px;
  padding: 20px;
  border-right: 1px solid #e5e5e5;
  overflow-y: auto;
}

.menu-group {
  margin-bottom: 20px;
}

.menu-group-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.menu-group-list {
  display: flex;
  flex-direction: column;
}

.menu-item {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 4px;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.active {
  background-color: #e6f4ff;
  color: #1890ff;
}

.model-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>