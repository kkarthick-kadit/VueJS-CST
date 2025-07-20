<template>
  <div>
    <div class="result-title">
      <div class="result-icon substrate"></div>
      Substrate Sites
      <!-- <span v-if="result.Family && result.Family !== 'None'">({{ result.Family }} Family)</span> -->
    </div>
    
    <div v-if="result.Sites && result.Sites.length > 0" class="substrate-list">
      <div
        v-for="(site, index) in result.Sites"
        :key="index"
        class="substrate-item"
      >
        <div class="result-content">
          <div class="result-field">
            <div class="result-field-label">Gene Symbol</div>
            <div class="result-field-value">{{ site.SubstrateGeneSymbol }}</div>
          </div>
          
          <div class="result-field">
            <div class="result-field-label">Site</div>
            <div class="result-field-value">{{ site.Residue }}{{ site.ResidueNumber }}</div>
          </div>
          
          <div class="result-field">
            <div class="result-field-label">N-mer Sequence</div>
            <div class="result-field-value">
              <code class="nmer-sequence">{{ site.Nmer }}</code>
            </div>
          </div>
          
          <div class="result-field">
            <div class="result-field-label">Evidence</div>
            <div class="result-field-value">
              <span class="evidence-badge">{{ site.EvidenceType }}</span>
            </div>
          </div>
          
          <div class="result-field">
            <div class="result-field-label">UniProt</div>
            <div class="result-field-value">
              <a :href="`https://www.uniprot.org/uniprotkb/${site.SubstrateUniProtID}/entry`" target="_blank" class="result-link">
                {{ site.SubstrateUniProtID }} <span>↗</span>
              </a>
            </div>
          </div>
          
          <div class="result-field">
            <div class="result-field-label">Modification Site</div>
            <div class="result-field-value">
              <a :href="site.ModSiteLink" target="_blank" class="result-link">
                View Site Details <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="result-content">
      <div class="result-field-value">No substrate sites found</div>
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
  background-color:rgba(0, 105, 134, 0.2);
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

.nmer-sequence {
  background-color: #f8f9fa;
  color: #495057;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.evidence-badge {
  background-color: #e8f4fd;
  color: #0066cc;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .result-content {
    grid-template-columns: 1fr;
  }
}
</style>