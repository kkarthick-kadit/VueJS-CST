<template>
  <div class="container">
    <div class="header">
      <h1>LLM-Powered PSP Search</h1>
      <p>Advanced search for proteins, PTMs, motifs, and kinase-substrate relationships</p>
    </div>

    <SearchForm
      v-model:searchQuery="searchQuery"
      v-model:resultLimit="resultLimit"
      :autocompleteResults="autocompleteResults"
      :showAutocomplete="showAutocomplete"
      :isLoading="isLoading"
      @search="search"
      @autocomplete="getAutocomplete"
      @selectSuggestion="selectSuggestion"
      @hideAutocomplete="hideAutocomplete"
    />

    <FeaturesSection />

    <ResultsContainer
      :searchQuery="searchQuery"
      :results="results"
      :resultCount="resultCount"
      :resultType="resultType"
      :resultTypeLabel="resultTypeLabel"
      :proteinName="proteinName"
      :modificationType="modificationType"
      :isLoading="isLoading"
      :error="error"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useSearch } from './composables/useSearch';
import SearchForm from './components/SearchForm.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import ResultsContainer from './components/ResultsContainer.vue';

const {
  searchQuery,
  results,
  resultCount,
  resultType,
  resultTypeLabel,
  resultLimit,
  proteinName,
  modificationType,
  autocompleteResults,
  showAutocomplete,
  isLoading,
  error,
  search,
  getAutocomplete,
  selectSuggestion,
  hideAutocomplete,
} = useSearch();

// Handle clicking outside to hide autocomplete
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.search-container')) {
    hideAutocomplete();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 2.5rem;
  font-weight: 600;
}

.header p {
  color: #6c757d;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .header h1 {
    font-size: 2rem;
  }
}
</style>