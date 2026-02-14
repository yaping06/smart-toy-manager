import './FilterBar.css';

const FilterBar = ({ 
  statusFilter, setStatusFilter, 
  categoryFilter, setCategoryFilter,
  ageFilter, setAgeFilter,
  sortBy, setSortBy,
  resultsCount 
}) => {
  return (
    <div className="filter-toolbar">
      <div className="filter-group">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Toys</option>
          <option value="active">Active Toys</option>
          <option value="storage">In Storage</option>
          <option value="sold">Sold</option>
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="STEM">STEM</option>
          <option value="Blocks">Blocks</option>
          <option value="Books">Books</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Art">Art</option>
          <option value="Other">Other</option>
        </select>

        <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
          <option value="All">All ages</option>
          <option value="1">1 year or younger</option>
          <option value="2">2 years or younger</option>
          <option value="3">3 years or younger</option>
          <option value="4">4 years or younger</option>
          <option value="6">6 years or younger</option>
          <option value="8">8 years or younger</option>
          <option value="10">10 years or younger</option>
          <option value="15">15 years or younger</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>
      <p className="results-count">Results: {resultsCount} items</p>
    </div>
  );
};

export default FilterBar;