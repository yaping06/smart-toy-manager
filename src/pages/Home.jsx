import { useState, useEffect } from "react";
import axios from 'axios';
import './Home.css';
import FilterBar from "../components/FilterBar";

const Home = () => {
    const [toys, setToys] = useState([]);
    const [loading, setLoading] = useState(true);

    const [statusFilter, setStatusFilter] = useState('active'); // Default to 'active'
    const [categoryFilter, setCategoryFilter] = useState('All'); // Default to 'All'
    const [ageFilter, setAgeFilter] = useState('All'); // Default to 'All'
    const [sortBy, setSortBy] = useState('name');              // Default to 'name'

    const [savingIds, setSavingIds] = useState(new Set());

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
        .filter(toy => ageFilter === 'All' ? true : toy.max_age && parseFloat(toy.max_age) <= parseFloat(ageFilter))
        .sort((a, b) => {
            if (sortBy === 'price') return a.purchase_price - b.purchase_price;
            return a.name.localeCompare(b.name);
        });

    // Function to handle the interactive heart click
    const toggleFavorite = async (e, id, currentStatus) => {
        // 1. Prevent the click from bubbling up to the card/image
        e.preventDefault();
        e.stopPropagation(); 
        
        
        if (savingIds.has(id)) return; // block spam clicks
        
        // 2. Optimistic Update: Change the color instantly in the UI
        const newStatus = !currentStatus;

        setToys(prevToys => 
            prevToys.map(toy => 
                toy.id === id ? { ...toy, is_favorite: newStatus } : toy
            )
        );

        setSavingIds(prev => new Set(prev).add(id));
    
        try {
            // 3. Update the database in the background
            await axios.patch(`http://localhost:3001/api/toys/${id}`, { 
                is_favorite: newStatus 
            });
            
            // IMPORTANT: Do NOT call fetchToys() here. 
            // The local state is already correct!
        } catch (err) {
            console.error("Error updating favorite:", err);
            // 4. If the server fails, "undo" the change so the user knows
            setToys(prevToys => 
                prevToys.map(toy => 
                    toy.id === id ? { ...toy, is_favorite: currentStatus } : toy
                )
            );
        } finally {
            setSavingIds(prev => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
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
              ageFilter={ageFilter} setAgeFilter={setAgeFilter}
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
                                <span className='heart-icon' onClick={(e) => toggleFavorite(e, toy.id, toy.is_favorite)}>
                                    {toy.is_favorite ? '❤️' : '🤍'}
                                </span>
                            </div>
                            <div className='card-info'>
                                <h3>{toy.name}</h3>
                                <span className='category-tag'>{toy.category}</span>
                                <p className='age-range'>Age: {Number(toy.min_age)}{toy.max_age ? ` - ${Number(toy.max_age)}` : '+'} years</p>
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
