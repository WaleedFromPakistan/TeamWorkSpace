import React from 'react';
import './Card.css';

const Card = (props) => {
  return (
    <div>
      <div className='card'>
        <div className='card_container'>
            <div className='card_title'>
                <h2>{props.title}</h2>
            </div>
            <div className='card_body'>
                <h3>{props.card_title}</h3>
                <p>{props.card_description}</p>
                <p>{props.members}</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
