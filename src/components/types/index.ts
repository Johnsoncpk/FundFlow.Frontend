import React from 'react';

export type ProjectRound = {
    fundingGoal: number;
    endAt: number;
}

export type ProjectData = {
    name: string
    description: string,
    category: string,
    totalFundingGoal: number
    totalRound: number
    rounds: ProjectRound[]
    editorState: string
}

export type FormProps = {
    projectData: ProjectData;
    setProjectData: React.Dispatch<React.SetStateAction<ProjectData>>;
}