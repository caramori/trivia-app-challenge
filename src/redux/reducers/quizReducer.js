import * as actionTypes from '../constants/quizConstants'
import questionDecorator from '../../decorator/QuestionDecorator';

const QUIZ_INITIAL_STATE = {
    questions: [], 
    currentQuestion: null,
    currentQuestionIndex: -1
}

export const quizReducer = (state = QUIZ_INITIAL_STATE, action) => {
    switch (action.type){
        case actionTypes.GET_QUESTIONS_REQUEST:
            return {
                loading: true,
                questions: []
            };
        case actionTypes.GET_QUESTIONS_RESULT:

            return {
                loading: false,
                questions: action.payload.map((result)=> {
                    return questionDecorator(result);
                })
            };

        case actionTypes.GET_QUESTIONS_FAIL:

            return {
                loading: false,
                error: action.payload
            };
            
        case actionTypes.GET_NEXT_QUESTION:

            const currentQuestionIndex = isNaN(state.currentQuestionIndex)? -1 : state.currentQuestionIndex;
            const nextQuestionIndex = currentQuestionIndex+1;
            if (state.questions.length > nextQuestionIndex){
                return {
                    ...state,
                    currentQuestion: state.questions[nextQuestionIndex],
                    currentQuestionIndex: nextQuestionIndex
                };
            }
            return {
                quizOver: true,
                questions: state.questions,
                numCorrect: state.questions.filter(question => question.isCorrectAnswer()).length
            };

        case actionTypes.POST_QUESTION_ANSWER:

            const currentQuestion = questionDecorator({...state.currentQuestion, user_answer: action.payload});
            const newState = {
                ...state,
                currentQuestion 
            };
            newState.questions[state.currentQuestionIndex] = currentQuestion;
            return newState;

        case actionTypes.RESTART_QUIZ:
            return QUIZ_INITIAL_STATE;
        default:
            return state;
    }
}