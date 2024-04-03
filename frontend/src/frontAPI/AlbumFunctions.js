import { useState, useEffect } from 'react';
import { Album, Tracklist, Track } from "../models/Album";

function AlbumFunctions() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Retrieve user info from local storage
        const userData = JSON.parse(localStorage.getItem('user_data'));
        if (!userData || !userData.id) {
            throw new Error('User data not found');
        }

        const fetchAlbumsFromAPI = async () => {
            try {
                const response = await fetch('/api/searchuseralbum', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: userData.id,
                        search: '', // Empty search to get all albums associated with the user
                        jwtToken: userData.jwtToken
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch albums');
                }

                const data = await response.json();

                // Process the albums from API response
                const formattedAlbums = data.albums.map(albumData => {
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

    const handleDelete = (index) => {
        // Handle deletion of album
        // Update albums array accordingly
        const updatedAlbums = [...albums];
        updatedAlbums.splice(index, 1);
        setAlbums(updatedAlbums);
    };

    return { albums, loading, handleDelete };
}

export default AlbumFunctions;
