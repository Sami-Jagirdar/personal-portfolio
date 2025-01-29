import {projects} from '../projectsData';
import CMPUT412 from '../CMPUT412/page';

interface Params {
  id: string;
}

const ProjectPage = ({ params }: { params: Params }) => {
    const project = projects.find((proj) => proj.id === params.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  switch (project.id) {
    case 'CMPUT412':
      return <CMPUT412/>;
    // Add more cases for additional projects
    default:
      return <div>Project not found</div>;
  }

};

export default ProjectPage;