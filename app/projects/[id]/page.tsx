"use-client";

import {projects} from '../projectsData';
import CMPUT412 from '../CMPUT412/page';
import { use } from "react";


interface Params {
  id: string;
}

const ProjectPage = ({ params }: { params: Promise<Params> }) => {

    const { id } = use(params);
    const project = projects.find((proj) => proj.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  switch (project.id) {
    case 'YOLOBrawlers':
      return <div>Placeholder</div>
    case 'CMPUT412':
      return <CMPUT412/>;
    // Add more cases for additional projects
    default:
      return <div>Project not found</div>;
  }

};

export default ProjectPage;