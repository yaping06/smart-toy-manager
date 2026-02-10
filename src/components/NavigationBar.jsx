import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">🤖 Lucas's Toy Manager</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-item">Home</Link>
                <Link to="/add" className="nav-item">Add New Toy</Link>
                <Link to="/ideas" className="nav-item">Toy Ideas(AI)</Link>
            </div>
        </nav>
    );
};

export default NavigationBar;