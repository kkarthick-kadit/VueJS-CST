<template>
  <div>
    <div class="result-title">
      <div class="result-icon default"></div>
      Search Result
    </div>
    
    <div class="result-content">
      <pre>{{ JSON.stringify(result, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult } from '../../types';

interface Props {
  result: SearchResult;
}

defineProps<Props>();
</script>

<style scoped>
.result-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.result-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.result-icon.default {
  background-color: #6c757d;
}

.result-content {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 12px;
}

.result-content pre {
  margin: 0;
  font-size: 0.85rem;
  color: #495057;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>