'use strict';

let start = document.getElementById('start'),
cancel = document.getElementById('cancel'),
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
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
textInputs = document.querySelectorAll('[type=text]');




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

let  AppData = function() {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.totalSavings = 0;
    this.expensesMonth = 0;
    this.addIncomeMonth = 0;
};
AppData.prototype.start = function(){
    if ( this.salaryAmountCheck() ){
       this.getIncome();
       this.getExpenses();
       this.getAddIncome();
       this.getAddExpenses();
       this.getExpensesMonth();
       this.getBudget();
       this.showResult();
       this.buttonChange();
       this.inputLock();
   }
};
AppData.prototype.salaryAmountCheck = function(){
    if (salaryAmount.value === ''){
        alert('Ошибка, введите число в поле "Месячный доход"');
        return false;
    }
    this.budget = +salaryAmount.value;
    return true;
};
AppData.prototype.showResult = function(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    this.calcSavings();
};
AppData.prototype.addExpensesBlock = function(){     
    let expensesItemsClone = expensesItems[0].cloneNode(true);
    addExpensesButton.before(expensesItemsClone);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3){
        addExpensesButton.style.display = 'none';
        return; 
    }
};
AppData.prototype.addIncomeBlock = function(){     
    let incomeItemsClone = incomeItems[0].cloneNode(true);
    addIncomeButton.before(incomeItemsClone);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3){
        addIncomeButton.style.display = 'none';
        return; 
    }
};
AppData.prototype.getIncome = function(){
    let _this = this;
    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if ( (itemIncome !== '') && (cashIncome !== '')){
            _this.income[itemIncome] = cashIncome;
        }
    });
    for (let key in this.income){
        this.addIncomeMonth += +this.income[key];
    }
};
AppData.prototype.getExpenses = function(){
    let _this = this;
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if ( (itemExpenses !== '') && (cashExpenses !== '')){
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getAddExpenses = function(){
    let _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== ''){
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function(){
    let _this = this;
    additionalIncomeItems.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    }) ;
};
AppData.prototype.asking = function(){

    if ( confirm('Есть ли у вас дополнительный заработок?') ) {
        let incomeName = inputVariableCheck('string', 'Какой у вас дополнительный заработок?', 'продаю цветмет'),
            incomeAmount = inputVariableCheck('number', 'Сколько вы на этом зарабатываете?', '5000');
            this.income[incomeName] = incomeAmount;
    }

    this.deposit = confirm('Есть ли у вас депозит в банке?');

};
AppData.prototype.getExpensesMonth = function(){
    for (let key in this.expenses){
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getBudget = function(){
    this.budgetMonth = this.budget + this.addIncomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor( this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function(){
    return (targetAmount.value / this.budgetMonth);
};
AppData.prototype.getInfoDeposit = function() {
    if (this.deposit) {
        this.percentDeposit = inputVariableCheck('number', 'Какой у вас процент по депозиту?', '12');
        this.moneyDeposit = inputVariableCheck('number', 'Сколько вы внесли?', '12000');
    }
};
AppData.prototype.calcSavings = function() {
    incomePeriodValue.value = (this.budgetMonth * periodSelect.value);
};
AppData.prototype.buttonChange = function() {
    start.style.display = 'none';
    cancel.style.display = 'inline-block';
};
AppData.prototype.inputLock = function(){
    for (let i = 0; i < textInputs.length - 7 ; i++) {
        textInputs[i].toggleAttribute('disabled');
    }
};
AppData.prototype.resetPage = function() {

    for (let i = 0; i < textInputs.length - 7; i++) {
        textInputs[i].toggleAttribute('disabled');
        textInputs[i].value = '';
    }

    let expensesItems = document.querySelectorAll('.expenses-items');
    for ( let k = 1; k < expensesItems.length; k++) {
        expensesItems[k].remove();
    }
    addExpensesButton.style.display = 'inline';

    let incomeItems = document.querySelectorAll('.income-items');
    for ( let j = 1; j < incomeItems.length; j++) {
        incomeItems[j].remove();
    }
    addIncomeButton.style.display = 'inline';


    periodSelect.value= '1';
    periodAmount.textContent = periodSelect.value;

    cancel.style.display = 'none';
    start.style.display = 'inline-block';

    budgetMonthValue.value = '';
    budgetDayValue.value = '';
    expensesMonthValue.value = '';
    additionalExpensesValue.value = '';
    additionalIncomeValue.value = '';
    targetMonthValue.value = '';

    this.income = {},
    this.addIncome = [],
    this.expenses = {},
    this.addExpenses = [],
    this.deposit = false,
    this.percentDeposit = 0,
    this.moneyDeposit = 0,
    this.budget = 0,
    this.budgetDay = 0,
    this.budgetMonth = 0,
    this.totalSavings = 0,
    this.expensesMonth = 0,
    this.addIncomeMonth = 0;


};
AppData.prototype.eventListeners = function() {
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.resetPage.bind(this));
    periodSelect.addEventListener('input', this.calcSavings.bind(this));
    addIncomeButton.addEventListener('click', this.addIncomeBlock.bind(this));
    addExpensesButton.addEventListener('click', this.addExpensesBlock.bind(this));
};

let appData = new AppData();
appData.eventListeners();

periodSelect.addEventListener('input', function(){
    periodAmount.textContent = periodSelect.value;
} );
