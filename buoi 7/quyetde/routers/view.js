const express = require('express');
const ViewRouter = express.Router();
const QuestionModel = require('../models/question');
const path = require('path');

ViewRouter.get('/', (req, res) => {
    // QuestionModel.countDocuments({}, (err, totalQuestion) => {
    //     if (err) console.log(err)
    //     else {
    //         const randomIndex = Math.floor(Math.random() * totalQuestion);
    //         QuestionModel
    //             .findOne({})
    //             .skip(randomIndex)
    //             .exec((err, question) => {
    //                 if (err) console.log(err)
    //                 else {
    //                     res.send(`
    //                     <h1>
    //                         ${question.content}
    //                     </h1>
    //                     <a href="/api/vote/${question._id}/no"><button>Sai/không/trái</button></a>
    //                     <a href="/api/vote/${question._id}/yes"><button>Đúng/có/phải</button></a>
    //                     <a href="/question/${question._id}"><button>Kết quả vote</button></a>
    //                     <a href="/"><button>Câu hỏi khác</button></a>
    //                 `);
    //                 }
    //             });
    //     }
    // });
    res.sendFile(path.resolve(__dirname,'../views/home.html'));
});

ViewRouter.get('/ask', (req, res) => {
    // console.log(req.query);
    res.sendFile(path.resolve(__dirname, '../views/ask.html'));
});

ViewRouter.get('/question/:questionId', (req, res) => {
	const questionId = req.params.questionId;
	QuestionModel.findById(questionId, (err, questionFound) => {
		if(err) console.log(err)
		else if(!questionFound) console.log("Not found")
		else {
			res.send(`
				${questionFound.content} 
				| yes: ${questionFound.yes} 
				| no: ${questionFound.no}
			`);
		}
	});
});

module.exports = ViewRouter;