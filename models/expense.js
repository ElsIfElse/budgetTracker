const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true, 'must provide title'],
        trim: true,
        maxlength:[20,'title cannot be longer than 20 characters']
    },
    category:{
        type:String,
        required:[true, 'must provide category']
    },
    time:{
        type: String,
        required:[true, 'must provide time']
    },
    amount:{
        type: Number,
        required:[true, 'must provide amount']
    },
    frequency:{
        type: String,
        required:[true, 'must provide frequency']
    },
    description:{
        type: String,
        required:false
    }
})

module.exports = mongoose.model('Expense',ExpenseSchema)