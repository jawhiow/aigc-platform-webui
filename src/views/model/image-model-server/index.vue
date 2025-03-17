<script setup lang="ts">
import ImageServerConfig from "@/views/model/image-model-server/components/ImageServerConfig.vue";
import ImageModelDebug from "@/views/model/image-model-server/components/ImageModelDebug.vue";
</script>

<template>
  <div>
    <a-tabs type="card" size="small" animated>
      <a-tab-pane key="1" title="服务配置">
        <image-server-config/>
      </a-tab-pane>
      <a-tab-pane key="2" title="模型调试">
        <image-model-debug/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
</style> 