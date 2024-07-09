const express = require('express');
const router = express.Router();
const {createExpense,getAllExpense,getExpense,deleteExpense,updateExpense,searchWithWords} = require('../controllers/expenses')


// create an expense

router.post('/',createExpense)

// get all expenses
router.get('/',getAllExpense)

// get one expense
router.get('/:id',getExpense)

// delete expense
router.delete('/:id',deleteExpense);

// update expense
router.patch('/:id',updateExpense)

// filter by search word
router.get('/search/:search',searchWithWords)

module.exports = router;