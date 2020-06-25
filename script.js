'use strict';

let start = document.getElementById('start'),
addIncomeButton = document.querySelectorAll('button')[0],
addExpensesButton = document.querySelectorAll('button')[1],
depositCheck = document.querySelector('#deposit-check'),
additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
budgetMonthValue = document.querySelector('.budget_month-value'),
budgetDayValue = document.querySelector('.budget_day-value'),
expensesMonthValue = document.querySelector('.expenses_month-value'),
additionalIncomeValue = document.querySelector('.additional_income-value'),
additionalExpensesValue = document.querySelector('.additional_expenses-value'),
incomePeriodValue = document.querySelector('.income_period-value'),
targetMonthValue = document.querySelector('.target_month-value'),
salaryAmount = document.querySelector('.salary-amount'),
incomeItems = document.querySelectorAll('.income-items'),
expensesTitle = document.querySelector('[class = "expenses-title"]'),
expensesItems = document.querySelectorAll('.expenses-items'),
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
periodAmount = document.querySelector('.period-amount'),
additionalExpensesItem = document.querySelector('.additional_expenses-item');


let isNumber = function(n){
    return (!isNaN(parseFloat(n)) && isFinite(n));
};

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


let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    totalSavings: 0,
    expensesMonth: 0,
    addIncomeMonth: 0,
    start: function(){
        if ( appData.salaryAmountCheck() ){
            appData.getIncome();
            appData.getExpenses();
            appData.getAddIncome();
            appData.getAddExpenses();
            appData.getExpensesMonth();
            appData.getBudget();
            

            appData.showResult();
        }
    },
    salaryAmountCheck: function(){
        if (salaryAmount.value === ''){
            alert('Ошибка, введите число в поле "Месячный доход"');
            return false;
        }
        appData.budget = +salaryAmount.value;
        return true;
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        appData.calcSavings();
        periodSelect.addEventListener('input', appData.calcSavings);
    },
    addExpensesBlock: function(){     
        let expensesItemsClone = expensesItems[0].cloneNode(true);
        addExpensesButton.before(expensesItemsClone);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3){
            addExpensesButton.style.display = 'none';
            return; 
        }
    },
    addIncomeBlock: function(){     
        let incomeItemsClone = incomeItems[0].cloneNode(true);
        addIncomeButton.before(incomeItemsClone);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3){
            addIncomeButton.style.display = 'none';
            return; 
        }
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if ( (itemIncome !== '') && (cashIncome !== '')){
                appData.income[itemIncome] = cashIncome;
            }
        });
        for (let key in appData.income){
            appData.addIncomeMonth += +appData.income[key];
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if ( (itemExpenses !== '') && (cashExpenses !== '')){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItems.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        }) ;
    },
    asking: function(){

        if ( confirm('Есть ли у вас дополнительный заработок?') ) {
            let incomeName = inputVariableCheck('string', 'Какой у вас дополнительный заработок?', 'продаю цветмет'),
                incomeAmount = inputVariableCheck('number', 'Сколько вы на этом зарабатываете?', '5000');
            appData.income[incomeName] = incomeAmount;
        }

        appData.deposit = confirm('Есть ли у вас депозит в банке?');

    },
    getExpensesMonth: function(){
        for (let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget + appData.addIncomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor( appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
        return (targetAmount.value / appData.budgetMonth);
    },
    getStatusIncome: function(){
        // (appData.budgetDay >= 1200) ? console.log('У вас высокий уровень дохода')
        // : (appData.budgetDay >= 600 && appData.budgetDay < 1200) ? console.log('У вас средний уровень дохода')
        // : (appData.budgetDay >= 0 && appData.budgetDay < 600) ? console.log('У вас низкий уровень дохода')
        // : console.log('Что-то пошло не так');
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            appData.percentDeposit = inputVariableCheck('number', 'Какой у вас процент по депозиту?', '12');
            appData.moneyDeposit = inputVariableCheck('number', 'Сколько вы внесли?', '12000');
        }
    },
    calcSavings: function() {
        incomePeriodValue.value = (appData.budgetMonth * periodSelect.value);
    }
};

periodSelect.addEventListener('input', function(){
    periodAmount.textContent = periodSelect.value;
} );

start.addEventListener('click', appData.start);

addExpensesButton.addEventListener('click', appData.addExpensesBlock);
addIncomeButton.addEventListener('click', appData.addIncomeBlock);

appData.getTargetMonth();

appData.getStatusIncome();

