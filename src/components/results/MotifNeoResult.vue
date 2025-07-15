<template>
  <div>
    <div class="result-title">
      <div class="result-icon motif-neo"></div>
      {{ result.Symbol }} - Motif Neo
    </div>
    
    <div class="result-content">
      <div v-if="result.Symbol" class="result-field">
        <div class="result-field-label">Symbol</div>
        <div class="result-field-value">{{ result.Symbol }}</div>
      </div>
      
      <div v-if="result.Method" class="result-field">
        <div class="result-field-label">Method</div>
        <div class="result-field-value">
          <span class="method-badge">{{ result.Method }}</span>
        </div>
      </div>
      
      <div v-if="result.CstId" class="result-field">
        <div class="result-field-label">CST ID</div>
        <div class="result-field-value">{{ result.CstId }}</div>
      </div>
      
      <div v-if="result.UniprotID" class="result-field">
        <div class="result-field-label">UniProt</div>
        <div class="result-field-value">
          <a
            :href="`https://www.uniprot.org/uniprotkb/${result.UniprotID}/entry`"
            target="_blank"
            class="result-link"
          >
            {{ result.UniprotID }}
            <span>↗</span>
          </a>
        </div>
      </div>
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

.result-icon.motif-neo {
  background-color: #f57c00;
}

.result-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 10px;
}

.result-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.result-field-label {
  font-weight: 600;
  color: #495057;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.result-field-value {
  color: #6c757d;
  font-size: 0.95rem;
}

.method-badge {
  background-color: #fff3e0;
  color: #f57c00;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.result-link {
  color: #007bff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.result-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .result-content {
    grid-template-columns: 1fr;
  }
}
</style>