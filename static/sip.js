function selectCalculation(selectedValue) {
    const monthlyInvestmentInput = document.getElementById("monthly-investment");
    const expectedReturnInput = document.getElementById("expected-return");
    const investmentDurationInput = document.getElementById("investment-duration");
    const futureValueInput = document.getElementById("future-value");

    // Reset input fields
    monthlyInvestmentInput.value = '';
    expectedReturnInput.value = '';
    investmentDurationInput.value = '';
    futureValueInput.value = '';

    // Enable and disable inputs based on selection
    switch (selectedValue) {
        case "future-value":
            monthlyInvestmentInput.disabled = false;
            expectedReturnInput.disabled = false;
            investmentDurationInput.disabled = false;
            futureValueInput.disabled = true;
            break;
        case "monthly-investment":
            monthlyInvestmentInput.disabled = true;
            expectedReturnInput.disabled = false;
            investmentDurationInput.disabled = false;
            futureValueInput.disabled = false;
            break;
        case "expected-return":
            monthlyInvestmentInput.disabled = false;
            expectedReturnInput.disabled = true;
            investmentDurationInput.disabled = false;
            futureValueInput.disabled = false;
            break;
        case "investment-duration":
            monthlyInvestmentInput.disabled = false;
            expectedReturnInput.disabled = false;
            investmentDurationInput.disabled = true;
            futureValueInput.disabled = false;
            break;
    }
}

function calculateSIP() {
    const monthlyInvestment = parseFloat(document.getElementById("monthly-investment").value);
    const expectedReturn = parseFloat(document.getElementById("expected-return").value);
    const investmentDuration = parseFloat(document.getElementById("investment-duration").value);
    const futureValueInput = document.getElementById("future-value");
    const resultField = document.getElementById("result");
    const selectedValue = document.querySelector('input[name="calculate"]:checked').value;

    let result = '';

    if (selectedValue === "future-value") {
        if (isNaN(monthlyInvestment) || isNaN(expectedReturn) || isNaN(investmentDuration)) {
            result = "Please enter all fields: Monthly Investment, Expected Return, and Investment Duration.";
        } else {
            const monthlyInterestRate = (expectedReturn / 100) / 12;
            const numberOfMonths = investmentDuration * 12;

            const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1) / monthlyInterestRate) * (1 + monthlyInterestRate);
            futureValueInput.value = futureValue.toFixed(2);
            result = `Future Value: ${futureValue.toFixed(2)}`;
        }
    } else if (selectedValue === "monthly-investment") {
        if (isNaN(futureValueInput.value) || isNaN(expectedReturn) || isNaN(investmentDuration)) {
            result = "Please enter Future Value, Expected Return, and Investment Duration.";
        } else {
            const futureValue = parseFloat(futureValueInput.value);
            const monthlyInterestRate = (expectedReturn / 100) / 12;
            const numberOfMonths = investmentDuration * 12;

            const calculatedMonthlyInvestment = futureValue / (((Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1) / monthlyInterestRate) * (1 + monthlyInterestRate));
            result = `Monthly Investment: ${calculatedMonthlyInvestment.toFixed(2)}`;
        }
    } else if (selectedValue === "expected-return") {
        if (isNaN(monthlyInvestment) || isNaN(futureValueInput.value) || isNaN(investmentDuration)) {
            result = "Please enter Monthly Investment, Future Value, and Investment Duration.";
        } else {
            const futureValue = parseFloat(futureValueInput.value);
            const numberOfMonths = investmentDuration * 12;
            let low = 0, high = 100, mid;

            // Use binary search to approximate expected return rate
            while (high - low > 0.01) {
                mid = (low + high) / 2;
                const monthlyInterestRate = mid / 12 / 100;
                const calculatedFutureValue = monthlyInvestment * ((Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1) / monthlyInterestRate) * (1 + monthlyInterestRate);

                if (calculatedFutureValue > futureValue) {
                    high = mid;
                } else {
                    low = mid;
                }
            }
            result = `Expected Return Rate: ${(mid).toFixed(2)}%`;
        }
    } else if (selectedValue === "investment-duration") {
        if (isNaN(monthlyInvestment) || isNaN(expectedReturn) || isNaN(futureValueInput.value)) {
            result = "Please enter Monthly Investment, Expected Return, and Future Value.";
        } else {
            const futureValue = parseFloat(futureValueInput.value);
            const monthlyInterestRate = (expectedReturn / 100) / 12;

            // Calculate the investment duration in months
            const calculatedDuration = (Math.log(futureValue*monthlyInterestRate/monthlyInvestment+1)/Math.log(1+monthlyInterestRate))/12
            result = `Investment Duration: ${(calculatedDuration).toFixed(2)} years`;
        }
    }

    resultField.innerText = result;
}

// Initialize the calculator with default selected option
document.addEventListener("DOMContentLoaded", () => {
    selectCalculation("future-value");
});
