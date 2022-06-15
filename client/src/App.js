import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './componentes/LandingPage';
import Home from './componentes/Home';
import CreateDog from './componentes/CreateDog';
import Detail from './componentes/Detail'
import About from './componentes/About';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/dog' element={<CreateDog/>}></Route>
          <Route path='/dogs/:id' element={<Detail/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
