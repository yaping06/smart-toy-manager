import './FilterBar.css';

const FilterBar = ({ 
  statusFilter, setStatusFilter, 
  categoryFilter, setCategoryFilter, 
  sortBy, setSortBy,
  resultsCount 
}) => {
  return (
    <div className="filter-toolbar">
      <div className="filter-group">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="active">Active Toys</option>
          <option value="storage">In Storage</option>
          <option value="sold">Sold</option>
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="STEM">STEM</option>
          <option value="Blocks">Blocks</option>
          <option value="Books">Books</option>
          <option value="Art">Art</option>
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