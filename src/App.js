import {Routes, Route} from 'react-router-dom';

import SpeechToText from './Components/SpeechToText';
import Header from './Components/Header';
import Landing from './Components/Landing';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/ask' element={<SpeechToText />} />
      </Routes>
    </div>
  );
}

export default App;
