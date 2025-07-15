<template>
  <div class="features-section">
    <div class="features-grid">
      <div class="feature-card protein">
        <h3>Protein & Alias Search</h3>
        <ul class="feature-list">
          <li>Gene symbols: "ERBB1", "Akt", "EGFR"</li>
          <li>Aliases: "Protein kinase B" → "AKT"</li>
          <li>UniProt accession numbers</li>
        </ul>
      </div>
      
      <div class="feature-card modification">
        <h3>Modification Search</h3>
        <ul class="feature-list">
          <li>Use "modification" keyword with protein name</li>
          <li>Example: "p53 modification"</li>
          <li>Returns all PTM types for the protein</li>
        </ul>
      </div>
      
      <div class="feature-card ptm">
        <h3>PTM-Specific Query</h3>
        <ul class="feature-list">
          <li>Site-specific queries: "S473 on AKT1"</li>
          <li>Detailed modification site data</li>
          <li>Functional annotations</li>
        </ul>
      </div>
      
      <div class="feature-card substrate">
        <h3>Kinase-Substrate Search</h3>
        <ul class="feature-list">
          <li>Example: "substrates of Akt1 kinase"</li>
          <li>Curated kinase-substrate relationships</li>
          <li>Phosphorylation site details</li>
        </ul>
      </div>
      
      <div class="feature-card motif">
        <h3>Motif & Kinase Prediction</h3>
        <ul class="feature-list">
          <li>Sequence motifs: "ARAX*pTPQ"</li>
          <li>PhosphoSite kinase predictions</li>
          <li>Confidence scores and rankings</li>
        </ul>
      </div>
      
      <div class="feature-card context">
        <h3>Advanced Features</h3>
        <ul class="feature-list">
          <li>Intelligent autocomplete suggestions</li>
          <li>Multi-database integration</li>
          <li>Export and sharing options</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script needed for this component
</script>

<style scoped>
.features-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.feature-card {
  padding: 12px;
  border-left: 4px solid #dee2e6;
  background: #f8f9fa;
  border-radius: 8px;
}

.feature-card.protein { border-left-color: #007bff; }
.feature-card.modification { border-left-color: #28a745; }
.feature-card.ptm { border-left-color: #ffc107; }
.feature-card.substrate { border-left-color: #dc3545; }
.feature-card.motif { border-left-color: #6f42c1; }
.feature-card.context { border-left-color: #17a2b8; }

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 0.9rem;
  font-weight: 600;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  margin-bottom: 4px;
  color: #495057;
  padding-left: 20px;
  position: relative;
  font-size: 0.8rem;
  line-height: 1.4;
}

.feature-list li:before {
  content: "•";
  color: #6c757d;
  font-weight: bold;
  position: absolute;
  left: 0;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}
</style>