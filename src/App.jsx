import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AddToy from './pages/AddToy';
import ToyDetail from './pages/ToyDetail';
import NavigationBar from './components/NavigationBar';



function App() {
  return(
    <Router>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<AddToy />} />
          <Route path='/toy/:id' element={<ToyDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
