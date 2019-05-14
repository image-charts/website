var monthButton = document.getElementById("month");
var yearButton = document.getElementById("year");
var x = document.getElementById("cost");

monthButton.addEventListener("click", function(){
    if (x.innerHTML == "529€/month") {
      x.innerHTML = "49€/month";
    }
});

yearButton.addEventListener("click", function(){
    if (x.innerHTML == "49€/month") {
      x.innerHTML = "529€/month";
    }
});


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
