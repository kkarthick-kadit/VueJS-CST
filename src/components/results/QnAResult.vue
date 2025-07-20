<template>
  <div>
    <div class="result-title">
      <div class="result-icon qna"></div>
      Q&A Response
    </div>
    
    <div class="qna-content">
      <p>{{ result.text }}</p>
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

.result-icon.qna {
  background-color: var(--secondary-blue);
}

.qna-content {
  background: var(--light-grey);
  border-left: 4px solid var(--secondary-blue);
  padding: 16px;
  border-radius: 6px;
}

.qna-content p {
  color: var(--primary-blue);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}
</style>