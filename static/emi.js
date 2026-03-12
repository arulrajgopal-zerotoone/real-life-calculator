function selectCalculation(selectedValue) {
    const principalInput = document.getElementById("principal");
    const interestRateInput = document.getElementById("interest-rate");
    const tenureInput = document.getElementById("tenure");
    const emiInput = document.getElementById("emi");

    // Reset input fields
    principalInput.value = '';
    interestRateInput.value = '';
    tenureInput.value = '';
    emiInput.value = '';

    // Enable and disable inputs based on selection
    switch (selectedValue) {
        case "emi":
            principalInput.disabled = false;
            interestRateInput.disabled = false;
            tenureInput.disabled = false;
            emiInput.disabled = true;
            break;
        case "principal":
            principalInput.disabled = true;
            interestRateInput.disabled = false;
            tenureInput.disabled = false;
            emiInput.disabled = false;
            break;
        case "interest-rate":
            principalInput.disabled = false;
            interestRateInput.disabled = true;
            tenureInput.disabled = false;
            emiInput.disabled = false;
            break;
        case "tenure":
            principalInput.disabled = false;
            interestRateInput.disabled = false;
            tenureInput.disabled = true;
            emiInput.disabled = false;
            break;
    }
}

function calculateEMI() {
    const principal = parseFloat(document.getElementById("principal").value);
    const interestRate = parseFloat(document.getElementById("interest-rate").value);
    const tenure = parseFloat(document.getElementById("tenure").value);
    const emiInput = document.getElementById("emi");
    const resultField = document.getElementById("result");
    const selectedValue = document.querySelector('input[name="calculate"]:checked').value;

    let result = '';

    if (selectedValue === "emi") {
        if (isNaN(principal) || isNaN(interestRate) || isNaN(tenure)) {
            result = "Please enter all fields: Principal, Interest Rate, and Tenure.";
        } else {
            const monthlyInterestRate = (interestRate / 100) / 12;
            const numberOfMonths = tenure * 12;

            const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) / 
                         (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
            emiInput.value = emi.toFixed(2);
            result = `EMI: ${emi.toFixed(2)}`;
        }
    } else if (selectedValue === "principal") {
        if (isNaN(emiInput.value) || isNaN(interestRate) || isNaN(tenure)) {
            result = "Please enter EMI, Interest Rate, and Tenure.";
        } else {
            const emi = parseFloat(emiInput.value);
            const monthlyInterestRate = (interestRate / 100) / 12;
            const numberOfMonths = tenure * 12;

            const calculatedPrincipal = (emi * (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1)) / 
                                        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths));
            result = `Principal: ${calculatedPrincipal.toFixed(2)}`;
        }
    } else if (selectedValue === "interest-rate") {
        if (isNaN(principal) || isNaN(emiInput.value) || isNaN(tenure)) {
            result = "Please enter Principal, EMI, and Tenure.";
        } else {
            const emi = parseFloat(emiInput.value);
            const numberOfMonths = tenure * 12;

            // Approximation method to find the interest rate (more complex to calculate directly)
            let low = 0, high = 100, mid;
            while (high - low > 0.01) {
                mid = (low + high) / 2;
                const monthlyInterestRate = mid / 12 / 100;
                const calculatedEMI = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) / 
                                      (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
                if (calculatedEMI > emi) {
                    high = mid;
                } else {
                    low = mid;
                }
            }
            result = `Interest Rate: ${(mid).toFixed(2)}%`;
        }
    } else if (selectedValue === "tenure") {
        if (isNaN(principal) || isNaN(interestRate) || isNaN(emiInput.value)) {
            result = "Please enter Principal, Interest Rate, and EMI.";
        } else {
            const emi = parseFloat(emiInput.value);
            const monthlyInterestRate = (interestRate / 100) / 12;

            // Using logarithmic calculations to find tenure
            const calculatedTenure = Math.log(emi / (emi - principal * monthlyInterestRate)) / Math.log(1 + monthlyInterestRate);
            result = `Tenure: ${(calculatedTenure / 12).toFixed(2)} years`;
        }
    }

    resultField.innerText = result;
}

// Initialize the calculator with default selected option
document.addEventListener("DOMContentLoaded", () => {
    selectCalculation("emi");
});
