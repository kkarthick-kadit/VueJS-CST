<template>
  <div class="search-container">
    <form class="search-form" @submit.prevent="handleSubmit">
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="Search proteins, PTMs, kinase substrates, or sequence motifs..."
        autocomplete="off"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <button type="submit" class="search-btn" :disabled="isLoading">
        {{ isLoading ? 'Searching...' : 'Search' }}
      </button>
    </form>
    
    <div class="search-options">
      <label for="resultLimit">Results per page:</label>
      <select id="resultLimit" v-model="resultLimit" @change="handleOptionsChange">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
    
    <AutocompleteContainer
      :suggestions="autocompleteResults"
      :show="showAutocomplete"
      @select="selectSuggestion"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AutocompleteContainer from './AutocompleteContainer.vue';
import type { AutocompleteSuggestion } from '../types';

interface Props {
  searchQuery: string;
  resultLimit: number;
  autocompleteResults: AutocompleteSuggestion[];
  showAutocomplete: boolean;
  isLoading: boolean;
}

interface Emits {
  (e: 'update:searchQuery', value: string): void;
  (e: 'update:resultLimit', value: number): void;
  (e: 'search', query: string): void;
  (e: 'autocomplete', query: string): void;
  (e: 'selectSuggestion', suggestion: string, suggester?: string): void;
  (e: 'hideAutocomplete'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const searchQuery = ref(props.searchQuery);
const resultLimit = ref(props.resultLimit);

let debounceTimer: number | null = null;

watch(() => props.searchQuery, (newValue) => {
  searchQuery.value = newValue;
});

watch(() => props.resultLimit, (newValue) => {
  resultLimit.value = newValue;
});

watch(searchQuery, (newValue) => {
  emit('update:searchQuery', newValue);
});

watch(resultLimit, (newValue) => {
  emit('update:resultLimit', newValue);
});

const handleSubmit = () => {
  emit('search', searchQuery.value);
};

const handleInput = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  
  debounceTimer = setTimeout(() => {
    if (searchQuery.value.trim().length >= 2) {
      emit('autocomplete', searchQuery.value);
    }
  }, 300);
};

const handleFocus = () => {
  if (searchQuery.value.trim().length >= 2) {
    emit('autocomplete', searchQuery.value);
  }
};

const handleBlur = () => {
  setTimeout(() => {
    emit('hideAutocomplete');
  }, 150);
};

const handleOptionsChange = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value);
  }
};

const selectSuggestion = (suggestion: string, suggester?: string) => {
  emit('selectSuggestion', suggestion, suggester);
};
</script>

<style scoped>
.search-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto 40px;
}

.search-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
}

.search-btn {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: #0056b3;
}

.search-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.search-options {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.search-options label {
  color: #6c757d;
  font-size: 14px;
}

.search-options select {
  padding: 6px 12px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  font-size: 14px;
}

@media (max-width: 768px) {
  .search-form {
    flex-direction: column;
  }
  
  .search-options {
    flex-direction: column;
    gap: 10px;
  }
}
</style>