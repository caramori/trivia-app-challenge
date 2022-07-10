import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllQuestions, setNextQuestion } from '../../redux/actions/quizActions';

import { useNavigate } from 'react-router-dom';

import Question from '../../components/Question';

const QuizScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const quiz = useSelector((state) => state.quiz);
    const questions = useSelector((state) => state.quiz.questions);
    const questionAnswered = useSelector((state) => state.quiz?.currentQuestion?.user_answer != null);
    const quizFinished = useSelector((state) => state.quiz.quizOver);

    useEffect(()=>{
        dispatch(loadAllQuestions());
    }, [dispatch]);

    useEffect(()=>{
        const loadedQuestions = questions && questions.length > 0;
        if (loadedQuestions){
            dispatch(setNextQuestion());
        }
    },[questions, dispatch]);

    useEffect(()=>{
        if (questionAnswered){
            dispatch(setNextQuestion());
        }
    },[questionAnswered, dispatch]);

    useEffect(()=>{
        if (quizFinished){
            navigate(`/results`);
        } 
    }, [quizFinished, navigate]);

    const getQuestionUI = ()=>{
        if (quiz.currentQuestion){
            return <Question question={quiz.currentQuestion}></Question>;
        } else {
            return (
                <>
                    <h1 className='text-center'><i className="spinner loading icon"></i> <span>Loading</span></h1>
                </>
            );
        }
    };

    return (
        <>
            { getQuestionUI() }
        </>
    );
}

export default QuizScreen;