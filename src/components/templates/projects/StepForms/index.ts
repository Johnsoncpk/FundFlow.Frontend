import { ProjectData } from '../types';
import React from 'react';

export { Form1 } from './Form1';
export { Form2 } from './Form2';
export { Form3 } from './Form3';
export { Form4 } from './Form4';

export type FormProps = {
    projectData: ProjectData;
    setProjectData: React.Dispatch<React.SetStateAction<ProjectData>>;
}