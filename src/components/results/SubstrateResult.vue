<template>
  <div>
    <div class="result-title">
      <div class="result-icon substrate"></div>
      Kinase Substrates
      <span v-if="result.Family">({{ result.Family }} Family)</span>
    </div>
    
    <div v-if="result.Proteins && result.Proteins.length > 0" class="substrate-list">
      <div
        v-for="(protein, index) in result.Proteins"
        :key="index"
        class="substrate-item"
      >
        <div class="result-content">
          <div class="result-field">
            <div class="result-field-label">Substrate</div>
            <div class="result-field-value">{{ protein.Protein }}</div>
          </div>
          
          <div v-if="protein.Link" class="result-field">
            <div class="result-field-label">PhosphoSite</div>
            <div class="result-field-value">
              <a :href="protein.Link" target="_blank" class="result-link">
                View Details <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="result-content">
      <div class="result-field-value">No substrates found</div>
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

.result-icon.substrate {
  background-color: #dc3545;
}

.substrate-list {
  margin-top: 15px;
}

.substrate-item {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 10px;
}

.substrate-item:last-child {
  margin-bottom: 0;
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