import axios from 'axios';
import { useState, useCallback } from 'react';
import { endpoint } from '../config';

function useInput(initalValue = '') {
  const [value, update] = useState(initalValue);
  const onChange = useCallback(e => {
    update(e.currentTarget.value);
  }, []);
  return { value, onChange };
}

async function handleSubmit(e, data) {
  e.preventDefault();
  console.log(endpoint, data);
  const res = await axios.post(`${endpoint}/searches`, {
    name: data.name.value,
    feed: data.feed.value,
  });
  console.log(res);
}
export default function AddSearch() {
  const name = useInput('Urban Barn');
  const feed = useInput(
    'https://www.kijiji.ca/rss-srp-couch-futon/ontario/urban-barn-leather/k0c238l9004'
  );
  return (
    <form onSubmit={e => handleSubmit(e, { name, feed })}>
      <input type="text" name="name" placeholder="name" {...name} />
      <input type="text" name="feed" placeholder="feed" {...feed} />
      <button type="submit">+ Add Search</button>
    </form>
  );
}
