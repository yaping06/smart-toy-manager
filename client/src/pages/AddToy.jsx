import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './AddToy.css';
import { validateToyData } from '../validationUtils';

const AddToy = () => {
    const navigate = useNavigate();

    // initilizing state with useful database columns
    const [formData, setFormData] = useState({
        name: '',
        category: 'STEM',
        status: 'active',
        min_age: '',
        max_age: '',
        purchase_price: '',
        source_name: '',
        source_url: '',
        is_favorite: false
    });

    // separate state just for the image file
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = validateToyData(formData);

        if (!validation.isValid){
          toast.error("Validation Errors:\n- " + validation.errors.join("\n- "));
          return;
        }

        // Safety check for the photo
        if (!file) {
          toast.error("Please upload a photo of the toy! 📸");
          return;
        }
        setLoading(true);

        try {
            // data conversion
            const dataToSend = new FormData();
            
            // Append all fields from your formData object
            dataToSend.append("name", formData.name);
            dataToSend.append("category", formData.category);
            dataToSend.append("status", formData.status);
            dataToSend.append("min_age", parseInt(formData.min_age));
            if (formData.max_age) {
              dataToSend.append("max_age", parseInt(formData.max_age));
            }
            dataToSend.append("purchase_price", parseFloat(formData.purchase_price));
            dataToSend.append("source_name", formData.source_name);
            dataToSend.append("source_url", formData.source_url);
            dataToSend.append("is_favorite", formData.is_favorite);
            
            // 4. Append the physical file
            dataToSend.append("image", file);

            await axios.post('http://localhost:3001/api/toys', dataToSend, {
              headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success("Toy successfully added!");
            // return to the home
            navigate('/');
        } catch (err) {
            console.error("Error saving toy:", err);
            toast.error("Failed to add toy! Please try again!")
        } finally {
            setLoading(false);
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
                  <option value="All">All Categories</option>
                  <option value="STEM">STEM</option>
                  <option value="Blocks">Blocks</option>
                  <option value="Books">Books</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Art">Art</option>
                  <option value="Pretend Play">Pretend Play</option>
                  <option value="Fine Motor">Fine Motor</option>
                  <option value="Music">Music</option>
                  <option value="Other">Other</option>
                  </select>
                </div>
              </div>
      
              {/* Row 2: Age Limits */}
              <div className="form-row">
                <div className="form-group">
                  <label>Min Age (Year)</label>
                  <input type="number" placeholder='e.g., 24' required onChange={(e) => setFormData({...formData, min_age: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Max Age (Year)</label>
                  <input type="number" placeholder='(Optional)' onChange={(e) => setFormData({...formData, max_age: e.target.value})} />
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
                  <input type="text" placeholder="(Optional)e.g., Target" onChange={(e) => setFormData({...formData, source_name: e.target.value})} />
                </div>
              </div>
      
              {/* Single Row: Full Width for URL and Image */}
              <div className="form-group">
                <label>Upload Toy Photo</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    required
                    onChange={(e) => setFile(e.target.files[0])} 
                />
              </div>
      
              <div className="form-group">
                <label>Product Link</label>
                <input type="url" placeholder="(Optional) https://..." onChange={(e) => setFormData({...formData, source_url: e.target.value})} />
              </div>
      
              <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Uploading..." : "Save Toy"}
              </button>
            </form>
          </div>
        </div>
      );
};

export default AddToy;
