let money, income, addExpences, deposit, mission, period;

money = 55555;
income = "selling cookies";
addExpences = "Chocolate, Flour, Sugar";
deposit = true;
mission = 1000000;
period = 12;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpences.length);

console.log("Период равен " + period + " месяцев");

console.log("Цель заработать " + mission + " рублей");

console.log( addExpences.toLowerCase().split(', ') );

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);
