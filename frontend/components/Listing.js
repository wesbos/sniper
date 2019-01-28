import { formatDistance } from 'date-fns';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useCallback } from 'react';
import { endpoint } from '../config';

const ListingStyles = styled.div`
  border: 10px solid #f9f9f9;
  position: relative;
  img {
    width: 100%;
    height: 275px;
    object-fit: cover;
  }
  h2 {
    margin: 0;
    font-size: 15px;
  }
  .listing-details {
    padding: 10px;
  }
  time {
    font-size: 11px;
    color: #525252;
    font-style: italic;
  }
  .favicon {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin-top: 10px;
    button {
      background: #59c359;
      border: 0;
      color: white;
      padding: 10px;
      text-transform: uppercase;
      font-size: 15px;
      font-weight: 900;
      &.nah {
        background: tomato;
      }
    }
  }
`;

const PriceTag = styled.span`
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const formatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumSignificantDigits: 1,
});
export default function Listing({ listing }) {
  const [nah, setNah] = useState();
  return (
    <ListingStyles hidden={nah}>
      <PriceTag>
        <img
          className="favicon"
          src={`/static/${listing.from}.png`}
          alt={`Listing from ${listing.from}`}
        />
        {formatter.format(listing.price)}
      </PriceTag>
      <a href={listing.link} target="_blank">
        <img width="50" src={listing.image} alt={listing.title} />
      </a>
      <div className="listing-details">
        <time dateTime={listing.date}>
          {formatDistance(new Date(listing.date), new Date())} ago
        </time>
        <h2>{listing.title}</h2>
        <div className="buttons">
          <button
            onClick={() => {
              setNah(true);
            }}
          >
            Maybe
          </button>
          <button
            className="nah"
            onClick={() => {
              axios.post(`${endpoint}/listings/${listing._id}/nah`);
              setNah(true);
            }}
          >
            Nah
          </button>
        </div>
      </div>
    </ListingStyles>
  );
}
