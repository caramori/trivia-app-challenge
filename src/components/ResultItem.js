const ResultItem = ({ question }) => {

    const getIcons = ()=>{
        return <>
                <i className ="green check circle icon large floated icon-correct"></i>  
                <i className="red times circle icon large floated icon-incorrect"></i>
        </>;
    }

    const getResultClass = ()=>{
        if (question.isCorrectAnswer()){
            return 'result-correct';
        } 
        return 'result-incorrect';
    }

    const getExplanation = ()=> {
        if (question.isCorrectAnswer()){
            return null;
        }
        const color = question.user_answer ? 'green' : 'red';
        return <>
            <div className='result-item-explanation'>
                <small><strong>You answered <span className={color}>{ ''+question.user_answer}</span></strong></small>
            </div>
        </>
    }

    return (
        <>
            <div className={`item middle result-item ${ getResultClass() }`}>
                { getIcons() }
                <div className="left content"> 
                    <div className="large text" dangerouslySetInnerHTML={{__html: question.description }}/>
                </div>
                { getExplanation() }
            </div>
        </>
    );
}
export default ResultItem;