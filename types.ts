
export interface UserData {
  phoneNumber: string;
  country: string;
  language: string;
  isAuthenticated: boolean;
}

export enum DetectionResult {
  SPAM = 'SPAM',
  HAM = 'HAM',
  PENDING = 'PENDING',
  ERROR = 'ERROR'
}

export interface AnalysisOutput {
  classification: DetectionResult;
  confidence: number;
  reasoning: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}
