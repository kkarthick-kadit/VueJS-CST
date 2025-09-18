<!-- <template>
  <div>
    <div class="result-title">
      <div class="result-icon motif"></div>
      {{ result.displayName || result.Symbol || result.geneName }} - Kinase Prediction
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
            {{ result.score.toFixed(3) }}
          </span>
        </div>
      </div>
      
      <div v-if="result.percentile" class="result-field">
        <div class="result-field-label">Percentile</div>
        <div class="result-field-value">{{ result.percentile.toFixed(1) }}%</div>
      </div>
      
      <div v-if="result.uniprotId || result.UniprotID" class="result-field">
        <div class="result-field-label">UniProt</div>
        <div class="result-field-value">
          <a
            :href="`https://www.uniprot.org/uniprotkb/${result.uniprotId || result.UniprotID}/entry`"
            target="_blank"
            class="result-link"
          >
            {{ result.uniprotId || result.UniprotID }}
            <span>↗</span>
          </a>
        </div>
      </div>
      
      <div v-if="result.Method" class="result-field">
        <div class="result-field-label">Method</div>
        <div class="result-field-value">{{ result.Method }}</div>
      </div>
    </div>
  </div>

<script setup lang="ts">
import type { SearchResult } from '../../types';

interface Props {
  result: SearchResult;
}

defineProps<Props>();

const getScoreClass = (score: number): string => {
  if (score > 0.7) return 'high';
  if (score > 0.4) return 'medium';
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

.result-icon.motif {
  background-color: #6f42c1;
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
</style> -->