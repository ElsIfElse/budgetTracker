
const title = document.getElementById('title')
const category = document.getElementById('category')
const time = document.getElementById('time')
const amount = document.getElementById('amount')
const frequency = document.getElementById('frequency')
const descripton = document.getElementById('descripton')
const container = document.getElementById('container')
const expenseCardContainer = document.getElementById('expense-card-container')
const searchInput = document.getElementById('search-input')
const sumDisplay = document.getElementById('sum-amount')

const showAllBtn = document.getElementById('show-all-btn')
const inputPageBtn = document.getElementById('input-page-btn')
const searchBtn = document.getElementById('search-btn')
const deleteBtn = document.getElementById('delete-btn')


// Building the expense list
function createExpenseBox(title,category,time,amount,frequency,descripton,id){
    const expenseBox = expenseCardContainer.appendChild(document.createElement('div'))
    expenseBox.className = 'expense-box'
    
    const expenseTitle = document.createElement('p');
    expenseTitle.textContent = title
    expenseTitle.className = 'paragraph'
    expenseBox.appendChild(expenseTitle);

    const expenseCategory = document.createElement('p');
    expenseCategory.textContent = category
    expenseCategory.className = 'paragraph'
    expenseBox.appendChild(expenseCategory);

    const expenseTime = document.createElement('p');
    expenseTime.textContent = time
    expenseTime.className = 'paragraph'
    expenseBox.appendChild(expenseTime);

    const expenseAmount = document.createElement('p');
    expenseAmount.textContent = amount
    expenseAmount.className = 'paragraph'
    expenseBox.appendChild(expenseAmount);

    const expenseFrequency = document.createElement('p');
    expenseFrequency.textContent = frequency
    expenseFrequency.className = 'paragraph'
    expenseBox.appendChild(expenseFrequency);

    const expenseDescription = document.createElement('p');
    expenseDescription.textContent = descripton
    expenseDescription.className = 'paragraph'
    expenseBox.appendChild(expenseDescription);

    const expenseDeleteBtn = document.createElement('button')
    expenseDeleteBtn.textContent = 'X'
    expenseDeleteBtn.className = 'expense-delete-btn'
    expenseDeleteBtn.addEventListener('click',()=>{
        deleteExpense(id,expenseBox)
    })
    expenseBox.appendChild(expenseDeleteBtn);
    
}      

// Delete expense logic
async function deleteExpense(id, expenseBox){
    console.log(id);
    try {
        const response = await fetch(`http://192.168.0.100:5000/api/v1/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })

        if(response.ok){
            expenseBox.remove();
            
        }

    } catch (error) {
        console.log('Error: ',error)
    }
}

// Navigation
inputPageBtn.addEventListener('click',async()=>{
    try {
        window.location.href = 'http://192.168.0.100:5000/input'
    } catch (error) {
        console.log('Error while loading Input Page. ',error)
    }
})

// Displaying all expenses
document.addEventListener('DOMContentLoaded',async()=>{

    try {
        const response = await fetch('http://192.168.0.100:5000/api/v1/',{
            method:'GET',
            headers: {
                'Content-Type':'application/json'
            }   
        })
        if(response.ok){
            const data = await response.json()
            const expenses = data.expense       
            for(let i=0;i<expenses.length;i++){
                createExpenseBox(expenses[i].title,expenses[i].category,expenses[i].time,expenses[i].amount+' Ft',expenses[i].frequency,expenses[i].description,expenses[i]._id)
            }
            sumLogic(expenses)
        }
    } catch (error) {
        console.log('Something went wrong: ', error)
    }
})

// Displaying by searched term
searchBtn.addEventListener('click',async()=>{
     expenseCardContainer.innerHTML = "";
    try {
        const searchWord = await searchInput.value.trim()
        console.log('Search word: ',searchWord)
        const response = await fetch(`http://192.168.0.100:5000/api/v1/search/${searchWord}`,{
            method: 'GET',
            headers: {
                'Content-Type':'apllication/json'}
    
            })
            if(response.ok){
                
               const expenses = await response.json();
               sumLogic(expenses)
                for(let i=0;i<expenses.length;i++){
                    createExpenseBox(expenses[i].title,expenses[i].category,expenses[i].time,expenses[i].amount+' Ft',expenses[i].frequency,expenses[i].description,expenses[i]._id)
                }
                
            }
    } catch (error) {
        console.log('Error:',error)
    }

})

// Show all item
showAllBtn.addEventListener('click',async()=>{
    expenseCardContainer.innerHTML = ""
    try {
        const response = await fetch('http://192.168.0.100:5000/api/v1/',{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(response.ok){
           const data = await response.json();
           const expenses = data.expense
            sumLogic(expenses)
            for(let i=0;i<expenses.length;i++){
                createExpenseBox(expenses[i].title,expenses[i].category,expenses[i].time,expenses[i].amount+' Ft',expenses[i].frequency,expenses[i].description)
            }
        }
    } catch (error) {
        console.log('Error: ',error)
    }
})

//Showing SUM of expenses
 function sumLogic(expenses){
    console.log(expenses)

    const prices = expenses.map((obj)=>{
        return obj.amount
    })
    console.log('prices: ',prices)
     const sum = prices.reduce((acc,curr)=>{
        return acc+curr
    })
    sumDisplay.textContent = sum;
}