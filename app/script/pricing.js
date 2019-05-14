var monthButton = document.getElementById("pricing_by_month");
var yearButton = document.getElementById("pricing_by_year");
var cost = document.getElementById('pricing__price');
var plan_subscription_url = document.getElementById("plan_subscription_url");
var plan_id = "https://image-charts.com/enterprise/customers?plan_id=enterprise";
// var cost = Array.from(document.querySelectorAll('.pricing__price')).forEach(el => el.innerText = "XXX€/YYY")


monthButton.addEventListener("click", function(){
  if (cost.innerHTML == "529€/year" && plan_subscription_url.href == plan_id + "-yearly-2016") {
    cost.innerHTML = "49€/month";
    plan_subscription_url.href = plan_id + "-2016";
  }
});

yearButton.addEventListener("click", function(){
  if (cost.innerHTML == "49€/month" && plan_subscription_url.href == plan_id + "-2016") {
      cost.innerHTML = "529€/year";
      plan_subscription_url.href = plan_id + "-yearly-2016";
  }
});
