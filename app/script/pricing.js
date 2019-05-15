const plans = [{
    cost: "49€/month",
    id: 'enterprise-2016',
    interval: 'monthly'
}, {
    cost: "529€/year",
    id: 'enterprise-yearly-2016',
    interval: 'yearly'
}];

/**
 * @param {object} plan
 * @property {string} cost - Plan cost
 * @property {string} id - stripe plan id
 * @property {string} interval - "yearly" | "monthly"
 */
function displayPlan(plan) {
    document.querySelector(".js-enterprise-price").innerHTML = plan.cost;
    document.querySelector(".js-enterprise-subscription-url").href = `https://image-charts.com/enterprise/customers?plan_id=${plan.id}`;
}

Array.from(document.querySelectorAll('input[name=enterprise-plan-interval]'))
    .forEach(input => input.addEventListener("change", () => {
        const selectedInterval = input.value; // "monthly" | "yearly"
        const selectedPlan = plans.find(plan => plan.interval === selectedInterval);
        displayPlan(selectedPlan);
    }));
