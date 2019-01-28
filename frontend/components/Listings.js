import { useContext } from 'react';
import Listing from './Listing';
import styled from 'styled-components';
import { ListingsContext } from '../pages/_app';


const ListingsStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
`;

export default function SearchesList() {
  // const { listings } = useListings();
  const { listings, fetchListings } = useContext(ListingsContext);
  return (
    <>
      <p>{listings.length} Listings for review <button onClick={fetchListings}>Refresh</button></p>
      <ListingsStyles>
        {listings.map(listing => (
          <Listing key={listing._id} listing={listing} />
        ))}
      </ListingsStyles>
    </>
  );
}
