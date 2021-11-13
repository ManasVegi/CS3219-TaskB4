import logo from './logo.svg';
import './App.css';
import Home from './pages/HomePage';
import { Navbar, NavbarBrand } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <Navbar color="dark" sticky>
        <NavbarBrand href='/'>
          Workout App
        </NavbarBrand>
      </Navbar>
      <Home />
    </div>
  );
}

export default App;
