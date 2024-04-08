import { useState, useEffect } from 'react';
import { Album, Tracklist, Track } from "../models/Album";
import decode from "jwt-decode";

const getRandomPlaceholderCover = () => {
    // Generate a random number between 0 and 1
    const randomNumber = Math.random();

    // Define the probabilities for each placeholder cover image
    const probabilities = [
        { cover: "/assets/img/placeholder/placeholder_1.jpg", chance: 0.05 },
        { cover: "/assets/img/placeholder/placeholder_2.jpg", chance: 0.2 },
        { cover: "/assets/img/placeholder/placeholder_3.jpg", chance: 0.45 },
        { cover: "/assets/img/placeholder/placeholder_4.jpg", chance: 0.3 }
    ];

    // Iterate through the probabilities
    for (const probability of probabilities) {
        // If the random number falls within the probability range, select the cover
        if (randomNumber < probability.chance) {
            return probability.cover;
        }
    }

    // If no cover is selected, return the last cover in the list (fallback)
    return probabilities[probabilities.length - 1].cover;
};


function AlbumFunctions() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    var bp = require('./Path.js');

    useEffect(() => {
        //Retrieve user info from local storage
        const userData = JSON.parse(localStorage.getItem('user_data'));
        const obj = { userId: userData.id, search: "", jwtToken: userData.jwtToken };
        const js = JSON.stringify(obj);

        if (!userData) {
            throw new Error('User data not found');
        }

        const fetchAlbumsFromAPI = async () => {

            try {
                const response = await fetch(bp.buildPath('api/searchuseralbum'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: js
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch albums');
                }

                const data = await response.json();

                let formattedAlbums = [];

                if (data.albums.length === 0) {
                    // If user has no albums, create a template album
                    const templateAlbum = new Album(
                        "Welcome to Turntable!",
                        "To get started, add one album by using",
                        "the search bar above.",
                        ["You can use this website to save albums you have listened to and review them."],
                        ["Here is where your tracklist would go! ... If you had albums ..."],
                        getRandomPlaceholderCover
                    );

                    formattedAlbums = [templateAlbum];
                } else {
                    formattedAlbums = data.albums.map(albumData => {
                        // NOTE: I kept this code commented because I'm not sure why you had it. 
                        // If it did something important besides just getting Tracks and Length, then try to reimplement it
                        // Create tracks for the album
                        const tracks = albumData.Tracks.map((trackName, index) => {
                            return new Track(trackName, albumData.Length[index]);
                        });
                        // Create a tracklist for the album
                        const tracklist = new Tracklist(tracks);
                        // Create the album object
                        return new Album(
                            albumData.Name,
                            albumData.Artist,
                            albumData.Year,
                            albumData.Tags,
                            [tracklist],
                            albumData.Cover
                        );
                    });
                }
                // Set the albums in state
                setAlbums(formattedAlbums);
            } catch (error) {
                console.error('Error fetching albums:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbumsFromAPI();
    }, []);

    const searchAlbums = async (query) => {
        try {
            const userData = JSON.parse(localStorage.getItem('user_data'));

            if (!userData || !userData.id) {
                throw new Error('User data not found');
            }

            const obj_add = {userId: userData.id, name: query, jwtToken: userData.jwtToken };
            const js_add = JSON.stringify(obj_add);
            console.log(js_add);

            setLoading(true);
            const add_response = await fetch(bp.buildPath('api/adduseralbum'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: js_add
            });

            if (!add_response.ok) {
                throw new Error('Failed to search albums');
            }

            const obj_search = {userId: userData.id, search: query, jwtToken: userData.jwtToken};
            const js_search = JSON.stringify(obj_search);

            const search_response = await fetch(bp.buildPath("api/searchuseralbum"), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: js_search
            });

            const data = await search_response.json();
            const albumData = data.albums[0];

            if (!albumData) {
                throw new Error('Invalid album data');
            }

            const tracks = albumData.Tracks.map((trackName, index) => {
                return new Track(trackName, albumData.Length[index]);
            });
            // Create a tracklist for the album
            const tracklist = new Tracklist(tracks);

            // Create the album object
            const newAlbum = new Album(
                albumData.Name,
                albumData.Artist,
                albumData.Year,
                albumData.Tags,
                [tracklist],
                albumData.Cover
            );

            setAlbums(prevAlbums => [...prevAlbums, newAlbum]);
            setLoading(false);
        } catch (error) {
            console.error('Error searching albums:', error);
            setLoading(false);
        }
    };


    const handleDelete = (index) => {
        // Handle deletion of album
        // Update albums array accordingly
        const updatedAlbums = [...albums];
        updatedAlbums.splice(index, 1);
        setAlbums(updatedAlbums);
    };

    return { albums, loading, searchAlbums, handleDelete };
}

export default AlbumFunctions;
