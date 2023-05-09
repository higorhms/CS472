const nameInput = document.getElementById('name-input');
const depositInput = document.getElementById('deposit-input');
const textArea = document.getElementById('text-area');
const dropdown = document.getElementById("accounts");
const actionButton = document.getElementById("actionButton");


class Account{
  constructor(lastId, balance, accountName){
    this.id = lastId;
    this.balance = balance;
    this.name = accountName;
  }

  toString = () => {
    return `Account name: ${this.name} Balance: $${this.balance.toFixed(2)}`
  }

  getName = () => {
    return this.name;
  }

  deposit = (amount) => {
    this.balance += amount;
  }

  debit = (amount) => {
    this.balance -= amount;
  }
}

class Controller {
  static #accountInfoList = JSON.parse(localStorage.getItem('accounts'))?.map(
    account => new Account(account.id , Number.parseFloat(account.balance), account.name)
    ) || [];

  static #lastId = Controller.#accountInfoList[Controller.#accountInfoList.length - 1]?.id + 1 || 0;

  static addAccount(){
    if(!nameInput.value){
      alert("Account Name can not be empty");
      return;
    }else{
      Controller.#accountInfoList.push(new Account(Controller.#lastId++, Number.parseFloat(depositInput.value), nameInput.value));
      localStorage.setItem('accounts', JSON.stringify(Controller.#accountInfoList));
      Controller.refreshData();
    }
    nameInput.value = '';
    depositInput.value = '';
  }

  static getAccounts(){
    return Controller.#accountInfoList;
  }

  static deposit(){
    const selectedOption = dropdown.options[dropdown.selectedIndex];

    if(!depositInput.value || depositInput.value < 0) {
      alert("Your deposit should be positive")
      return;
    }

    Controller.#accountInfoList[selectedOption.getAttribute("accountid")].deposit(Number.parseFloat(depositInput.value));
    localStorage.setItem('accounts', JSON.stringify(Controller.#accountInfoList));
    Controller.populateDropdown();
    Controller.toggleButton();
    window.location.href='../../index.html';
  }

  static debit(){
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const account = Controller.#accountInfoList[selectedOption.getAttribute("accountid")];

    if(!depositInput.value || depositInput.value < 0) {
      alert("Your deposit should be positive")
      return;
    }

    if(account.balance - depositInput.value < 0) {
      alert("Your don't have enough money")
      return;
    }

    account.debit(Number.parseFloat(depositInput.value));
    localStorage.setItem('accounts', JSON.stringify(Controller.#accountInfoList));
    Controller.populateDropdown();
    Controller.toggleButton();
    window.location.href='../../index.html';
  }

  static refreshData(){
    if(textArea){
    textArea.textContent = Controller.#accountInfoList
    .map(account => account.toString())
    .join("\n");
    }
  }

  static populateDropdown() {
    if(dropdown){
      dropdown.innerHTML = '';
      const selectOption = document.createElement("option");
      selectOption.text = "Select";
      dropdown.add(selectOption);

      for (var i = 0; i < Controller.#accountInfoList.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("accountid", Controller.#accountInfoList[i].id);
        option.text = Controller.#accountInfoList[i];
        dropdown.add(option);
      }
    }
  }

  static toggleButton(){
    if (dropdown.selectedIndex > 0) {
      actionButton.disabled = false;
    } else {
      actionButton.disabled = true;
    }
  }
} 

window.onload = ()=>{
  Controller.refreshData();
  Controller.populateDropdown();
};