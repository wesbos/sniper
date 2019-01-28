import AddSearch from '../components/AddSearch';
import SearchesList from '../components/SearchesList';
import Listings from '../components/Listings';
import Page from '../components/Page';

const IndexPage = () => (
  <Page>
    <Listings />
    <AddSearch />
    <SearchesList />
  </Page>
);

export default IndexPage;
