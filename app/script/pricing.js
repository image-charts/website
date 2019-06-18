const planTypes = {
    'ENTERPRISE': 'ENTERPRISE',
    'ENTERPRISE_PLUS': 'ENTERPRISE_PLUS'
};
const plans = [{
    type: planTypes.ENTERPRISE,
    cost: "49€/month",
    id: 'enterprise-2016',
    interval: 'monthly'
}, {
    type: planTypes.ENTERPRISE,
    cost: "529€/year",
    id: 'enterprise-yearly-2016',
    interval: 'yearly'
}, {
    type: planTypes.ENTERPRISE_PLUS,
    cost: "149€/month",
    id: 'plan_FG5JpvqjJwV1Uz',
    interval: 'monthly'
}, {
    type: planTypes.ENTERPRISE_PLUS,
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
    document.querySelector(`.js-enterprise-price[data-type=${plan.type}]`).innerHTML = plan.cost;
    document.querySelector(`.js-enterprise-subscription-url[data-type=${plan.type}]`).href = `https://image-charts.com/enterprise/customers?plan_id=${plan.id}`;
}


Array.from(document.querySelectorAll('input[name=enterprise-plan-interval]'))
    .forEach(input => input.addEventListener("change", () => {
        const selectedInterval = input.value; // "monthly" | "yearly"
        Object.keys(planTypes).forEach((planType) => {
            const selectedPlan = plans.find(plan => plan.interval === selectedInterval && plan.type === planTypes[planType]);
            displayPlan(selectedPlan);
        })
    }));




