document.addEventListener('DOMContentLoaded', function() {
    const familySituationSelect = document.getElementById('family-situation');
    const coupleFields = document.getElementById('couple-fields');
    const calculateButton = document.getElementById('calculate-button');
    const resultsSection = document.getElementById('results');
    const annualPC = document.getElementById('annual-pc');
    const monthlyPC = document.getElementById('monthly-pc');

    // Show/Hide Couple Fields based on Family Situation
    familySituationSelect.addEventListener('change', function() {
        if (this.value === 'couple' || this.value === 'couple-child') {
            coupleFields.style.display = 'block';
        } else {
            coupleFields.style.display = 'none';
        }
    });

    // Calculate Function
    calculateButton.addEventListener('click', function() {
        // 1. Get Input Values
        const familySituation = familySituationSelect.value;
        const avsAiApplicant = parseFloat(document.getElementById('avs-ai-applicant').value) || 0;
        const avsAiSpouse = parseFloat(document.getElementById('avs-ai-spouse').value) || 0;
        const revenueApplicant = parseFloat(document.getElementById('revenue-applicant').value) || 0;
        const revenueSpouse = parseFloat(document.getElementById('revenue-spouse').value) || 0;
        const totalAssets = parseFloat(document.getElementById('total-assets').value) || 0;
        const childUnder11 = parseInt(document.getElementById('child-under-11').value) || 0;
        const child11To25 = parseInt(document.getElementById('child-11-25').value) || 0;
        const grossRent = parseFloat(document.getElementById('gross-rent').value) || 0;

        // 2. Calculate Basic Living Expenses (Example)
        let basicLivingExpenses = 0;
        if (familySituation === 'single') {
            basicLivingExpenses = 20100;
        } else if (familySituation === 'couple') {
            basicLivingExpenses = 30150;
        } else if (familySituation === 'single-child') {
            basicLivingExpenses = 20100 + (7380 * childUnder11) + (10515 * child11To25); //Simplified
        } else if (familySituation === 'couple-child') {
            basicLivingExpenses = 30150 + (7380 * childUnder11) + (10515 * child11To25); // Simplified
        }

        // 3. Calculate Total Income (Simplified)
        let totalIncome = avsAiApplicant + avsAiSpouse + revenueApplicant + revenueSpouse;

        // 4. Calculate Total Expenses (Simplified)
        let totalExpenses = basicLivingExpenses + grossRent;

        // 5. Calculate PC
        let annualSupplementaryBenefit = totalExpenses - totalIncome;
        if (annualSupplementaryBenefit < 0) {
            annualSupplementaryBenefit = 0; //PC cannot be negative
        }
        let monthlySupplementaryBenefit = annualSupplementaryBenefit / 12;

        // 6. Display Results
        annualPC.textContent = annualSupplementaryBenefit.toFixed(2);
        monthlyPC.textContent = monthlySupplementaryBenefit.toFixed(2);
        resultsSection.style.display = 'block';
    });
});
