<template>
  <div class="results-container">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <div v-else-if="isLoading" class="loading">
      {{ getLoadingMessage() }}
    </div>
    
    <template v-else-if="searchQuery && results.length > 0">
      <div class="results-header">
        <div class="results-count">
          {{ resultCount }} result{{ resultCount !== 1 ? 's' : '' }} found for "{{ searchQuery }}"
        </div>
        <div :class="['result-type', resultType]">
          {{ resultTypeLabel }}
        </div>
      </div>
      
      <div v-if="proteinName && modificationType" class="modification-info">
        <strong>{{ proteinName }}</strong> - {{ modificationType }}
      </div>
      
      <div class="results-grid">
        <div
          v-for="(result, index) in results"
          :key="index"
          class="result-card"
        >
          <ProteinResult v-if="resultType === 'protein'" :result="result" />
          <SubstrateResult v-else-if="resultType === 'substrate'" :result="result" />
          <MotifLibraryResult v-else-if="resultType === 'motif_library'" :result="result" />
          <MotifNeoResult v-else-if="resultType === 'motif_neo'" :result="result" />
          <ModificationResult v-else-if="resultType === 'modification_protein'" :result="result" />
          <QnAResult v-else-if="resultType === 'QnA'" :result="result" />
          <DefaultResult v-else :result="result" />
        </div>
      </div>
    </template>
    
    <div v-else-if="searchQuery && results.length === 0" class="no-results">
      No results found for "{{ searchQuery }}"
    </div>
  </div>
</template>

<script setup lang="ts">
import ProteinResult from './results/ProteinResult.vue';
import SubstrateResult from './results/SubstrateResult.vue';
import MotifLibraryResult from './results/MotifLibraryResult.vue';
import MotifNeoResult from './results/MotifNeoResult.vue';
import ModificationResult from './results/ModificationResult.vue';
import QnAResult from './results/QnAResult.vue';
import DefaultResult from './results/DefaultResult.vue';
import type { SearchResult, ResultType } from '../types';

interface Props {
  searchQuery: string;
  results: SearchResult[];
  resultCount: number;
  resultType: ResultType;
  resultTypeLabel: string;
  proteinName: string;
  modificationType: string;
  isLoading: boolean;
  error: string | null;
}

defineProps<Props>();

const getLoadingMessage = () => {
  const messages = [
    'Searching...',
    'Fetching data...',
    'Analyzing results...',
    'Processing query...',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};
</script>

<style scoped>
.results-container {
  margin-top: 30px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
}

.results-count {
  font-size: 1.1rem;
  color: #6c757d;
}

.result-type {
  font-size: 0.9rem;
  color: #007bff;
  background-color: #e7f3ff;
  padding: 4px 8px;
  border-radius: 4px;
}

.result-type.motif_library { background-color: #f3e8ff; color: #6f42c1; }
.result-type.motif_neo { background-color: #fff3e0; color: #f57c00; }
.result-type.substrate { background-color: #ffeaea; color: #dc3545; }
.result-type.modification_protein { background-color: #e8f5e8; color: #28a745; }
.result-type.QnA { background-color: #e3f2fd; color: #1976d2; }

.modification-info {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  border-left: 4px solid #28a745;
}

.results-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.no-results,
.loading {
  text-align: center;
  color: #6c757d;
  font-size: 1.1rem;
  margin-top: 40px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .results-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}
</style>