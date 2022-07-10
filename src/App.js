import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeScreen from './screens/home/HomeScreen';
import QuizScreen from './screens/quiz/QuizScreen';
import ResultsScreen from './screens/results/ResultsScreen';

import { Grid } from 'semantic-ui-react';

function App() {
  return (
    <Grid centered>
      <Grid.Column mobile={14} computer={8} className='main-container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomeScreen/>} />
            <Route path='/quiz' element={<QuizScreen/>} />
            <Route path='/results' element={<ResultsScreen/>} />
          </Routes>
        </BrowserRouter>
      </Grid.Column>
    </Grid>
  );
}

export default App;
