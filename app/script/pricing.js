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


// .href='ce_que_je_veux_a_la_place'



// const plans = [{
// id: 'enterprise-2016',
// price: '49.00',
// currency: '€',
// interval: 'monthly'
// },{
// id: 'enterprise-yearly-2016',
// price: '529.00',
// currency: '€',
// interval: 'yearly'
// }];
