interface Bleu {
  bleu: number;
  precisions: number[];
  brevity_penalty: number;
  length_ratio: number;
  translation_length: number;
  reference_length: number;
}

interface Bert {
  precision: number[];
  recall: number[];
  f1: number[];
  hashcode: string;
}

interface Rouge {
  rouge1: number;
  rouge2: number;
  rougeL: number;
  rougeLsum: number;
}

export interface TestInterface {
  llm: string;
  bleu: Bleu;
  bert: Bert;
  rouge: Rouge;
}
