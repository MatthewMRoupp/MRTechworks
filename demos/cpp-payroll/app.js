// demos/cpp-payroll/app.js

const resultBox = document.getElementById("result");
const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.disabled = true;

let calculateGrossPay = null;

// createPayrollModule comes from the generated payroll.js file.
createPayrollModule().then((Module) => {
  calculateGrossPay = Module.cwrap(
    "calculateGrossPay",
    "number",
    ["number", "number"]
  );

  resultBox.textContent = "C++ module loaded. Enter values and calculate pay.";
  calculateBtn.disabled = false;
});

calculateBtn.addEventListener("click", () => {
  const hours = Number(document.getElementById("hours").value);
  const rate = Number(document.getElementById("rate").value);

  if (!calculateGrossPay) {
    resultBox.textContent = "C++ module is still loading.";
    return;
  }

  if (Number.isNaN(hours) || Number.isNaN(rate)) {
    resultBox.textContent = "Please enter valid numbers.";
    return;
  }

  const grossPay = calculateGrossPay(hours, rate);

  resultBox.innerHTML = `
    <strong>Gross Pay:</strong> $${grossPay.toFixed(2)}
  `;
});
