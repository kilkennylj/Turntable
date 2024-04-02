import React, { useState } from 'react';
import "../../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <div className="searchbar_div">
            <form onSubmit={handleSubmit} className='searchbar_container'>
                <input
                    type="text"
                    placeholder="Search albums..."
                    value={searchQuery}
                    onChange={handleChange}
                    className="searchbar_input"
                />
                <button type="submit" className='searchbar_button'>Search</button>
            </form>
        </div>
    );
};

export default SearchBar;