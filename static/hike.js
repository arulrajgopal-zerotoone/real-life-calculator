function selectCalculation(selectedValue) {
    const baseSalaryInput = document.getElementById("base-salary");
    const hikePercentageInput = document.getElementById("hike-percentage");
    const newSalaryInput = document.getElementById("new-salary");

    // Reset input fields
    baseSalaryInput.value = '';
    hikePercentageInput.value = '';
    newSalaryInput.value = '';

    // Enable and disable inputs based on selection
    switch (selectedValue) {
        case "new-salary":
            baseSalaryInput.disabled = false;
            hikePercentageInput.disabled = false;
            newSalaryInput.disabled = true;
            break;
        case "base-salary":
            baseSalaryInput.disabled = true;
            hikePercentageInput.disabled = false;
            newSalaryInput.disabled = false;
            break;
        case "hike-percentage":
            baseSalaryInput.disabled = false;
            hikePercentageInput.disabled = true;
            newSalaryInput.disabled = false;
            break;
    }
}

function calculate() {
    const baseSalary = parseFloat(document.getElementById("base-salary").value);
    const hikePercentage = parseFloat(document.getElementById("hike-percentage").value);
    const newSalary = parseFloat(document.getElementById("new-salary").value);
    const selectedValue = document.querySelector('input[name="calculate"]:checked').value;
    let result = '';

    if (selectedValue === "new-salary") {
        if (isNaN(baseSalary) || isNaN(hikePercentage)) {
            result = "Please enter Base Salary and Hike Percentage.";
        } else {
            const calculatedNewSalary = baseSalary + (baseSalary * (hikePercentage / 100));
            result = `New Salary: ${calculatedNewSalary.toFixed(2)}`;
        }
    } else if (selectedValue === "base-salary") {
        if (isNaN(newSalary) || isNaN(hikePercentage)) {
            result = "Please enter New Salary and Hike Percentage.";
        } else {
            const calculatedBaseSalary = newSalary / (1 + (hikePercentage / 100));
            result = `Base Salary: ${calculatedBaseSalary.toFixed(2)}`;
        }
    } else if (selectedValue === "hike-percentage") {
        if (isNaN(baseSalary) || isNaN(newSalary)) {
            result = "Please enter Base Salary and New Salary.";
        } else {
            const calculatedHikePercentage = ((newSalary - baseSalary) / baseSalary) * 100;
            result = `Hike Percentage: ${calculatedHikePercentage.toFixed(2)}%`;
        }
    }

    document.getElementById("result").innerText = result;
}

// Initialize the calculator with the default selected option
selectCalculation("new-salary");
