import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ActionStep, Benefit, BenefitCategory } from "../types/benefits";
import {
  classifyNeed,
  generateActionPlan,
  getBenefitsForCategory,
} from "../services/aiService";

type Step = 1 | 2 | 3 | 4;

interface BenefitsFlowState {
  step: Step;
  userNeed: string;
  category: BenefitCategory | null;
  benefits: Benefit[];
  selectedBenefit: Benefit | null;
  actionPlan: ActionStep[];
  isLoading: boolean;
  error: string | null;
}

interface BenefitsFlowContextValue extends BenefitsFlowState {
  setUserNeed(value: string): void;
  goToStep(step: Step): void;
  runClassification(): Promise<void>;
  selectBenefit(benefit: Benefit): Promise<void>;
  reset(): void;
}

const BenefitsFlowContext = createContext<BenefitsFlowContextValue | undefined>(
  undefined
);

export const BenefitsFlowProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<Step>(1);
  const [userNeed, setUserNeed] = useState("");
  const [category, setCategory] = useState<BenefitCategory | null>(null);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [actionPlan, setActionPlan] = useState<ActionStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goToStep = (next: Step) => {
    setStep(next);
    setError(null);
  };

  const runClassification = async () => {
    if (!userNeed.trim()) {
      setError("Please describe what’s troubling you.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const detectedCategory = await classifyNeed(userNeed);
      setCategory(detectedCategory);
      const benefitsForCategory = await getBenefitsForCategory(detectedCategory);
      setBenefits(benefitsForCategory);
      setSelectedBenefit(null);
      setActionPlan([]);
      setStep(2);
    } catch (e) {
      setError("Something went wrong while analysing your need. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectBenefit = async (benefit: Benefit) => {
    setIsLoading(true);
    setError(null);
    try {
      setSelectedBenefit(benefit);
      const steps = await generateActionPlan(benefit, userNeed);
      setActionPlan(steps);
      setStep(4);
    } catch (e) {
      setError("Could not generate an action plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setUserNeed("");
    setCategory(null);
    setBenefits([]);
    setSelectedBenefit(null);
    setActionPlan([]);
    setError(null);
    setIsLoading(false);
  };

  const value: BenefitsFlowContextValue = {
    step,
    userNeed,
    category,
    benefits,
    selectedBenefit,
    actionPlan,
    isLoading,
    error,
    setUserNeed,
    goToStep,
    runClassification,
    selectBenefit,
    reset,
  };

  return (
    <BenefitsFlowContext.Provider value={value}>
      {children}
    </BenefitsFlowContext.Provider>
  );
};

export const useBenefitsFlow = () => {
  const ctx = useContext(BenefitsFlowContext);
  if (!ctx) {
    throw new Error("useBenefitsFlow must be used inside BenefitsFlowProvider");
  }
  return ctx;
};
