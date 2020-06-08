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

//lesson03

money = parseInt( +prompt('Ваш месячный доход?') );

addExpences = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

let expences1 = prompt('Введите обязательную статью расходов');
let amount1 = prompt('Во сколько это обойдется?');
let expences2 = prompt('Введите обязательную статью расходов');
let amount2 = prompt('Во сколько это обойдется?');

let budgetMonth = money - ( +amount1) - (+amount2);
console.log('Бюджет на месяц: ', budgetMonth);

console.log('Цель будет достигнута за ' + Math.ceil( mission / budgetMonth ) + ' месяцев' );

budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ', budgetDay);

(budgetDay >= 1200) ? console.log('У вас высокий уровень дохода')
    : (budgetDay >= 600 && budgetDay < 1200) ? console.log('У вас средний уровень дохода')
    : (budgetDay >= 0 && budgetDay < 600) ? console.log('У вас низкий уровень дохода')
    : console.log('Что-то пошло не так');

