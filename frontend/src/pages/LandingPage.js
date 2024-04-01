import React, { useState, useEffect } from "react";
import AlbumCarousel from '../components/landing/AlbumCarousel';
import Topbar from '../components/landing/Topbar';
import SearchBar from "../components/landing/SearchBar";
import RippleBackground from "../components/landing/RippleBackground";
import Album from '../models/Album';
import "../styles/LandingPage.css"

const LandingPage = () => {

    useEffect(() => {
        document.body.style.background = "#1E1E1E";
      }, []);

    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (query) => {
        console.log("Search query:", query);
    };

    const handleDelete = (thisCard) => {
        console.log("Deleting...");
    }

    return (
        <div className="main">
        <div className="top">
             <Topbar />
        </div>
        <div className="background">
            <RippleBackground />
        </div>
        <div className="content">
            <SearchBar onSearch={handleSearch} />
            <AlbumCarousel onDelete={handleDelete}/>
        </div>
        </div>
    );
}
export default LandingPage;