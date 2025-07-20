import { ref, computed } from 'vue';
import { ApiService } from '../services/api';
import type { SearchResult, AutocompleteSuggestion, ResultType, AutocompleteResponse } from '../types';

export function useSearch() {
  const searchQuery = ref('');
  const results = ref<SearchResult[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const resultType = ref<ResultType>('protein');
  const resultCount = ref(0);
  const resultLimit = ref(10);
  const proteinName = ref('');
  const modificationType = ref('');
  
  const autocompleteResults = ref<AutocompleteSuggestion[]>([]);
  const showAutocomplete = ref(false);
  const isSearching = ref(false);
  
  const resultTypeLabel = computed(() => {
    switch (resultType.value) {
      case 'modification_protein':
        return 'Protein Modifications';
      case 'motif_library':
        return 'Motif Library Results';
      case 'motif_neo':
        return 'Motif Neo Results';
      case 'substrate':
        return 'Kinase Substrates';
      case 'QnA':
        return 'Q&A Results';
      default:
        return 'Proteins & Aliases';
    }
  });
  
  const search = async (query: string = searchQuery.value, useDetailLevel: boolean = false) => {
    if (!query.trim()) return;
    
    isLoading.value = true;
    isSearching.value = true;
    error.value = null;
    hideAutocomplete();
    
    try {
      const detailLevel = useDetailLevel ? 'site_level' : undefined;
      const response = await ApiService.search(query, resultLimit.value, detailLevel);
      
      results.value = response.results;
      resultType.value = response.result_type as ResultType;
      resultCount.value = response.count;
      proteinName.value = response.protein_name || '';
      modificationType.value = response.modification_type || '';
      searchQuery.value = query;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Search error occurred';
      results.value = [];
    } finally {
      isLoading.value = false;
      isSearching.value = false;
    }
  };
  
  const getAutocomplete = async (query: string) => {
    if (isSearching.value || query.length < 2) {
      hideAutocomplete();
      return;
    }
    
    try {
      const response = await ApiService.getAutocomplete(query);
      const suggestions: AutocompleteSuggestion[] = [];
      
      if (response.type === 'Modification_suggestions') {
        // Handle modification suggestions
        if (Array.isArray(response.results)) {
          suggestions.push(...response.results.map(item => ({
            ...item,
            type: 'suggestion' as const
          })));
        }
      } else if (response.type === 'suggestions') {
        // Handle gene symbol and name suggestions with headers
        const results = response.results as {
          "Gene Symbol Suggestions"?: AutocompleteSuggestion[];
          "Gene Name Suggestions"?: AutocompleteSuggestion[];
          "Alias Symbol Suggestions"?: AutocompleteSuggestion[];
          'Group Name Suggestions'?: AutocompleteSuggestion[];
          'Previous Symbol Suggestions'?: AutocompleteSuggestion[];
        };
        
        // Add Gene Symbol Suggestions with header
        if (results["Gene Symbol Suggestions"]?.length) {
          suggestions.push({ text: 'Gene Symbols', type: 'header' });
          suggestions.push(...results["Gene Symbol Suggestions"].map(item => ({
            ...item,
            type: 'suggestion' as const
          })));
        }
        
        // Add Gene Name Suggestions with header
        if (results["Gene Name Suggestions"]?.length) {
          suggestions.push({ text: 'Gene Names', type: 'header' });
          suggestions.push(...results["Gene Name Suggestions"].map(item => ({
            ...item,
            type: 'suggestion' as const
          })));
        }
        
        // Add Alias Symbol Suggestions with header
        if (results["Alias Symbol Suggestions"]?.length) {
          suggestions.push({ text: 'Alias Symbols', type: 'header' });
          suggestions.push(...results["Alias Symbol Suggestions"].map(item => ({
            ...item,
            type: 'suggestion' as const
          })));
        }
        
        // Add Previous Symbol Suggestions with header
        if (results["Previous Symbol Suggestions"]?.length) {
          suggestions.push({ text: 'Previous Symbols', type: 'header' });
          suggestions.push(...results["Previous Symbol Suggestions"].map(item => ({
            ...item,
            type: 'suggestion' as const
          })));
        }
      }
      
      autocompleteResults.value = suggestions;
      showAutocomplete.value = suggestions.length > 0;
    } catch (err) {
      hideAutocomplete();
    }
  };
  
  const selectSuggestion = async (suggestion: string, suggester?: string) => {
    searchQuery.value = suggestion;
    hideAutocomplete();
    isSearching.value = true;
    isLoading.value = true;
    
    try {
      // Check if it's a modification suggestion (contains modification types)
      const modificationTypes = ['METHYLATION', 'PHOSPHORYLATION', 'ACETYLATION', 'UBIQUITYLATION', 'SUMOYLATION', 'MONO-METHYLATION', 'DI-METHYLATION', 'TRI-METHYLATION', 'O-GlcNAc'];
      const isModificationSuggestion = modificationTypes.some(type => suggestion.includes(type));
      
      if (isModificationSuggestion) {
        // Use site_level detail for modification suggestions
        await search(suggestion, true);
      } else {
        // Regular search for gene symbol/name suggestions
        await search(suggestion, false);
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Search error occurred';
    } finally {
      isLoading.value = false;
      isSearching.value = false;
    }
  };
  
  const hideAutocomplete = () => {
    showAutocomplete.value = false;
    autocompleteResults.value = [];
  };
  
  const clearResults = () => {
    results.value = [];
    resultCount.value = 0;
    error.value = null;
    proteinName.value = '';
    modificationType.value = '';
  };
  
  return {
    searchQuery,
    results,
    isLoading,
    error,
    resultType,
    resultCount,
    resultLimit,
    proteinName,
    modificationType,
    autocompleteResults,
    showAutocomplete,
    isSearching,
    resultTypeLabel,
    search,
    getAutocomplete,
    selectSuggestion,
    hideAutocomplete,
    clearResults,
  };
}