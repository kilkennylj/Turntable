import React, { useState, useEffect } from "react";
import AlbumCarousel from '../components/landing/AlbumCarousel';
import Topbar from '../components/landing/Topbar';
import SearchBar from "../components/landing/SearchBar";
import RippleBackground from "../components/landing/RippleBackground";
import AlbumFunctions from "../frontAPI/AlbumFunctions";
import "../styles/LandingPage.css"

const LandingPage = () => {

    useEffect(() => {
        document.body.style.background = "#1E1E1E";
    }, []);

    const [searchResults, setSearchResults] = useState([]);
    const { searchAlbums, deleteAlbum } = AlbumFunctions();

    const handleSearch = (query) => {
        let albums = searchAlbums(query);
        setSearchResults(albums);
    };

    const handleDelete = async (albumName) => {
        let albums = await deleteAlbum(albumName);
        setSearchResults(albums);
    };

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
                <AlbumCarousel albums={searchResults} onDelete={handleDelete} />
            </div>
        </div>
    );
}

export default LandingPage;