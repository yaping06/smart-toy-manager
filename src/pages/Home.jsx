import { useState, useEffect } from "react";
import axios from 'axios';
import './Home.css';
import FilterBar from "../components/FilterBar";

const Home = () => {
    const [toys, setToys] = useState([]);
    const [loading, setLoading] = useState(true);

    const [statusFilter, setStatusFilter] = useState('active'); // Default to 'active'
    const [categoryFilter, setCategoryFilter] = useState('All'); // Default to 'All'
    const [sortBy, setSortBy] = useState('name');              // Default to 'name'

    useEffect(() => {
        const fetchToys = async() => {
            try {
                const res = await axios.get('http://localhost:3001/api/toys');
                setToys(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching toys:", err);
                setLoading(false);
            }
        };
        fetchToys();
    }, []);

    // create fillter logic beased on seletions in the filterbar
    const filteredToys = toys
        .filter(toy => toy.status === statusFilter)
        .filter(toy => categoryFilter === 'All' ? true : toy.category === categoryFilter)
        .sort((a, b) => {
            if (sortBy === 'price') return a.purchase_price - b.purchase_price;
            return a.name.localeCompare(b.name);
        });

    // Function to handle the interactive heart click
    const toggleFavorite = async (id, currentStatus) => {
        try {
            await axios.patch(`http://localhost:3001/api/toys/${id}`, { 
                is_favorite: !currentStatus 
            });
            // Update local state so the heart changes color immediately
            setToys(prev => prev.map(t => t.id === id ? { ...t, is_favorite: !currentStatus } : t));
        } catch (err) {
            console.error("Error updating favorite:", err);
        }
    };

    if (loading) return <div className='loader'>Loading Lucas's toys...</div>;

    return (
        <div className='home-page'>
            <header className='home-header'>
                <h1>Lucas's Toy Gallery</h1>
            </header>
            <FilterBar
              statusFilter={statusFilter} setStatusFilter={setStatusFilter}
              categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
              sortBy={sortBy} setSortBy={setSortBy}
              resultsCount={filteredToys.length}
            />

            <div className='toy-grid'>
                {filteredToys.length > 0 ? (
                    filteredToys.map((toy) => (
                        <div key={toy.id} className='toy-card'>
                            <div className='card-image'>
                                <img
                                  src={toy.image_url || 'https://via.placeholder.com/300x200?text=No+Photo'}
                                  alt={toy.name}
                                />
                                {/* Interactive Heart Icon */}
                                <span className='heart-icon' onClick={() => toggleFavorite(toy.id, toy.is_favorite)}>
                                    {toy.is_favorite ? '❤️' : '🤍'}
                                </span>
                            </div>
                            <div className='card-info'>
                                <h3>{toy.name}</h3>
                                <span className='category-tag'>{toy.category}</span>
                                <p className='age-range'>Age: {toy.min_age_months}+ months</p>
                                <button className='detail-btn'>View Details</button>
                            </div>
                        </div>
                    ))
                ):(
                    <p className='empty-msg'>No active toys found. Go to "Add New Toy" to start!</p>
                )}
            </div>
        </div>
    );
};

export default Home;
