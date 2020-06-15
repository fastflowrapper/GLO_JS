'use strict';

let isNumber = function(n){
    return (!isNaN(parseFloat(n)) && isFinite(n));
};
let money,
    expencesAmount,
    start = function(){
    do {
        money = prompt('Ваш месячный доход?', 50000);
    }
    while ( !isNumber(money) );    
};

start();

let inputVariableCheck = function(typeOfVar, messageInput, defaultMessage){
    let checkedVar;
    if (typeOfVar === 'number') {
        do {
            checkedVar = prompt(messageInput, defaultMessage);
        }
        while ( !isNumber(checkedVar) );
    } else if (typeOfVar === 'string') {
        do {
            checkedVar = prompt(messageInput, defaultMessage);
        }
        while ( !isNaN( parseFloat(checkedVar) ) || ( checkedVar.trim() === '') );
    }
    return(checkedVar);
};

let addExpences = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', "chocolate,flour,sugar");

let appData = {
    income: {},
    addIncome: [],
    expences: {},
    addExpences: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 100000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    totalSavings: 0,
    expencesMonth: 0,
    asking: function(){

        if ( confirm('Есть ли у вас дополнительный заработок?') ) {
            let incomeName = inputVariableCheck('string', 'Какой у вас дополнительный заработок?', 'продаю цветмет'),
                incomeAmount = inputVariableCheck('number', 'Сколько вы на этом зарабатываете?', '5000');
            appData.income[incomeName] = incomeAmount;
        }

        appData.addExpences = addExpences.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let expenceName,
            amount;

        for ( let i = 0; i < 2; i++){
            expenceName = inputVariableCheck('string', 'Введите обязательную статью расходов', 'Соевое молоко');

            while ( !isNumber(amount) ) {
                amount = inputVariableCheck('number', 'Во сколько это обойдется?', 10000);
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
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            appData.percentDeposit = inputVariableCheck('number', 'Какой у вас процент по депозиту?', '12');
            appData.moneyDeposit = inputVariableCheck('number', 'Сколько вы внесли?', '12000');
        }
    },
    calcSavings: function() {
        appData.totalSavings = appData.budgetMonth * appData.period;
    }
};

appData.asking();

appData.getExpencesMonth();

appData.getBudget();

appData.getTargetMonth();

appData.getStatusIncome();


let addExpencesModified = addExpences.slice(0, 1).toUpperCase();
for (var char = 1; char < addExpences.length; char++) {
    if (addExpences[char] !== ','){
        addExpencesModified = addExpencesModified + addExpences[char];
    } else {
        addExpencesModified = addExpencesModified 
        + addExpences[char] + ' ' + addExpences.slice(char+1, char + 2).toUpperCase();
        ++char;
    }
}
console.log(addExpencesModified);


for (var key in appData){
    console.log (key, appData[key]);
}