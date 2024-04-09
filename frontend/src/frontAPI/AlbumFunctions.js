import { useState, useEffect } from 'react';
import { Album, Tracklist, Track } from "../models/Album";
import decode from "jwt-decode";

const getRandomPlaceholderCover = () => {
    const randomNumber = Math.random();

    // Define the probabilities for each placeholder cover image
    const probabilities = [
        { cover: "/assets/img/placeholder_1.jpeg", chance: 0.05 },
        { cover: "/assets/img/placeholder_2.jpeg", chance: 0.2 },
        { cover: "/assets/img/placeholder_3.jpeg", chance: 0.45 },
        { cover: "/assets/img/placeholder_4.jpeg", chance: 0.3 }
    ];

    for (const probability of probabilities) {
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

                console.log(data);

                let formattedAlbums = [];

                console.log(data.albums.length);

                if (data.albums.length === 0) {
                    // If user has no albums, create a template album
                    const templateAlbum = new Album(
                        "Welcome to Turntable!",
                        "To get started, add one album by using",
                        "the search bar above.",
                        ["You can use this website to save albums you have listened to and review them."],
                        new Tracklist( [new Track(["Here is where your tracklist would go! ... If you had albums ...", -1])]),
                        getRandomPlaceholderCover()
                    );
                    console.log(templateAlbum);
                    formattedAlbums = [templateAlbum];
                    console.log(formattedAlbums);
                } else {
                    formattedAlbums = data.albums.map(albumData => {
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

            if (!data) {
                throw new Error('Invalid album data');
            }

            let formattedAlbums = data.albums.map(albumData => {
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
            setAlbums(formattedAlbums);
            setLoading(false);
            return formattedAlbums;
        } catch (error) {
            console.error('Error searching albums:', error);
            setLoading(false);
        }
    };


    const deleteAlbum = async (query) =>
    {
        // Handle deletion of album
        // Update albums array accordingly
        try
        {
            const userData = JSON.parse(localStorage.getItem('user_data'));

            if (!userData || !userData.id)
            {
                throw new Error('User data not found');
            }

            console.log(query);

            const obj_add = {userId: userData.id, name: query, jwtToken: userData.jwtToken };
            const js_add = JSON.stringify(obj_add);

            setLoading(true);

            const deleteRes = await fetch(bp.buildPath('api/deleteuseralbum'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: js_add
            });
        }

        catch(e)
        {
            console.log(e);
            setLoading(false);
        }
    };

    return { albums, loading, searchAlbums, deleteAlbum };
}

export default AlbumFunctions;
