var monthButton = document.getElementById("pricing_by_month");
var yearButton = document.getElementById("pricing_by_year");
var cost = document.getElementById('js-enterprise-price');
var plan_subscription_url = document.getElementById("js-enterprise-subscription-url");
// var cost = Array.from(document.querySelectorAll('.pricing__price')).forEach(el => el.innerText = "XXX€/YYY")


monthButton.addEventListener("click", function(){
  if (cost.innerHTML == "529€/year" && plan_subscription_url.href == "https://image-charts.com/enterprise/customers?plan_id=enterprise-yearly-2016") {
    cost.innerHTML = "49€/month";
    plan_subscription_url.href = "https://image-charts.com/enterprise/customers?plan_id=enterprise-2016";
  }
});

yearButton.addEventListener("click", function(){
  if (cost.innerHTML == "49€/month" && plan_subscription_url.href == "https://image-charts.com/enterprise/customers?plan_id=enterprise-2016") {
      cost.innerHTML = "529€/year";
      plan_subscription_url.href = "https://image-charts.com/enterprise/customers?plan_id=enterprise-yearly-2016";
  }
});

// const month = {
//   cost: '49€/month',
//   plan_id: 'enterprise-2016',
//   interval: 'monthly'
// };
//
// const year = [{
//   cost: '529€/year',
//   plan_id: 'enterprise-yearly-2016',
//   interval: 'yearly'
// }];
