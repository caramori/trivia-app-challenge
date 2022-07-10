
import DOMPurify from "dompurify";

export default function questionDecorator(question){

    return {
        ...question,
        description: DOMPurify.sanitize(question.question),
        correctAnswer: question.correct_answer ? JSON.parse(question.correct_answer.toLowerCase()) : null,
        isCorrectAnswer: ()=>{
            return question.correctAnswer === question.user_answer;
        }
    }


}