/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { Provider } from 'react-redux';
import store from '../redux/store';

import QuizService from '../api/QuizService';
jest.mock("../api/QuizService");

describe('Trivia App / Navigation', ()=> {

  it('should open home screen', () => {
    render(<Provider store={store}><App /></Provider>);
    const text = screen.getByText(/Welcome to the Trivia Challenge/i);
    expect(text).toBeInTheDocument();
    const buttonStart = screen.getByRole('button', {name: /begin/i});
    expect(buttonStart).toBeInTheDocument();
  });

  it('should start quiz', async () => {

    QuizService.prototype.getQuestions.mockImplementation(()=>{
      const questions = [];
      for (let i = 0; i < process.env.REACT_APP_MAX_QUESTIONS; i++){
        questions.push({ category: 'category', question: 'question', correct_answer: 'false' });
      }
      return Promise.resolve({ "responde_code": 0,  "results": questions });
    });

    render(<Provider store={store}><App /></Provider>);
    const buttonStart = screen.getByRole('button', {name: /begin/i})
    userEvent.click(buttonStart);

    await waitForElementToBeRemoved(screen.queryByText(/loading/i));

    const positiveBtn = await screen.findByText(/true/i);
    expect(positiveBtn).toBeInTheDocument();
    
    const falseBtn = await screen.findByText(/false/i);
    expect(falseBtn).toBeInTheDocument();
  });
});