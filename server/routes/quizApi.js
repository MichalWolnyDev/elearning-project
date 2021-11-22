const Quiz = require('../models/quiz.js');
const router = require('express').Router();


router.get('/', (req, res) => {
    res.status(200).send(`Welcome to quiz api`);
  })

router.get('/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find()
        return res.status(200).json(quizzes)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})
router.get('/quizzes/:category', async (req, res) => {
    try {
        const quizCategory = req.params.category 

        const quiz = await Quiz.findOne({quizCategory: quizCategory})        
        if(!quiz){
            return res.status(404).json({})
        }else{
            return res.status(200).json(quiz)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})
router.get('/quizzes/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const quiz = await Quiz.findById({_id})        
        if(!quiz){
            return res.status(404).json({})
        }else{
            return res.status(200).json(quiz)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

router.post('/quizzes', async (req, res) => {
    try {
        const { quizName } = req.body
        const { quizCategory } = req.body
        const { questions } = req.body

        const quiz = await Quiz.create({
            quizName,
            quizCategory,
            questions
        })

        return res.status(201).json(quiz)

    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// router.put('/quizzes/:id', (req, res) => {

// })

router.delete('/quizzes/:id', (req, res) => {
    try {
        const _id = req.params.id 

        Quiz.findByIdAndDelete(_id, (err, docs) => {
            if(err){
                return res.status(404).json()
            } else {
                  return res.status(204).json()
            }
        })

    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

module.exports = router;