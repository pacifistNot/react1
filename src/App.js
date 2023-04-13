import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudListing from './StudListing';
import StudCreate from './StudCreate';
import StudDetails from './StudDetails';
import StudEdit from './StudEdit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StudListing />}></Route>
          {/* <Route path='/student/create' element={<StudCreate />}></Route> */}

          <Route path='/student/detail/:studid' element={<StudDetails />}></Route>
          {/* <Route path='/student/edit/:studid' element={<StudEdit />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
