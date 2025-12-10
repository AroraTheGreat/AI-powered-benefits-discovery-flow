import React from "react";
import { useBenefitsFlow } from "../context/BenefitsFlowContext";
import { Button } from "../components/common/Button";
import { Loader } from "../components/common/Loader";
import { ErrorState } from "../components/common/ErrorState";

export const CategoryAndBenefitsStep: React.FC = () => {
  const {
    category,
    benefits,
    goToStep,
    selectBenefit,
    isLoading,
    error,
    userNeed,
  } = useBenefitsFlow();

  if (!category) {
    return (
      <div className="step-card">
        <p>We couldn&apos;t find a category yet. Please go back and try again.</p>
        <Button variant="secondary" onClick={() => goToStep(1)}>
          Back to need input
        </Button>
      </div>
    );
  }

  return (
    <div className="step-card">
      <h2>We think this is related to</h2>
      <div className="category-pill">{category}</div>

      <p className="step-subtitle">
        Based on your description:
        <br />
        <span className="user-need-quote">&ldquo;{userNeed}&rdquo;</span>
      </p>

      <h3 className="section-title">Benefits that can help you</h3>

      {error && <ErrorState message={error} />}
      {isLoading && <Loader />}

      <div className="benefits-grid">
        {benefits.map((b) => (
          <button
            key={b.id}
            className="benefit-card"
            onClick={() => selectBenefit(b)}
            disabled={isLoading}
          >
            <h4>{b.name}</h4>
            <p className="benefit-coverage">{b.coverageSummary}</p>
            <p className="benefit-description">{b.description}</p>
            <span className="benefit-cta">See how to use this →</span>
          </button>
        ))}
      </div>

      <div className="step-actions">
        <Button variant="secondary" onClick={() => goToStep(1)}>
          Go back & edit need
        </Button>
      </div>
    </div>
  );
};
