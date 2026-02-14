import React, { useState } from 'react';
import axios from 'axios';
import './Discovery.css';

const Discovery = () => {
    const [age, setAge] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);

    const getInventoryAnalysis = async () => {
        if (!age) return alert("Please enter Lucas's age");
        setLoading(true);
        setAnalysis('');
        try {
            const res = await axios.post('http://localhost:3001/api/ai/inventory-check', { 
                childAge: age 
            });
            if (res.data.analysis){
                setAnalysis(res.data.analysis);
            }
            
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="toy-ideas-container">
            <h1>✨ Smart Inventory Insights</h1>
            <p>Let AI analyze Lucas's toys to see what he's outgrown and what's next.</p>
            
            <div className="age-input-section">
                <label>How old is Lucas now?</label>
                <input 
                    type="number" 
                    value={age} 
                    onChange={(e) => setAge(e.target.value)} 
                    placeholder="e.g. 2.5"
                />
                <button onClick={getInventoryAnalysis} disabled={loading}>
                    {loading ? "Analyzing..." : "Analyze Collection"}
                </button>
            </div>

            {analysis && (
                <div className="analysis-results">
                    <div className="analysis-text">{analysis}</div>
                </div>
            )}
        </div>
    );
};

export default Discovery;