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
      <!-- Results per page - only show for protein results -->
      <div v-if="resultType === 'protein'" class="option-group">
        <label for="resultLimit">Results per page:</label>
        <select id="resultLimit" v-model="resultLimit" @change="handleOptionsChange">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      
      <!-- Detail level toggle - only show for modification searches -->
      <div v-if="isModificationSearch" class="option-group">
        <label>Detail Level:</label>
        <div class="toggle-group">
          <button
            type="button"
            :class="['toggle-btn', { active: detailLevel === 'high_level' }]"
            @click="detailLevel = 'high_level'"
          >
            High Level
          </button>
          <button
            type="button"
            :class="['toggle-btn', { active: detailLevel === 'site_level' }]"
            @click="detailLevel = 'site_level'"
          >
            Detail Level
          </button>
        </div>
      </div>
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
  resultType: string;
  isModificationSearch: boolean;
  detailLevel: 'high_level' | 'site_level';
  autocompleteResults: AutocompleteSuggestion[];
  showAutocomplete: boolean;
  isLoading: boolean;
  isAutocompleteLoading: boolean;
}

interface Emits {
  (e: 'update:searchQuery', value: string): void;
  (e: 'update:resultLimit', value: number): void;
  (e: 'setDetailLevel', level: 'high_level' | 'site_level'): void;
  (e: 'search', query: string): void;
  (e: 'autocomplete', query: string): void;
  (e: 'selectSuggestion', suggestion: string, suggester?: string): void;
  (e: 'hideAutocomplete'): void;
  (e: 'resetModificationSearch'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const searchQuery = ref(props.searchQuery);
const resultLimit = ref(props.resultLimit);
const detailLevel = ref(props.detailLevel);

let debounceTimer: number | null = null;

watch(() => props.searchQuery, (newValue) => {
  searchQuery.value = newValue;
});

watch(() => props.resultLimit, (newValue) => {
  resultLimit.value = newValue;
});

watch(() => props.detailLevel, (newValue) => {
  detailLevel.value = newValue;
});

watch(searchQuery, (newValue) => {
  emit('update:searchQuery', newValue);
});

watch(resultLimit, (newValue) => {
  emit('update:resultLimit', newValue);
});

watch(detailLevel, (newValue) => {
  emit('setDetailLevel', newValue);
});

const handleSubmit = () => {
  emit('resetModificationSearch');
  emit('search', searchQuery.value);
};

const handleInput = () => {
  // Reset modification search when user types different query
  emit('resetModificationSearch');
  
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
  border: 2px solid var(--border-grey);
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-blue);
}

.search-btn {
  padding: 12px 24px;
  background-color: var(--primary-blue);
  color: var(--white);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: var(--accent-blue);
}

.search-btn:disabled {
  background-color: var(--secondary-grey);
  cursor: not-allowed;
}

.search-options {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.option-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-options label {
  color: var(--secondary-grey);
  font-size: 14px;
}

.search-options select {
  padding: 6px 12px;
  border: 1px solid var(--border-grey);
  border-radius: 4px;
  font-size: 14px;
}

.toggle-group {
  display: flex;
  border: 1px solid var(--border-grey);
  border-radius: 6px;
  overflow: hidden;
}

.toggle-btn {
  padding: 6px 12px;
  border: none;
  background-color: var(--white);
  color: var(--secondary-grey);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  border-right: 1px solid var(--border-grey);
}

.toggle-btn:last-child {
  border-right: none;
}

.toggle-btn:hover {
  background-color: var(--light-grey);
}

.toggle-btn.active {
  background-color: var(--primary-blue);
  color: var(--white);
}

@media (max-width: 768px) {
  .search-form {
    flex-direction: column;
  }
  
  .search-options {
    justify-content: center;
    gap: 10px;
  }
  
  .option-group {
    flex-direction: column;
    gap: 5px;
  }
}
</style>