const inputs = [...document.querySelectorAll("input")];
const form = document.querySelector("form");
const tbody = document.querySelector("tbody");

let idGenerator = 0;

let expenses = [];

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    inputValues = [];
    inputs.forEach(input => {
        inputValues.push(input.value)
    })
    let item = new Item(...inputValues, idGenerator)
    idGenerator++
    item.addElement();

})

class Item {
    constructor(name,date,amount, id){
        this.name = name;
        this.date = date;
        this.amount = amount;
        this.id = id;
    }

    addElement(){
        expenses.push(this)
        this.displayElements()
    }

    displayElements(){
        tbody.innerHTML = `<th class="name-column">Name</th>
        <th class="date-column">Date</th>
        <th class="amount-column">Amount</th>
        <th class="delete-column"></th>`
        expenses.forEach(expense=>{
            const item = `
                        <tr>
                          <td>${expense.name}</td>
                          <td>${expense.date}</td>
                          <td>${expense.amount}</td>
                          <td><button class="expense-button" data-key=${expense.id}>X</button></td>
                        </tr>
                        `
            tbody.innerHTML+=item
        })
        const expenseButtons = [...document.querySelectorAll(".expense-button")];
        expenseButtons.forEach(expenseButton => expenseButton.addEventListener("click", () =>(this.deleteElement(expenseButton))))
    }

    deleteElement(expenseButton){
        // this keyword is our html element
        // console.log("works")

        const filteredArr = expenses.filter(expense=> expense.id != expenseButton.dataset.key)
        expenses = filteredArr
        this.displayElements();
    }



}