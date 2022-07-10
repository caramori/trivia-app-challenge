import { useSelector, useDispatch } from 'react-redux';
import ResultItem from '../../components/ResultItem';
import { restartQuiz } from '../../redux/actions/quizActions';
import { useNavigate } from 'react-router-dom';

const ResultsScreen = () => {

    const quiz = useSelector((state) => state.quiz);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const renderQuestions = () => {
        return quiz.questions.map((question, index) => {
            return <ResultItem key={index} question={question} />
        });
    }

    const onRestartQuiz = ()=> {
        dispatch(restartQuiz());
        navigate(`/`);
    };

    return (
        <>
            <h1 className='text-center'>You scored: <span>{ `${quiz.numCorrect} / ${quiz.questions.length}` }</span></h1>
            <div className="ui list middle divided aligned huge">
                { renderQuestions() }
            </div>
            <div className='text-center'>
                <button className='ui button primary' name='btnagain' onClick={()=> (onRestartQuiz()) }>Play Again?</button>
            </div>
        </>
    );
}

export default ResultsScreen;