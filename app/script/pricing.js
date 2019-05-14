var monthButton = document.getElementById("month");
var yearButton = document.getElementById("year");
var cost = document.getElementById("cost");
var urlChang = document.getElementById("urlChang");

monthButton.addEventListener("click", function(){
    if (cost.innerHTML == "529€/month" && urlChang.href == "https://image-charts.com/enterprise/customers?plan_id=enterprise-yearly-2016") {
      cost.innerHTML = "49€/month";
      urlChang.href = "https://image-charts.com/enterprise/customers?plan_id=enterprise-2016";
    }
});

yearButton.addEventListener("click", function(){
    if (cost.innerHTML == "49€/month" && urlChang.href == "https://image-charts.com/enterprise/customers?plan_id=enterprise-2016") {
      cost.innerHTML = "529€/month";
      urlChang.href = "https://image-charts.com/enterprise/customers?plan_id=enterprise-yearly-2016";
    }
});
