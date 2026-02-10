import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddToy.css';

const AddToy = () => {
    const navigate = useNavigate();

    // initilizing state with useful database columns
    const [formData, setFormData] = useState({
        name: '',
        category: 'STEM',
        status: 'active',
        min_age_months: '',
        max_age_months: '',
        purchase_price: '',
        source_name: '',
        source_url: '',
        image_url: '',
        is_favorite: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // data conversion
            const dataToSend = {
                ...formData,
                min_age_months: parseInt(formData.min_age_months),
                max_age_months: formData.max_age_months ? parseInt(formData.max_age_months):null,
                pruchase_price: parseFloat(formData.purchase_price)
            };

            await axios.post('http://localhost:3001/api/toys', dataToSend);
            alert("Toy successfully added!");
            // return to the home
            navigate('/');
        } catch (err) {
            console.error("Error saving toy:", err);
            alert("Error saving toy! Please try again!")
        }
    };

    return (
        <div className="add-toy-page">
          <div className="add-toy-container">
            <h2>Add New Toy</h2>
            <form className="toy-form" onSubmit={handleSubmit}>
              
              {/* Row 1: Name and Category */}
              <div className="form-row">
                <div className="form-group">
                  <label>Toy Name</label>
                  <input type="text" placeholder="e.g., Lego Set" required 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option value="STEM">STEM</option>
                    <option value="Blocks">Blocks</option>
                    <option value="Books">Books</option>
                    <option value="Outdoor">Ourdoor</option>
                    <option value="Art">Art</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
      
              {/* Row 2: Age Limits */}
              <div className="form-row">
                <div className="form-group">
                  <label>Min Age (Months)</label>
                  <input type="number" placeholder='e.g., 24' required onChange={(e) => setFormData({...formData, min_age_months: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Max Age (Months)</label>
                  <input type="number" placeholder='(Optional)' onChange={(e) => setFormData({...formData, max_age_months: e.target.value})} />
                </div>
              </div>
      
              {/* Row 3: Price and Source */}
              <div className="form-row">
                <div className="form-group">
                  <label>Price ($)</label>
                  <input type="number" step="0.01" placeholder='e.g., 9.99'required onChange={(e) => setFormData({...formData, purchase_price: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Store Name</label>
                  <input type="text" placeholder="e.g., Target" onChange={(e) => setFormData({...formData, source_name: e.target.value})} />
                </div>
              </div>
      
              {/* Single Row: Full Width for URL and Image */}
              <div className="form-group">
                <label>Photo URL</label>
                <input type="text" placeholder="(Optional) Paste link here" onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
              </div>
      
              <div className="form-group">
                <label>Product Link</label>
                <input type="url" placeholder="(Optional) https://..." onChange={(e) => setFormData({...formData, source_url: e.target.value})} />
              </div>
      
              <button type="submit" className="submit-btn">Save Toy</button>
            </form>
          </div>
        </div>
      );
};

export default AddToy;
