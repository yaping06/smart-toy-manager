import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ToyDetail.css";

const ToyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [toy, setToy] = useState(null);

    useEffect(() => {
        const fetchToy = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/toys/${id}`);
                setToy(res.data);
            } catch (err) {
                console.log("Error fetching toy details:", err);
            }
        };
        fetchToy();
    },[id]);

    const handleUpdateStatus = async (newStatus) => {
        let soldPrice = toy.sold_price;
        if (newStatus === "sold") {
            const price = window.prompt("What was the final sold price?");
            if (price === null) return;
            soldPrice = parseFloat(price);
            if (isNaN(soldPrice) || soldPrice < 0) {
                alert("Error: Please enter a valid number (0 or higher) for the sold price.");
                return;
            }
        }
        try {
            await axios.patch(`http://localhost:3001/api/toys/${id}`, { 
                status: newStatus,
                sold_price: soldPrice 
            });
            
            // update state locally with the new values
            setToy(prevToy => ({
                ...prevToy,
                status: newStatus,
                sold_price: soldPrice
            }));
        } catch (err) { 
            console.error("Update failed:", err);
            alert("Could not update status. Please try again.")
         }

    };

    const handleDelete = async () => {
        if (window.confirm("Delete Lucas's toy permanently?")) {
            try {
                await axios.delete(`http://localhost:3001/api/toys/${id}`);
                navigate('/');
            } catch (err) { console.error(err); }
        }
    };

    if (!toy) return <div className="loader">Loading details...</div>;

    return (
        <div className="detail-container">
            <button className="back-link" onClick={() => navigate('/')}>← Back to Gallery</button>
            
            <div className="detail-card">
                <div className="detail-grid">
                    {/* Image Section */}
                    <div className="detail-image-box">
                        <img src={toy.image_url || 'placeholder.png'} alt={toy.name} />
                    </div>

                    {/* Info Section */}
                    <div className="detail-content">
                        <div className="detail-header">
                            <span className="category-tag">{toy.category}</span>
                            <h1>{toy.name} {toy.is_favorite && '❤️'}</h1>
                        </div>

                        <div className="stats-grid">
                            <div className="stat">
                                <label>Age Range</label>
                                <p>{Number(toy.min_age)}{toy.max_age ? ` - ${Number(toy.max_age)}` : '+'} yrs</p>
                            </div>
                            <div className="stat">
                                <label>Status</label>
                                <p className={`status-pill ${toy.status}`}>{toy.status}</p>
                            </div>
                            <div className="stat">
                                <label>Original Price</label>
                                <p>${toy.purchase_price}</p>
                            </div>
                            {toy.status === 'sold' && (
                                <div className="stat highlight">
                                    <label>Sold For</label>
                                    <p>${toy.sold_price}</p>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="action-bar">
                            <h3>Manage Toy</h3>
                            <div className="btn-group">
                                {toy.status !== 'active' && 
                                    <button onClick={() => handleUpdateStatus('active')} className="btn-active">Set Active</button>}
                                {toy.status !== 'storage' && 
                                    <button onClick={() => handleUpdateStatus('storage')} className="btn-storage">Move to Storage</button>}
                                {toy.status !== 'sold' && 
                                    <button onClick={() => handleUpdateStatus('sold')} className="btn-sold">Mark as Sold</button>}
                                <button onClick={handleDelete} className="btn-delete">Delete Permanently</button>
                            </div>
                        </div>

                        <div className="detail-footer">
                            <p>Added on: {new Date(toy.created_at).toLocaleDateString()}</p>
                            {toy.source_url && <a href={toy.source_url} target="_blank">View Original Store</a>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToyDetail;

