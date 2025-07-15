<template>
  <div>
    <div class="result-title">
      <div class="result-icon protein"></div>
      {{ result.metadata?.gene || 'Protein' }}
    </div>
    
      <div class="result-content">
        <div v-if="result.metadata?.Reference" class="result-field">
          <div class="result-field-label">Reference</div>
          <div class="result-field-value">
            <a
              :href="`https://www.uniprot.org/uniprotkb/${result.metadata.Reference}/entry`"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ result.metadata.Reference }}
            </a>
          </div>
        </div>
      
      <div v-if="result.metadata?.Gene_Symbols" class="result-field">
        <div class="result-field-label">Gene Symbol</div>
        <div class="result-field-value">{{ result.metadata.Gene_Symbols }}</div>
      </div>
      
      <div v-if="result.metadata?.Organism" class="result-field">
        <div class="result-field-label">Organism</div>
        <div class="result-field-value">
          <span class="organism-highlight">{{ result.metadata.Organism }}</span>
        </div>
      </div>
      
      <div v-if="result.metadata?.Source" class="result-field">
        <div class="result-field-label">Source</div>
        <div class="result-field-value">{{ result.metadata.Source }}</div>
      </div>
      
      <!-- <div v-if="result.score" class="result-field">
        <div class="result-field-label">Score</div>
        <div class="result-field-value">
          <span :class="['score-badge', getScoreClass(result.score)]">
            {{ result.score.toFixed(4) }}
          </span>
        </div>
      </div> -->
    </div>
    
    <div v-if="result.synonym || result.text" class="synonym-section">
      <div class="synonym-label">Synonyms:</div>
      <div class="synonym-text">{{ result.synonym || result.text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult } from '../../types';

interface Props {
  result: SearchResult;
}

defineProps<Props>();

const getScoreClass = (score: number): string => {
  if (score > 0.8) return 'high';
  if (score > 0.5) return 'medium';
  return 'low';
};
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

.result-icon.protein {
  background-color: #007bff;
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

.organism-highlight {
  background-color: #e8f4fd;
  color: #0066cc;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
  display: inline-block;
}

.score-badge {
  background-color: #f8f9fa;
  color: #495057;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.score-badge.high { background-color: #d4edda; color: #155724; }
.score-badge.medium { background-color: #fff3cd; color: #856404; }
.score-badge.low { background-color: #f8d7da; color: #721c24; }

.synonym-section {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e9ecef;
}

.synonym-label {
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.synonym-text {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .result-content {
    grid-template-columns: 1fr;
  }
}
</style>