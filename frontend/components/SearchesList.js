import { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoint } from '../config';
import styled from 'styled-components';

function useSearches() {
  const [searches, setSearches] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${endpoint}/searches`);
      setSearches(data);
    })();
  }, []);
  return { searches };
}

export default function SearchesList() {
  const { searches } = useSearches();
  return (
    <div>
      <h3>Currently Tracking:</h3>
      {searches.map(search => (
        <div key={search._id}>
          <a href={search.feed}>{search.name}</a>
        </div>
      ))}
    </div>
  );
}
