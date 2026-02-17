import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AddToy from './pages/AddToy';
import ToyDetail from './pages/ToyDetail';
import NavigationBar from './components/NavigationBar';
import Discovery from "./pages/Discovery";



function App() {
  return(
    <Router>
      <Toaster />
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<AddToy />} />
          <Route path='/toy/:id' element={<ToyDetail />} />
          <Route path='/discovery' element={<Discovery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
