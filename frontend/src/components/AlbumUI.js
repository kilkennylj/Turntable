// This file is a very simple album UI based off mern a.
// Front end - web, you can replace this or work off of this up to you.
// This just needs to be here so we can test addalbum

import React, { useState } from 'react';

function AlbumUI() {
    var name = '';
    var year;
    var genres = [];
    var rating;
    var tracks = [];
    var length = [];
    var cover = '';

    var album = { name, year, genres, rating, tracks, length, cover };

    const [message, setMessage] = useState('');
    const [searchResults, setResults] = useState('');
    const [albumList, setAlbumList] = useState('');

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    let firstName = ud.firstName;
    let lastName = ud.lastName;
    const addAlbum = async event => 
    {
        event.preventDefault();
        let obj = { userId: userId, album: album };
        let js = JSON.stringify(obj);
        try 
        {
            const response = await
                fetch('http://localhost:5000/api/addalbum',
                    {
                        method: 'POST', body: js, headers: 
                        {
                            'Content-Type': 'application/json'
                        }
                    });
            let txt = await response.text();
            let res = JSON.parse(txt);
            if (res.error.length > 0)
            {
                setMessage("API Error:" + res.error);
            }
            else
            {
                setMessage('Album has been added');
            }
        }
        catch (e) 
        {
            setMessage(e.toString());
        }
    };
    /*
    const searchAlbum = async event => 
    {
        event.preventDefault();
        let obj = { userId: userId, search: search.value };
        let js = JSON.stringify(obj);
        try {
            const response = await
                fetch('http://localhost:5000/api/searchalbums',
                    {
                        method: 'POST', body: js, headers: {
                            'Content-Type':
                                'application/json'
                        }
                    });
            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            for (var i = 0; i < _results.length; i++) {
                resultText += _results[i];
                if (i < _results.length - 1) {
                    resultText += ', ';
                }
            }
            setResults('Album(s) have been retrieved');
            setAlbumList(resultText);
        }
        catch (e) {
            alert(e.toString());
            setResults(e.toString());
        }
    };
    */
    return (
        "hello world"
    );
}

export default AlbumUI;
