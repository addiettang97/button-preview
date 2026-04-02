const output = document.getElementById("console-output");
const planStatus = document.getElementById("plan-status");
const tabStatus = document.getElementById("tab-status");
const buttonStatus = document.getElementById("button-status");
const stepStatus = document.getElementById("step-status");

const interactivePlanButtons = Array.from(
  document.querySelectorAll('[data-plan]:not(:disabled)')
);
const tabButtons = Array.from(
  document.querySelectorAll('.tab-row .tab-chip:not(:disabled)')
);
const actionButtons = Array.from(
  document.querySelectorAll('.button-grid .btn:not(:disabled)')
);

let currentStep = 1;
const maxStep = 3;

function writeLog(message) {
  output.textContent = message;
}

function syncStepper() {
  const prev = document.getElementById("prev-step");
  const next = document.getElementById("next-step");

  prev.disabled = currentStep === 1;
  next.disabled = currentStep === maxStep;

  prev.classList.toggle("is-disabled", prev.disabled);
  next.classList.toggle("is-disabled", next.disabled);

  stepStatus.textContent = `步骤 ${currentStep} / ${maxStep}`;
}

interactivePlanButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedGroup = button.closest(".plan-grid");
    const groupButtons = Array.from(
      selectedGroup.querySelectorAll(".plan-card:not(:disabled)")
    );

    groupButtons.forEach((item) => {
      item.classList.remove("is-selected");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("is-selected");
    button.setAttribute("aria-pressed", "true");

    const label = button.querySelector("strong").textContent.trim();
    planStatus.textContent = `当前: ${label}`;
    writeLog(`已切换套餐配置为“${label}”。`);
  });
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");

    tabStatus.textContent = `当前: ${button.textContent.trim()}`;
    writeLog(`选项卡状态已切换到 ${button.textContent.trim()}。`);
  });
});

actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const message = button.dataset.message || `${button.textContent.trim()} 已触发`;
    buttonStatus.textContent = message;
    writeLog(message);
  });
});

document.getElementById("prev-step").addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep -= 1;
    syncStepper();
    writeLog(`回到步骤 ${currentStep}。`);
  }
});

document.getElementById("next-step").addEventListener("click", () => {
  if (currentStep < maxStep) {
    currentStep += 1;
    syncStepper();
    writeLog(`进入步骤 ${currentStep}。`);
  }
});

syncStepper();
