const express = require('express');
const fs = require('fs');
const ApiRouter = express.Router();
const QuestionModel = require('../models/question');

ApiRouter.get('/randomquestion', (req, res) => {
    QuestionModel.countDocuments({}, (err, totalQuestion) => {
        if (err) console.log(err)
        else {
            const randomIndex = Math.floor(Math.random() * totalQuestion);
            QuestionModel
                .findOne({})
                .skip(randomIndex)
                .exec((err, question) => {
                    if (err) console.log(err)
                    else {
                        res.send(question);
                    }
                });
        }   
    });

});
// /vote/3/yes
ApiRouter.get('/vote/:questionId/:vote', (req, res) => {
    const questionId = req.params.questionId;
    const vote = req.params.vote;


    QuestionModel.findOne({ _id: questionId }, (err, questionFound) => {
        if (err) console.log(err)
        else if (!questionFound) console.log("Not found")
        else {
            questionFound[vote] += 1;
            questionFound.save((err, questionUpdated) => {
                if (err) console.log(err)
                else res.redirect(`/question/${questionUpdated._id}`);
            });
        }
    });
});

ApiRouter.post('/addquestion', (req, res) => {
    QuestionModel.create({
        content: req.body.question
    }, (err, questionCreated) => {
        if (err) console.log(err)
        else res.redirect('/');
    });
});
ApiRouter.get('/findbyid/:questionId', (req, res) => {
	const questionId = req.params.questionId;
	QuestionModel.findById(questionId, (err, questionFound) => {
		if(err) console.log(err)
		else if(!questionFound) console.log("Not found")
		else {
			res.send(questionFound);
		}
	});
});


module.exports = ApiRouter;