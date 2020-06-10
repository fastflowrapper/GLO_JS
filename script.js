'use strict';
let money, income, addExpences, deposit, mission, period;

money = 55555;
income = "selling cookies";
addExpences = "Chocolate, Flour, Sugar";
deposit = true;
mission = 1000000;
period = 12;

let showTypeOf = function(input1){
    console.log(typeof(input1));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


//lesson03

money = parseInt( +prompt('Ваш месячный доход?', 100000) );

addExpences = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'
,"Chocolate, Flour, Sugar");

//deposit = confirm('Есть ли у вас депозит в банке?');

//let expences1 = prompt('Введите обязательную статью расходов');
let amount1 = prompt('Во сколько это обойдется?');
//let expences2 = prompt('Введите обязательную статью расходов');
let amount2 = prompt('Во сколько это обойдется?');

//lesson04
let getExpencesMonth = function(){
    return(+amount1 + +amount2);
};
console.log(getExpencesMonth());

console.log( addExpences.toLowerCase().split(', ') );


let getAccumulatedMonth = function(){
    return(money -  getExpencesMonth());
};
let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function(accumulatedMonth){
    return(mission / accumulatedMonth);
};
console.log('getTargetMonth: ' + getTargetMonth(accumulatedMonth));

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('budgetDay: ', budgetDay);

let getStatusIncome = function(budgetDay){
    (budgetDay >= 1200) ? console.log('У вас высокий уровень дохода')
    : (budgetDay >= 600 && budgetDay < 1200) ? console.log('У вас средний уровень дохода')
    : (budgetDay >= 0 && budgetDay < 600) ? console.log('У вас низкий уровень дохода')
    : console.log('Что-то пошло не так');
};
getStatusIncome(budgetDay);
