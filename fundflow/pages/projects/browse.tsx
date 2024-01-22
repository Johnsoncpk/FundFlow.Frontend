import { Default } from 'components/layouts/Default';
import { SearchBar } from 'components/templates/projects/SearchBar';
import { Projects } from 'components/templates/projects';

const Browse = () => {
    return (
        <Default pageName="NFT Balances">
            <SearchBar />
            <Projects />
        </Default>
    );
};

export default Browse;
