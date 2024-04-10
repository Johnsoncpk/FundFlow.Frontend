import { Default } from 'components/layouts/Default';
import { Projects } from 'components/templates/projects';

const BrowseProject = () => {
    return (
        <Default pageName="Manage Projects">
            <Projects isOwnerOnly />
        </Default>
    );
};

export default BrowseProject;
