import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudListing from './StudListing';
import StudDetails from './StudDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StudListing />}></Route>
          <Route path='/student/detail/:studid' element={<StudDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
