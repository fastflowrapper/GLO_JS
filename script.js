'use strict';

let isNumber = function(n){
    return (!isNaN(parseFloat(n)) && isFinite(n));
};
let money,
    expencesAmount,
    start = function(){
    do {
        money = prompt('Ваш месячный доход?');
    }
    while ( !isNumber(money) );    
};

start();

let appData = {
    income: {},
    addIncome: [],
    expences: {},
    addExpences: [],
    deposit: false,
    mission: 100000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expencesMonth: 0,
    asking: function(){
        let addExpences = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                                 "Chocolate, Flour, Sugar");
            appData.addExpences = addExpences.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
                let expenceName,
                    amount;
                for ( let i = 0; i < 2; i++){
                    expenceName = prompt('Введите обязательную статью расходов');
                    while ( !isNumber(amount) ) {
                        amount = prompt('Во сколько это обойдется?');
                    }
                    appData.expences[expenceName] = +amount;
                    amount = null;
                }
    },
    getExpencesMonth: function(){
        for (let key in appData.expences){
            appData.expencesMonth += appData.expences[key];
        }
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expencesMonth;
        appData.budgetDay = Math.floor( appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
        appData.period = (appData.mission / appData.budgetMonth);
        if (appData.period < 0) {
            console.log('Цель не будет достигнута');
        } else {
            console.log('Цель будет достигнута за '+ 
            Math.floor(appData.period) + ' месяцев');
        }
    },
    getStatusIncome: function(){
        (appData.budgetDay >= 1200) ? console.log('У вас высокий уровень дохода')
        : (appData.budgetDay >= 600 && appData.budgetDay < 1200) ? console.log('У вас средний уровень дохода')
        : (appData.budgetDay >= 0 && appData.budgetDay < 600) ? console.log('У вас низкий уровень дохода')
        : console.log('Что-то пошло не так');
    }
};

appData.asking();

console.log(appData.expences);

appData.getExpencesMonth();

appData.getBudget();

console.log('budgetDay: ', + appData.budgetDay);

appData.getTargetMonth();

appData.getStatusIncome();