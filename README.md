# AI-Powered Benefits Discovery Flow

Frontend assignment for **Plum – SDE Intern** role.

This project helps employees understand **which health benefit applies to their problem** and explains **how to use it**, using an AI-powered flow.

---

## 🚀 What does this project do?

Employees often describe health issues in simple language but don’t know:
- which benefit applies
- how to actually use that benefit

This app solves that problem in **3 simple steps**:

1. User describes their health concern (free text)
2. AI classifies the concern into a benefit category
3. App shows relevant benefits and generates a 3-step action plan

---

## 🧭 Application Flow

### Step 1 – Describe the problem
User enters a health concern like:
> “I have tooth pain for 3 days”

### Step 2 – Category & benefits
The app:
- Detects the category (Dental / Mental Health / Vision / General Health)
- Shows benefit cards with coverage information

### Step 3 – Action plan
When a benefit is selected, the app generates:
- A **3-step practical action plan**
- Explains how the employee can use the benefit

---

## 🛠️ Tech Stack

- **React + TypeScript**
- **Vite**
- **React Context API** (global state management)
- **Mock AI service** (simulates LLM calls)
- CSS for styling

---

## 📂 Project Structure

## Application Flow

### Step 1 – Describe the problem
![Step 1](screenshots/Step1.png)

User enters a health concern in simple language.

---

### Step 2 – Category & benefits
![Step 2](screenshots/Step2.png)

The app detects the benefit category and shows relevant benefits.

---

### Step 3 – Action plan
![Step 3](screenshots/Step3.png)

The app generates a clear 3-step action plan explaining how to use the benefit.

