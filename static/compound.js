function selectCalculation(selectedValue) {
    const principalInput = document.getElementById("principal");
    const interestRateInput = document.getElementById("interest-rate");
    const yearsInput = document.getElementById("years");
    const finalAmountInput = document.getElementById("final-amount");

    // Reset input fields
    principalInput.value = '';
    interestRateInput.value = '';
    yearsInput.value = '';
    finalAmountInput.value = '';

    // Enable and disable inputs based on selection
    switch (selectedValue) {
        case "final-amount":
            principalInput.disabled = false;
            interestRateInput.disabled = false;
            yearsInput.disabled = false;
            finalAmountInput.disabled = true;
            break;
        case "principal":
            principalInput.disabled = true;
            interestRateInput.disabled = false;
            yearsInput.disabled = false;
            finalAmountInput.disabled = false;
            break;
        case "interest-rate":
            principalInput.disabled = false;
            interestRateInput.disabled = true;
            yearsInput.disabled = false;
            finalAmountInput.disabled = false;
            break;
        case "years":
            principalInput.disabled = false;
            interestRateInput.disabled = false;
            yearsInput.disabled = true;
            finalAmountInput.disabled = false;
            break;
    }
}

function calculate() {
    const principal = parseFloat(document.getElementById("principal").value);
    const interestRate = parseFloat(document.getElementById("interest-rate").value);
    const years = parseFloat(document.getElementById("years").value);
    const finalAmount = parseFloat(document.getElementById("final-amount").value);
    const selectedValue = document.querySelector('input[name="calculate"]:checked').value;
    let result = '';

    if (selectedValue === "final-amount") {
        if (isNaN(principal) || isNaN(interestRate) || isNaN(years)) {
            result = "Please enter Principal, Interest Rate, and Years.";
        } else {
            const calculatedFinalAmount = principal * Math.pow(1 + (interestRate / 100), years);
            result = `Final Amount: ${calculatedFinalAmount.toFixed(2)}`;
        }
    } else if (selectedValue === "principal") {
        if (isNaN(finalAmount) || isNaN(interestRate) || isNaN(years)) {
            result = "Please enter Final Amount, Interest Rate, and Years.";
        } else {
            const calculatedPrincipal = finalAmount / Math.pow(1 + (interestRate / 100), years);
            result = `Principal: ${calculatedPrincipal.toFixed(2)}`;
        }
    } else if (selectedValue === "interest-rate") {
        if (isNaN(principal) || isNaN(finalAmount) || isNaN(years)) {
            result = "Please enter Principal, Final Amount, and Years.";
        } else {
            const calculatedInterestRate = (Math.pow(finalAmount / principal, 1 / years) - 1) * 100;
            result = `Interest Rate: ${calculatedInterestRate.toFixed(2)}%`;
        }
    } else if (selectedValue === "years") {
        if (isNaN(principal) || isNaN(interestRate) || isNaN(finalAmount)) {
            result = "Please enter Principal, Interest Rate, and Final Amount.";
        } else {
            const calculatedYears = Math.log(finalAmount / principal) / Math.log(1 + (interestRate / 100));
            result = `Years: ${calculatedYears.toFixed(2)}`;
        }
    }

    document.getElementById("result").innerText = result;
}

// Initialize the calculator with the default selected option
selectCalculation("final-amount");
