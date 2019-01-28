import React, { useState, useEffect } from 'react';
import App, { Container } from 'next/app';
import axios from 'axios';
import { endpoint } from '../config';

const ListingsContext = React.createContext();

function useListings() {
  const [listings, setListings] = useState([]);
  async function fetchListings() {
    console.log('Re-running fetch listings');
    const { data } = await axios.get(`${endpoint}/listings`);
    setListings(data);
  }
  // fetch the listings on component mount
  useEffect(() => {
    fetchListings();
  }, []);
  // expose the fetch function so we can manually call it on click
  return { listings, fetchListings };
}

function Data({ children }) {
  const { listings, fetchListings } = useListings();
  // const [listings, updateListings] = useState(['hey']);
  return (
    <ListingsContext.Provider
      value={{
        listings,
        fetchListings,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Data>
          <Component {...pageProps} />
        </Data>
      </Container>
    );
  }
}

export default MyApp;
export { ListingsContext };
