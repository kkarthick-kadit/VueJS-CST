import type { AutocompleteResponse, SearchResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000'; // Replace with your API URL

export class ApiService {
  static async search(query: string, k: number = 10, detailLevel?: string): Promise<SearchResponse> {
    const formData = new FormData();
    formData.append('query', query);
    formData.append('k', k.toString());
    
    if (detailLevel) {
      formData.append('detail_level', detailLevel);
    }
    
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  static async getAutocomplete(query: string): Promise<AutocompleteResponse> {
    const response = await fetch(`${API_BASE_URL}/suggest?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`Autocomplete failed: ${response.statusText}`);
    }
    
    return response.json();
  }
}