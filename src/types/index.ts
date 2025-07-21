export interface SearchResult {
  // Protein search results
  synonym?: string;
  text?: string;
  metadata?: {
    Source?: string;
    gene?: string;
    CST_ID?: number;
    Reference?: string;
    Organism?: string;
    Gene_Symbols?: string;
    modification_type?: string;
    residue?: string;
    residue_number?: number;
    motif_nmer?: string;
  };
  score?: number;
  
  // Substrate results
  Sites?: SubstrateSite[];
  
  // Motif library results
  family?: string;
  geneName?: string;
  name?: string;
  percentile?: number;
  percentileRank?: number;
  scoreRank?: number;
  uniprotId?: string;
  displayName?: string;
  
  // Motif neo results
  Method?: string;
  CstId?: number;
  UniprotID?: string;
  Symbol?: string;
  
  // Modification results
  synonyms?: string;
  Modifcation_nmer?: boolean;
  
  // QnA results
}

export interface SubstrateProtein {
  Protein: string;
  Link?: string;
}

export interface AutocompleteSuggestion {
  text: string;
  suggester?: string;
  type?: 'header' | 'suggestion' | 'loading'; // Added loading type
}

export interface AutocompleteResponse {
  results: AutocompleteSuggestion[] | {
    "Gene Symbol Suggestions"?: AutocompleteSuggestion[];
    "Gene Name Suggestions"?: AutocompleteSuggestion[];
    "Alias Symbol Suggestions"?: AutocompleteSuggestion[];
    'Group Name Suggestions'?: AutocompleteSuggestion[];
    'Previous Symbol Suggestions'?: AutocompleteSuggestion[];
  };
  type: 'Modification_suggestions' | 'suggestions';
}

export interface SubstrateSite {
  SubstrateGeneSymbol: string;
  SubstrateUniProtID: string;
  Residue: string;
  ResidueNumber: number;
  Nmer: string;
  PositionInNmer: number;
  EvidenceType: string;
  ModSiteLink: string;
  Link: string;
}

export interface SearchResponse {
  results: SearchResult[];
  result_type: string;
  query: string;
  count: number;
  protein_name?: string;
  modification_type?: string;
}

export type ResultType = 'protein' | 'substrate' | 'motif_library' | 'motif_neo' | 'modification_protein' | 'QnA';