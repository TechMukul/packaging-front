"use client"
import React, { useState } from 'react';
// import './Search.scss'; // Import CSS file for styling
import styles from './index.module.scss'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<any>([]);

  // Sample data for demonstration
  const sampleData = [
    "Apple", "Banana", "Orange", "Pineapple", "Grapes", "Watermelon"
  ];

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter results based on search query
    const filtered = sampleData.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle search submission here, e.g., trigger a search function with searchQuery
    // console.log('Search query:', searchQuery);
  };

  return (
    <div style={{marginTop:"10px"}}>
      <form className={styles.searchform} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleChange}
          className={styles.searchinput}
        />
        {/* <button type="submit" className="search-button"></button> */}
      </form>
      {/* Display filtered results */}
      <ul className="search-results">
        {filteredResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
