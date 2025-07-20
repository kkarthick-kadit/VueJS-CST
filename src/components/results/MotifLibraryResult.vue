<template>
  <div>
    <div class="result-title">
      <div class="result-icon motif-library"></div>
      {{ result.displayName || result.name }} - Motif Library
    </div>
    
    <div class="result-content">
      <div v-if="result.geneName" class="result-field">
        <div class="result-field-label">Gene</div>
        <div class="result-field-value">{{ result.geneName }}</div>
      </div>
      
      <div v-if="result.family" class="result-field">
        <div class="result-field-label">Family</div>
        <div class="result-field-value">{{ result.family }}</div>
      </div>
      
      <div v-if="result.score" class="result-field">
        <div class="result-field-label">Score</div>
        <div class="result-field-value">
          <span :class="['score-badge', getScoreClass(result.score)]">
            {{ result.score.toFixed(4) }}
          </span>
        </div>
      </div>
      
      <div v-if="result.percentile" class="result-field">
        <div class="result-field-label">Percentile</div>
        <div class="result-field-value">{{ result.percentile.toFixed(2) }}%</div>
      </div>
      
      <div v-if="result.percentileRank" class="result-field">
        <div class="result-field-label">Percentile Rank</div>
        <div class="result-field-value">#{{ result.percentileRank }}</div>
      </div>
      
      <div v-if="result.scoreRank" class="result-field">
        <div class="result-field-label">Score Rank</div>
        <div class="result-field-value">#{{ result.scoreRank }}</div>
      </div>
      
      <div v-if="result.uniprotId" class="result-field">
        <div class="result-field-label">UniProt</div>
        <div class="result-field-value">
          <a
            :href="`https://www.uniprot.org/uniprotkb/${result.uniprotId}/entry`"
            target="_blank"
            class="result-link"
          >
            {{ result.uniprotId }}
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

const getScoreClass = (score: number): string => {
  if (score > 4) return 'high';
  if (score > 2) return 'medium';
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

.result-icon.motif-library {
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

.result-link {
  color: var(--link-red);
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