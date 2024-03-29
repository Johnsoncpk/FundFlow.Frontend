import React from 'react';

export type ProjectRound = {
    fundingGoal: number;
    endAt: number;
}

export type ProjectData = {
    name: string
    description: string,
    category: string,
    image: string | ArrayBuffer | null,
    external_url: string,
    totalFundingGoal: number
    totalRound: number
    rounds: ProjectRound[]
    editorState: string
}

export type FormProps = {
    projectData: ProjectData;
    setProjectData: React.Dispatch<React.SetStateAction<ProjectData>>;
}

export type ProjectMetaData = {
    name: string;
    description: string;
    category: 'all' | 'art' | 'comicts' | 'crafts' | 'dance' | 'design' | 'fashion' | 'file&design' | 'music';
    editorState: string;
    totalFundingGoal: bigint;
    totalRound: bigint;
    rounds: {
        fundingGoal: bigint;
        endAt: bigint;
    }[];
    image: string;
    external_url: string;
}