'use strict';

let isNumber = function(n){
    return (!isNaN(parseFloat(n)) && isFinite(n));
};



let money, income, addExpences, deposit, mission, period;

money = 55555;
income = "selling cookies";
addExpences = "Chocolate, Flour, Sugar";
deposit = true;
mission = 1000000;
period = 12;


do {
    money = prompt('Ваш месячный доход?');
}
while ( !isNumber(money) );


let showTypeOf = function(input1){
    console.log(typeof(input1));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


//lesson03


addExpences = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'
,"Chocolate, Flour, Sugar");

deposit = confirm('Есть ли у вас депозит в банке?');

let expences = [];

let getExpencesMonth = function(){
    let sum = 0;
    let amount =[];
    for ( let i = 0; i < 2; i++){
    expences[i] = prompt('Введите обязательную статью расходов');
        while ( !isNumber(amount[i]) ){
            amount[i] = prompt('Во сколько это обойдется?');
        }
    sum += +amount[i];
    }
    return(sum);
};

let expencesAmount = getExpencesMonth();
console.log(expencesAmount);

console.log( addExpences.toLowerCase().split(', ') );


let getAccumulatedMonth = function(){
    return(money -  expencesAmount);
};
let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function(accumulatedMonth){
    let targetMonths = (mission / accumulatedMonth);
    if (targetMonths < 0) {
        return('Цель не будет достигнута');
    } else {
        return('Цель будет достигнута за '
        + Math.floor(targetMonths) + ' месяцев');
    }
};
console.log( getTargetMonth(accumulatedMonth) );

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('budgetDay: ', budgetDay);

let getStatusIncome = function(budgetDay){
    (budgetDay >= 1200) ? console.log('У вас высокий уровень дохода')
    : (budgetDay >= 600 && budgetDay < 1200) ? console.log('У вас средний уровень дохода')
    : (budgetDay >= 0 && budgetDay < 600) ? console.log('У вас низкий уровень дохода')
    : console.log('Что-то пошло не так');
};
getStatusIncome(budgetDay);
