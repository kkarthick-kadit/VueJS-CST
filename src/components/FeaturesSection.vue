<template>
  <div class="features-section">
    <div class="features-grid">
      <div class="feature-card protein">
        <h3>Protein & Alias Search</h3>
        <ul class="feature-list">
          <li>Gene symbols: "ERBB1", "Akt", "EGFR"</li>
          <li>Aliases: "Protein kinase B" → "AKT"</li>
  
        </ul>
      </div>
      
      <div class="feature-card modification">
        <h3>Modification Search</h3>
        <ul class="feature-list">
          <li>Use "modification" keyword with protein name</li>
          <li>Example: "p53 modification"</li>
          <li>Returns all PTM types for the protein and for the gene symbols that have the protein as alias</li>
        </ul>
      </div>
      
      <div class="feature-card ptm">
        <h3>PTM-Specific Query</h3>
        <ul class="feature-list">
          <li>Site-specific queries: "What is the Function of S473 on AKT"</li>
          <li>Detailed modification site data</li>
          
        </ul>
      </div>
      
      <div class="feature-card substrate">
        <h3>Kinase-Substrate Search</h3>
        <ul class="feature-list">
          <li>Example: "substrates of Akt1 kinase"</li>
          <li>Curated kinase-substrate relationships and Phosphorylation site details</li>
          <li>Returns substrate networks based on "Substrates of" Key</li>
        </ul>
      </div>
      
      <div class="feature-card motif">
        <h3>Motif & Kinase Prediction</h3>
        <ul class="feature-list">
          <li>Motif searches Eg: "PSVEPPLs*QETFSDL"</li>
          <li>PhosphoSite kinase predictions</li>
          <li>Confidence scores and rankings</li>
        </ul>
      </div>
      
      <div class="feature-card context">
        <h3>Biological Context</h3>
        <ul class="feature-list">
          <li>Eg: "What are the PTMs in breast cancer"</li>
          <li>Pathway & disease enrichment</li>
          <li>Supports cell line / tissue-specific queries</li>
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
  background: var(--white);
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
  border-left: 4px solid var(--border-grey);
  background: var(--light-grey);
  border-radius: 8px;
}

.feature-card.protein { border-left-color: var(--primary-blue); }
.feature-card.modification { border-left-color: var(--accent-blue); }
.feature-card.ptm { border-left-color: var(--secondary-blue); }
.feature-card.substrate { border-left-color: var(--secondary-blue); }
.feature-card.motif { border-left-color: var(--primary-blue); }
.feature-card.context { border-left-color: var(--accent-blue); }

.feature-card h3 {
  color: var(--primary-blue);
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
  color: var(--secondary-grey);
  padding-left: 20px;
  position: relative;
  font-size: 0.8rem;
  line-height: 1.4;
}

.feature-list li:before {
  content: "•";
  color: var(--secondary-grey);
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