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
  color: var(--primary-blue);
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
  background-color: var(--secondary-grey);
}

.result-content {
  background: var(--light-grey);
  border: 1px solid var(--border-grey);
  border-radius: 6px;
  padding: 12px;
}

.result-content pre {
  margin: 0;
  font-size: 0.85rem;
  color: var(--primary-blue);
  white-space: pre-wrap;
  word-break: break-word;
}
</style>