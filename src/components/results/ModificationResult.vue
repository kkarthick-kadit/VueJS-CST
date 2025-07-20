<template>
  <div>
    <div class="result-title">
      <div class="result-icon modifications"></div>
      {{ result.metadata?.gene }} - {{ result.metadata?.modification_type }}
    </div>
    
    <div class="result-content">
      <div v-if="result.metadata?.residue && result.metadata?.residue_number" class="result-field">
        <div class="result-field-label">Site</div>
        <div class="result-field-value">{{ result.metadata.residue }}{{ result.metadata.residue_number }}</div>
      </div>
      
      <div v-if="result.metadata?.Reference" class="result-field">
        <div class="result-field-label">Reference</div>
        <div class="result-field-value">
          <a
            :href="`https://www.uniprot.org/uniprotkb/${result.metadata.Reference}/entry`"
            target="_blank"
            class="result-link"
          >
            {{ result.metadata.Reference }} <span>↗</span>
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
      
      <div v-if="result.metadata?.modification_type" class="result-field">
        <div class="result-field-label">Type</div>
        <div class="result-field-value">
          <span class="modification-badge">{{ result.metadata.modification_type }}</span>
        </div>
      </div>
      
      <div v-if="result.metadata?.motif_nmer" class="result-field">
        <div class="result-field-label">Motif</div>
        <div class="result-field-value">
          <code class="motif-code">{{ result.metadata.motif_nmer }}</code>
        </div>
      </div>
      
      <div v-if="result.Modifcation_nmer" class="result-field">
        <div class="result-field-label">Modification N-mer</div>
        <div class="result-field-value">
          <span class="badge-success">Available</span>
        </div>
      </div>
    </div>
    
    <div v-if="result.synonyms" class="synonym-section">
      <div class="synonym-label">Synonyms:</div>
      <div class="synonym-text">{{ result.synonyms }}</div>
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

.result-icon.modifications {
  background-color: var(--accent-blue);
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

.modification-badge {
  background-color: rgba(0, 105, 134, 0.2);
  color: var(--accent-blue);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.badge-success {
  background-color: rgba(0, 105, 134, 0.2);
  color: var(--accent-blue);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.motif-code {
  background-color: var(--light-grey);
  color: var(--primary-blue);
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

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