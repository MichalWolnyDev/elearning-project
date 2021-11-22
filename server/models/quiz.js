var mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    quizName: String,
    quizCategory: {
        type: String,
        required: true
    },
    questions: [
        {
            text: {
                type: String,
                required: true
            },
            answers: [
                {
                    text: String,
                    isCorrect: {
                        type: Boolean,
                        required: true,
                        default: false
                    }
                }
            ],
            
        }
    ]

})

module.exports = mongoose.model('Quiz', quizSchema);