export type BenefitCategory =
  | "Dental"
  | "Mental Health"
  | "Vision"
  | "General Health";

export interface Benefit {
  id: string;
  category: BenefitCategory;
  name: string;
  coverageSummary: string;
  description: string;
}

export interface ActionStep {
  id: number;
  text: string;
}
