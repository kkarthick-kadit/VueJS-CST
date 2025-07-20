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

.result-icon.protein {
  background-color: var(--primary-blue);
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
  color: var(--primary-blue);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.result-field-value {
  color: var(--secondary-grey);
  font-size: 0.95rem;
}

.organism-highlight {
  background-color: rgba(90, 150, 189, 0.2);
  color: var(--secondary-blue);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
  display: inline-block;
}

.score-badge {
  background-color: var(--light-grey);
  color: var(--primary-blue);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.score-badge.high { background-color: rgba(0, 105, 134, 0.2); color: var(--accent-blue); }
.score-badge.medium { background-color: rgba(90, 150, 189, 0.2); color: var(--secondary-blue); }
.score-badge.low { background-color: rgba(220, 53, 69, 0.1); color: var(--link-red); }

.synonym-section {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-grey);
}

.synonym-label {
  font-weight: 600;
  color: var(--primary-blue);
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.synonym-text {
  color: var(--secondary-grey);
  font-size: 0.9rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .result-content {
    grid-template-columns: 1fr;
  }
}
</style>