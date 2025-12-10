import "./App.css";
import { BenefitsFlowProvider, useBenefitsFlow } from "./context/BenefitsFlowContext";
import { InputStep } from "./pages/InputStep";
import { CategoryAndBenefitsStep } from "./pages/CategoryAndBenefitsStep";
import { ActionPlanStep } from "./pages/ActionPlanStep";

function StepContent() {
  const { step } = useBenefitsFlow();

  if (step === 1) return <InputStep />;
  if (step === 2 || step === 3) return <CategoryAndBenefitsStep />;
  return <ActionPlanStep />;
}

function Stepper() {
  const { step } = useBenefitsFlow();
  const labels = ["Describe need", "Category & benefits", "Action plan"];

  return (
    <div className="stepper">
      {labels.map((label, index) => {
        const num = index + 1;
        const isActive = step === num || (step === 4 && num === 3);
        const isCompleted = step > num || (step === 4 && num < 3);

        return (
          <div key={label} className="stepper-item">
            <div
              className={[
                "stepper-circle",
                isCompleted ? "completed" : "",
                isActive ? "active" : "",
              ].join(" ")}
            >
              {num}
            </div>
            <span className="stepper-label">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function AppInner() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>AI-powered benefits discovery</h1>
        <p>Help employees map their health needs to the right benefits.</p>
      </header>
      <Stepper />
      <StepContent />
      <footer className="app-footer">
        <span>Plum SDE Intern Frontend Assignment · Built by Sarthak</span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BenefitsFlowProvider>
      <AppInner />
    </BenefitsFlowProvider>
  );
}

export default App;
