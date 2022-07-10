import QuizService from '../../api/QuizService';
import * as actionTypes from '../constants/quizConstants';

export const loadAllQuestions = () => async (dispatch) => {
    try {

        dispatch({ type: actionTypes.GET_QUESTIONS_REQUEST});

        const maxQuestions = process.env.REACT_APP_MAX_QUESTIONS;

        const data = await new QuizService().getQuestions(maxQuestions);

        dispatch({
            type: actionTypes.GET_QUESTIONS_RESULT,
            payload: data.results
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_QUESTIONS_FAIL,
            payload: error
        });
    }
};

export const answerQuestion = (answer) => async (dispatch) => {
    dispatch({
        type: actionTypes.POST_QUESTION_ANSWER,
        payload: answer
    });
}

export const setNextQuestion = () => async (dispatch) => {
    dispatch({
        type: actionTypes.GET_NEXT_QUESTION
    });
}

export const restartQuiz = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESTART_QUIZ
    });
}