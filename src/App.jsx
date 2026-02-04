// src/App.jsx
import { useState, useEffect } from 'react' // Import Hooks for state management and side effects
import axios from 'axios' // Import Axios for making HTTP requests
import './App.css' // Import styles

function App() {
  // State Management
  // 'toys': the variable holding the current list of toys. Initialized as an empty array [].
  // 'setToys: the function used to update the 'toys' variable and trigger a re-render
  const [toys, setToys] = useState([]) 

  const [newToyName, setNewToyName] = useState('')
  const [newToyBrand, setNewToyBrand] = useState('')

  // Side Effects
  useEffect(() => {
    fetchToys()
  }, [])

  // Async Data Fetching
  const fetchToys = async () => {
    try {
      console.log("Fetching data from backend...")
      // 'await': Pause execution until the server responds.
      const response = await axios.get('http://localhost:3000/api/toys')
      console.log("Data received", response.data)
      // Update the state with the data received from the backend
      setToys(response.data) 
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }
  // handle form submission(event triggerred e)
  const handleAddToy = async (e) => {
    e.preventDefault() // prevent the page from refreshing
    if (!newToyName) return // Do not submit if name is empty

    const toyData = {
      name: newToyName,
      brand: newToyBrand || 'Unknown',
      min_age: 36, // hardcoded for now
      status: 'Active'
    }

    try {
      const response = await axios.post('http://localhost:3000/api/toys', toyData)
      console.log("Success:", response.data)
      alert('Success! Toy added to inventory.') // this pops up a window in the browser
      
      // Update the UI immediately without refreshing
      setToys([...toys, response.data])

      // clear the input fields
      setNewToyName('')
      setNewToyBrand('')

    } catch(error) {
      console.error('Error adding toy:', error)
    }

  }

  // Retrun the HTML structure to display on the screen
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🤖 Lucas's Smart Toy Inventory</h1>
      <div style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3>➕ Add New Toy</h3>
        <form onSubmit={handleAddToy} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Toy Name (e.g., Blue Truck)" 
            value={newToyName}
            onChange={(e) => setNewToyName(e.target.value)}
            style={{ padding: '8px', flex: 1 }}
          />
          <input 
            type="text" 
            placeholder="Brand (Optional)" 
            value={newToyBrand}
            onChange={(e) => setNewToyBrand(e.target.value)}
            style={{ padding: '8px', width: '150px' }}
          />
          <button type="submit" style={{ padding: '8px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add
          </button>
        </form>
      </div>
      <p>Total Items: <strong>{toys.length}</strong></p>
      {/* Grid layout for Cards */}
      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        
        {/* Mapping: Loops through the 'toys' array to create a card for each item */}
        {toys.map((toy) => (
          <div key={toy.id} style={{ 
            border: '2px solid #eee', 
            padding: '20px', 
            borderRadius: '12px',
            backgroundColor: toy.status === 'Active' ? '#f0fdf4' : '#fff' // 如果是Active显示浅绿色
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{toy.name}</h3>
            <p>🏷️ Brand: {toy.brand}</p>
            <p>👶 Age: {toy.min_age}m+</p>
            <span style={{ 
              background: '#333', 
              color: '#fff', 
              padding: '4px 10px', 
              borderRadius: '20px',
              fontSize: '12px' 
            }}>
              {toy.status}
            </span>
          </div>
        ))}

      </div>
    </div>
  )
}

export default App