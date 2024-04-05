import React, { useState } from 'react';
//import { useJwt } from "react-jwt"; // is said to be required but isn't??
import jwtDecode from "jwt-decode";
// FOR DEMONSTRATION PURPOSES ONLY - DELETE AFTER USE - REPLACE WITH <LINK> ELEMENT FROM REACT ROUTER
import { RedirectToRegister } from './Redirect.js';

const addAlbum = () => {
    const data = {
        userId: '65d91cfbf69237517bfc711',
        title: searchQuery,
        jwtToken: jwt,
    };

    fetch('https://turntable-d8f41b9ae77d.herokuapp.com/api/adduseralbum', { // Corrected endpoint URL
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(res => {
            console.log('Response:', res);
            if (res.error && res.error.length > 0) {
                setMessage("API Error: " + res.error);
            } else {
                console.log('Album added:', data);
                setMessage('Album has been added');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage('Error adding album. Please try again.');
        });
};
export default addAlbum;