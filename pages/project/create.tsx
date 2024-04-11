import { Default } from 'components/layouts/Default';
import { Create } from 'components/templates/projects';

const ProjectCreate = () => {
    return (
        <Default pageName="Create Project">
            <Create variant='circles' />
        </Default>
    );
};

export default ProjectCreate;
