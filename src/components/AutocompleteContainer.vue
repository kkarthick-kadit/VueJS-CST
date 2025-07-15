<template>
  <div
    v-if="show"
    class="autocomplete-container"
  >
    <div
      v-for="(suggestion, index) in suggestions"
      :key="index"
      :class="['autocomplete-item', suggestion.type]"
      @mousedown.prevent
      @click="handleClick(suggestion)"
    >
      {{ suggestion.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AutocompleteSuggestion } from '../types';

interface Props {
  suggestions: AutocompleteSuggestion[];
  show: boolean;
}

interface Emits {
  (e: 'select', suggestion: string, suggester?: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const handleClick = (suggestion: AutocompleteSuggestion) => {
  if (suggestion.type !== 'header') {
    emit('select', suggestion.text, suggestion.suggester);
  }
};
</script>

<style scoped>
.autocomplete-container {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
}

.autocomplete-item {
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #f8f9fa;
  font-size: 14px;
}

.autocomplete-item:hover {
  background-color: #f8f9fa;
}

.autocomplete-item.header {
  background-color: #e9ecef;
  font-weight: 600;
  cursor: default;
  padding: 6px 12px;
  font-size: 13px;
  margin-bottom: 2px;
}

.autocomplete-item.header:hover {
  background-color: #e9ecef;
}
</style>