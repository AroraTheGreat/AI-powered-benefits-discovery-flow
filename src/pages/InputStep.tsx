import React from "react";
import { useBenefitsFlow } from "../context/BenefitsFlowContext";
import { Button } from "../components/common/Button";
import { Loader } from "../components/common/Loader";
import { ErrorState } from "../components/common/ErrorState";

export const InputStep: React.FC = () => {
  const { userNeed, setUserNeed, runClassification, isLoading, error } =
    useBenefitsFlow();

  return (
    <div className="step-card">
      <h2>Tell us what&apos;s troubling you</h2>
      <p className="step-subtitle">
        You can type in simple language. For example:
        <br />
        “I&apos;ve had tooth pain for 3 days, it hurts when I eat.”
      </p>

      <textarea
        value={userNeed}
        onChange={(e) => setUserNeed(e.target.value)}
        placeholder="Describe your health concern here..."
        className="need-input"
        rows={5}
      />

      {error && <ErrorState message={error} />}

      <div className="step-actions">
        <Button onClick={runClassification} disabled={isLoading}>
          {isLoading ? "Analyzing…" : "Find my benefits"}
        </Button>
      </div>

      {isLoading && (
        <div className="step-footer">
          <Loader />
        </div>
      )}
    </div>
  );
};
