import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuizService from '../api/QuizService';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../redux/store';

jest.mock("../api/QuizService");

describe('Trivia App / Quiz Info', ()=> {

  it('should get 1 correct', async () => {
    
    QuizService.prototype.getQuestions.mockImplementation(()=>{
      const questions = [];
      for (let i = 0; i < process.env.REACT_APP_MAX_QUESTIONS; i++){
        questions.push({
          category: 'category', question: 'question',
          correct_answer: i === 0 ? 'True' : 'False'
        });
      }
      return Promise.resolve({ "responde_code": 0,  "results": questions });
    });

    const { container } = render(<Provider store={store}><App /></Provider>);

    const buttonStart = await screen.findByText(/begin/i);

    userEvent.click(buttonStart);

    let question = 0;
    const maxQuestions = process.env.REACT_APP_MAX_QUESTIONS;

    await waitForElementToBeRemoved(screen.queryByText(/loading/i));
    
    while (question < maxQuestions){
      
      const questionIndexText = (question+1) + ' / ' + maxQuestions;
      const status = await screen.findByText(questionIndexText);
      expect(status).toBeInTheDocument(); 

      const trueBtn = await screen.findByText(/true/i);
      expect(trueBtn).toBeInTheDocument();

      const falseBtn = await screen.findByText(/false/i);
      expect(falseBtn).toBeInTheDocument();

      userEvent.click(trueBtn);
      question++;
    }

    const buttonRestart = await screen.findByText(/play again?/i);
    expect(buttonRestart).toBeInTheDocument();

    const result = await screen.findByText(1 + ' / ' + maxQuestions);
    expect(result).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const wrongItens =  container.getElementsByClassName('result-item-explanation');
    expect(wrongItens.length).toBe(maxQuestions - 1);
  });

});