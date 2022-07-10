//import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion } from '../redux/actions/quizActions';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';

const Question = ({ question }) => {

    const dispatch = useDispatch();
    const quiz = useSelector((state)=> state.quiz);

    const onAnswerQuestion = (answer) => {
        dispatch(answerQuestion(answer));
    }
    return (
        <>
            <div className='question-card'>
                
                <Label tag>
                    { question.category }
                </Label>
                <h2 dangerouslySetInnerHTML={{__html: question.description }}></h2>
                
                <div className='text-center question-options'>
                    <div className="ui buttons">
                        <button className="ui positive button" name='btn-true' onClick={()=> onAnswerQuestion(true)}>True</button>
                        <div className="or"></div>
                        <button className="ui negative button" name='btn-false' onClick={()=> onAnswerQuestion(false)}>False</button>
                    </div>

                    <div className='question-index-status'>
                        <span>{ `${quiz.currentQuestionIndex+1} / ${quiz.questions.length}` }</span>
                    </div>
                </div>
            </div>  
        </>
    );


};

export default Question;