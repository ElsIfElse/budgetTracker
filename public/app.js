
const titleInput = document.getElementById('title-input')
const category = document.getElementById('category-input')
const year = document.getElementById('year-input')
const month = document.getElementById('month-input')
const amount = document.getElementById('price-input')
const frequency = document.getElementById('frequency-input')
const description = document.getElementById('description-input')
const expenseDisplayBtn = document.getElementById('expense-display-btn')

const submitBtn = document.getElementById('submit-btn')

// Navigation
expenseDisplayBtn.addEventListener('click',async()=>{
    try {
        window.location.href = 'http://192.168.0.100:5000/'
    } catch (error) {
        console.log('Error while loading Input Page. ',error)
    }
})

// Submitting Expense
submitBtn.addEventListener('click',async()=>{
    try {
         const expense = {
            title:titleInput.value,
            category:category.value,
            time:year.value+' - '+month.value,
            amount:parseInt(amount.value),
            frequency:frequency.value,
            description:description.value
        }
        console.log(expense)
        const response = await fetch('http://192.168.0.100:5000/api/v1/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(expense)
        })
        
        if(response.ok){
            const data = await response.json();
            console.log('Expense Created: ',data)
            titleInput.value = null;
            category.value = 'Groceries';
            year.value = '2024';
            month.value = 'January';
            amount.value = null;
            frequency.value = 'One Time';
            description.value = null;

        }
        else{
            console.log('Failed to create expense.',response.statusText)
        }

    } catch (error) {
        console.log('Error:',error)
    }
})








