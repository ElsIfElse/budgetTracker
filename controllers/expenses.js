const Expense = require('../models/expense')
const asyncWrapper = require('../middleware/async')

const createExpense = asyncWrapper(async(req,res)=>{
    try {
        const expense = await Expense.create(req.body);
        res.status(200).json({expense});
    } catch (error) {
        console.log(error)
    }
})

const getAllExpense = asyncWrapper(async(req,res)=>{
    const expense = await Expense.find({})
    res.status(200).json({expense})
})

const getExpense = asyncWrapper(async(req,res)=>{
try {
    const {id} = req.params
    const expense = await Expense.findOne(({_id:id}))
    res.status(200).json(expense)
} catch (error) {
    console.log('Error:',error)
}

})

const deleteExpense = asyncWrapper(async(req,res)=>{
    const {id} = req.params
    const expense = await Expense.findOneAndDelete({_id:id})
    res.status(200).json(expense);
})

const updateExpense = asyncWrapper(async(req,res)=>{
    const {id} = req.params
    const expense = await Expense.findByIdAndUpdate({_id:id},req.body,{new:true,runValidators:true})
    res.status(200).json(expense);
    
})

const searchWithWords = asyncWrapper(async(req,res)=>{

    try {
        const {search} = req.params
        const response = await Expense.find({});

        const filteredArray = response.filter((expenseObject)=>{        
            return JSON.stringify(Object.values(expenseObject)).toLowerCase().includes(search.toLowerCase())
        })
        res.status(200).json(filteredArray)
      
    } catch (error) {
        res.status(404).json({msg: 'something went wrong',error: error})
    }
    
})

module.exports = {
    createExpense,
    getAllExpense,
    getExpense,
    deleteExpense,
    updateExpense,
    searchWithWords
    
}