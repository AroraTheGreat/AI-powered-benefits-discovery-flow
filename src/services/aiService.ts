import type { ActionStep, Benefit, BenefitCategory } from "../types/benefits";

// Simple mock benefit data
const BENEFITS: Benefit[] = [
  {
    id: "b1",
    category: "Dental",
    name: "Dental OPD Cover",
    coverageSummary: "Up to ₹5,000 per year, 80% of bill",
    description: "Covers dental consultations and basic procedures at network clinics.",
  },
  {
    id: "b2",
    category: "Mental Health",
    name: "Mental Wellness Sessions",
    coverageSummary: "6 free sessions per year",
    description: "Online or in-person counselling sessions with certified psychologists.",
  },
  {
    id: "b3",
    category: "Vision",
    name: "Eye Check-up & Lenses",
    coverageSummary: "Annual check-up + lenses discount",
    description: "Annual vision screening and discounts on spectacles or lenses.",
  },
  {
    id: "b4",
    category: "General Health",
    name: "General Physician Consultation",
    coverageSummary: "Unlimited teleconsultations",
    description: "Talk to a doctor online for common health concerns.",
  },
];

function mockDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function classifyNeed(
  userText: string
): Promise<BenefitCategory> {
  // Simulate AI processing
  await mockDelay(800);

  const text = userText.toLowerCase();

  if (text.includes("tooth") || text.includes("teeth") || text.includes("gum")) {
    return "Dental";
  }

  if (
    text.includes("anxiety") ||
    text.includes("stress") ||
    text.includes("depress") ||
    text.includes("sleep") ||
    text.includes("mental")
  ) {
    return "Mental Health";
  }

  if (text.includes("eye") || text.includes("blur") || text.includes("vision")) {
    return "Vision";
  }

  return "General Health";
}

export async function getBenefitsForCategory(
  category: BenefitCategory
): Promise<Benefit[]> {
  await mockDelay(400);
  return BENEFITS.filter((b) => b.category === category || category === "General Health");
}

export async function generateActionPlan(
  benefit: Benefit,
  userText: string
): Promise<ActionStep[]> {
  await mockDelay(700);

  // Very simple mock logic; in interview you can say this is standing in for an LLM call
  return [
    {
      id: 1,
      text: `Confirm your symptoms: "${userText.slice(0, 80)}..." and check if they match the coverage of "${benefit.name}".`,
    },
    {
      id: 2,
      text: "Open your benefits app/portal and locate this benefit under the Health Benefits section.",
    },
    {
      id: 3,
      text: "Use the listed network providers or booking link to schedule an appointment and carry your employee ID/card.",
    },
  ];
}
