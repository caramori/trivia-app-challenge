import axios from 'axios';

export default class QuizService {

    async getQuestions(maxQuestions){
        const url = process.env.REACT_APP_URL.replace(/maxQuestions/i, maxQuestions);
        const { data } = await axios.get(url);
        return data;
    }
}