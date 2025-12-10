import React from "react";
import { useBenefitsFlow } from "../context/BenefitsFlowContext";
import { Button } from "../components/common/Button";
import { Loader } from "../components/common/Loader";
import { ErrorState } from "../components/common/ErrorState";

export const ActionPlanStep: React.FC = () => {
  const {
    selectedBenefit,
    actionPlan,
    isLoading,
    error,
    goToStep,
    reset,
  } = useBenefitsFlow();

  if (!selectedBenefit) {
    return (
      <div className="step-card">
        <p>No benefit selected yet.</p>
        <Button variant="secondary" onClick={() => goToStep(2)}>
          Back to benefits
        </Button>
      </div>
    );
  }

  return (
    <div className="step-card">
      <h2>Your 3-step action plan</h2>
      <p className="step-subtitle">
        Here&apos;s how you can practically use:
        <br />
        <strong>{selectedBenefit.name}</strong>
      </p>

      {error && <ErrorState message={error} />}
      {isLoading && <Loader />}

      <ol className="plan-list">
        {actionPlan.map((step) => (
          <li key={step.id}>{step.text}</li>
        ))}
      </ol>

      <div className="step-actions">
        <Button variant="secondary" onClick={() => goToStep(2)}>
          Choose another benefit
        </Button>
        <Button onClick={reset}>Start over</Button>
      </div>
    </div>
  );
};
