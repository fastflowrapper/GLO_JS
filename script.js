'use strict';

const start = document.getElementById('start'),
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
expensesTitle = document.querySelector('[class = "expenses-title"]'),
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
periodAmount = document.querySelector('.period-amount'),
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
textInputs = document.querySelectorAll('[type=text]');

let incomeItems = document.querySelectorAll('.income-items'),
expensesItems = document.querySelectorAll('.expenses-items');





const isNumber = (n) => {
    return (!isNaN(parseFloat(n)) && isFinite(n));
};

const inputVariableCheck = (typeOfVar, messageInput, defaultMessage) => {
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

class  AppData {
    constructor(){
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
    }
    start() {
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
    }
    salaryAmountCheck() {
        if (salaryAmount.value === ''){
            alert('Ошибка, введите число в поле "Месячный доход"');
            return false;
        }
        this.budget = +salaryAmount.value;
        return true;
    }
    showResult(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        this.calcSavings();
    }
    addExpensesBlock() {     
        let expensesItemsClone = expensesItems[0].cloneNode(true);
        addExpensesButton.before(expensesItemsClone);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3){
            addExpensesButton.style.display = 'none';
            return; 
        }
    }
    addIncomeBlock() {     
        let incomeItemsClone = incomeItems[0].cloneNode(true);
        addIncomeButton.before(incomeItemsClone);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3){
            addIncomeButton.style.display = 'none';
            return; 
        }
    }
    getIncome() {
        incomeItems.forEach( (item) =>{
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if ( (itemIncome !== '') && (cashIncome !== '')){
                this.income[itemIncome] = cashIncome;
            }
        });
        for (let key in this.income){
            this.addIncomeMonth += +this.income[key];
        }
    }
    getExpenses(){
        expensesItems.forEach( (item) =>{
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if ( (itemExpenses !== '') && (cashExpenses !== '')){
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    getAddExpenses(){
        let _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach( (item) => {
            item = item.trim();
            if (item !== ''){
                _this.addExpenses.push(item);
            }
        });
    }
    getAddIncome(){
        let _this = this;
        additionalIncomeItems.forEach( (item) => {
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                _this.addIncome.push(itemValue);
            }
        }) ;
    }
    asking(){

        if ( confirm('Есть ли у вас дополнительный заработок?') ) {
            let incomeName = inputVariableCheck('string', 'Какой у вас дополнительный заработок?', 'продаю цветмет'),
                incomeAmount = inputVariableCheck('number', 'Сколько вы на этом зарабатываете?', '5000');
                this.income[incomeName] = incomeAmount;
        }
    
        this.deposit = confirm('Есть ли у вас депозит в банке?');
    
    }
    getExpensesMonth(){
        for (let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    }
    getBudget(){
        this.budgetMonth = this.budget + this.addIncomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor( this.budgetMonth / 30);
    }
    getTargetMonth(){
        return (targetAmount.value / this.budgetMonth);
    }
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = inputVariableCheck('number', 'Какой у вас процент по депозиту?', '12');
            this.moneyDeposit = inputVariableCheck('number', 'Сколько вы внесли?', '12000');
        }
    }
    calcSavings() {
        incomePeriodValue.value = (this.budgetMonth * periodSelect.value);
    }
    buttonChange() {
        start.style.display = 'none';
        cancel.style.display = 'inline-block';
    }
    inputLock(){
        for (let i = 0; i < textInputs.length - 7 ; i++) {
            textInputs[i].toggleAttribute('disabled');
        }
    }
    resetPage() {

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
        incomePeriodValue.value = '';
    
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
    
    
    }
    eventListeners() {
        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.resetPage.bind(this));
        periodSelect.addEventListener('input', this.calcSavings.bind(this));
        addIncomeButton.addEventListener('click', this.addIncomeBlock.bind(this));
        addExpensesButton.addEventListener('click', this.addExpensesBlock.bind(this));
    }    
}

let appData = new AppData();
appData.eventListeners();

periodSelect.addEventListener('input', () => {
    periodAmount.textContent = periodSelect.value;
});
