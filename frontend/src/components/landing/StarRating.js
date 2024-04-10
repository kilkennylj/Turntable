import React from 'react';
import ReactStars from 'react-stars';
import "../../styles/StarRating.css";

const StarRating = ({ initialRating, onChange }) => {
    const handleRatingChange = (newRating) => {
        onChange(newRating);
    };

    return (
        <ReactStars
            className='stars'
            count={5}
            value={initialRating}
            size={50}
            edit={true}
            half={false}
            onChange={handleRatingChange}
            color="#888888"
            activeColor="#ffd700"
            style={{ overflow: 'visible' }}
        />
    );
};

export default StarRating;