const plans = [{
    cost: "49€/month",
    id: 'enterprise-2016',
    interval: 'monthly'
}, {
    cost: "529€/year",
    id: 'enterprise-yearly-2016',
    interval: 'yearly'
}];

const plansplus = [{
    cost: "149€/month",
    id: 'plan_FG5JpvqjJwV1Uz',
    interval: 'monthly'
}, {
    cost: "1600€/year",
    id: 'plan_FG5LuPl9Mi1fmD',
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

function displayPlanplus(planplus) {
    document.querySelector(".js-enterprise-plus-price").innerHTML = planplus.cost;
    document.querySelector(".js-enterprise-plus-subscription-url").href = `https://image-charts.com/enterprise/customers?plan_id=${planplus.id}`;
}


Array.from(document.querySelectorAll('input[name=enterprise-plan-interval]'))
    .forEach(input => input.addEventListener("change", () => {
        const selectedInterval = input.value; // "monthly" | "yearly"
        const selectedPlan = plans.find(plan => plan.interval === selectedInterval);
        const selectedPlanPlus = plansplus.find(planplus => planplus.interval === selectedInterval);
        displayPlan(selectedPlan);
        displayPlanplus(selectedPlanPlus);
    }));




